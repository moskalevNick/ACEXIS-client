import React from 'react';

type SunType = {
  width?: string;
  height?: string;
};

export const SunIcon: React.FC<SunType> = ({ height = '16', width = '16' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.0013 12.3334C10.3945 12.3334 12.3346 10.3933 12.3346 8.00002C12.3346 5.60679 10.3945 3.66669 8.0013 3.66669C5.60807 3.66669 3.66797 5.60679 3.66797 8.00002C3.66797 10.3933 5.60807 12.3334 8.0013 12.3334Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.7587 12.76L12.672 12.6733M12.672 3.32665L12.7587 3.23998L12.672 3.32665ZM3.2387 12.76L3.32536 12.6733L3.2387 12.76ZM7.9987 1.38665V1.33331V1.38665ZM7.9987 14.6666V14.6133V14.6666ZM1.38536 7.99998H1.33203H1.38536ZM14.6654 7.99998H14.612H14.6654ZM3.32536 3.32665L3.2387 3.23998L3.32536 3.32665Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
