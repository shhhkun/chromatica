"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button.jsx";
import Select from "../components/Select.jsx";
import VibePaletteCard from "../components/VibePaletteCard.jsx";
import TopTracksCard from "../components/TopTracksCard.jsx";
import TopArtistsCard from "../components/TopArtistsCard.jsx";
import Particles from "../components/Particles.jsx";
import Menu from "../components/Menu.jsx";
import { demoPalettes, demoArtists, demoTracks } from "../utils/demoData.js";

const DemoPage = () => {
  // hook to change pages, like redirect to login page
  const router = useRouter();

  const observerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // observer logic (threshold change)
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // if the observed spacer is NOT intersecting with the viewport top edge, it means the scroll has passed it
        setIsSticky(!entry.isIntersecting);
      },
      {
        // observe when the element is 0% visible AND when it is 100% visible
        threshold: [0, 1], 
      }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  const dynamicBg = isSticky ? "var(--cardbg2)" : "var(--cardbg)";

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
                       mt-4 mb-2 mr-4
                       sm:mt-8 sm:mb-6 sm:mr-8
                       md:mt-10 md:mb-8 md:mr-10
                       lg:mt-12 lg:mb-10 lg:mr-12 
                       flex-shrink-0"
          >
            <img
              src="/bear.webp"
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
      </div>

      <div ref={observerRef} className="h-0 w-full" aria-hidden="true" />

      {/* Tabs Bar */}
      <div
        className="flex flex-row w-full px-4 sm:px-24 md:px-30 lg:px-54 gap-3 sm:gap-5 md:gap-7 lg:gap-8 
                   pt-2 sticky top-0 z-100"
        style={{
          backgroundColor: dynamicBg,
          transition: "background-color 0.3s ease-in-out", // smooth transition
        }}
      >
        {tabs.map((tab) => (
          <Button
            key={tab}
            text={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
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
