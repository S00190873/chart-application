import React, { useState } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  width: 100%;
`;

const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: #ddd;
  border-radius: 4px;
  cursor: pointer;
`;

const SliderThumb = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #007bff;
  cursor: pointer;
  z-index: 1;
`;

const SliderProgress = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${({ value }) => value}%;
  height: 8px;
  background-color: #007bff;
  border-radius: 4px;
`;

const Slider = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (event) => {
    if (isDragging) {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const newValue = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
      onChange(newValue);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (event) => {
    if (isDragging) {
      const rect = event.currentTarget.getBoundingClientRect();
      const touchX = event.touches[0].clientX - rect.left;
      const newValue = Math.max(0, Math.min(100, (touchX / rect.width) * 100));
      onChange(newValue);
    }
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <SliderContainer>
      <SliderTrack
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <SliderProgress value={value} />
        <SliderThumb style={{ left: `${value}%` }} />
      </SliderTrack>
    </SliderContainer>
  );
};

export default Slider;
