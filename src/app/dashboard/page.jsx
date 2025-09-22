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
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(${color} ${degrees}deg, #1a1a1a 0deg)`,
        }}
      >
        {/* hole in the middle */}
        <div
          className="absolute w-16 h-16 sm:w-19 sm:h-19 md:w-22 md:h-22 lg:w-28 lg:h-28 rounded-full"
          style={{ backgroundColor: "#121212" }}
        ></div>
        <span
          className="relative text-base sm:text-lg md:text-xl lg:text-2xl font-bold"
          style={{ color: color }}
        >
          {percentage}%
        </span>
      </div>
      <p className="mt-3 text-xs sm:text-sm lg:text-base font-bold">{label}</p>
    </div>
  );
};

const TrackCard = ({ track }) => {
  return (
    <div
      className="flex flex-row p-2 sm:p-4 lg:p-6 rounded-lg"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <img
        src={track.albumArtUrl}
        alt={`Album art for ${track.name}`}
        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-lg
                   transition-transform duration-200 ease-in-out hover:scale-110"
      />
      <div className="flex flex-col justify-center ml-2 sm:ml-4 lg:ml-6">
        <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
          {track.name}
        </p>
        <p className="text-xs sm:text-sm lg:text-base">{track.artist}</p>
      </div>
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
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, tracksRes, artistsRes, audioRes] = await Promise.all([
          fetch(`/api/spotify/user`),
          fetch(`/api/spotify/top-tracks`),
          fetch(`/api/spotify/top-artists`),
        ]);

        setUserData(await userRes.json());
        setTopTracks(await tracksRes.json());
        setTopArtists(await artistsRes.json());
      } catch (e) {
        console.error("Error fetching data:", e);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        className="flex flex-row w-full px-4 sm:px-30 md:px-36 lg:px-54"
        style={{ backgroundColor: "#1E1E1E" }}
      >
        {userData.profileImageUrl && (
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden 
                       my-4 mr-4 sm:my-8 sm:mr-8 md:my-10 md:mr-10 lg:my-12 lg:mr-12"
          >
            <Image
              src={userData.profileImageUrl}
              alt="Spotify Profile"
              fill
              className="object-cover transition-transform duration-200 ease-in-out hover:scale-110"
            />
          </div>
        )}
        <h1 className="flex items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Welcome, {userData.displayName}.
        </h1>
      </div>

      {/* Cards Wrapper */}
      <div className="flex flex-col w-full px-0 py-8 sm:py-10 md:py-12 lg:py-18">
        {/* Vibe Palette Card */}
        <div
          className="flex flex-col p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 md:mb-12 lg:mb-18
                     mx-0 sm:mx-30 md:mx-36 lg:mx-54 rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-4xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 lg:mb-6 font-bold">
            Your Vibe Palette
          </h2>
          <div className="flex flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16">
            <div
              className="aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg"
              style={{ backgroundColor: "#7B8171" }}
            ></div>
            <div
              className="aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg"
              style={{ backgroundColor: "#595C6C" }}
            ></div>
            <div
              className="aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg"
              style={{ backgroundColor: "#BA6A6A" }}
            ></div>
          </div>
        </div>

        {/* Audio Profile Card */}
        <div
          className="flex flex-col p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 md:mb-12 lg:mb-18 
                     mx-0 sm:mx-30 md:mx-36 lg:mx-54 rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-4xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 lg:mb-6 font-bold">
            Your Audio Profile
          </h2>
          <div className="flex flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-11">
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

        {/* Top Tracks Card */}
        <div
          className="flex flex-col p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 md:mb-12 lg:mb-18
                     mx-0 sm:mx-30 md:mx-36 lg:mx-54 rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-4xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 lg:mb-6 font-bold">
            Your Top Tracks
          </h2>
          {/* Track Cards */}
          <div className="space-y-3 sm:space-y-5 lg:space-y-6">
            {topTracks.length > 0 ? (
              topTracks.slice(0, 5).map((track, index) => (
                <div key={index}>
                  <TrackCard track={track} />
                </div>
              ))
            ) : (
              <p>No top tracks found</p>
            )}
          </div>
        </div>

        {/* Top Artists Card */}
        <div
          className="flex flex-col p-4 sm:p-6 lg:p-8
                     mx-0 sm:mx-30 md:mx-36 lg:mx-54 rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-4xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 lg:mb-6 font-bold">
            Your Top Artists
          </h2>
          {/* Artist Cards */}
          <div className="flex flex-row">
            {topArtists.length > 0 ? (
              topArtists.slice(0, 5).map((artist, index) => (
                <div
                  key={index}
                  className="relative transition-transform duration-200 ease-in-out hover:scale-110"
                  style={{
                    zIndex: 5 - index,
                    marginLeft: index > 0 ? "-20px" : "0px",
                  }}
                >
                  <img
                    src={artist.artistImageUrl}
                    alt={artist.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full"
                  />
                </div>
              ))
            ) : (
              <p>No top artists found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
