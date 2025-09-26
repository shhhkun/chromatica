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
    LightVibrant: "#c7c7b1", // bodies
    DarkVibrant: "#4d4d37",
  },
  {
    LightVibrant: "#91c3f4", // ocean blues
    DarkVibrant: "#055b98",
  },
  {
    LightVibrant: "#c7a1d7", // used to me
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
    name: "Bodies", // 1
    albumArtUrl: "/bodies.jfif",
    artist: "keshi",
    bgColor: { rgb: hexToRgb("#8c8474") },
  },
  {
    name: "ocean blues", // 2
    albumArtUrl: "/oceanblues.jfif",
    artist: "demxntia",
    bgColor: { rgb: hexToRgb("#6e8ca0") },
  },
  {
    name: "Used To Me", // 3
    albumArtUrl: "/usedtome.jfif",
    artist: "Luke Chiang",
    bgColor: { rgb: hexToRgb("#655d9c") },
  },
  {
    name: "Guilty", // 4
    albumArtUrl: "/guilty.jfif",
    artist: "Dynamicduo",
    bgColor: { rgb: hexToRgb("#a07150") },
  },
  {
    name: "Never Tell", // 5
    albumArtUrl: "/nevertell.jfif",
    artist: "Luke Chiang",
    bgColor: { rgb: hexToRgb("#6184a4") },
  },
  {
    name: "BRB", // 6
    albumArtUrl: "/brb.jfif",
    artist: "Epik High",
    bgColor: { rgb: hexToRgb("#848474") },
  },
  {
    name: "From the Rain (Feat. Ahn Ye Eun)", // 7
    albumArtUrl: "/fromtherain.jfif",
    artist: "Heize, Ahn Ye Eun",
    bgColor: { rgb: hexToRgb("#975355") },
  },
  {
    name: "One Summer Day", // 8
    albumArtUrl: "/onesummerday.jfif",
    artist: "Joe Hisaishi",
    bgColor: { rgb: hexToRgb("#948067") },
  },
  {
    name: "in your arms", // 9
    albumArtUrl: "/inyourarms.jfif",
    artist: "Saib",
    bgColor: { rgb: hexToRgb("#5e9570") },
  },
  {
    name: "HOME IS FAR AWAY", // 10
    albumArtUrl: "/homeisfaraway.jfif",
    artist: "Epik High, OHHYUK",
    bgColor: { rgb: hexToRgb("#8c8c8c") },
  },
  {
    name: "11월1일 (feat. 김재석)", // 11
    albumArtUrl: "/nov1st.jfif",
    artist: "Epik High, 김재석",
    bgColor: { rgb: hexToRgb("#9c7464") },
  },
  {
    name: "Some", // 12
    albumArtUrl: "/some.jfif",
    artist: "BOL4",
    bgColor: { rgb: hexToRgb("#a48c64") },
  },
  {
    name: "ghosts", // 13
    albumArtUrl: "/ghosts.jfif",
    artist: "Heiakim, Sachi Gomez",
    bgColor: { rgb: hexToRgb("#8f7268") },
  },
  {
    name: "MISSING U", // 14
    albumArtUrl: "/missingu.jfif",
    artist: "LeeHi",
    bgColor: { rgb: hexToRgb("#a47c54") },
  },
  {
    name: "bittersweet", // 15
    albumArtUrl: "/bittersweet.jfif",
    artist: "Sarah Kang, Luke Chiang",
    bgColor: { rgb: hexToRgb("#8c7455") },
  },
  {
    name: "light", // 16
    albumArtUrl: "/light.jfif",
    artist: "wave to earth",
    bgColor: { rgb: hexToRgb("#7987aa") },
  },
  {
    name: "if it's not you", // 17
    albumArtUrl: "/ifitsnotyou.jfif",
    artist: "PRYVT",
    bgColor: { rgb: hexToRgb("#747c84") },
  },
  {
    name: "Loving You From A Distance", // 18
    albumArtUrl: "/lovingyoufromadistance.jfif",
    artist: "jomm, readyaimfire27",
    bgColor: { rgb: hexToRgb("#784d86") },
  },
  {
    name: "Reminiscence", // 19
    albumArtUrl: "/reminiscence.jfif",
    artist: "Vanilla Mood",
    bgColor: { rgb: hexToRgb("#a99e57") },
  },
  {
    name: "Rain - Long Ver.", // 20
    albumArtUrl: "/rain.jfif",
    artist: "Motohiro Hata",
    bgColor: { rgb: hexToRgb("#539f5a") },
  },
];

const DemoPage = () => {
  // hook to change pages, like redirect to login page
  const router = useRouter();

  const particleColors = [
    "#8c8474", // bodies
    "#6e8ca0", // ocean blues
    "#655d9c", // used to me
    "#a07150", // guilty
    "#6184a4", // never tell
    "#5e9570", // in your arms
    "#a99e57", // reminiscence
    "#784d86", // loving you from a distance
    "#975355", // from the rain
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
      <VibePaletteCard
        key="palette"
        palettes={demoPalettes.slice(0, 3)}
        demo={true}
      />,
      <TopTracksCard
        key="tracks"
        topTracks={demoTracks.slice(0, 5)}
        demo={true}
      />,
      <TopArtistsCard key="artists" topArtists={demoArtists} />,
    ],
    Palette: [
      <VibePaletteCard
        key="palette"
        palettes={demoPalettes.slice(0, 3)}
        demo={true}
      />,
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
