
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="relative">
      <div className="w-20 h-20 border-yellow-600 border-4 rounded-full"></div>
      <div className="w-20 h-20 border-gray-700 border-t-4 animate-spin rounded-full absolute left-0 top-0"></div>
    </div>
  </div>
);

export default LoadingSpinner;
