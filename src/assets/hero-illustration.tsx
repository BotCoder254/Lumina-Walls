import React from 'react';

const HeroIllustration: React.FC = () => (
  <svg
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M400 500C567.025 500 702 365.025 702 198C702 30.9745 567.025 -104 400 -104C232.975 -104 98 30.9745 98 198C98 365.025 232.975 500 400 500Z"
      fill="url(#paint0_linear)"
      fillOpacity="0.1"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="400"
        y1="-104"
        x2="400"
        y2="500"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default HeroIllustration; 