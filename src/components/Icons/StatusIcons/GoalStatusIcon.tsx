import React from 'react';

type GoalStatusType = {
  width?: string;
  height?: string;
};

export const GoalStatusIcon: React.FC<GoalStatusType> = ({ height = '24', width = '24' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="6" strokeWidth="1.5" fill="none" />
    <path d="M18 12H6" fill="none" strokeWidth="1.5" />
    <path d="M9 7V7C10.8466 10.0776 10.8466 13.9224 9 17V17" fill="none" strokeWidth="1.5" />
    <path d="M15 7V7C13.7161 10.2097 13.7161 13.7903 15 17V17" fill="none" strokeWidth="1.5" />
  </svg>
);
