// MakeAPlaylist2.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import CountryFlag from "react-country-flag";
import { countries } from "../../data/countries_flags";
import { genres } from "../../data/genres";
import "./MakeAPlaylist.css";

const FlagOption = (props) => (
  <components.Option {...props}>
    <CountryFlag
      countryCode={props.data.code}
      svg
      style={{
        width: "2em",
        marginRight: "10px",
      }}
      title={props.data.label}
    />
    {props.data.label}
  </components.Option>
);

const MakeAPlaylist2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formValues = location.state?.formValues || {};

  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: country.name,
    code: country.flag,
  }));

  const genreOptions = genres.map((genre) => ({
    value: genre.name,
    label: genre.name,
  }));

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleCountryChange = (selectedOption) => setSelectedCountry(selectedOption);
  const handleGenreChange = (selectedOption) => setSelectedGenre(selectedOption);

  const handleButtonClick = () => {
    navigate("/make-playlist-year-selector", {
      state: {
        formValues: {
          ...formValues,
          selectedCountry,
          selectedGenre,
        },
      },
    });
  };

  return (
    <div className="styled-container">
      <h2 className="instruction-text">Choose your options</h2>
      <form>
        {formValues.includeCountryCharts && (
          <>
            <p className="data-paragraph">Select a Country:</p>
            <Select
              options={countryOptions}
              components={{ Option: FlagOption }}
              className="custom-select"
              placeholder="Select a country"
              isClearable
              isSearchable
              value={selectedCountry}
              onChange={handleCountryChange}
            />
          </>
        )}
        {formValues.includeGenreCharts && (
          <>
            <p className="data-paragraph">Select a Genre:</p>
            <Select
              options={genreOptions}
              className="custom-select"
              placeholder="Select a genre"
              isClearable
              isSearchable
              value={selectedGenre}
              onChange={handleGenreChange}
            />
          </>
        )}
        {((formValues.includeCountryCharts && selectedCountry) || !formValues.includeCountryCharts) &&
         ((formValues.includeGenreCharts && selectedGenre) || !formValues.includeGenreCharts) ? (
          <button
            type="button"
            className="submit-button"
            onClick={handleButtonClick}
          >
            Go to Next Page
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default MakeAPlaylist2;
