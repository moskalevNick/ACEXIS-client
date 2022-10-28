import React from 'react';

type PlanetType = {
  width?: string;
  height?: string;
};

export const PlanetIcon: React.FC<PlanetType> = ({ height = '64', width = '64' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1988_187357)">
      <rect x="16" y="16" width="32" height="32" rx="8" />
    </g>
    <circle cx="32.143" cy="32.1415" r="7.07071" stroke="#1487F2" strokeWidth="1.5" />
    <path d="M39 32H25" stroke="#1487F2" strokeWidth="1.5" />
    <path
      d="M28.5 26.1665V26.1665C30.6543 29.757 30.6543 34.2426 28.5 37.8332V37.8332"
      stroke="#1487F2"
      strokeWidth="1.5"
    />
    <path
      d="M35.5 26.1665V26.1665C34.0021 29.9112 34.0021 34.0885 35.5 37.8332V37.8332"
      stroke="#1487F2"
      strokeWidth="1.5"
    />
    <defs>
      <filter
        id="filter0_d_1988_187357"
        x="0"
        y="0"
        width="64"
        height="64"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feOffset />
        <feGaussianBlur stdDeviation="8" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.886275 0 0 0 0 0.913725 0 0 0 0 0.956863 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1988_187357" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1988_187357"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
