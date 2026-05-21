import React from "react";

const WarehouseIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 3C2 2.45 2.45 2 3 2H21C21.55 2 22 2.45 22 3C22 3.55 21.55 4 21 4H20V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V4H3C2.45 4 2 3.55 2 3ZM6 4V19H18V4H6ZM8 7C8 6.45 8.45 6 9 6H15C15.55 6 16 6.45 16 7V12C16 12.55 15.55 13 15 13H9C8.45 13 8 12.55 8 12V7ZM10 8V11H14V8H10ZM7 15C7 14.45 7.45 14 8 14H16C16.55 14 17 14.45 17 15C17 15.55 16.55 16 16 16H8C7.45 16 7 15.55 7 15Z"
        fill={color}
      />
    </svg>
  );
};

export default WarehouseIcon;
