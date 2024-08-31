import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import CountryFlag from "react-country-flag";
import YearSelector from "../building-blocks/YearSelector";
import { useTable } from "react-table";
import { fetchAvailableYears, fetchData as fetchChartData } from "../utils/chartUtils"; // Rename the import to avoid conflicts

const CountryChartPage = () => {
  const { countryName, flag } = useParams();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [chartData, setChartData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [error, setError] = useState(null);

  // Mapping for specific country chart names
  const countryChartMapping = {
    "Australia Singles Top 50": "Australia",
    "Austria Singles Top 75": "Austria",
    "Belgium Singles Top 50": "Belgium",
    "Bulgaria Singles Top 40": "Bulgaria",
    "Canada Singles Top 100": "Canada",
    "Denmark Singles Top 40": "Denmark",
    "Dutch Top 40": "Dutch",
    "Finland Singles Top 20": "Finland",
    "France Singles Top 100": "France",
    "Ireland Singles Top 100": "Ireland",
    "Norway Singles Top 20": "Norway",
    "Portugal Singles Top 50": "Portugal",
    "Sweden Singles Top 100": "Sweden",
    "Swiss Singles Top 100": "Switzerland",
    "UK Singles Top 75": "UK",
    "US Singles Top 100": "US",
  };

  // Use mapped country name or fallback to countryName
  const mappedCountryName = countryChartMapping[countryName] || countryName;

  const handleYearChange = (year) => {
    setSelectedYear(parseInt(year));
  };

  // Fetch available years for the selected country
  const fetchYears = useCallback(async () => {
    const years = await fetchAvailableYears(mappedCountryName);
    setAvailableYears(years);
    if (years.length > 0 && !years.includes(selectedYear)) {
      setSelectedYear(years[0]); // Set to the first available year if the current year is not available
    }
  }, [mappedCountryName, selectedYear]);

  // Fetch chart data based on the selected year
  const fetchChartDataHandler = useCallback(async () => { // Rename this function
    try {
      const data = await fetchChartData(mappedCountryName, selectedYear);
      setChartData(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch chart data. Please try again later.");
      setChartData([]);
    }
  }, [selectedYear, mappedCountryName]);

  useEffect(() => {
    fetchYears(); // Fetch available years when the component mounts or countryName changes
  }, [fetchYears]);

  useEffect(() => {
    if (availableYears.length > 0) {
      fetchChartDataHandler(); // Fetch chart data whenever selectedYear changes and there are available years
    }
  }, [fetchChartDataHandler, availableYears, selectedYear]);

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black text-white">
            {row.index + 1}
          </div>
        ),
        className: "border px-4 py-2 text-lg bg-teal-100 text-teal-800 text-center",
      },
      {
        Header: "Song",
        accessor: "Title",
        className: "border px-4 py-2 text-lg bg-teal-50 text-teal-800 text-center",
      },
      {
        Header: "Artist",
        accessor: "Artist",
        className: "border px-4 py-2 text-lg bg-purple-100 text-teal-800 text-center",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: chartData,
  });

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#f5f5f5" }}>
      <main className="container mx-auto mt-10 mb-10 px-4">
        <div className="text-center mb-4">
          <CountryFlag countryCode={flag} svg style={{ fontSize: "10em" }} />
        </div>
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Songs for {countryName} - {selectedYear}
        </h1>

        <div className="text-center mb-8" style={{ maxWidth: "300px", margin: "0 auto" }}>
          <YearSelector
            selectedYear={selectedYear}
            handleYearChange={handleYearChange}
            availableYears={availableYears}
          />
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="overflow-x-auto flex justify-center">
          <table {...getTableProps()} className="table-auto border-collapse border w-full max-w-screen-sm bg-white shadow-md">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="bg-teal-700 text-white">
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className={`border px-4 py-2 ${column.className}`}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className={index % 2 === 0 ? "bg-teal-50" : "bg-teal-100"}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className={`border px-4 py-2 ${cell.column.className}`}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CountryChartPage;
