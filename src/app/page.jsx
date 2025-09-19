"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // check if the URL has a search query (where the tokens would be)
    if (window.location.search.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("access_token");

      if (accessToken) {
        // if a token is found, redirect to the dashboard
        window.location.href = "/dashboard" + window.location.search;
      } else {
        // if the URL has a search query but no tokens, it's an error
        setLoading(false);
      }
    } else {
      // if no search query, display the login button
      setLoading(false);
    }
  }, []);

  const handleSpotifyLogin = () => {
    setLoading(true);
    // redirect to your new API route to begin the OAuth flow
    window.location.href = "/api/spotify/auth";
  };

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-bold animate-pulse">
          Redirecting to dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center min-h-screen">
      <button
        className="px-4 py-3 rounded-lg cursor-pointer font-bold transition-colors duration-200 hover:bg-[#1AA048]"
        style={{
          backgroundColor: "#1DB954",
          fontSize: "1rem",
        }}
        onClick={handleSpotifyLogin}
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Login with Spotify"}
      </button>
    </main>
  );
};

export default Page;
