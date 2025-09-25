const VibePaletteCard = ({ palettes }) => {
  return (
    <div
      className="flex flex-col p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 md:mb-12 lg:mb-18
                     mx-0 sm:mx-24 md:mx-30 lg:mx-54 rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-4xl"
      style={{ backgroundColor: "var(--cardbg)" }}
    >
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 lg:mb-6 font-bold">
        Your Vibe Palette
      </h2>
      <div className="flex flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16">
        {palettes.length > 0 ? (
          palettes.map((track, index) => (
            <div
              key={index}
              className="aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg"
              style={{
                backgroundImage: `linear-gradient(to top right, 
                                    ${track.palette?.LightVibrant?.hex}, 
                                    ${track.palette?.DarkVibrant?.hex})`,
              }}
            ></div>
          ))
        ) : (
          <p>No palettes found</p>
        )}
      </div>
    </div>
  );
};

export default VibePaletteCard;
