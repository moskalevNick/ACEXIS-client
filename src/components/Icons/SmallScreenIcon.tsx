import React from 'react';

type SmallScreenType = {
  width?: string;
  height?: string;
};

export const SmallScreenIcon: React.FC<SmallScreenType> = ({ height = '18', width = '18' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.875 14.625V10.125H3.375"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.125 3.375V7.875H14.625"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.75 2.25L10.125 7.875"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.875 10.125L2.25 15.75"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
