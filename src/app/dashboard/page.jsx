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

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`/api/spotify/user?userId=${userId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch user data.");
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching user data:", e);
        setError(e.message);
        setLoading(false);
      }
    };

    const userId = searchParams.get("userId");
    if (userId) {
      fetchUserData(userId);
    } else {
      // no userId means the db didnt receive a new user/existing one
      // userId in URL is temporary as its sensitive info
      setLoading(false);
      setError("Please log in to Spotify to continue.");
    }
  }, [searchParams]);

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
    </div>
  );
};

export default DashboardPage;
