import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const GenreSelector = ({ selectedGenre, handleGenreChange }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("https://djplaylistcurator.com/api/get_available_genres");

        // Sort genres alphabetically and include "All Genres" at the top
        const sortedGenres = ["ALL", ...response.data.sort((a, b) => a.localeCompare(b))];
        setGenres(sortedGenres);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const options = genres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "200px",
      margin: "0 auto",
      backgroundColor: "#f7fafc",
      borderColor: state.isFocused ? "#4f46e5" : "#cbd5e0",
      boxShadow: state.isFocused ? "0 0 0 1px #4f46e5" : "none",
      "&:hover": {
        borderColor: "#a0aec0",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4f46e5" : "#f7fafc",
      color: state.isSelected ? "white" : "#4f46e5",
      "&:hover": {
        backgroundColor: state.isSelected ? "#4f46e5" : "#cbd5e0",
        color: state.isSelected ? "white" : "#4f46e5",
      },
    }),
  };

  return (
    <div className="text-center mb-8">
      {loading ? (
        <p>Loading genres...</p>
      ) : (
        <Select
          options={options}
          value={{ value: selectedGenre, label: selectedGenre }}
          onChange={(selectedOption) => handleGenreChange(selectedOption.value)}
          styles={customStyles}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      )}
      <p className="text-gray-500 text-sm mt-1">Select Genre</p>
    </div>
  );
};

export default GenreSelector;
