import React from 'react';

type EditIconType = {
  width?: string;
  height?: string;
};

export const EditIcon: React.FC<EditIconType> = ({ height = '18', width = '18' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.52779 2.18164H7.07717C3.45062 2.18164 2 3.63226 2 7.25881V11.6107C2 15.2372 3.45062 16.6878 7.07717 16.6878H11.429C15.0556 16.6878 16.5062 15.2372 16.5062 11.6107V10.1601"
      stroke="#1487F2"
      strokeWidth="1.45062"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.1834 2.92204L6.46797 8.63748C6.25037 8.85507 6.03278 9.28301 5.98926 9.59489L5.67738 11.7781C5.56133 12.5687 6.11982 13.1199 6.91041 13.0111L9.09359 12.6992C9.39822 12.6557 9.82615 12.4381 10.051 12.2205L15.7664 6.50507C16.7529 5.51865 17.2171 4.37266 15.7664 2.92204C14.3158 1.47142 13.1698 1.93561 12.1834 2.92204Z"
      stroke="#1487F2"
      strokeWidth="1.45062"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.1816 3.11255C11.6841 4.90505 13.0866 6.30755 14.8866 6.81755"
      stroke="#1487F2"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
