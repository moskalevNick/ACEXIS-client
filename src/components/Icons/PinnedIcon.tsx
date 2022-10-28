import React from 'react';

type PinnedIconType = {
  width?: string;
  height?: string;
};

export const PinnedIcon: React.FC<PinnedIconType> = ({ height = '20', width = '20' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.9629 9.98755L8.89801 12.0379C7.75268 13.1752 7.75268 15.0098 8.89801 16.1471C10.0433 17.2843 11.8909 17.2843 13.0362 16.1471L16.2883 12.9179C18.5706 10.6516 18.5706 6.96591 16.2883 4.69967C14.006 2.43344 10.2941 2.43344 8.01184 4.69967L4.46719 8.21939C2.51094 10.1619 2.51094 13.3163 4.46719 15.2671"
      stroke="#0682F6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
