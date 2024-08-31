import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";

// Define the colors for each certification type
const certificationColors = {
  Gold: "#FFD700",
  Platinum: "#E5E5E5",
  Diamond: "#00FFFF",
  All: "#000000", // Black color for the "ALL" option
};

const CertificationSelector = ({
  selectedCertification,
  handleCertificationChange,
}) => {
  // Define options with icons and dynamic colors
  const options = ["All", "Diamond", "Platinum", "Gold"].map(
    (certification) => ({
      value: certification,
      label: (
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCompactDisc}
            className="mr-3"
            style={{
              color: certificationColors[certification],
              fontSize: "24px",
            }}
          />
          {certification}
        </div>
      ),
    })
  );

  // Custom styles for the select component
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "200px", // Adjust the width here
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
        value={{
          value: selectedCertification,
          label: (
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCompactDisc}
                className="mr-3"
                style={{
                  color: certificationColors[selectedCertification],
                  fontSize: "24px",
                }}
              />
              {selectedCertification}
            </div>
          ),
        }}
        onChange={(selectedOption) =>
          handleCertificationChange(selectedOption.value)
        }
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
      />

      <p className="text-gray-500 text-sm mt-1">Certification Type</p>
    </div>
  );
};

export default CertificationSelector;
