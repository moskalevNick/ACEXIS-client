import React from 'react';

type CrossInSquareIconType = {
  width?: string;
  height?: string;
};

export const CrossInSquareIcon: React.FC<CrossInSquareIconType> = ({
  height = '18',
  width = '18',
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.87891 11.1229L11.1239 6.87793"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.1239 11.1229L6.87891 6.87793"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
