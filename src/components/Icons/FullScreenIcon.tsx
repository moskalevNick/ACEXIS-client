import React from 'react';

type FullScreenType = {
  width?: string;
  height?: string;
};

export const FullScreenIcon: React.FC<FullScreenType> = ({ height = '16', width = '16' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 6V2H10"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 10V14H6"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2L9 7"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 9L2 14"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
