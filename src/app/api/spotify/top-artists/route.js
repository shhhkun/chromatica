import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// This makes sure the route is always re-run when you visit it
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    // Step 1: Authenticate the user using the secure session token from the cookie.
    const allCookies = await cookies();
    const sessionToken = allCookies.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { message: "User not authenticated." },
        { status: 401 }
      );
    }

    // Use session token for database lookup
    const user = await prisma.user.findUnique({
      where: { sessionToken: sessionToken },
    });

    const now = new Date();
    if (!user || (user.sessionTokenExpires && user.sessionTokenExpires < now)) {
      return NextResponse.json(
        { message: "User not authenticated or session expired." },
        { status: 401 }
      );
    }

    // Step 2: Check if the Spotify accessToken is expired and refresh it if needed.
    const accessTokenExpires = new Date(user.accessTokenExpires);
    let accessToken = user.accessToken;

    if (accessTokenExpires < now) {
      const refreshToken = user.spotifyRefreshToken;
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to refresh Spotify access token.");
      }

      // Update user data in the database with the new token.
      accessToken = data.access_token;
      const newAccessTokenExpires = new Date(
        now.getTime() + data.expires_in * 1000
      );
      await prisma.user.update({
        where: { id: user.id },
        data: {
          accessToken: accessToken,
          accessTokenExpires: newAccessTokenExpires,
        },
      });
    }

    // Step 3: Use access token to get the users top artists.
    const topArtistsResponse = await fetch(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!topArtistsResponse.ok) {
      const errorData = await topArtistsResponse.json();
      throw new Error(
        errorData.error.message || "Failed to fetch top artists from Spotify."
      );
    }

    const topArtistsData = await topArtistsResponse.json();

    // Step 4: Get artist data (artist name and image URL).
    const artists = topArtistsData.items.map((artist) => {
      const artistImageUrl =
        artist.images.find((img) => img.height === 320)?.url ||
        artist.images[0]?.url ||
        "";

      return {
        name: artist.name,
        artistImageUrl: artistImageUrl,
      };
    });

    return NextResponse.json(artists, { status: 200 });
  } catch (error) {
    console.error("Error fetching top artists:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  } finally {
    // Close db connection.
    await prisma.$disconnect();
  }
}
