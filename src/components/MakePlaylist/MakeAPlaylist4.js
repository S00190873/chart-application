import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";

const certificationColors = {
  Gold: "#FFD700",
  Platinum: "#C0C0C0",
  Diamond: "#00FFFF",
};

const MakeAPlaylist4 = () => {
  const location = useLocation();
  const { responseData } = location.state || {};
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-400 to-purple-500 p-4 md:p-8 shadow-lg text-white max-w-7xl mx-auto">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">
        Your Custom Playlist
      </h2>
      <div className="space-y-1">
        {responseData.map((item, index) => (
          <div
            key={index}
            className="bg-white text-black p-4 md:p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
            style={{ transform: "scale(1)", transition: "transform 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center md:flex-1">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-red-400 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-base shadow-md mr-4">
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-semibold text-gray-900">
                      {item[1] || "Unknown Title"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item[2] || "Unknown Artist"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:flex md:items-center md:justify-start">
                <div className="flex items-center justify-start text-left space-x-3">
                  <p className="text-lg font-semibold text-gray-900 ml-6">Rank Score:</p>
                  <div
                    className="w-14 h-14 flex items-center justify-center bg-indigo-600 text-white rounded-full text-lg font-bold"
                  >
                    {item[3].toFixed(4)}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={() => toggleDetails(index)}
                  className="bg-purple-700 text-white py-1 px-4 rounded-md font-semibold shadow-lg transition hover:bg-purple-800"
                >
                  {expandedIndex === index ? (
                    <span className="flex items-center">
                      Hide Details <FaChevronUp className="ml-2" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      More Details <FaChevronDown className="ml-2" />
                    </span>
                  )}
                </button>
              </div>
            </div>

            {expandedIndex === index && (
              <div className="bg-gray-100 p-2 rounded-lg shadow-inner flex justify-between items-start mt-2">
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2 pr-4">
                  {item[4].map((desc, descIndex) => (
                    <div
                      key={descIndex}
                      className="bg-white px-2 py-1 rounded shadow-sm text-xs text-gray-700 italic"
                    >
                      {desc}
                    </div>
                  ))}
                </div>
                {item[5] && item[6] && (
                  <div
                    className="ml-4 flex flex-col items-center bg-white rounded-lg shadow-lg w-40 border-4"
                    style={{ borderColor: certificationColors[item[5]] }}
                  >
                    <FontAwesomeIcon
                      icon={faCompactDisc}
                      style={{
                        color: certificationColors[item[5]],
                        fontSize: "60px",
                      }}
                      className="mb-1"
                    />
                    <p className="text-center text-base font-semibold text-gray-800">
                      {`${item[6]} x ${item[5]}`}
                    </p>
                    <p className="text-center text-xs text-gray-600">
                      {`${
                        item[6] *
                        (item[5] === "Gold" ? 0.5 : item[5] === "Platinum" ? 1 : 10)
                      } million units`}
                    </p>
                    {item[7] && (
                      <p className="text-center text-xs text-gray-500 italic">
                        Bonus: {item[7].toFixed(2)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MakeAPlaylist4;
