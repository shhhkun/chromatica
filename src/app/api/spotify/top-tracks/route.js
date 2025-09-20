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

    // Step 3: Use access token to get the users top tracks.
    const topTracksResponse = await fetch(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!topTracksResponse.ok) {
      const errorData = await topTracksResponse.json();
      throw new Error(
        errorData.error.message || "Failed to fetch top tracks from Spotify."
      );
    }

    const topTracksData = await topTracksResponse.json();

    // Step 4: Get track data (track name, artists name, album art URL).
    const tracks = topTracksData.items.map((track) => {
      const albumArtUrl =
        track.album.images.find((img) => img.height === 300)?.url ||
        track.album.images[0]?.url ||
        "";

      return {
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(", "),
        albumArtUrl: albumArtUrl,
      };
    });

    return NextResponse.json(tracks, { status: 200 });
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  } finally {
    // Close db connection.
    await prisma.$disconnect();
  }
}
