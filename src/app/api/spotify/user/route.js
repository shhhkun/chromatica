import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This makes sure the route is always re-run when you visit it
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    // We get the user ID from the URL (ID from neon db)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated or ID missing." },
        { status: 401 }
      );
    }

    // We use the ID to find the user in our database.
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
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
