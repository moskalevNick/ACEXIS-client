import React from 'react';

type AddExisIconType = {
  width?: string;
  height?: string;
};

export const AddExisIcon: React.FC<AddExisIconType> = ({ height = '20', width = '20' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.66602 7.08366C1.66602 4.16699 3.33268 2.91699 5.83268 2.91699H14.166C16.666 2.91699 18.3327 4.16699 18.3327 7.08366V12.917C18.3327 15.8337 16.666 17.0837 14.166 17.0837H5.83268"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1654 7.5L11.557 9.58333C10.6987 10.2667 9.29036 10.2667 8.43203 9.58333L5.83203 7.5"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.66797 13.75H6.66797"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.66602 10.417H4.16602"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
