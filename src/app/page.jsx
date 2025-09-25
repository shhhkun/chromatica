"use client";

import { useState, useEffect } from "react";
import Particles from "./components/Particles.jsx";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const particleColors = [
    "#E57373", // red
    "#FFB74D", // orange
    "#FFF176", // yellow
    "#81C784", // green
    "#64B5F6", // blue
    "#7986CB", // indigo
    "#9575CD", // violet
    "#F06292", // pink
    "#FFD54F", // amber
  ];

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
        <p className="text-base sm:text-lg lg:text-xl font-bold animate-pulse">
          Redirecting to dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Particles colors={particleColors} opacity={0.5} />
      <div className="relative flex flex-col items-center">
        <h1 className="absolute -top-14 sm:-top-18 lg:-top-20 text-3xl sm:text-4xl lg:text-5xl p-2 sm:p-4 lg:pd-6 font-bold">
          Chromatica
        </h1>
        <button
          className="px-4 py-2 rounded-lg cursor-pointer text-sm sm:text-base lg:text-lg font-bold bg-[var(--cardbg)] hover:bg-[var(--hover)] transition-colors duration-200]"
          onClick={handleSpotifyLogin}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Login with Spotify"}
        </button>
        <button className="mt-4 px-4 py-2 rounded-lg cursor-pointer text-sm sm:text-base lg:text-lg font-bold bg-[var(--cardbg)] hover:bg-[var(--hover)] transition-colors duration-200]">
          Live Demo
        </button>
      </div>
    </main>
  );
};

export default Page;
