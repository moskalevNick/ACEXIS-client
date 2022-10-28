import React from 'react';

type CrossType = {
  width?: string;
  height?: string;
};

export const CrossIcon: React.FC<CrossType> = ({ height = '14', width = '14' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1.78516"
      y="11.6807"
      width="14"
      height="1.75"
      rx="0.875"
      transform="rotate(-45 1.78516 11.6807)"
    />
    <rect
      x="3.02344"
      y="1.78113"
      width="14"
      height="1.75"
      rx="0.875"
      transform="rotate(45 3.02344 1.78113)"
    />
  </svg>
);
