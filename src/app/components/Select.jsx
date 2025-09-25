import React, { useState, useEffect } from "react";

const Select = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = {
    short_term: "Last 4 Weeks",
    medium_term: "Last 6 Months",
    long_term: "All Time",
  };

  const handleSelect = (key) => {
    onChange(key);
    setIsOpen(false);
  };

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

  return (
    <div className="relative inline-block text-center">
      <div>
        <button
          type="button"
          className="
            inline-flex justify-center items-center px-4 py-2 text-sm sm:text-base lg:text-lg font-bold
            rounded-lg
            focus:outline-none focus:ring-3 focus:ring-[var(--accent)]
            transition-colors duration-200
          "
          style={{ backgroundColor: "var(--cardbg)" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {options[value]}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-2 rounded-lg z-30 w-max"
          style={{ backgroundColor: "var(--cardbg)" }}
        >
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Object.entries(options).map(([key, label]) => (
              <a
                key={key}
                href="#"
                onClick={() => handleSelect(key)}
                className="block px-4 py-2 rounded-lg text-sm sm:text-base lg:text-lg font-bold text-center hover:bg-[var(--hover)] transition-colors duration-200"
                role="menuitem"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
