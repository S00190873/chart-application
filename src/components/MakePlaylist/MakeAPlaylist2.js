import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, ErrorMessage } from 'formik';
import Select, { components } from 'react-select';
import CountryFlag from 'react-country-flag';
import { countries } from '../../data/countries_flags'; // Adjust this import based on your file structure
import { genres } from '../../data/genres'; // Adjust this import based on your file structure
import { formStyles } from '../styles/formStyles';

// Custom Option component for displaying options with flags
const FlagOption = props => (
  <components.Option {...props}>
    <CountryFlag
      countryCode={props.data.code} // Use 'code' for the ISO Alpha-2 country code
      svg
      style={{
        width: '2em',
        marginRight: '10px'
      }}
      title={props.data.label}
    />
    {props.data.label}
  </components.Option>
);

const StyledContainer = styled.div`
  ${formStyles.StyledContainer};
`;

const Heading = styled.h1`
  ${formStyles.Heading};
`;

const DataParagraph = styled.p`
  ${formStyles.DataParagraph};
`;

const StyledSubmitButton = styled.button`
  ${formStyles.StyledSubmitButton};
`;

const InstructionText = styled.h2`
  ${formStyles.instructionText};
`;

const MakeAPlaylist2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formValues;

  // Prepare options for React Select, assuming 'countries' is an array of { name, code }
  const countryOptions = countries.map(country => ({
    value: country.name,
    label: country.name,
    code: country.flag,
  }));

  // Prepare options for React Select, assuming 'countries' is an array of { name, code }
  const genreOptions = genres.map(genre => ({
    value: genre.name,
    label: genre.name,
  }));

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleCountryChange = selectedOption => {
    setSelectedCountry(selectedOption);
  };

  const handleGenreChange = selectedOption => {
    setSelectedGenre(selectedOption);
  };

  const handleButtonClick = () => {
    navigate('/make-playlist3', { 
      state: { 
        formValues: { 
          selectedCountry, 
          selectedGenre, 
          includeGlobalCharts: formData.includeGlobalCharts // Correctly reference includeGlobalCharts
        } 
      } 
    });
  };

  return (
    <StyledContainer>
      <InstructionText>Choose your options</InstructionText>
      <Formik
        initialValues={{ selectedCountry: null, selectedGenre: null }}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <Form>
            {formData?.includeCountryCharts && (
              <>
                <DataParagraph>Select a Country:</DataParagraph>
                <Select
                  options={countryOptions}
                  components={{ Option: FlagOption }}
                  styles={formStyles.customSelectStyles}
                  placeholder="Select a country"
                  isClearable
                  isSearchable
                  onChange={option => {
                    handleCountryChange(option);
                    values.selectedCountry = option;
                  }}
                />
              </>
            )}
            {formData?.includeGenreCharts && (
              <>
                <DataParagraph>Select a Genre:</DataParagraph>
                <Select
                  options={genreOptions}
                  styles={formStyles.customSelectStyles}
                  placeholder="Select a genre"
                  isClearable
                  isSearchable
                  onChange={option => {
                    handleGenreChange(option);
                    values.selectedGenre = option;
                  }}
                />
              </>
            )}

            {/* Global, Country, Genre */}
            {formData.includeGlobalCharts && selectedCountry && selectedGenre && (
              <StyledSubmitButton type="submit" onClick={handleButtonClick}>Go to Next Page</StyledSubmitButton>
            )}
            {/* Global, Country*/}
            {formData.includeGlobalCharts && selectedCountry && !selectedGenre && !formData.includeGenreCharts && (
              <StyledSubmitButton type="submit" onClick={handleButtonClick}>Go to Next Page</StyledSubmitButton>
            )}
            {/* Global, Genre*/}
            {formData.includeGlobalCharts && !selectedCountry && selectedGenre && !formData.includeCountryCharts && (
              <StyledSubmitButton type="submit" onClick={handleButtonClick}>Go to Next Page</StyledSubmitButton>
            )}
            {/*  Country, Genre */}
            {!formData.includeGlobalCharts && selectedCountry && selectedGenre && formData.includeCountryCharts && formData.includeGenreCharts && (
              <StyledSubmitButton type="submit" onClick={handleButtonClick}>Go to Next Page</StyledSubmitButton>
            )}
            {/*  Global */}
            {formData.includeGlobalCharts && !selectedCountry && !selectedGenre && !formData.includeCountryCharts && !formData.includeGenreCharts && (
              <StyledSubmitButton type="submit" onClick={handleButtonClick}>Go to Next Page</StyledSubmitButton>
            )}
            {/*  Country */}
            {!formData.includeGlobalCharts && selectedCountry && !selectedGenre && formData.includeCountryCharts && !formData.includeGenreCharts && (
              <StyledSubmitButton type="submit" onClick={handleButtonClick}>Go to Next Page</StyledSubmitButton>
            )}
            {/*  Genre */}
            {!formData.includeGlobalCharts && !selectedCountry && selectedGenre && !formData.includeCountryCharts && formData.includeGenreCharts && (
              <StyledSubmitButton type="submit" onClick={handleButtonClick}>Go to Next Page</StyledSubmitButton>
            )}
          </Form>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default MakeAPlaylist2;
