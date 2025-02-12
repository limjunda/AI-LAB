import React from "react";

const Header = () => {
  return (
    <div className="bg-white border-b border-red-100">
      <div className="flex justify-center w-full">
        <img
          src="/Logo.png"
          alt="AI LAB Logo"
          className="w-full h-24 object-contain"
        />
      </div>
    </div>
  );
};

export default Header;
