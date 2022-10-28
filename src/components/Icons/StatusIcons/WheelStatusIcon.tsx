import React from 'react';

type WheelStatusType = {
  width?: string;
  height?: string;
};

export const WheelStatusIcon: React.FC<WheelStatusType> = ({ height = '24', width = '24' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1692_189404)">
      <path
        d="M17.25 12C17.25 14.8995 14.8995 17.25 12 17.25V18.75C15.7279 18.75 18.75 15.7279 18.75 12H17.25ZM12 6.75C14.8995 6.75 17.25 9.10051 17.25 12H18.75C18.75 8.27208 15.7279 5.25 12 5.25V6.75ZM6.75 12C6.75 9.10051 9.10051 6.75 12 6.75V5.25C8.27208 5.25 5.25 8.27208 5.25 12H6.75ZM12 17.25C9.10051 17.25 6.75 14.8995 6.75 12H5.25C5.25 15.7279 8.27208 18.75 12 18.75V17.25Z"
        stroke="none"
      />
      <path d="M12 18V14" fill="none" strokeWidth="1.5" />
      <path d="M13.3564 10.9676L18 9.21875" fill="none" strokeWidth="1.5" />
      <path d="M6.00095 9.21895L10.6445 10.9678" fill="none" strokeWidth="1.5" />
      <path
        d="M13.25 12C13.25 12.6904 12.6904 13.25 12 13.25V14.75C13.5188 14.75 14.75 13.5188 14.75 12H13.25ZM12 10.75C12.6904 10.75 13.25 11.3096 13.25 12H14.75C14.75 10.4812 13.5188 9.25 12 9.25V10.75ZM10.75 12C10.75 11.3096 11.3096 10.75 12 10.75V9.25C10.4812 9.25 9.25 10.4812 9.25 12H10.75ZM12 13.25C11.3096 13.25 10.75 12.6904 10.75 12H9.25C9.25 13.5188 10.4812 14.75 12 14.75V13.25Z"
        fill="#1487F2"
      />
    </g>
    <defs>
      <clipPath id="clip0_1692_189404">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
);
