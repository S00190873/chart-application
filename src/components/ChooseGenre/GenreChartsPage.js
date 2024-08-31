import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import YearSelector from "../building-blocks/YearSelector";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { fetchAvailableYears, fetchData } from "../utils/chartUtils";

function convertColorNameToRGBA(colorName, opacity) {
  const canvas = document.createElement("canvas");
  canvas.height = 1;
  canvas.width = 1;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = colorName;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const GenreChartsPage = () => {
  const { genreName, color } = useParams();
  const currentYear = new Date().getFullYear();
  const maxYear = 2023;
  const [selectedYear, setSelectedYear] = useState(currentYear > maxYear ? maxYear : currentYear);
  const [chartData, setChartData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setBackgroundColor(convertColorNameToRGBA(color, 0.4));
  }, [color]);

  const handleYearChange = (year) => {
    setSelectedYear(parseInt(year));
  };

  const fetchChartData = useCallback(async () => {
    try {
      const data = await fetchData(genreName, selectedYear);
      setChartData(data);
      setError(null);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setChartData([]);
    }
  }, [selectedYear, genreName]);

  useEffect(() => {
    const fetchYears = async () => {
      const years = await fetchAvailableYears(genreName);
      setAvailableYears(years);
      if (years.length > 0 && !years.includes(selectedYear)) {
        setSelectedYear(years[0]);
      }
    };
    fetchYears();
  }, [genreName, selectedYear]);

  useEffect(() => {
    if (availableYears.length > 0) {
      fetchChartData();
    }
  }, [fetchChartData, availableYears, selectedYear]);

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
        className: "border px-4 py-2 text-lg bg-teal-100 text-teal-800 text-center",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: chartData,
  });

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: backgroundColor }}>
      <main className="container mx-auto mt-10 flex-grow mb-10 px-4">
        <div className="text-center mb-4">
          <div
            className="rounded-full w-24 h-24 flex items-center justify-center bg-white border mb-4 mx-auto shadow-lg"
            style={{ backgroundColor: color }}
          >
            <FontAwesomeIcon icon={faCompactDisc} size="3x" />
          </div>
          <h1 className="text-4xl font-bold mb-4">{genreName} Charts</h1>
        </div>

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

export default GenreChartsPage;
