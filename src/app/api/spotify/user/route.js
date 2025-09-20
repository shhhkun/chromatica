import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { cookies } from "next/headers";

const prisma = new PrismaClient();

// This makes sure the route is always re-run when you visit it
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const allCookies = await cookies();

    // Get the secure session token from the users cookies.
    const sessionToken = allCookies.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { message: "User not authenticated." },
        { status: 401 }
      );
    }

    // Use the session token to find the user in the database.
    const user = await prisma.user.findUnique({
      where: {
        sessionToken: sessionToken,
      },
    });

    const now = new Date();
    if (!user || (user.sessionTokenExpires && user.sessionTokenExpires < now)) {
      return NextResponse.json(
        { message: "User not authenticated or session expired." },
        { status: 401 }
      );
    }

    // Object that contains only sharable information
    const safeUser = {
      id: user.id,
      displayName: user.displayName,
      profileImageUrl: user.profileImageUrl,
      email: user.email,
      spotifyId: user.spotifyId,
    };

    // Send back data as a JSON
    return NextResponse.json(safeUser, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  } finally {
    // Close db connection
    await prisma.$disconnect();
  }
}
