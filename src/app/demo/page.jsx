"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button.jsx";
import Select from "../components/Select.jsx";
import VibePaletteCard from "../components/VibePaletteCard.jsx";
import TopTracksCard from "../components/TopTracksCard.jsx";
import TopArtistsCard from "../components/TopArtistsCard.jsx";
import Particles from "../components/Particles.jsx";
import Menu from "../components/Menu.jsx";

const hexToRgb = (hex) => {
  // remove the '#'
  const strippedHex = hex.startsWith("#") ? hex.slice(1) : hex;

  // [arse the r, g, and b values
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  // return as an array
  return [r, g, b];
};

const demoPalettes = [
  {
    // bodies
    LightVibrant: "#c7c7b1",
    DarkVibrant: "#4d4d37",
  },
  {
    // ocean blues
    LightVibrant: "#91c3f4",
    DarkVibrant: "#055b98",
  },
  {
    // used to me
    LightVibrant: "#c7a1d7",
    DarkVibrant: "#1c2444",
  },
];

const demoArtists = [
  {
    name: "Epik High",
    artistImageUrl: "/epikhigh.jfif",
  },
  {
    name: "keshi",
    artistImageUrl: "/keshi.jfif",
  },
  {
    name: "Sarah Kang",
    artistImageUrl: "/sarahkang.jfif",
  },
  {
    name: "Joe Hisaishi",
    artistImageUrl: "/joe.jfif",
  },
  {
    name: "Luke Chiang",
    artistImageUrl: "/lukechiang.jfif",
  },
];

const demoTracks = [
  {
    name: "Bodies",
    albumArtUrl: "/bodies.jfif",
    artist: "keshi",
    bgColor: { rgb: hexToRgb("#8c8474") },
  },
  {
    name: "ocean blues",
    albumArtUrl: "/oceanblues.jfif",
    artist: "demxntia",
    bgColor: { rgb: hexToRgb("#6e8ca0") },
  },
  {
    name: "Used To Me",
    albumArtUrl: "/usedtome.jfif",
    artist: "Luke Chiang",
    bgColor: { rgb: hexToRgb("#655d9c") },
  },
  {
    name: "Guilty",
    albumArtUrl: "/guilty.jfif",
    artist: "Dynamicduo",
    bgColor: { rgb: hexToRgb("#a07150") },
  },
  {
    name: "Never Tell",
    albumArtUrl: "/nevertell.jfif",
    artist: "Luke Chiang",
    bgColor: { rgb: hexToRgb("#6184a4") },
  },
];

const DemoPage = () => {
  // hook to change pages, like redirect to login page
  const router = useRouter();

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

  const tabs = ["Overview", "Palette", "Tracks", "Artists"]; // removed Audio (possibly readd)
  const [activeTab, setActiveTab] = useState("Overview");

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
      <VibePaletteCard key="palette" palettes={demoPalettes} demo={true} />,
      <TopTracksCard key="tracks" topTracks={demoTracks} demo={true} />,
      <TopArtistsCard key="artists" topArtists={demoArtists} />,
    ],
    Palette: [
      <VibePaletteCard key="palette" palettes={demoPalettes} demo={true} />,
    ],
    Tracks: [<TopTracksCard key="tracks" topTracks={demoTracks} demo={true} />],
    Artists: [<TopArtistsCard key="artists" topArtists={demoArtists} />],
  };

  // function to logout & redirect (route) to home page
  const handleLogout = async () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Particles colors={particleColors} opacity={0.5} />

      {/* Header */}
      <div
        className="flex flex-col w-full z-10"
        style={{ backgroundColor: "var(--cardbg)" }}
      >
        <div className="flex flex-row w-full px-4 sm:px-24 md:px-30 lg:px-54">
          <div
            className="flex items-center relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden 
                       my-4 mr-4 sm:my-8 sm:mr-8 md:my-10 md:mr-10 lg:my-12 lg:mr-12 flex-shrink-0"
          >
            <img
              src="/bear.png"
              alt="Spotify Profile"
              className="object-cover transition-transform duration-200 ease-in-out hover:scale-110"
            />
          </div>
          <div className="flex justify-between w-full">
            <h1 className="flex items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Welcome, User.
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

export default DemoPage;
