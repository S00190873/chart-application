import React, { useState, useEffect, useCallback } from "react";
import ChartContent from "../HomePage/ChartContent";
import YearSelector from "../building-blocks/YearSelector";
import { fetchAvailableYears, fetchData } from "../utils/chartUtils"; // Import utility functions

const GlobalChartsPage = () => {
  const currentYear = new Date().getFullYear();
  const maxYear = 2023;
  const [selectedYear, setSelectedYear] = useState(currentYear > maxYear ? maxYear : currentYear);
  const [availableYears, setAvailableYears] = useState([]); // State to store available years
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  // Function to handle year change
  const handleYearChange = (year) => {
    if (year) {
      setSelectedYear(parseInt(year));
    }
  };

  // Function to fetch available years
  const fetchAvailableYearsData = useCallback(async () => {
    try {
      const years = await fetchAvailableYears("global"); // Use utility function
      setAvailableYears(years);
      if (years.length > 0 && !years.includes(selectedYear)) {
        setSelectedYear(years[0]); // Set the first available year if the current selected year is not available
      }
    } catch (err) {
      console.error(err);
      setAvailableYears([]);
    }
  }, [selectedYear]);

  // Function to fetch chart data
  const fetchChartData = useCallback(async () => {
    try {
      const data = await fetchData("global", selectedYear); // Use utility function
      setChartData(data);
      setError(null);
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch chart data. Please try again later.");
      setChartData([]);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchAvailableYearsData(); // Fetch available years when the component mounts
  }, [fetchAvailableYearsData]);

  useEffect(() => {
    if (availableYears.length > 0) {
      fetchChartData(); // Fetch chart data whenever selectedYear changes
    }
  }, [fetchChartData, availableYears, selectedYear]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto mt-10 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8">Global 200 Charts</h1>

        <div className="max-w-sm mx-auto mb-8">
          <YearSelector
            selectedYear={selectedYear}
            handleYearChange={handleYearChange}
            availableYears={availableYears} // Pass available years to YearSelector
          />
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <ul className="space-y-2 mb-6">
          {chartData.map((data, index) => (
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
      </main>
    </div>
  );
};

export default GlobalChartsPage;
