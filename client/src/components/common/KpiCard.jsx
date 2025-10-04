import React from 'react';

const KpiCard = ({ title, value, secondaryText, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
      {Icon && <div className="bg-blue-100 text-blue-600 p-3 rounded-full">{<Icon className="h-6 w-6" />}</div>}
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {secondaryText && <p className="text-sm text-gray-500">{secondaryText}</p>}
      </div>
    </div>
  );
};

export default KpiCard;