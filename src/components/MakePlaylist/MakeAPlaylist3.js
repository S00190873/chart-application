import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPieChart from '../building-blocks/PieChart'; // Import your PieChart component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import spinner icon
import "./MakeAPlaylist.css";

const MakeAPlaylist3 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formValues } = location.state || {};
  const [pieChartData, setPieChartData] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [totalError, setTotalError] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const chartTypes = ['Global', formValues.selectedCountry?.label, formValues.selectedGenre?.label];
    const values = {
      Global: formValues.includeGlobalCharts ? 100 : 0,
      [formValues.selectedCountry?.label]: formValues.selectedCountry ? 100 : 0,
      [formValues.selectedGenre?.label]: formValues.selectedGenre ? 100 : 0,
    };

    const selectedCharts = chartTypes.filter(type => type && values[type] > 0);

    const calculateInitialValues = () => {
      if (selectedCharts.length === 1) {
        return selectedCharts.map(type => ({ name: type, value: 100 }));
      } else if (selectedCharts.length === 2) {
        return selectedCharts.map(type => ({ name: type, value: 50 }));
      } else if (selectedCharts.length === 3) {
        return selectedCharts.map(type => ({ name: type, value: 33.33 }));
      }
      return [];
    };

    setPieChartData(calculateInitialValues());
    setShowChart(true);
  }, [formValues]);

  const handleSegmentChange = (segmentIndex, newValue) => {
    if (newValue < 10 || newValue > 80 || isNaN(newValue)) {
      setInputError(true);
      return;
    }
    setInputError(false);

    const newData = [...pieChartData];
    newData[segmentIndex] = { ...newData[segmentIndex], value: newValue };

    const totalValue = newData.reduce((acc, segment) => acc + segment.value, 0);
    if (Math.abs(totalValue - 100) > 0.01) {
      setTotalError(true);
    } else {
      setTotalError(false);
    }

    setPieChartData(newData);
    setShowChart(true);
  };

  const handleButtonClick = () => {
    setLoading(true); // Set loading to true when fetching starts

    const yearsQuery = formValues.yearRange.map(year => `years[]=${year}`).join('&');

    const queries = pieChartData
      .filter(chart => chart.value > 0)
      .map(chart => {
        let name = chart.name.toLowerCase();
        return `${name}=${encodeURIComponent(chart.name)}&${name}Weight=${(chart.value / 100).toFixed(2)}`;
      });

    const queryString = `${yearsQuery}${queries.length > 0 ? '&' + queries.join('&') : ''}`;

    console.log(`Request URL: http://127.0.0.1:5000/get_info?${queryString}`);

    axios.get(`http://127.0.0.1:5000/get_info?${queryString}`)
      .then(response => {
        const responseData = response.data;
        console.log(responseData);
        navigate('/make-playlist4', { state: { responseData } });
      })
      .catch(error => {
        console.error('There was an error fetching the data:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when fetch is complete
      });
  };

  return (
    <div className="styled-container">
      <h2 className="instruction-text">
        Chart Weight Distribution<br></br>
        <span className="year-range-display">
          ({formValues.yearRange[0]} - {formValues.yearRange[1]})
        </span>
      </h2>
      {pieChartData.map((segment, index) => (
        <div key={`input-${index}`} className="input-container">
          <span className="label">{segment.name}:</span>
          <input
            type="number"
            placeholder={`${segment.value}`}
            onChange={(e) => handleSegmentChange(index, Number(e.target.value))}
            min="10"
            max="80"
            className="input-field"
          />%
        </div>
      ))}
      {(inputError || totalError) && (
        <div className="error-container">
          {inputError && <span className="error-message">Please enter a value between 10 and 80</span>}
          {totalError && <span className="error-message">Total segment values must add up to 100</span>}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-indigo-500" />
        </div>
      ) : (
        showChart && !inputError && !totalError && (
          <div className="chart-container">
            <ReactPieChart data={pieChartData} onSegmentChange={handleSegmentChange} />
            <button type="submit" className="submit-button" onClick={handleButtonClick}>Generate Chart</button>
          </div>
        )
      )}
    </div>
  );
};

export default MakeAPlaylist3;
