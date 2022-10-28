import React from 'react';

type AvatarType = {
  width?: string;
  height?: string;
};

export const AvatarIcon: React.FC<AvatarType> = ({ height = '44', width = '44' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_1694_177247"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width={width}
      height={height}
    >
      <rect width="44" height="44" rx="10" fill="url(#paint0_linear_1694_177247)" />
    </mask>
    <g mask="url(#mask0_1694_177247)">
      <rect width={width} height={height} rx="10" />
      <path
        d="M21.9987 22C24.2999 22 26.1654 20.1345 26.1654 17.8333C26.1654 15.5321 24.2999 13.6666 21.9987 13.6666C19.6975 13.6666 17.832 15.5321 17.832 17.8333C17.832 20.1345 19.6975 22 21.9987 22Z"
        stroke="#1487F2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.1565 30.3333C29.1565 27.1083 25.9482 24.5 21.9982 24.5C18.0482 24.5 14.8398 27.1083 14.8398 30.3333"
        stroke="#1487F2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1694_177247"
        x1="2.5"
        y1="3"
        x2="38.5"
        y2="43"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8E192" />
        <stop offset="1" stopColor="#FFBA35" />
      </linearGradient>
    </defs>
  </svg>
);
