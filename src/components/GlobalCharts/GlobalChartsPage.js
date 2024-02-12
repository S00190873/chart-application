import React, { useState } from "react";
import ChartContent from "../HomePage/ChartContent";
import { GlobalData } from "../../data/globalChartData";
import YearSelector from "../building-blocks/YearSelector";

const GlobalChartsPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col min-h-screen"> {/* Adjust container to flex column */}
      <main className="container mx-auto mt-10 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8">Global Charts</h1>
        
        {/* Year Selector */}
        <div className="max-w-sm mx-auto mb-8"> {/* Set maximum width and center align */}
          <YearSelector selectedYear={selectedYear} handleYearChange={handleYearChange} />
        </div>

        <ul className="space-y-2 mb-6"> 
          {GlobalData.map((data, index) => (
            <li key={index}>
              {/* Pass selectedYear to ChartContent component */}
              <ChartContent {...data} color="indigo" selectedYear={selectedYear} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default GlobalChartsPage;
