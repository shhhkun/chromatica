"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const percentageToDegrees = (percentage) => {
  return (percentage / 100) * 360;
};

const CircularProgressBar = ({ percentage, label, color }) => {
  const degrees = percentageToDegrees(percentage);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-36 h-36 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(${color} ${degrees}deg, #1a1a1a 0deg)`,
        }}
      >
        {/* hole in the middle */}
        <div
          className="absolute w-28 h-28 rounded-full"
          style={{ backgroundColor: "#121212" }}
        ></div>
        <span className="relative text-2xl font-bold" style={{ color: color }}>
          {percentage}%
        </span>
      </div>
      <p className="mt-3 text-base font-bold">{label}</p>
    </div>
  );
};

const DashboardPage = () => {
  // hook to read the information in the URL
  const searchParams = useSearchParams();
  // hook to change pages, like redirect to login page
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/spotify/user`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch user data.");
        }

        const data = await response.json();
        setUserData(data);
      } catch (e) {
        console.error("Error fetching user data:", e);
        setError(e.message || "An unexpected error occured.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch(`/api/spotify/top-tracks`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch top tracks.");
        }
        const data = await response.json();
        setTopTracks(data);
      } catch (e) {
        console.error("Error fetching top tracks:", e);
      }
    };

    fetchTopTracks();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl font-bold animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl font-bold mb-4">Error: {error}</p>
        <button
          className="px-6 py-3 rounded-full font-bold"
          onClick={() => router.push("/")}
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Header */}
      <div
        className="flex flex-row w-full"
        style={{ backgroundColor: "#1E1E1E" }}
      >
        {userData.profileImageUrl && (
          <div className="relative w-32 h-32 rounded-full overflow-hidden my-14 mx-18">
            <Image
              src={userData.profileImageUrl}
              alt="Spotify Profile"
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="flex items-center text-4xl font-bold">
          Welcome, {userData.displayName}.
        </h1>
      </div>

      {/* Cards Wrapper */}
      <div className="flex flex-col w-full p-18">
        {/* Vibe Palette Card */}
        <div
          className="flex flex-col w-full p-8 mb-18 rounded-4xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <h2 className="text-2xl mb-6 font-bold">Your Vibe Palette</h2>
          <div className="flex flex-row gap-16">
            <div
              className="h-36 w-36 rounded-lg"
              style={{ backgroundColor: "#7B8171" }}
            ></div>
            <div
              className="h-36 w-36 rounded-lg"
              style={{ backgroundColor: "#595C6C" }}
            ></div>
            <div
              className="h-36 w-36 rounded-lg"
              style={{ backgroundColor: "#BA6A6A" }}
            ></div>
          </div>
        </div>

        {/* Audio Profile Card */}
        <div
          className="flex flex-col w-full p-8 mb-18 rounded-4xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <h2 className="text-2xl mb-6 font-bold">Your Audio Profile</h2>
          <div className="flex flex-row gap-16">
            <CircularProgressBar
              percentage={80}
              label="Danceability"
              color="#4D88E0"
            />
            <CircularProgressBar
              percentage={65}
              label="Energy"
              color="#E04D4D"
            />
            <CircularProgressBar
              percentage={90}
              label="Valence"
              color="#82A864"
            />
          </div>
        </div>
      </div>

      <p className="text-lg mb-2">
        You have successfully authenticated with Spotify.
      </p>
      <p className="text-lg">Your Spotify ID: {userData.spotifyId}</p>

      {/* Top Tracks */}
      <div className="w-full max-w-sm mt-8 border-2 pl-2 border-[#ffffff] rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Top Tracks</h2>
        <div className="custom-scrollbar max-h-80 overflow-y-auto space-y-2">
          {topTracks.length > 0 ? (
            topTracks.map((track, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 border-t border-[#ffffff]"
              >
                <img
                  src={track.albumArtUrl}
                  alt={`Album art for ${track.name}`}
                  className="w-16 h-16 rounded-md"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-bold">{track.name}</p>
                  <p className="text-sm">{track.artist}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">
              No top tracks found or still loading...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
