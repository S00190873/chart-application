import React from "react";
import { Link } from "react-router-dom";
import ChartContent from "./ChartContent";
import { globalChartData, countryChartData, genreChartData } from "../../data/Top5All";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto mt-5 flex-grow">
        <div className="flex flex-col md:flex-row md:justify-between">

          {/* Global Charts */}
          <div className="w-full md:w-1/3 pr-4">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-center mb-6">Global Charts Top 5</h1>
            <ul className="space-y-4 mb-6">
              {globalChartData.map((data, index) => (
                <li key={index}>
                  <ChartContent {...data} color="indigo" />
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Link to="/global-charts" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded text-lg md:text-xl lg:text-2xl transition-colors">
                View Full Global Chart
              </Link>
            </div>
          </div>

          {/* Country Charts */}
          <div className="w-full md:w-1/3 px-4">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-center mb-6">Irish Charts Top 5</h1>
            <ul className="space-y-4 mb-6">
              {countryChartData.map((data, index) => (
                <li key={index}>
                  <ChartContent {...data} color="teal" />
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Link to='/country-chart/Ireland%20Singles%20Top%20100/ie' className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded text-lg md:text-xl lg:text-2xl transition-colors">
                View Full Irish Chart
              </Link>
            </div>
          </div>

          {/* Genre Charts */}
          <div className="w-full md:w-1/3 pl-4">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-center mb-6">EDM Charts Top 5</h1>
            <ul className="space-y-4 mb-6">
              {genreChartData.map((data, index) => (
                <li key={index}>
                  <ChartContent {...data} color="orange" />
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Link to='/genre-chart/Electronic%2FDance/orange' className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-lg md:text-xl lg:text-2xl transition-colors">
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
