// This route handler initiates the Spotify OAuth flow by redirecting the user to Spotify's authorization page.

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
// Scopes define what data your app is allowed to access
const SPOTIFY_SCOPES = 'user-read-private user-read-email user-top-read';

export async function GET() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: SPOTIFY_SCOPES,
    redirect_uri: SPOTIFY_REDIRECT_URI,
  });

  // Construct the full authorization URL
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  // Redirect the user to Spotify's login page
  return Response.redirect(spotifyAuthUrl);
}
