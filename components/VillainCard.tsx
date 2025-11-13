
import React from 'react';
import { Villain } from '../types';

const VillainCard: React.FC<{ villain: Villain }> = ({ villain }) => {
  return (
    <div className="bg-gray-900 border border-red-900/50 rounded-lg p-6 shadow-2xl transition-shadow duration-300 hover:shadow-red-500/30">
      <h3 className="text-3xl font-bold text-red-500">{villain.codename}</h3>
      <p className="text-red-700 font-semibold mb-4 italic">"{villain.title}"</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-300 mb-4">
        <div>
          <strong className="text-gray-400 font-medium block uppercase tracking-wider">Voice</strong>
          <p>{villain.voice}</p>
        </div>
        <div>
          <strong className="text-gray-400 font-medium block uppercase tracking-wider">Accent</strong>
          <p>{villain.accent}</p>
        </div>
        <div className="md:col-span-2">
          <strong className="text-gray-400 font-medium block uppercase tracking-wider">Motivation</strong>
          <p>{villain.motivation}</p>
        </div>
        <div className="md:col-span-2">
          <strong className="text-gray-400 font-medium block uppercase tracking-wider">Depth / Philosophy</strong>
          <p>{villain.depth}</p>
        </div>
        <div>
          <strong className="text-gray-400 font-medium block uppercase tracking-wider">Style</strong>
          <ul className="list-disc list-inside pl-2">
            {villain.style.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>
      
      {villain.chillingLine && (
        <div className="mt-4 pt-4 border-t border-red-900/50">
            <p className="text-red-400 italic text-center text-lg">"{villain.chillingLine}"</p>
        </div>
      )}
    </div>
  );
};

export default VillainCard;
