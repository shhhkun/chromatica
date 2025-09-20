"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        Welcome, {userData.displayName}.
      </h1>
      {userData.profileImageUrl && (
        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-8">
          <Image
            src={userData.profileImageUrl}
            alt="Spotify Profile"
            fill
            className="object-cover"
          />
        </div>
      )}
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
              <div key={index} className="p-3 border-t border-[#ffffff]">
                <p className="text-lg font-bold">{track.name}</p>
                <p className="text-sm">{track.artist}</p>
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
