import React from 'react';

type MoonType = {
  width?: string;
  height?: string;
};

export const MoonIconPreview: React.FC<MoonType> = ({ height = '64', width = '64' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1615_197187)">
      <rect x="16" y="16" width="32" height="32" rx="8" />
      <path
        d="M38.1493 31.807L38.8989 31.7833C38.8916 31.5509 38.7768 31.335 38.5883 31.1989C38.3998 31.0628 38.1588 31.0218 37.9359 31.088L38.1493 31.807ZM32.3445 26.003L33.0635 26.2164C33.1297 25.9934 33.0887 25.7524 32.9525 25.5639C32.8164 25.3754 32.6005 25.2607 32.3681 25.2534L32.3445 26.003ZM37.9359 31.088C37.5828 31.1928 37.2082 31.2493 36.819 31.2493V32.7493C37.3542 32.7493 37.8726 32.6715 38.3627 32.526L37.9359 31.088ZM36.819 31.2493C34.6559 31.2493 32.9023 29.4958 32.9023 27.3327H31.4023C31.4023 30.3242 33.8275 32.7493 36.819 32.7493V31.2493ZM32.9023 27.3327C32.9023 26.9437 32.9588 26.5692 33.0635 26.2164L31.6255 25.7897C31.4801 26.2796 31.4023 26.7977 31.4023 27.3327H32.9023ZM32.1523 26.75C32.2088 26.75 32.265 26.7509 32.3209 26.7526L32.3681 25.2534C32.2964 25.2511 32.2245 25.25 32.1523 25.25V26.75ZM26.9023 32C26.9023 29.1005 29.2528 26.75 32.1523 26.75V25.25C28.4244 25.25 25.4023 28.2721 25.4023 32H26.9023ZM32.1523 37.25C29.2528 37.25 26.9023 34.8995 26.9023 32H25.4023C25.4023 35.7279 28.4244 38.75 32.1523 38.75V37.25ZM37.4023 32C37.4023 34.8995 35.0518 37.25 32.1523 37.25V38.75C35.8803 38.75 38.9023 35.7279 38.9023 32H37.4023ZM37.3997 31.8307C37.4014 31.8869 37.4023 31.9433 37.4023 32H38.9023C38.9023 31.9275 38.9012 31.8553 38.8989 31.7833L37.3997 31.8307Z"
        fill="#1487F2"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1615_197187"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1615_197187" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1615_197187"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
