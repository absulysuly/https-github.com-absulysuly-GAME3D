import React, { useState, useEffect } from 'react';
import { GameConcept } from './types';
import { fetchGameConcept } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import Section from './components/Section';
import Card from './components/Card';
import LocationCard from './components/LocationCard';
import JsonModal from './components/JsonModal';

const locationImages: { [key: string]: string } = {
  "Slemani (Sulaymaniyah)": "https://picsum.photos/seed/slemani/800/600",
  "Erbil (Hawler)": "https://picsum.photos/seed/erbil/800/600",
  "Duhok": "https://picsum.photos/seed/duhok/800/600",
  "Mosul": "https://picsum.photos/seed/mosul/800/600",
  "Baghdad": "https://picsum.photos/seed/baghdad/800/600",
};


const App: React.FC = () => {
  const [gameData, setGameData] = useState<GameConcept | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadGameConcept = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchGameConcept();
        setGameData(data);
      } catch (err) {
        setError("Failed to load game concept. Please check the API key and try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadGameConcept();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 flex items-center justify-center p-4">
        <div className="bg-red-900/20 border border-red-500 p-8 rounded-lg text-center">
            <h1 className="text-2xl font-bold mb-4">An Error Occurred</h1>
            <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!gameData) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
        <header 
          className="relative h-96 flex items-center justify-center text-center p-4 bg-cover bg-center"
          style={{backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('https://picsum.photos/seed/kurdistan/1920/1080')`}}>
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-wider uppercase" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
              {gameData.title}
            </h1>
            <p className="text-yellow-400 mt-2 text-lg md:text-xl">A Tactical FPS Game Concept</p>
          </div>
        </header>

        <main className="container mx-auto p-4 md:p-8">
          <Section title="Core Concept & Narrative">
            <div className="space-y-6">
              <Card title="Player Role"><p>{gameData.narrative.playerRole}</p></Card>
              <Card title="Story Arc"><p>{gameData.narrative.storyArc}</p></Card>
              <Card title="Historical Fidelity"><p>{gameData.narrative.historicalFidelity}</p></Card>
            </div>
          </Section>
          
          <Section title="Visual Style & Environment">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card title="Art Style"><p>{gameData.visualStyle.artStyle}</p></Card>
                  <Card title="Color Palette"><p>{gameData.visualStyle.colorPalette}</p></Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gameData.locations.map(loc => (
                      <LocationCard 
                          key={loc.name}
                          name={loc.name}
                          description={loc.description}
                          imageUrl={locationImages[loc.name] || 'https://picsum.photos/800/600'}
                      />
                  ))}
              </div>
          </Section>

          <Section title="Key Gameplay Mechanics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gameData.gameplayMechanics.map(mech => (
                      <Card key={mech.name} title={mech.name}>
                          <p>{mech.description}</p>
                      </Card>
                  ))}
              </div>
          </Section>

          <Section title="Mission Structure">
              <div className="space-y-6">
                  {gameData.missions.map(mission => (
                       <div key={mission.title} className="bg-gray-800/50 border-l-4 border-yellow-600 p-6 rounded-r-lg shadow-md">
                          <h3 className="text-xl font-bold text-yellow-400">{mission.title}</h3>
                          <p className="text-sm text-gray-400 mb-2">Location: {mission.location}</p>
                          <p className="text-gray-300">{mission.description}</p>
                      </div>
                  ))}
              </div>
          </Section>
          
          <Section title="Character & Faction Depth">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gameData.factions.map(faction => (
                      <Card key={faction.name} title={faction.name}>
                          <p>{faction.description}</p>
                      </Card>
                  ))}
              </div>
          </Section>
          
          <Section title="Audio & Atmosphere">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card title="Soundtrack"><p>{gameData.audio.soundtrack}</p></Card>
                  <Card title="Audio & Dialogue"><p>{gameData.audio.soundEffects}</p></Card>
              </div>
          </Section>

        </main>

        <footer className="bg-gray-950 text-center p-6 mt-8 border-t border-gray-800">
          <p className="text-gray-500 mb-4">Game concept generated by Google Gemini API.</p>
          <button 
            onClick={() => setIsJsonModalOpen(true)}
            className="bg-gray-700 text-yellow-400 px-6 py-2 rounded-md hover:bg-gray-600 hover:text-white transition-colors duration-200"
          >
            View/Download Generated JSON
          </button>
        </footer>
      </div>
      <JsonModal 
        isOpen={isJsonModalOpen} 
        onClose={() => setIsJsonModalOpen(false)} 
        jsonData={gameData}
      />
    </>
  );
};

export default App;
