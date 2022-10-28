import React from 'react';

type TickType = {
  fill?: string;
  width?: string;
  height?: string;
};

export const Tick: React.FC<TickType> = ({ fill = '#1487F2', height = '8', width = '10' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 1L3.5 7L1 4.27273"
      stroke={fill}
      strokeWidth="1.7963"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
