"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Vibrant } from "node-vibrant/browser";
import Button from "../components/Button.jsx";
import Select from "../components/Select.jsx";
import VibePaletteCard from "../components/VibePaletteCard.jsx";
import TopTracksCard from "../components/TopTracksCard.jsx";
import TopArtistsCard from "../components/TopArtistsCard.jsx";
import Particles from "../components/Particles.jsx";
import Menu from "../components/Menu.jsx";

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
  // hook to change pages, like redirect to login page
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const tabs = ["Overview", "Palette", "Tracks", "Artists"]; // removed Audio (possibly readd)
  const [activeTab, setActiveTab] = useState("Overview");

  const [particleColors, setParticleColors] = useState([]);

  const [timeframe, setTimeframe] = useState("medium_term");

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  const tabContent = {
    Overview: [
      <VibePaletteCard key="palette" palettes={topTracks.slice(0, 3)} />,
      <TopTracksCard key="tracks" topTracks={topTracks.slice(0, 5)} />,
      <TopArtistsCard key="artists" topArtists={topArtists} />,
    ],
    Palette: [
      <VibePaletteCard key="palette" palettes={topTracks.slice(0, 3)} />,
    ],
    Tracks: [<TopTracksCard key="tracks" topTracks={topTracks} />],
    Artists: [<TopArtistsCard key="artists" topArtists={topArtists} />],
  };

  // function to logout & redirect (route) to home page
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/spotify/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Logout failed on the server.");
        alert("Logout failed. Please try again.");
      }
    } catch (e) {
      console.error("Error during logout:", e);
      alert("An error occurred during logout. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // build the query string for the timeframe
        const params = new URLSearchParams({ time_range: timeframe });
        const queryString = params.toString();

        const [userRes, tracksRes, artistsRes] = await Promise.all([
          fetch(`/api/spotify/user`),
          fetch(`/api/spotify/top-tracks?${queryString}`),
          fetch(`/api/spotify/top-artists?${queryString}`),
        ]);

        const tracksData = await tracksRes.json();

        // fetch palettes from tracksData, which has album art URLs
        const palettes = await Promise.all(
          tracksData.map(async (track) => {
            const palette = await getVibePalette(track.albumArtUrl);
            return {
              name: track.name,
              artist: track.artist,
              albumArtUrl: track.albumArtUrl,
              palette,
            };
          })
        );

        // extract particle colors
        const newParticleColors = palettes.slice(0, 3).flatMap((track) => {
          return [
            track.palette?.Vibrant?.hex,
            track.palette?.DarkVibrant?.hex,
            track.palette?.Muted?.hex,
          ].filter(Boolean); // filter undefined colors incase
        });

        setUserData(await userRes.json());
        setTopTracks(palettes);
        setTopArtists(await artistsRes.json());
        setParticleColors(newParticleColors);
      } catch (e) {
        console.error("Error fetching data:", e);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeframe]);

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
      <Particles colors={particleColors} opacity={0.5} />

      {/* Header */}
      <div
        className="flex flex-col w-full z-10"
        style={{ backgroundColor: "var(--cardbg)" }}
      >
        <div className="flex flex-row w-full px-4 sm:px-24 md:px-30 lg:px-54">
          {userData.profileImageUrl && (
            <div
              className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden 
                       my-4 mr-4 sm:my-8 sm:mr-8 md:my-10 md:mr-10 lg:my-12 lg:mr-12 flex-shrink-0"
            >
              <Image
                src={userData.profileImageUrl}
                alt="Spotify Profile"
                fill
                className="object-cover transition-transform duration-200 ease-in-out hover:scale-110"
              />
            </div>
          )}
          <div className="flex justify-between w-full">
            <h1 className="flex items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Welcome, {userData.displayName}.
            </h1>
            <div className="my-4 sm:my-8 md:my-10 lg:my-12">
              <Menu
                weight="bold"
                handleLogout={handleLogout}
                theme={theme}
                setTheme={setTheme}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full px-4 sm:px-24 md:px-30 lg:px-54 gap-3 sm:gap-5 md:gap-7 lg:gap-8">
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

      <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-18 z-20">
        <Select value={timeframe} onChange={setTimeframe} />
      </div>

      {/* Cards Wrapper */}
      <div className="flex flex-col w-full px-0 py-8 sm:py-10 md:py-12 lg:py-18 z-10">
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default DashboardPage;
