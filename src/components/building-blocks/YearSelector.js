import React from "react";
import Select from "react-select";

const YearSelector = ({ selectedYear, handleYearChange, availableYears, includeAllOption = false }) => {
  // Sort years in descending order and generate options
  const sortedYears = [...availableYears].sort((a, b) => b - a);
  const options = [
    ...(includeAllOption ? [{ value: "ALL", label: "ALL" }] : []), // Conditionally add ALL option
    ...sortedYears.map((year) => ({
      value: year,
      label: year.toString(),
    })),
  ];

  // Custom styles for the select component
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
      <Select
        options={options}
        value={{ value: selectedYear, label: selectedYear === "ALL" ? "ALL" : selectedYear.toString() }}
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
