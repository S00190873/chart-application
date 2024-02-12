import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CountryFlag from "react-country-flag"; 
import YearSelector from "../building-blocks/YearSelector";
import { useTable } from 'react-table';

const CountryChartPage = () => {
  const { countryName, flag } = useParams(); 
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleYearChange = (year) => {
    setSelectedYear(parseInt(year));
  };

  const number = parseInt(countryName.match(/\d+/)[0]);
  const data = React.useMemo(
    () =>
      Array.from({ length: number }, (_, i) => {
        return {
          id: i + 1,
          song: `Song ${i + 1} - ${selectedYear}`,
          artist: `Artist ${i + 1} - ${selectedYear}`,
        };
      }),
    [selectedYear, number]
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="container mx-auto mt-10 mb-10"> {/* Added margin bottom */}
        <div className="text-center mb-4">
          <CountryFlag countryCode={flag} svg style={{ fontSize: '10em' }} />
        </div>
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Songs for {countryName} - {selectedYear}</h1>

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

export default CountryChartPage;
