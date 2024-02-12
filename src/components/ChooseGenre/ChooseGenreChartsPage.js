import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons"; // Import the compact disc icon from Font Awesome
import { genres_and_colors } from "../../data/genres"; // Import genre data

const ChooseGenreChartsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center mb-8">Genre Charts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {genres_and_colors.slice(0, 20).map((genres_and_colors, index) => (
            <Link key={index} to={`/genre-chart/${encodeURIComponent(genres_and_colors.name)}/${encodeURIComponent(genres_and_colors.color)}`}>
              <div className={`border rounded-lg h-48 md:h-56 lg:h-64 xl:h-72 w-full bg-gray-200 text-center flex flex-col items-center justify-center hover:bg-gray-300 transition duration-300 p-4 ${genres_and_colors.color}`}>
                {/* Display the music disk icon */}
                <div className="rounded-full w-24 md:w-28 lg:w-32 xl:w-36 h-24 md:h-28 lg:h-32 xl:h-36 flex items-center justify-center bg-white border" style={{ backgroundColor: genres_and_colors.color }}>
                  <FontAwesomeIcon icon={faCompactDisc} size="3x" />
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4">{genres_and_colors.name}</h2>
                {/* You can add more content here if needed */}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChooseGenreChartsPage;
