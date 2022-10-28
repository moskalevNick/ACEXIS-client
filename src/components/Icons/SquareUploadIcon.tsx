import React from 'react';

type SquareUploadIconType = {
  width?: string;
  height?: string;
};

export const SquareUploadIcon: React.FC<SquareUploadIconType> = ({
  height = '64',
  width = '64',
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="63" height="63" rx="9.5" stroke="#1487F2" />
    <path
      d="M29 30C30.1046 30 31 29.1046 31 28C31 26.8954 30.1046 26 29 26C27.8954 26 27 26.8954 27 28C27 29.1046 27.8954 30 29 30Z"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33 22H29C24 22 22 24 22 29V35C22 40 24 42 29 42H35C40 42 42 40 42 35V30"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M35.75 25H41.25" stroke="#1487F2" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M38.5 27.75V22.25" stroke="#1487F2" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M22.6699 38.9496L27.5999 35.6396C28.3899 35.1096 29.5299 35.1696 30.2399 35.7796L30.5699 36.0696C31.3499 36.7396 32.6099 36.7396 33.3899 36.0696L37.5499 32.4996C38.3299 31.8296 39.5899 31.8296 40.3699 32.4996L41.9999 33.8996"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
