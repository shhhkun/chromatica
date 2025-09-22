const VibePaletteCard = ({ palettes }) => {
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
        {palettes.length > 0 ? (
          palettes.slice(0, 5).map((track, index) => (
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

      <div>
        {palettes.length > 0 ? (
          palettes.slice(0, 5).map((track, index) => (
            <div key={index} className="flex flex-row items-center gap-4">
              <img
                src={track.albumArtUrl}
                alt={track.name}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full object-cover"
              />
              <div className="flex flex-row gap-2 mt-2">
                <div
                  className="aspect-square w-10 h-10 rounded-lg"
                  style={{
                    backgroundColor: track.palette?.Vibrant?.hex,
                  }}
                >
                  V
                </div>
                <div
                  className="aspect-square w-10 h-10 rounded-lg"
                  style={{
                    backgroundColor: track.palette?.DarkVibrant?.hex,
                  }}
                >
                  DV
                </div>
                <div
                  className="aspect-square w-10 h-10 rounded-lg"
                  style={{
                    backgroundColor: track.palette?.LightVibrant?.hex,
                  }}
                >
                  LV
                </div>
                <div
                  className="aspect-square w-10 h-10 rounded-lg"
                  style={{
                    backgroundColor: track.palette?.Muted?.hex,
                  }}
                >
                  M
                </div>
                <div
                  className="aspect-square w-10 h-10 rounded-lg"
                  style={{
                    backgroundColor: track.palette?.DarkMuted?.hex,
                  }}
                >
                  DM
                </div>
                <div
                  className="aspect-square w-10 h-10 rounded-lg"
                  style={{
                    backgroundColor: track.palette?.LightMuted?.hex,
                  }}
                >
                  LM
                </div>
                <div
                  className="aspect-square w-40 h-40 rounded-lg"
                  style={{
                    backgroundImage: `linear-gradient(to top right, 
                                        ${track.palette?.LightVibrant?.hex}, 
                                        ${track.palette?.DarkVibrant?.hex})`,
                  }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p>No top artists found</p>
        )}
      </div>
    </div>
  );
};

export default VibePaletteCard;
