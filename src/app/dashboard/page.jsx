"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // get the tokens from the URL search parameters (temporarily)
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("access_token");
      const refreshToken = urlParams.get("refresh_token");

      if (!accessToken) {
        setLoading(false);
        setError("Access token not found in URL. Please try logging in again.");
        return;
      }

      try {
        // call our new API route, passing the access token
        const response = await fetch(
          `/api/spotify/me?access_token=${accessToken}`
        );

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

    fetchUserData();
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
        <p className="text-xl font-bold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        Welcome, {userData.display_name}.
      </h1>
      {userData.images && userData.images.length > 0 && (
        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-8">
          <Image
            src={userData.images[0].url}
            alt="Spotify Profile"
            fill
            className="object-cover"
          />
        </div>
      )}
      <p className="text-lg mb-2">
        You have successfully authenticated with Spotify.
      </p>
      <p className="text-lg">Your Spotify ID: {userData.id}</p>
    </div>
  );
};

export default DashboardPage;
