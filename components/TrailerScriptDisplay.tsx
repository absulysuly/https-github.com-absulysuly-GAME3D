
import React from 'react';
import { TrailerScript } from '../types';

const TrailerScriptDisplay: React.FC<{ script: TrailerScript }> = ({ script }) => {
  return (
    <div className="bg-gray-950 border border-gray-700 rounded-lg p-6 md:p-8 shadow-2xl font-mono text-gray-300">
      <div className="space-y-6">
        <div>
          <p className="text-yellow-400 uppercase font-bold">Opening Shot</p>
          <p className="pl-4">{script.openingShot}</p>
        </div>
        
        <div>
          <p className="text-yellow-400 uppercase font-bold">Sirwan (VO, Sorani)</p>
          <p className="pl-4 italic">"{script.sirwanVO}"</p>
        </div>

        <div>
          <p className="text-yellow-400 uppercase font-bold">The Falcon (VO, Arabic)</p>
          <p className="pl-4 italic">"{script.falconVO}"</p>
        </div>

        <div>
          <p className="text-yellow-400 uppercase font-bold">Action Cuts (Montage)</p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            {script.actionCuts.map((cut, index) => (
              <li key={index}>{cut}</li>
            ))}
          </ul>
        </div>

        <div className="text-center pt-4 border-t border-gray-700">
            <p className="text-2xl md:text-3xl font-bold text-red-500 tracking-widest">{script.titleCard}</p>
        </div>

        <div className="pt-4 border-t border-gray-700">
            <p className="text-yellow-400 uppercase font-bold">Final Line (Sirwan)</p>
            <p className="pl-4 italic">"{script.finalLine}"</p>
        </div>
      </div>
    </div>
  );
};

export default TrailerScriptDisplay;
