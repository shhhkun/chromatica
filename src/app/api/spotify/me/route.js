import { NextResponse } from 'next/server';

export async function GET(request) {
  // Get the access token from the request's search parameters
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get('access_token');

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token not provided' }, { status: 400 });
  }

  try {
    // Make a request to the Spotify API to get the user's profile
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      // Return user data as JSON
      return NextResponse.json(data);
    } else {
      // Handle API errors
      return NextResponse.json({ error: data.error.message }, { status: response.status });
    }
  } catch (error) {
    console.error('Error fetching Spotify user data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
