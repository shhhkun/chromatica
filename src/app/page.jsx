"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
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
