import React from 'react';

type ArrowLeftType = {
  width?: string;
  height?: string;
};

export const ArrowLeftIcon: React.FC<ArrowLeftType> = ({ height = '10', width = '6' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.47401 1.47157C5.73436 1.21122 5.73436 0.789108 5.47401 0.528758C5.21366 0.268409 4.79155 0.268409 4.5312 0.528758L0.531201 4.52876C0.278815 4.78114 0.269984 5.18753 0.511169 5.45065L4.17784 9.45065C4.42663 9.72206 4.84834 9.74039 5.11975 9.4916C5.39117 9.2428 5.4095 8.82109 5.16071 8.54968L1.92536 5.02021L5.47401 1.47157Z" />
  </svg>
);
