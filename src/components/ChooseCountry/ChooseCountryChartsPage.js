import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import CountryFlag from "react-country-flag"; // Import react-country-flag
import { countries_flags } from "../../data/countries_flags";

const ChooseCountryChartsPage = () => {

  return (
    <div className="flex flex-col min-h-screen"> {/* Adjust container to flex column */}
      <main className="container mx-auto mt-10 mb-10">
        <h1 className="text-4xl font-bold text-center mb-8">Charts by Country</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 lg:gap-6"> {/* Adjust grid layout based on screen width */}
          {countries_flags.slice(0, 20).map((country, index) => (
            <Link key={index} to={`/country-chart/${encodeURIComponent(country.name)}/${encodeURIComponent(country.flag)}`}> {/* Pass country flag as well */}
              <div className="border rounded-lg h-64 bg-gray-200 text-center flex flex-col items-center justify-center hover:bg-gray-300 transition duration-300 p-4"> {/* Apply hover effect and add padding */}
                {/* Display the country flag */}
                <CountryFlag countryCode={country.flag} svg style={{ fontSize: '5em', marginBottom: '0.5em' }} /> {/* Adjust fontSize for smaller screens */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">{country.name}</h2> {/* Adjust font size based on screen width */}
                {/* You can add more content here if needed */}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChooseCountryChartsPage;
