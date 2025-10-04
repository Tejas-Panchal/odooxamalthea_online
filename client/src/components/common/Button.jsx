
import React from 'react';



const Button = ({ children, onClick, type, variant = 'primary' }) => {
  const baseStyle = 'px-4 py-2 rounded-md font-semibold focus:outline-none';
  const variantStyle = variant === 'primary' 
    ? 'bg-blue-500 text-white hover:bg-blue-600' 
    : 'bg-gray-300 text-black hover:bg-gray-400';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;