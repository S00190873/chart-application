import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Add this line to import axios
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReactPieChart from '../building-blocks/PieChart';
import { formStyles } from '../styles/formStyles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  max-width: 600px;
  margin: 40px auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 20px;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px;
`;

const Heading = styled.h1`
  color: #333;
  margin: 0 0 20px 0;
  font-size: 32px;
`;

const InfoParagraph = styled.p`
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
  width: 100%;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 14px;
`;
const StyledSubmitButton = styled.button`
  ${formStyles.StyledSubmitButton};
`;

const MakeAPlaylist3 = () => {
  const location = useLocation();
  const { formValues } = location.state || {};
  const [pieChartData, setPieChartData] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [totalError, setTotalError] = useState(false);

  useEffect(() => {
    const chartTypes = ['Global', formValues.selectedCountry?.value, formValues.selectedGenre?.value];
    const values = {
      Global: formValues.includeGlobalCharts ? 33.33 : 0,
      [formValues.selectedCountry?.value]: formValues.selectedCountry ? 33.33 : 0,
      [formValues.selectedGenre?.value]: formValues.selectedGenre ? 33.33 : 0,
    };
    const selectedCharts = chartTypes.filter(type => type && values[type] > 0);
  
    if (selectedCharts.length > 1) {
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
  };

  const handleButtonClick = () => {
    axios.get('http://localhost:8080/api/route', {
      params: {
        country: formValues.selectedCountry?.value,
        genre: formValues.selectedGenre?.value,
        includeGlobalCharts: formValues?.includeGlobalCharts
      }
    })
    .then(response => {
      const responseData = response.data;
      console.log(responseData);
      // Assuming you have a way to render the new component with the data
      // For example, setting state in a parent component and passing data as props
      renderNewComponent(<YourNewComponent data={responseData} />);
    })
    .catch(error => {
      console.error('There was an error fetching the data:', error);
    });
  };
  

  return (
    <Container>
      <Heading>Selected Playlist Criteria</Heading>
      {/* Display for selected country and genre */}
      
      <Heading>Chart Distribution</Heading>
      {pieChartData.map((segment, index) => (
        <div key={`input-${index}`} style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>{segment.name}: </span>
          <input
            type="number"
            placeholder={`${segment.value}%`}
            onChange={(e) => handleSegmentChange(index, Number(e.target.value))}
            min="10"
            max="80"
            style={{ width: '80px', padding: '5px' }}
          />
        </div>
      ))}
      {inputError && <ErrorText>Please enter a value between 10 and 80</ErrorText>}
      {totalError && <ErrorText>Total segment values must add up to 100</ErrorText>}
      {pieChartData.length > 0 && !totalError && (
        <ChartContainer>
          <ReactPieChart data={pieChartData} onSegmentChange={handleSegmentChange} />
          <StyledSubmitButton type="submit" onClick={handleButtonClick}>Generate Chart</StyledSubmitButton>
        </ChartContainer>
      )}
    </Container>
  );
};

export default MakeAPlaylist3;
