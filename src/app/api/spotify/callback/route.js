import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// This makes sure the route is always re-run when you visit it
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export async function GET(request) {
  // Get the special one-time code from the URL
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // If there's no code, something is wrong. We send the user back to the home page.
  if (!code) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Prepare the data to send to Spotify to get our real tokens
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
  });

  try {
    // We make a POST request to Spotify to exchange our one-time code for real tokens.
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
      body,
    });

    const data = await response.json();

    if (response.ok) {
      const { access_token, refresh_token, expires_in } = data;

      // Use the access token to get the users Spotify profile info.
      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const userData = await userResponse.json();
      const spotifyId = userData.id;

      if (!spotifyId) {
        throw new Error("Could not retrieve Spotify ID from user data.");
      }

      // Save or update the users data in our database.
      const user = await prisma.user.upsert({
        where: { spotifyId: spotifyId },
        update: {
          spotifyRefreshToken: refresh_token,
          accessToken: access_token,
          accessTokenExpires: new Date(Date.now() + expires_in * 1000),
          displayName: userData.display_name,
          email: userData.email,
          profileImageUrl: userData.images?.[0]?.url,
        },
        create: {
          spotifyId: spotifyId,
          spotifyRefreshToken: refresh_token,
          accessToken: access_token,
          accessTokenExpires: new Date(Date.now() + expires_in * 1000),
          displayName: userData.display_name,
          email: userData.email,
          profileImageUrl: userData.images?.[0]?.url,
        },
      });

      // Send the user to the dashboard page with their unique ID in the URL
      const redirectBase = REDIRECT_URI.split("/api/spotify/callback")[0];

      // Step 1: Generate a unique session token (random meaningless string)
      const sessionToken = crypto.randomUUID();

      // Step 2: Update the user in the database with the new session token, the next API call will use this token to find the user.
      await prisma.user.update({
        where: { id: user.id },
        data: { sessionToken },
      });

      // Step 3: Create a redirect response and manually set the 'Set-Cookie' header.
      // This is a direct, reliable way to set the cookie that bypasses Next.js dynamic API checks.
      const redirectUrl = new URL(`${redirectBase}/dashboard`);
      const response = NextResponse.redirect(redirectUrl);

      const cookieOptions = {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      };
      const cookieString = `${encodeURIComponent(
        "sessionToken"
      )}=${encodeURIComponent(sessionToken)}; Path=${
        cookieOptions.path
      }; HttpOnly; SameSite=${cookieOptions.sameSite}; Secure`;
      response.headers.set("Set-Cookie", cookieString);

      return response;
    } else {
      console.error("Spotify token exchange failed:", data.error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("An error occurred during token exchange:", error);
    return NextResponse.redirect(new URL("/", request.url));
  } finally {
    // Close db connection.
    await prisma.$disconnect();
  }
}
