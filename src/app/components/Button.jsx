import React from 'react';

const Button = ({ text, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative text-sm sm:text-base lg:text-lg font-bold transition-colors duration-200 ease-in-out group pb-2"
    >
      <span className="relative z-10">{text}</span>
      {/* Grey hover effect */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1 bg-transparent transform scale-x-0 transition-all duration-200 group-hover:bg-[#4a4a4a] group-hover:scale-x-100`}
      />
      {/* Green active effect */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1 bg-[#1DB954] transition-all duration-200 ${
          isActive ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </button>
  );
};

export default Button;
