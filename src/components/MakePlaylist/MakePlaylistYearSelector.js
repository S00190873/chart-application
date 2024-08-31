import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactSlider from 'react-slider';
import { fetchAvailableYears } from '../utils/chartUtils'; // Import utility function
import clickSound from '../../click.wav';
import './MakeAPlaylist.css';

const MakeAPlaylistYearSelectorForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formValues } = location.state || {};
  const [availableYears, setAvailableYears] = useState([]);
  const [yearRange, setYearRange] = useState([2003, 2023]); // Initial default values

  useEffect(() => {
    const fetchYears = async () => {
      let allYears = [];

      if (formValues.includeGlobalCharts) {
        const globalYears = await fetchAvailableYears('global');
        allYears = allYears.concat(globalYears);
      }

      if (formValues.selectedCountry) {
        const countryYears = await fetchAvailableYears(formValues.selectedCountry.label);
        allYears = allYears.concat(countryYears);
      }

      if (formValues.selectedGenre) {
        const genreYears = await fetchAvailableYears(formValues.selectedGenre.label);
        allYears = allYears.concat(genreYears);
      }

      const uniqueYears = [...new Set(allYears)].sort((a, b) => a - b);

      setAvailableYears(uniqueYears);

      if (uniqueYears.length > 0) {
        setYearRange([uniqueYears[0], uniqueYears[uniqueYears.length - 1]]);
      }
    };

    fetchYears();
  }, [formValues]);

  const playClickSound = () => {
    const sound = new Audio(clickSound);
    sound.play();
  };

  const handleSubmit = (values) => {
    const updatedFormValues = {
      ...formValues,
      yearRange: values.yearRange,
    };
    navigate('/make-playlist3', { state: { formValues: updatedFormValues } });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        yearRange: yearRange,
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="form">
          <h2 className="instruction-text">Choose the Years You Want to Include</h2>
          <div className="styled-box">
            <label className="label">
              Choose a Year Range:
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                renderThumb={(props, state) => (
                  <div {...props} className={`slider-thumb example-thumb`}>
                    {state.valueNow}
                  </div>
                )}
                value={values.yearRange}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={(state) => `Year range value now: ${state.valueNow}`}
                min={availableYears[0] || 2003} // Default to 2003 if no years available
                max={availableYears[availableYears.length - 1] || 2023} // Default to 2023 if no years available
                step={1}
                onChange={(value) => {
                  setFieldValue('yearRange', value);
                  setYearRange(value);
                  playClickSound();
                }}
              />
            </label>
            <p className="year-range-text">
              {values.yearRange[0] !== values.yearRange[1] ? (
                <>
                  Years chosen are: <span className="bold-text">{values.yearRange[0]} to {values.yearRange[1]}</span>
                </>
              ) : (
                <>
                  Year chosen is: <span className="bold-text">{values.yearRange[0]}</span>
                </>
              )}
            </p>
          </div>

          <div className="button-container">
            <button type="submit" className="submit-button">
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MakeAPlaylistYearSelectorForm;
