import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome spinner icon
import ChartContent from "./ChartContent";
import { fetchData } from "../utils/chartUtils";

const HomePage = () => {
  const [globalChartData, setGlobalChartData] = useState([]);
  const [countryChartData, setCountryChartData] = useState([]);
  const [genreChartData, setGenreChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch all chart data in parallel
    const fetchDataAsync = async () => {
      setLoading(true);
      try {
        // Fetch all chart data
        const [globalData, countryData, genreData] = await Promise.all([
          fetchData("global", "2023"),  // Adjust as needed
          fetchData("ireland", "2023"), // Adjust as needed
          fetchData("Electronic", "2023"), // Adjust as needed
        ]);

        // Update state with fetched data
        setGlobalChartData(globalData);
        setCountryChartData(countryData);
        setGenreChartData(genreData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch chart data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []); // Empty dependency array ensures this only runs once

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="4x"
          className="text-indigo-500"
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto mt-5 flex-grow">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Global Charts */}
          <div className="w-full md:w-1/3 pr-4">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-center mb-6">
              Global Charts Top 5
            </h1>
            <ul className="space-y-4 mb-6">
              {globalChartData.slice(0, 5).map((data, index) => (
                <li key={index}>
                  <ChartContent
                    rank={index + 1}
                    title={data.Title}
                    artist={data.Artist}
                    color="indigo"
                  />
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Link
                to="/global-charts"
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded text-lg md:text-xl lg:text-2xl transition-colors"
              >
                View Full Global Chart
              </Link>
            </div>
          </div>

          {/* Country Charts */}
          <div className="w-full md:w-1/3 px-4">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-center mb-6">
              Irish Charts Top 5
            </h1>
            <ul className="space-y-4 mb-6">
              {countryChartData.slice(0, 5).map((data, index) => (
                <li key={index}>
                  <ChartContent
                    rank={index + 1}
                    title={data.Title}
                    artist={data.Artist}
                    color="teal"
                  />
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Link
                to="/country-chart/Ireland%20Singles%20Top%20100/ie"
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded text-lg md:text-xl lg:text-2xl transition-colors"
              >
                View Full Irish Chart
              </Link>
            </div>
          </div>

          {/* Genre Charts */}
          <div className="w-full md:w-1/3 pl-4">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-center mb-6">
              EDM Charts Top 5
            </h1>
            <ul className="space-y-4 mb-6">
              {genreChartData.slice(0, 5).map((data, index) => (
                <li key={index}>
                  <ChartContent
                    rank={index + 1}
                    title={data.Title}
                    artist={data.Artist}
                    color="orange"
                  />
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Link
                to="/genre-chart/Electronic/orange"
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-lg md:text-xl lg:text-2xl transition-colors"
              >
                View Full EDM Chart
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
