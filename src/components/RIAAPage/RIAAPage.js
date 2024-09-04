import React, { useState, useEffect, useCallback } from "react";
import YearSelector from "../building-blocks/YearSelector";
import CertificationSelector from "../RIAAPage/CertificationSelector";
import GenreSelector from "../RIAAPage/GenreSelector"; // Import GenreSelector
import { fetchAvailableYearsRIAA, fetchRIAAData } from "../utils/chartUtils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import spinner icon

// Define the colors for each certification type
const certificationColors = {
  Gold: "#FFD700", // Gold color
  Platinum: "#E5E5E5", // Platinum color
  Diamond: "#00FFFF" // Minecraft-style diamond color
};

// Helper function to extract base certification type and multiplier
const parseCertification = (certification) => {
  const match = certification.match(/(\d+)\s*X\s*(\w+)/i);
  if (match) {
    return { count: parseInt(match[1], 10), type: match[2] };
  }
  return { count: 1, type: certification }; // Default to 1 if no count is specified
};

const RIAAPage = () => {
  const currentYear = new Date().getFullYear();
  const maxYear = 2023;
  const [selectedYear, setSelectedYear] = useState(currentYear > maxYear ? maxYear : currentYear);
  const [availableYears, setAvailableYears] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCertification, setSelectedCertification] = useState("Diamond");
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedGenre, setSelectedGenre] = useState("ALL"); // Genre state

  const handleYearChange = (year) => {
    if (year) {
      setSelectedYear(year === "ALL" ? "ALL" : parseInt(year));
    }
  };

  const handleCertificationChange = (certification) => {
    if (certification) {
      setSelectedCertification(certification);
    }
  };

  const handleGenreChange = (genre) => {
    if (genre) {
      setSelectedGenre(genre);
    }
  };

  const fetchAvailableYearsData = useCallback(async () => {
    try {
      const years = await fetchAvailableYearsRIAA(selectedCertification.toLowerCase());
      setAvailableYears(years);
      if (years.length > 0 && selectedYear !== "ALL") {
        setSelectedYear(years.includes(selectedYear) ? selectedYear : years[0]);
      }
    } catch (err) {
      console.error(err);
      setAvailableYears([]);
    }
  }, [selectedYear, selectedCertification]);

  const fetchChartData = useCallback(async () => {
    setLoading(true); // Set loading to true at the start of the fetch
    try {
      let data;
      const genreParam = selectedGenre === "ALL" ? null : selectedGenre; // Only add genre if not "All Genres"
      if (selectedYear === "ALL") {
        // Fetch data for all years if "ALL" is selected
        data = await fetchRIAAData(selectedCertification.toLowerCase(), null, genreParam);
      } else {
        data = await fetchRIAAData(selectedCertification.toLowerCase(), selectedYear, genreParam);
      }
      setChartData(data);
      setError(null);
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch RIAA Certified data. Please try again later.");
      setChartData([]);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  }, [selectedYear, selectedCertification, selectedGenre]);

  useEffect(() => {
    fetchAvailableYearsData();
  }, [fetchAvailableYearsData]);

  useEffect(() => {
    if (availableYears.length > 0 || selectedYear === "ALL") {
      fetchChartData();
    }
  }, [fetchChartData, availableYears, selectedYear, selectedCertification, selectedGenre]);

  // Common text classes for consistency
  const commonTextClasses = "text-white text-base font-medium uppercase text-shadow-sm";

  // Background color for the entire row
  const rowColorClass = "bg-indigo-500"; // Keeping the same consistent color for all rows

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto mt-10 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8">RIAA Certified Songs</h1>

        <div className="max-w-sm mx-auto mb-8">
          <CertificationSelector
            selectedCertification={selectedCertification}
            handleCertificationChange={handleCertificationChange}
          />
          <YearSelector
            selectedYear={selectedYear}
            handleYearChange={handleYearChange}
            availableYears={availableYears}
            includeAllOption={true} // Pass this prop to include the "ALL" option
          />
          <GenreSelector
            selectedGenre={selectedGenre}
            handleGenreChange={handleGenreChange}
          />
        </div>

        {/* Display the fetched record count */}
        {chartData.length > 0 && (
          <div className="text-center mb-4 text-gray-700">
            Fetched {chartData.length} records
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-indigo-500" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mb-4">{error}</div>
        ) : (
          <>
            {/* Column Headings */}
            <div className="bg-gray-200 p-4 rounded-t-lg flex justify-between">
              <div className="w-1/12 text-center font-bold">Rank</div>
              <div className="w-3/12 text-center font-bold">Title</div>
              <div className="w-3/12 text-center font-bold">Artist</div>
              <div className="w-2/12 text-center font-bold">Units</div>
              <div className="w-2/12 text-center font-bold">Release Date</div>
              <div className="w-2/12 text-center font-bold">Genre</div>
              <div className="w-1/12 text-center font-bold">Award</div>
            </div>

            {/* Chart Data List */}
            <ul className="space-y-2 mb-6">
              {chartData.map((data, index) => {
                const { count, type } = parseCertification(data.Award);
                const adjustedUnits = data.Units === 0 ? 0.5 : data.Units;

                return (
                  <li key={index}>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                      <div className={`flex items-center justify-between p-4 ${rowColorClass}`}>
                        <div className="flex items-center w-1/12">
                          <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-shadow-sm">
                            {index + 1}
                          </div>
                        </div>
                        <div className="w-3/12 p-2 text-center">
                          <p className={commonTextClasses}>{data.Title || "Unknown Title"}</p>
                        </div>
                        <div className="w-3/12 p-2 text-center">
                          <p className={commonTextClasses}>{data.Artist || "Unknown Artist"}</p>
                        </div>
                        <div className="w-2/12 p-2 text-center">
                          <p className={commonTextClasses}>{adjustedUnits ? `${adjustedUnits.toLocaleString()} million` : "N/A"}</p>
                        </div>
                        <div className="w-2/12 p-2 text-center">
                          <p className={commonTextClasses}>{data.Release_Date ? data.Release_Date.toString() : "N/A"}</p>
                        </div>
                        <div className="w-2/12 p-2 text-center">
                          <p className={commonTextClasses}>{data.Genre || "N/A"}</p>
                        </div>
                        <div className="w-1/12 p-2 text-center flex flex-col items-center justify-center">
                          {data.Award ? (
                            <>
                              <FontAwesomeIcon
                                icon={faCompactDisc}
                                className="mb-1"
                                style={{ color: certificationColors[type], fontSize: "24px" }} // Icon size
                              />
                              <p className={commonTextClasses}>{`${count > 1 ? count + "X " : ""}${type}`}</p>
                            </>
                          ) : (
                            <p className={commonTextClasses}>N/A</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default RIAAPage;
