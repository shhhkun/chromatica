const percentageToDegrees = (percentage) => {
  return (percentage / 100) * 360;
};

const CircularProgressBar = ({ percentage, label, color }) => {
  const degrees = percentageToDegrees(percentage);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(${color} ${degrees}deg, #1a1a1a 0deg)`,
        }}
      >
        {/* hole in the middle */}
        <div
          className="absolute w-16 h-16 sm:w-19 sm:h-19 md:w-22 md:h-22 lg:w-28 lg:h-28 rounded-full"
          style={{ backgroundColor: "#121212" }}
        ></div>
        <span
          className="relative text-base sm:text-lg md:text-xl lg:text-2xl font-bold"
          style={{ color: color }}
        >
          {percentage}%
        </span>
      </div>
      <p className="mt-3 text-xs sm:text-sm lg:text-base font-bold">{label}</p>
    </div>
  );
};

const AudioProfileCard = ({}) => {
  return (
    <div
      className="flex flex-col p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 md:mb-12 lg:mb-18 
                     mx-0 sm:mx-30 md:mx-36 lg:mx-54 rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-4xl"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 lg:mb-6 font-bold">
        Your Audio Profile
      </h2>
      <div className="flex flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-11">
        <CircularProgressBar
          percentage={80}
          label="Danceability"
          color="#4D88E0"
        />
        <CircularProgressBar percentage={65} label="Energy" color="#E04D4D" />
        <CircularProgressBar percentage={90} label="Valence" color="#82A864" />
      </div>
    </div>
  );
};

export default AudioProfileCard;
