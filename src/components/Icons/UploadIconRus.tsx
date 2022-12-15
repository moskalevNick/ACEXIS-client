import React from 'react';

type UploadType = {
  width?: string;
  height?: string;
};

export const UploadIconRus: React.FC<UploadType> = ({ height = '72', width = '72' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.666667"
      y="0.666667"
      width="70.6667"
      height="70.6667"
      rx="10"
      stroke="#1487F2"
      strokeWidth="1.33333"
      strokeDasharray="3.56 3.56"
    />
    <path
      d="M24.625 45.8623V47.0928C25.696 47.1156 26.5482 47.2979 27.1816 47.6396C27.8197 47.9769 28.2777 48.4212 28.5557 48.9727C28.8382 49.5241 28.9795 50.137 28.9795 50.8115C28.9795 51.2581 28.9066 51.7025 28.7607 52.1445C28.6149 52.5866 28.3757 52.9899 28.043 53.3545C27.7103 53.7191 27.2637 54.013 26.7031 54.2363C26.1426 54.4596 25.4499 54.5804 24.625 54.5986V56.1367H23.0938V54.5986C22.2507 54.5804 21.5488 54.4574 20.9883 54.2295C20.4277 54.0016 19.9811 53.7054 19.6484 53.3408C19.3203 52.9717 19.0856 52.5684 18.9443 52.1309C18.8076 51.6888 18.7393 51.2513 18.7393 50.8184C18.7393 50.3216 18.8145 49.8522 18.9648 49.4102C19.1198 48.9681 19.3682 48.5762 19.71 48.2344C20.0518 47.8926 20.5007 47.6214 21.0566 47.4209C21.6126 47.2204 22.2917 47.111 23.0938 47.0928V45.8623H24.625ZM23.0938 48.4121C22.4147 48.4349 21.8724 48.5488 21.4668 48.7539C21.0612 48.9544 20.7695 49.2301 20.5918 49.5811C20.4141 49.932 20.3252 50.3398 20.3252 50.8047C20.3252 51.3014 20.4232 51.7321 20.6191 52.0967C20.8151 52.4613 21.1182 52.7484 21.5283 52.958C21.9385 53.1631 22.4603 53.277 23.0938 53.2998V48.4121ZM24.625 48.4121V53.2998C25.2721 53.277 25.7985 53.1608 26.2041 52.9512C26.6143 52.7415 26.915 52.4544 27.1064 52.0898C27.3024 51.7207 27.4004 51.29 27.4004 50.7979C27.4004 50.3285 27.3115 49.9206 27.1338 49.5742C26.9561 49.2233 26.6644 48.9476 26.2588 48.7471C25.8532 48.5465 25.3086 48.4349 24.625 48.4121ZM37.5176 52.1992C37.5176 52.8281 37.4355 53.3864 37.2715 53.874C37.1074 54.3617 36.8682 54.7741 36.5537 55.1113C36.2393 55.444 35.861 55.6992 35.4189 55.877C34.9769 56.0501 34.4779 56.1367 33.9219 56.1367C33.4023 56.1367 32.9261 56.0501 32.4932 55.877C32.0602 55.6992 31.6842 55.444 31.3652 55.1113C31.0508 54.7741 30.807 54.3617 30.6338 53.874C30.4606 53.3864 30.374 52.8281 30.374 52.1992C30.374 51.3652 30.5176 50.6589 30.8047 50.0801C31.0964 49.4967 31.5111 49.0524 32.0488 48.7471C32.5866 48.4417 33.2269 48.2891 33.9697 48.2891C34.667 48.2891 35.2822 48.4417 35.8154 48.7471C36.3486 49.0524 36.7656 49.4967 37.0664 50.0801C37.3672 50.6634 37.5176 51.3698 37.5176 52.1992ZM32.0283 52.1992C32.0283 52.7507 32.0944 53.2223 32.2266 53.6143C32.3633 54.0062 32.5729 54.307 32.8555 54.5166C33.138 54.7217 33.5026 54.8242 33.9492 54.8242C34.3958 54.8242 34.7604 54.7217 35.043 54.5166C35.3255 54.307 35.5329 54.0062 35.665 53.6143C35.7972 53.2223 35.8633 52.7507 35.8633 52.1992C35.8633 51.6478 35.7972 51.1807 35.665 50.7979C35.5329 50.4105 35.3255 50.1165 35.043 49.916C34.7604 49.7109 34.3936 49.6084 33.9424 49.6084C33.277 49.6084 32.7917 49.8317 32.4863 50.2783C32.181 50.7249 32.0283 51.3652 32.0283 52.1992ZM45.0781 49.6973H42.5898V56H40.9902V49.6973H38.5156V48.4326H45.0781V49.6973ZM53.2402 52.1992C53.2402 52.8281 53.1582 53.3864 52.9941 53.874C52.8301 54.3617 52.5908 54.7741 52.2764 55.1113C51.9619 55.444 51.5837 55.6992 51.1416 55.877C50.6995 56.0501 50.2005 56.1367 49.6445 56.1367C49.125 56.1367 48.6488 56.0501 48.2158 55.877C47.7829 55.6992 47.4069 55.444 47.0879 55.1113C46.7734 54.7741 46.5296 54.3617 46.3564 53.874C46.1833 53.3864 46.0967 52.8281 46.0967 52.1992C46.0967 51.3652 46.2402 50.6589 46.5273 50.0801C46.819 49.4967 47.2337 49.0524 47.7715 48.7471C48.3092 48.4417 48.9495 48.2891 49.6924 48.2891C50.3896 48.2891 51.0049 48.4417 51.5381 48.7471C52.0713 49.0524 52.4883 49.4967 52.7891 50.0801C53.0898 50.6634 53.2402 51.3698 53.2402 52.1992ZM47.751 52.1992C47.751 52.7507 47.8171 53.2223 47.9492 53.6143C48.0859 54.0062 48.2956 54.307 48.5781 54.5166C48.8607 54.7217 49.2253 54.8242 49.6719 54.8242C50.1185 54.8242 50.4831 54.7217 50.7656 54.5166C51.0482 54.307 51.2555 54.0062 51.3877 53.6143C51.5199 53.2223 51.5859 52.7507 51.5859 52.1992C51.5859 51.6478 51.5199 51.1807 51.3877 50.7979C51.2555 50.4105 51.0482 50.1165 50.7656 49.916C50.4831 49.7109 50.1162 49.6084 49.665 49.6084C48.9997 49.6084 48.5143 49.8317 48.209 50.2783C47.9036 50.7249 47.751 51.3652 47.751 52.1992Z"
      fill="#1487F2"
    />
    <path
      opacity="0.5"
      d="M27.6666 26.8333C27.6666 26.4167 28.0833 26 28.5 26C28.9166 26 29.3333 26.4167 29.3333 26.8333C29.3333 27.25 29.3333 31 29.3333 31C29.3333 31.9205 30.0795 32.6667 31 32.6667H41C41.9204 32.6667 42.6666 31.9205 42.6666 31V26.8333C42.6666 26.3731 43.0397 26 43.5 26C43.9602 26 44.3333 26.3731 44.3333 26.8333V31C44.3333 32.8409 42.8409 34.3333 41 34.3333H31C29.159 34.3333 27.6666 32.8409 27.6666 31C27.6666 31 27.6666 27.25 27.6666 26.8333Z"
      fill="#1487F2"
    />
    <rect x="35.1666" y="17.6665" width="1.66667" height="11.6667" rx="0.833333" fill="#1487F2" />
    <path
      d="M36.0302 18.8151L32.4226 22.4228C32.0972 22.7482 31.5695 22.7482 31.2441 22.4228C30.9186 22.0973 30.9186 21.5697 31.2441 21.2442L35.4107 17.0776C35.7241 16.7642 36.228 16.7509 36.5575 17.0474L40.7241 20.7974C41.0662 21.1053 41.094 21.6322 40.7861 21.9743C40.4782 22.3164 39.9513 22.3441 39.6092 22.0362L36.0302 18.8151Z"
      fill="#1487F2"
    />
  </svg>
);