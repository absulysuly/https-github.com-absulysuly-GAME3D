
import React from 'react';

interface LocationCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ name, description, imageUrl }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 transition-shadow duration-300 hover:shadow-yellow-500/20">
      <img src={imageUrl} alt={`Image of ${name}`} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">{name}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default LocationCard;
