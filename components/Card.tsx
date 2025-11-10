
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-yellow-600">
      <h3 className="text-xl font-semibold text-yellow-400 mb-2">{title}</h3>
      <div className="text-gray-300">{children}</div>
    </div>
  );
};

export default Card;
