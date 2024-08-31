import React from "react";
import PropTypes from "prop-types";

const ChartContent = ({ rank, title, artist, isNew = false, color = "indigo" }) => {
  const colorClassMap = {
    indigo: "bg-indigo-500",
    red: "bg-red-500",
    // Add more colors as needed
  };

  const bgColorClass = colorClassMap[color] || "bg-indigo-500";

  return (
    <div className={`${bgColorClass} p-4 md:p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between h-full`}>
      {/* Rank Display */}
      <div className="flex items-center mb-4 md:mb-0 md:mr-6">
        <p className="font-bold text-sm md:text-base mr-2">Number:</p>
        <div className="bg-black text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-lg md:text-xl">
          {rank || "N/A"}
        </div>
      </div>

      {/* Title and Artist */}
      <div className="flex-grow mb-4 md:mb-0 text-center md:text-left">
        <p className="text-lg md:text-xl font-medium">{title || "Unknown Title"}</p>
        <p className="text-sm md:text-base text-white font-medium">{artist || "Unknown Artist"}</p>
      </div>

      {/* New Tag */}
      {isNew && (
        <div className="bg-red-600 text-white rounded-md py-1 px-2 md:py-2 md:px-3 font-bold italic border-red-700 flex-shrink-0">
          New!!
        </div>
      )}
    </div>
  );
};

ChartContent.propTypes = {
  rank: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  artist: PropTypes.string,
  isNew: PropTypes.bool,
  color: PropTypes.string,
};

export default ChartContent;
