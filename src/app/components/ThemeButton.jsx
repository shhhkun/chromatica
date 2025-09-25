import React, { useEffect } from "react";

const ThemeButton = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.className = theme; // apply the theme class to the HTML element
  }, [theme]);

  return (
    <button
      className="block w-full px-4 py-2 text-center rounded-lg text-sm sm:text-base lg:text-lg font-bold hover:bg-[var(--hover)] transition-colors duration-200"
      onClick={() => {
        toggleTheme();
      }}
    >
      {theme === "dark" ? <p>Light</p> : <p>Dark</p>}
    </button>
  );
};

export default ThemeButton;
