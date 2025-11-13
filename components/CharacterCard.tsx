
import React from 'react';
import { Character } from '../types';

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg flex flex-col h-full transition-shadow duration-300 hover:shadow-yellow-500/30">
      <h3 className="text-2xl font-bold text-yellow-400">{character.name}</h3>
      <p className="text-yellow-600 font-semibold mb-4 italic">"{character.title}"</p>

      <div className="space-y-3 text-sm text-gray-300 flex-grow">
        <p><strong className="text-gray-400 font-medium">Role:</strong> {character.role}</p>
        {character.age && <p><strong className="text-gray-400 font-medium">Age:</strong> {character.age}</p>}
        {character.born && <p><strong className="text-gray-400 font-medium">Born:</strong> {character.born}</p>}
        {character.personality && <p><strong className="text-gray-400 font-medium">Personality:</strong> {character.personality}</p>}
        {character.battleStyle && <p><strong className="text-gray-400 font-medium">Battle Style:</strong> {character.battleStyle}</p>}
        {character.motivation && <p><strong className="text-gray-400 font-medium">Motivation:</strong> {character.motivation}</p>}
        {character.backstory && <p><strong className="text-gray-400 font-medium">Backstory:</strong> {character.backstory}</p>}
        {character.arc && <p><strong className="text-gray-400 font-medium">Arc:</strong> {character.arc}</p>}
        {character.languages && <p><strong className="text-gray-400 font-medium">Languages:</strong> {character.languages.join(', ')}</p>}
        
        {character.look && character.look.length > 0 && (
            <div>
              <strong className="text-gray-400 font-medium">Look:</strong>
              <ul className="list-disc list-inside pl-2">
                {character.look.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
        )}
      </div>
      
      {character.signatureLine && (
        <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-400 italic">"{character.signatureLine}"</p>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
