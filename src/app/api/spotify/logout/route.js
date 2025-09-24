import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // 1. Get the session token from the request cookies.
    const sessionToken = request.cookies.get("sessionToken")?.value;

    // 2. If no session token exists, the user is not logged in.
    if (!sessionToken) {
      return NextResponse.json({ message: 'No active session to log out' }, { status: 400 });
    }

    // 3. Find the user associated with this session token and update the record (set both to null)
    await prisma.user.updateMany({
      where: { sessionToken: sessionToken },
      data: {
        sessionToken: null,
        sessionTokenExpires: null,
      },
    });

    // 4. Create a response to send back to the client.
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });

    // 5. Instruct the browser to delete the session cookie.
    response.cookies.delete("sessionToken");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    // Close db connection.
    await prisma.$disconnect();
  }
}

// Prevent users from accidentally navigating to this endpoint via a GET request
export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
