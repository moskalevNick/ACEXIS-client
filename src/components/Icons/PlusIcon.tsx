import React from 'react';

type PlusType = {
  fill?: string;
  width?: string;
  height?: string;
};

export const PlusIcon: React.FC<PlusType> = ({ fill = 'none', height = '24', width = '24' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="10.9993" width="16" height="2" rx="0.999999" fill="white" />
    <rect
      x="13"
      y="4.00067"
      width="16"
      height="2"
      rx="1"
      transform="rotate(90 13 4.00067)"
      fill="white"
    />
  </svg>
);
