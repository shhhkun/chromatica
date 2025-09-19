import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export async function GET(request) {
  // Extract the authorization code from the URL's search parameters
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  // If there's no code, something went wrong, so we'll redirect back to the login page
  if (!code) {
    return NextResponse.redirect('/login');
  }

  // Set up the body of the POST request to Spotify's token endpoint
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
  });

  try {
    // Send the POST request to exchange the code for tokens
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
      },
      body,
    });

    const data = await response.json();

    // If the token exchange was successful, we can get the tokens
    if (response.ok) {
      const { access_token, refresh_token } = data;

      // TODO: securely store the tokens (in a cookie or a database session) and then redirect the user to your main application page.
      const redirectUrl = new URL('/', request.url);
      redirectUrl.searchParams.set('access_token', access_token);
      redirectUrl.searchParams.set('refresh_token', refresh_token);
      return NextResponse.redirect(redirectUrl);

    } else {
      // Token exchange failed, log the error and redirect back to login
      console.error('Spotify token exchange failed:', data.error);
      return NextResponse.redirect('/login');
    }
  } catch (error) {
    console.error('An error occurred during token exchange:', error);
    return NextResponse.redirect('/login');
  }
}
