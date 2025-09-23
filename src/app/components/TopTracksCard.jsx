const TrackCard = ({ track, bgColor }) => {
  return (
    <div
      className="flex flex-row p-2 sm:p-4 lg:p-6 rounded-lg"
      style={{
        backgroundColor: bgColor?.rgb
          ? `rgba(${bgColor.rgb[0]}, ${bgColor.rgb[1]}, ${bgColor.rgb[2]}, 0.2)`
          : `rgba(255, 255, 255, 0.05)`,
      }}
    >
      <img
        src={track.albumArtUrl}
        alt={`Album art for ${track.name}`}
        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-lg
                   transition-transform duration-200 ease-in-out hover:scale-110"
      />
      <div className="flex flex-col justify-center ml-2 sm:ml-4 lg:ml-6">
        <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
          {track.name}
        </p>
        <p className="text-xs sm:text-sm lg:text-base">{track.artist}</p>
      </div>
    </div>
  );
};

const TopTracksCard = ({ topTracks }) => {
  return (
    <div
      className="flex flex-col p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 md:mb-12 lg:mb-18
                     mx-0 sm:mx-24 md:mx-30 lg:mx-54 rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-4xl"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 lg:mb-6 font-bold">
        Your Top Tracks
      </h2>
      {/* Track Cards */}
      <div className="space-y-3 sm:space-y-5 lg:space-y-6">
        {topTracks.length > 0 ? (
          topTracks.map((track, index) => (
            <div key={index}>
              <TrackCard
                track={track}
                bgColor={track.palette?.Muted}
              />
            </div>
          ))
        ) : (
          <p>No top tracks found</p>
        )}
      </div>
    </div>
  );
};

export default TopTracksCard;
