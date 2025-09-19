"use client";

import { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const handleSpotifyLogin = () => {
    setLoading(true);
    // redirect to your new API route to begin the OAuth flow
    window.location.href = "/api/spotify/auth";
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <button
        className="px-4 py-3 rounded-lg cursor-pointer font-bold transition-colors duration-200 hover:bg-[#1AA048]"
        style={{
          backgroundColor: "#1DB954",
          color: "#ffffff",
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
