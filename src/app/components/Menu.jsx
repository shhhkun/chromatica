import React, { useState, useEffect } from "react";
import { ListIcon } from "@phosphor-icons/react";

// hook to track window width
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

const Menu = ({ weight }) => {
  const windowWidth = useWindowWidth();

  // function to determine icon size based on breakpoints
  const getIconSize = () => {
    if (windowWidth >= 1024) {
      return 40; // lg
    }
    if (windowWidth >= 768) {
      return 36; // md
    }
    if (windowWidth >= 640) {
      return 32; // sm
    }
    return 28; // default
  };

  return <ListIcon size={getIconSize()} weight={weight} />;
};

export default Menu;
