"use client";

import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);

  // runs after mount
  useEffect(() => {
    // access tokens from the URL here if they were passed (later to be retrieved from cookie/db session)
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    if (accessToken) {
      // For now, we'll just log the tokens and confirm they exist.
      // In the next step, we'll use the access token to fetch user data.
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="text-center p-8 rounded-lg"
        style={{ backgroundColor: "#0076a5ff" }}
      >
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">
          You have successfully authenticated with Spotify.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
