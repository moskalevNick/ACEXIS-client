import React from 'react';

type WarningType = {
  interfill?: string;
  fill?: string;
  width?: string;
  height?: string;
  opacity?: string;
};

export const WarninIcon: React.FC<WarningType> = ({
  fill = '#FF382C',
  interfill = '#FF382C',
  height = '18',
  width = '18',
  opacity = '0.2',
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity={opacity}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
      fill={fill}
    />
    <rect x="8.25" y="5.25" width="1.5" height="6" rx="0.75" fill={interfill} />
    <rect x="8.25" y="12" width="1.5" height="1.5" rx="0.75" fill={interfill} />
  </svg>
);
