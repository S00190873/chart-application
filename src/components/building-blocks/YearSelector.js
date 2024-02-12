import React from "react";
import Select from "react-select";

const YearSelector = ({ selectedYear, handleYearChange }) => {
  const currentYear = new Date().getFullYear();

  // Generate options for the select component
  const options = Array.from({ length: 22 }, (_, i) => currentYear - i).map(
    (year) => ({
      value: year,
      label: year.toString(),
    })
  );

  // Custom styles for the select component
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "150px", // Adjust the width here
      margin: "0 auto", // Center horizontally
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
      <Select
        options={options}
        value={{ value: selectedYear, label: selectedYear.toString() }}
        onChange={(selectedOption) => handleYearChange(selectedOption.value)}
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      <p className="text-gray-500 text-sm mt-1">Select Year</p>
    </div>
  );
};

export default YearSelector;
