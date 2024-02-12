import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReactPieChart from '../building-blocks/PieChart';
import Select from 'react-select';

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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

const MakeAPlaylist3 = () => {
  const location = useLocation();
  const { formValues } = location.state || {};
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const chartTypes = ['Global', 'Country', 'Genre'];
    const values = {
      Global: formValues.includeGlobalCharts ? 33.33 : 0,
      Country: formValues.selectedCountry ? 33.33 : 0,
      Genre: formValues.selectedGenre ? 33.33 : 0,
    };
    const selectedCharts = chartTypes.filter(type => values[type] > 0);
  
    if (selectedCharts.length > 1) {
      setPieChartData(selectedCharts.map(type => ({
        name: type,
        value: 100 / selectedCharts.length,
      })));
    }
  }, [formValues]);

  const handleSegmentChange = (segmentIndex, newValue) => {
    const newData = [...pieChartData];
    newData[segmentIndex].value = newValue;
    var remainingPercentage = 100 - newValue;
    var remainingSegments = newData.length - 1;
    newData.forEach((segment, index) => {
      if (index !== segmentIndex) {
        newData[index].value = remainingPercentage - (newData[index].value / 100 / remainingSegments);
        remainingSegments = remainingSegments - 1;
        remainingPercentage = remainingPercentage - newData[index].value
      }
    });
    setPieChartData(newData);
  };

  return (
    <Container>
      <Heading>Selected Playlist Criteria</Heading>
      {/* Display for selected country and genre */}
      
      <Heading>Chart Distribution</Heading>
      {pieChartData.length > 0 && (
        <ChartContainer>
          <ReactPieChart data={pieChartData} onSegmentChange={handleSegmentChange} />
        </ChartContainer>
      )}
      {pieChartData.map((segment, index) => (
        <div key={`dropdown-${index}`}>
          <span>{segment.name}: </span>
          <Select
            value={{ label: `${Math.round(segment.value)}%`, value: segment.value }}
            onChange={(selectedOption) => handleSegmentChange(index, selectedOption.value)}
            options={[...Array(15).keys()].map((value) => ({ label: `${value * 5 + 10}%`, value: value * 5 + 10 }))}
          />
        </div>
      ))}
    </Container>
  );
};

export default MakeAPlaylist3;
