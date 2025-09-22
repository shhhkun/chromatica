const VibePaletteCard = ({}) => {
  return (
    <div
      className="flex flex-col p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 md:mb-12 lg:mb-18
                     mx-0 sm:mx-30 md:mx-36 lg:mx-54 rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-4xl"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 lg:mb-6 font-bold">
        Your Vibe Palette
      </h2>
      <div className="flex flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16">
        <div
          className="aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg"
          style={{ backgroundColor: "#7B8171" }}
        ></div>
        <div
          className="aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg"
          style={{ backgroundColor: "#595C6C" }}
        ></div>
        <div
          className="aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg"
          style={{ backgroundColor: "#BA6A6A" }}
        ></div>
      </div>
    </div>
  );
};

export default VibePaletteCard;
