import React from 'react';

type ArrowRightType = {
  width?: string;
  height?: string;
};

export const ArrowRightIcon: React.FC<ArrowRightType> = ({ height = '10', width = '6' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.52599 1.47132C0.265641 1.21097 0.265641 0.788864 0.52599 0.528514C0.78634 0.268165 1.20845 0.268165 1.4688 0.528514L5.4688 4.52851C5.72119 4.7809 5.73002 5.18729 5.48883 5.4504L1.82216 9.4504C1.57337 9.72181 1.15166 9.74015 0.880245 9.49135C0.608832 9.24256 0.590497 8.82085 0.839292 8.54943L4.07464 5.01997L0.52599 1.47132Z" />
  </svg>
);
