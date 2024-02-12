import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YearSelector from "../building-blocks/YearSelector";
import { useTable } from 'react-table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";

function convertColorNameToRGBA(colorName, opacity) {
  const canvas = document.createElement('canvas');
  canvas.height = 1;
  canvas.width = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colorName;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const GenreChartsPage = () => {
  const { genreName, color } = useParams();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    setBackgroundColor(convertColorNameToRGBA(color, 0.4));
  }, [color]);

  const handleYearChange = (year) => {
    setSelectedYear(parseInt(year));
  };

  const number = 20;
  const data = React.useMemo(
    () =>
      Array.from({ length: number }, (_, i) => {
        return {
          id: i + 1,
          song: `Song ${i + 1} - ${selectedYear}`,
          artist: `Artist ${i + 1} - ${selectedYear}`,
        };
      }),
    [selectedYear]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        Cell: ({ value }) => (
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black text-white">{value}</div>
        ),
        className: "border px-6 py-4 text-lg bg-blue-300 text-white",
      },
      {
        Header: 'Song',
        accessor: 'song',
        className: "border px-6 py-4 text-lg bg-green-300",
      },
      {
        Header: 'Artist',
        accessor: 'artist',
        className: "border px-6 py-4 text-lg bg-yellow-300",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const halfLength = Math.ceil(rows.length / 2);
  const firstHalf = rows.slice(0, halfLength);
  const secondHalf = rows.slice(halfLength);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: backgroundColor }}>
      <main className="container mx-auto mt-10 flex-grow mb-10"> 
        <div className="text-center mb-4">
          <div className="rounded-full w-24 h-24 flex items-center justify-center bg-white border mb-4 mx-auto" style={{ backgroundColor: color }}>
            <FontAwesomeIcon icon={faCompactDisc} size="3x" />
          </div>
          <h1 className="text-4xl font-bold mb-4">{genreName} Charts</h1>
        </div>

        <div className="text-center mb-8" style={{ maxWidth: '300px', margin: '0 auto' }}>
          <YearSelector selectedYear={selectedYear} handleYearChange={handleYearChange} />
        </div>

        <div className="overflow-x-auto">
          <div className="flex justify-center">
            <table {...getTableProps()} className="table-auto border-collapse border mr-20">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} className={column.className}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {firstHalf.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()} className={cell.column.className}>{cell.render('Cell')}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table {...getTableProps()} className="table-auto border-collapse border">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} className={column.className}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {secondHalf.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()} className={cell.column.className}>{cell.render('Cell')}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenreChartsPage;
