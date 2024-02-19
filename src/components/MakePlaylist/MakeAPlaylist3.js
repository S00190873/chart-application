import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPieChart from '../building-blocks/PieChart';

const MakeAPlaylist3 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formValues } = location.state || {};
  const [pieChartData, setPieChartData] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [totalError, setTotalError] = useState(false);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const chartTypes = ['Global', formValues.selectedCountry?.value, formValues.selectedGenre?.value];
    const values = {
      Global: formValues.includeGlobalCharts ? 33.33 : 0,
      [formValues.selectedCountry?.value]: formValues.selectedCountry ? 33.33 : 0,
      [formValues.selectedGenre?.value]: formValues.selectedGenre ? 33.33 : 0,
    };

    const selectedCharts = chartTypes.filter(type => type && values[type] > 0);

    if (selectedCharts.length === 3) {
      setPieChartData(selectedCharts.map(type => ({
        name: type,
        value: values[type],
      })));
    } else if (selectedCharts.length === 2) {
      const values = {
        Global: formValues.includeGlobalCharts ? 50 : 0,
        [formValues.selectedCountry?.value]: formValues.selectedCountry ? 50 : 0,
        [formValues.selectedGenre?.value]: formValues.selectedGenre ? 50 : 0,
      };
      setPieChartData(selectedCharts.map(type => ({
        name: type,
        value: values[type],
      })));
    }
  }, [formValues]);

  const handleSegmentChange = (segmentIndex, newValue) => {
    const newData = [...pieChartData];
    let totalValue = 0;
    if (!newValue || newValue < 10 || newValue > 80) {
      setInputError(true);
      return;
    } else {
      setInputError(false);
    }
    newData[segmentIndex] = { ...newData[segmentIndex], value: newValue };
    newData.forEach(segment => totalValue += segment.value);
    if (totalValue !== 100) {
      setTotalError(true);
    } else {
      setTotalError(false);
    }
    setPieChartData(newData);
    setShowChart(true);
  };

  const handleButtonClick = () => {
    // Serialize the years query parameter
    const yearsQuery = formValues.years.map(year => `years[]=${year}`).join('&');
  
    // Assuming pieChartData is an array with two segments for the charts.
    const globalQuery = `global=${encodeURIComponent(pieChartData[0].name)}&globalWeight=${pieChartData[0].value / 100}`;
    const countryQuery = `country=${encodeURIComponent(pieChartData[1].name)}&countryWeight=${pieChartData[1].value / 100}`;
    const genreQuery = `genre=${encodeURIComponent(pieChartData[1].name)}&genreWeight=${pieChartData[1].value / 100}`;

    // Combine all parts of the query string
    const queryString = `${yearsQuery}&${globalQuery}&${countryQuery}`;
  
    axios.get(`http://localhost:5000/get_info?${queryString}`)
    .then(response => {
      const responseData = response.data;
      console.log(responseData);
      // Redirect to another component and pass the response data
      navigate('/make-playlist4', { state: { responseData } });
    })
    .catch(error => {
      console.error('There was an error fetching the data:', error);
    });
  };
  
  

  return (
    <div className="styled-container">
      <h2 className="instruction-text">Chart Weight Distribution</h2>
      {pieChartData.map((segment, index) => (
        <div key={`input-${index}`} style={{ margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{ marginRight: '10px', minWidth: '100px', textAlign: 'right' }}>{segment.name}:</span>
          <input
            type="number"
            placeholder={`${segment.value}`}
            onChange={(e) => handleSegmentChange(index, Number(e.target.value))}
            min="10"
            max="80"
            style={{ width: '70px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px', marginLeft: '10px' }}
          />%
        </div>
      ))}
      {inputError && <span className="error-message">Please enter a value between 10 and 80</span>}
      {totalError && <span className="error-message">Total segment values must add up to 100</span>}
      {showChart && !inputError && !totalError && (
        <div className="chart-container">
          <ReactPieChart data={pieChartData} onSegmentChange={handleSegmentChange} />
          <button type="submit" className="submit-button" onClick={handleButtonClick}>Generate Chart</button>
        </div>
      )}
    </div>
  );
};

export default MakeAPlaylist3;
