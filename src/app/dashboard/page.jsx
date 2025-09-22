"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "../components/Button.jsx";
import VibePaletteCard from "../components/VibePaletteCard.jsx";
import AudioProfileCard from "../components/AudioProfileCard.jsx";
import TopTracksCard from "../components/TopTracksCard.jsx";
import TopArtistsCard from "../components/TopArtistsCard.jsx";

import { Vibrant } from "node-vibrant/browser";

async function getVibePalette(imageUrl) {
  if (!imageUrl) {
    return null;
  }

  try {
    const vibrant = new Vibrant(imageUrl);
    const palette = await vibrant.getPalette();
    return palette;
  } catch (error) {
    console.error("Failed to extract palette from image:", error);
    return null;
  }
}

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

  const tabs = ["Overview", "Palette", "Audio", "Tracks", "Artists"];
  const [activeTab, setActiveTab] = useState("Overview");

  const tabContent = {
    Overview: [
      <VibePaletteCard key="palette" palettes={topTracks} />,
      <AudioProfileCard key="audio" />,
      <TopTracksCard key="tracks" topTracks={topTracks} />,
      <TopArtistsCard key="artists" topArtists={topArtists} />,
    ],
    Palette: [<VibePaletteCard key="palette" palettes={topTracks} />],
    Audio: [<AudioProfileCard key="audio" />],
    Tracks: [<TopTracksCard key="tracks" topTracks={topTracks} />],
    Artists: [<TopArtistsCard key="artists" topArtists={topArtists} />],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, tracksRes, artistsRes] = await Promise.all([
          fetch(`/api/spotify/user`),
          fetch(`/api/spotify/top-tracks`),
          fetch(`/api/spotify/top-artists`),
        ]);

        const tracksData = await tracksRes.json();

        // fetch palettes from tracksData, which has album art URLs
        const palettes = await Promise.all(
          tracksData.map(async (track) => {
            const palette = await getVibePalette(track.albumArtUrl);
            return {
              name: track.name,
              albumArtUrl: track.albumArtUrl,
              artist: track.arist,
              palette,
            };
          })
        );

        setUserData(await userRes.json());
        setTopTracks(palettes);
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
        className="flex flex-col w-full"
        style={{ backgroundColor: "#1E1E1E" }}
      >
        <div className="flex flex-row w-full px-4 sm:px-30 md:px-36 lg:px-54">
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
        <div className="flex flex-row w-full px-4 sm:px-30 md:px-36 lg:px-54 gap-3 sm:gap-5 md:gap-7 lg:gap-8">
          {tabs.map((tab) => (
            <Button
              key={tab}
              text={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </div>

      {/* Cards Wrapper */}
      <div className="flex flex-col w-full px-0 py-8 sm:py-10 md:py-12 lg:py-18">
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default DashboardPage;
