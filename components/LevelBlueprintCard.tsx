
import React from 'react';
import { LevelBlueprint } from '../types';

const LevelBlueprintCard: React.FC<{ blueprint: LevelBlueprint, index: number }> = ({ blueprint, index }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl transition-shadow duration-300 hover:shadow-yellow-500/30">
      <h3 className="text-2xl font-bold text-yellow-400 mb-2">
        {index + 1}. {blueprint.title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
        <div className="bg-gray-900/50 p-3 rounded-md">
          <p className="font-semibold text-yellow-500 uppercase tracking-wider">Time</p>
          <p className="text-gray-300">{blueprint.time}</p>
        </div>
        <div className="bg-gray-900/50 p-3 rounded-md">
          <p className="font-semibold text-yellow-500 uppercase tracking-wider">Vibe</p>
          <p className="text-gray-300">{blueprint.vibe}</p>
        </div>
        <div className="bg-gray-900/50 p-3 rounded-md">
          <p className="font-semibold text-yellow-500 uppercase tracking-wider">Mission Type</p>
          <p className="text-gray-300">{blueprint.missionType}</p>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-yellow-500 uppercase tracking-wider text-sm mb-2">Unique Mechanics</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 pl-2">
          {blueprint.uniqueMechanics.map((mech, i) => <li key={i}>{mech}</li>)}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-yellow-500 uppercase tracking-wider text-sm mb-2">Key Scene / Dialogue</h4>
        <div className="text-gray-300 italic bg-gray-900/50 p-4 rounded-md border-l-4 border-yellow-700">
          <p className="whitespace-pre-line">{blueprint.keyScene}</p>
        </div>
      </div>
    </div>
  );
};

export default LevelBlueprintCard;
