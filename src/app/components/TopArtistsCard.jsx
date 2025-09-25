const TopArtistsCard = ({ topArtists }) => {
  return (
    <div
      className="flex flex-col p-4 sm:p-6 lg:p-8
                     mx-0 sm:mx-24 md:mx-30 lg:mx-54 rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-4xl"
      style={{ backgroundColor: "var(--cardbg)" }}
    >
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 lg:mb-6 font-bold">
        Your Top Artists
      </h2>
      {/* Artist Cards */}
      <div className="flex flex-row">
        {topArtists.length > 0 ? (
          topArtists.slice(0, 5).map((artist, index) => (
            <div
              key={index}
              className="relative transition-transform duration-200 ease-in-out hover:scale-110"
              style={{
                zIndex: 5 - index,
                marginLeft: index > 0 ? "-20px" : "0px",
              }}
            >
              <img
                src={artist.artistImageUrl}
                alt={artist.name}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full"
              />
            </div>
          ))
        ) : (
          <p>No top artists found</p>
        )}
      </div>
    </div>
  );
};

export default TopArtistsCard;
