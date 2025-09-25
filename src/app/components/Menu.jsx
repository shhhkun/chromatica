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

const Menu = ({ weight, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const windowWidth = useWindowWidth();

  // close the menu if a click occurs outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const menuDiv = event.target.closest(".relative");
      if (isOpen && !menuDiv) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

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

  return (
    <div className="relative">
      <div>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <ListIcon size={getIconSize()} weight={weight} />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 rounded-lg w-max"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <div aria-orientation="vertical">
            <button
              onClick={handleLogout}
              className="block w-full text-right px-4 py-2 text-sm sm:text-base lg:text-lg font-bold hover:bg-[#4a4a4a] transition-colors duration-200"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
