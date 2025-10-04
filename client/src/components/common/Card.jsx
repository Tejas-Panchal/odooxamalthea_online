import React from 'react';

const Card = ({ title, children, actions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      {title && (
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;