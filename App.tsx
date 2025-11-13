
import React, { useState, useEffect } from 'react';
import { GameConcept } from './types';
import { fetchGameConcept } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import Section from './components/Section';
import Card from './components/Card';
import LocationCard from './components/LocationCard';
import JsonModal from './components/JsonModal';
import LevelBlueprintCard from './components/LevelBlueprintCard';
import CharacterCard from './components/CharacterCard';
import VillainCard from './components/VillainCard';
import TrailerScriptDisplay from './components/TrailerScriptDisplay';

const locationImages: { [key: string]: string } = {
  "Slemani (Sulaymaniyah)": "https://picsum.photos/seed/slemani/800/600",
  "Erbil (Hawler)": "https://picsum.photos/seed/erbil/800/600",
  "Duhok": "https://picsum.photos/seed/duhok/800/600",
  "Mosul": "https://picsum.photos/seed/mosul/800/600",
  "Baghdad": "https://picsum.photos/seed/baghdad/800/600",
  "Erbil Citadel": "https://picsum.photos/seed/erbilcitadel/800/600",
  "Kirkuk Outskirts": "https://picsum.photos/seed/kirkuk/800/600",
  "Qandil Mountains": "https://picsum.photos/seed/qandil/800/600",
  "Mosul Old Town": "https://picsum.photos/seed/mosulold/800/600",
  "Sulaymaniyah Bazaars": "https://picsum.photos/seed/slemanibazaar/800/600",
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

          <Section title="Core Game Vision">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card title="Style"><p>{gameData.coreGameVision.style}</p></Card>
              <Card title="World"><p>{gameData.coreGameVision.world}</p></Card>
              <Card title="Tone"><p>{gameData.coreGameVision.tone}</p></Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card title="Languages">
                <ul className="list-disc list-inside text-gray-300">
                  {gameData.coreGameVision.languages.map(lang => <li key={lang}>{lang}</li>)}
                </ul>
              </Card>
              <Card title="Primary Maps">
                <ul className="list-disc list-inside text-gray-300">
                  {gameData.coreGameVision.primaryMaps.map(map => <li key={map}>{map}</li>)}
                </ul>
              </Card>
            </div>
          </Section>

          <Section title="Executive Summary">
            <Card title="Project Overview">
                <p className="whitespace-pre-line">{gameData.executiveSummary}</p>
            </Card>
          </Section>
          
          <Section title="Full Roadmap">
            <Card title="Production Timeline & Milestones">
                <p className="whitespace-pre-line">{gameData.fullRoadmap}</p>
            </Card>
          </Section>

          <Section title="The Land That Remembers: Narrative & World">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Main Storyline: "Menace Rising"</h3>
            <Card title="Story Arc">
              <p className="whitespace-pre-line">{gameData.narrative.mainStoryline}</p>
            </Card>
            
            <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Characters & Arcs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {gameData.characters.map(char => (
                <CharacterCard key={char.name} character={char} />
              ))}
            </div>
            <VillainCard villain={gameData.villain} />
            
            <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Gameplay Loop: "The Warrior's Path"</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Core Loop">
                <ul className="list-disc list-inside space-y-1">
                  {gameData.gameplayLoop.coreLoop.map(item => <li key={item}>{item}</li>)}
                </ul>
              </Card>
              <Card title="Unique Systems">
                <ul className="list-disc list-inside space-y-1">
                  {gameData.gameplayLoop.uniqueSystems.map(item => <li key={item}>{item}</li>)}
                </ul>
              </Card>
            </div>

            <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Mission Roster: 10 Epic Chapters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gameData.missions.map(mission => (
                <Card key={mission.title} title={mission.title}>
                  <p>{mission.description}</p>
                </Card>
              ))}
            </div>
            
            {gameData.openingCinematic && (
              <>
                <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Opening Cinematic: "When The Land Breathes"</h3>
                <Card title="Scene Breakdown">
                  <div className="font-mono text-sm space-y-4">
                    <div>
                      <p className="text-yellow-500 uppercase font-bold">Scene</p>
                      <p className="pl-4">{gameData.openingCinematic.scene}</p>
                    </div>
                    <div>
                      <p className="text-yellow-500 uppercase font-bold">Sirwan (VO, Sorani)</p>
                      <p className="pl-4 italic">"{gameData.openingCinematic.sirwanVO}"</p>
                    </div>
                     <div>
                      <p className="text-yellow-500 uppercase font-bold">Araz (Shouting, Arabic)</p>
                      <p className="pl-4 italic">"{gameData.openingCinematic.arazShout}"</p>
                    </div>
                    <div>
                      <p className="text-yellow-500 uppercase font-bold">Camera Directions</p>
                      <p className="pl-4">{gameData.openingCinematic.cameraDirections}</p>
                    </div>
                    <div className="text-center pt-2">
                        <p className="text-xl font-bold text-red-500 tracking-widest">{gameData.openingCinematic.titleCard}</p>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {gameData.sampleVoiceLines && (
              <>
                <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Sample Voice Lines</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {gameData.sampleVoiceLines.map(line => (
                    <Card key={line.character} title={`${line.character} (${line.language})`}>
                      <p className="italic">"{line.line}"</p>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {gameData.audio.moodboard && (
              <>
                <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Soundtrack Moodboard</h3>
                 <Card title="Musical Direction">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-yellow-500 uppercase tracking-wider text-sm mb-2">Instruments</h4>
                        <ul className="list-disc list-inside">
                          {gameData.audio.moodboard.instruments.map(inst => <li key={inst}>{inst}</li>)}
                        </ul>
                      </div>
                       <div>
                        <h4 className="font-semibold text-yellow-500 uppercase tracking-wider text-sm mb-2">Key Tracks</h4>
                        <ul className="list-disc list-inside">
                          {gameData.audio.moodboard.keyTracks.map(track => <li key={track.title}><strong>{track.title}:</strong> {track.description}</li>)}
                        </ul>
                      </div>
                    </div>
                 </Card>
              </>
            )}

          </Section>

          <Section title="The Systems of War & Soul">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">UI/UX: The Heart of the Player</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card title="Style Language">
                    <ul className="list-disc list-inside space-y-1">
                        {gameData.uiux.styleLanguage.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </Card>
                <Card title="Main Menu">
                    <p className="mb-2">{gameData.uiux.mainMenu.sceneDescription}</p>
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mt-4 mb-2">Buttons</h4>
                    <ul className="list-disc list-inside space-y-1">{gameData.uiux.mainMenu.buttons.map(b => <li key={b}>{b}</li>)}</ul>
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mt-4 mb-2">SFX</h4>
                    <ul className="list-disc list-inside space-y-1">{gameData.uiux.mainMenu.sfx.map(s => <li key={s}>{s}</li>)}</ul>
                </Card>
                <Card title="In-Game HUD">
                    <ul className="list-disc list-inside space-y-1">
                        {gameData.uiux.inGameHUD.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </Card>
            </div>

            <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Inventory & Skill Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card title="Inventory System: The Bag of the Fighter">
                  <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Categories</h4>
                  <p className="mb-4">{gameData.inventorySystem.categories.join(' • ')}</p>
                  <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Dynamic Weight System</h4>
                  <ul className="list-disc list-inside space-y-1">
                      {gameData.inventorySystem.dynamicWeightSystem.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
              </Card>
              <Card title="Weapon Upgrade Tree: The Hand That Protects">
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Barrel Mods</h4>
                          <ul className="list-disc list-inside text-sm">
                            {gameData.weaponUpgradeTree.barrelMods.map(m => <li key={m}>{m}</li>)}
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Optics</h4>
                          <ul className="list-disc list-inside text-sm">
                            {gameData.weaponUpgradeTree.optics.map(m => <li key={m}>{m}</li>)}
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Body Mods</h4>
                          <ul className="list-disc list-inside text-sm">
                            {gameData.weaponUpgradeTree.bodyMods.map(m => <li key={m}>{m}</li>)}
                          </ul>
                      </div>
                       <div>
                          <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Ammo Types</h4>
                          <ul className="list-disc list-inside text-sm">
                            {gameData.weaponUpgradeTree.ammoTypes.map(m => <li key={m}>{m}</li>)}
                          </ul>
                      </div>
                  </div>
              </Card>
            </div>
             <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Skill Tree: The Blood of the Mountains</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {gameData.skillTree.branches.map(branch => (
                    <Card key={branch.name} title={branch.name}>
                        <p className="text-sm text-gray-400 italic mb-3">"{branch.philosophy}"</p>
                        <ul className="list-disc list-inside space-y-1">
                            {branch.skills.map(skill => <li key={skill}>{skill}</li>)}
                        </ul>
                    </Card>
                ))}
            </div>

             <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Tactical & Enemy Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card title="Tactical Companion Commands">
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Basic Commands</h4>
                    <p className="mb-4 text-sm">{gameData.companionCommands.basic.join(' • ')}</p>
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Advanced Commands</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {gameData.companionCommands.advanced.map(c => <li key={c} className="italic">"{c}"</li>)}
                    </ul>
                </Card>
                <Card title="Cinematic Camera System">
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Conversation Camera</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                      {gameData.cinematicCameraSystem.conversation.map(c => <li key={c}>{c}</li>)}
                    </ul>
                     <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Combat Camera</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                      {gameData.cinematicCameraSystem.combat.map(c => <li key={c}>{c}</li>)}
                    </ul>
                     <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Cutscenes</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {gameData.cinematicCameraSystem.cutscenes.map(c => <li key={c}>{c}</li>)}
                    </ul>
                </Card>
            </div>
            
            <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Enemy Factions & Hierarchy</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {gameData.enemyFactions.map(faction => (
                <Card key={faction.name} title={faction.name}>
                  <p>{faction.description}</p>
                  {faction.hierarchy && (
                    <>
                      <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mt-4 mb-2">Hierarchy</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {faction.hierarchy.map(rank => <li key={rank}>{rank}</li>)}
                      </ul>
                    </>
                  )}
                </Card>
              ))}
            </div>

             <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Boss Mechanics: The Lords of Chaos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card title="The Falcon - Final Boss">
                    <p className="mb-4">{gameData.bossMechanics.theFalcon.description}</p>
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Mechanics</h4>
                    <ul className="list-disc list-inside space-y-1 mb-4">
                        {gameData.bossMechanics.theFalcon.mechanics.map(m => <li key={m}>{m}</li>)}
                    </ul>
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Final Moment</h4>
                    <p>{gameData.bossMechanics.theFalcon.finalMoment}</p>
                </Card>
                <Card title="The Raven - Sniper Boss">
                    <p className="mb-4">{gameData.bossMechanics.theRaven.description}</p>
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Mechanics</h4>
                    <ul className="list-disc list-inside space-y-1">
                        {gameData.bossMechanics.theRaven.mechanics.map(m => <li key={m}>{m}</li>)}
                    </ul>
                </Card>
            </div>

            <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Environment Concept Art Prompts</h3>
            <div className="space-y-6">
                {gameData.conceptArtPrompts.map(p => (
                    <Card key={p.title} title={p.title}>
                        <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-900 p-4 rounded-md italic">"{p.prompt}"</pre>
                    </Card>
                ))}
            </div>
          </Section>

          <Section title="Technical Architecture">
            <Card title={`Engine Choice: ${gameData.technicalArchitecture.engineChoice.engine}`}>
              <p>{gameData.technicalArchitecture.engineChoice.reasoning}</p>
            </Card>
            <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Core Systems & Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gameData.technicalArchitecture.coreSystems.map(system => (
                <Card key={system.name} title={system.name}>
                  <p className="whitespace-pre-line text-sm font-mono">{system.description}</p>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="Assets Blueprint">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Visual Style & Environment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card title="Art Style"><p>{gameData.visualStyle.artStyle}</p></Card>
                  <Card title="Color Palette"><p>{gameData.visualStyle.colorPalette}</p></Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  {gameData.locations.map(loc => (
                      <LocationCard 
                          key={loc.name}
                          name={loc.name}
                          description={loc.description}
                          imageUrl={locationImages[loc.name] || 'https://picsum.photos/800/600'}
                      />
                  ))}
              </div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Asset Creation Pipeline</h3>
              <div className="space-y-8">
                <Card title="Character Assets">
                  <p className="mb-4">{gameData.assetCreationPipeline.characterAssets.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 list-disc list-inside text-gray-300">
                    {gameData.assetCreationPipeline.characterAssets.assetList.map((asset, index) => (
                      <li key={index}>{asset}</li>
                    ))}
                  </ul>
                </Card>
                <Card title="Weapon Assets">
                  <p className="mb-4">{gameData.assetCreationPipeline.weaponAssets.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 list-disc list-inside text-gray-300">
                    {gameData.assetCreationPipeline.weaponAssets.assetList.map((asset, index) => (
                      <li key={index}>{asset}</li>
                    ))}
                  </ul>
                </Card>
                <Card title="Environment Assets">
                  <p className="mb-4">{gameData.assetCreationPipeline.environmentAssets.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 list-disc list-inside text-gray-300">
                    {gameData.assetCreationPipeline.environmentAssets.assetList.map((asset, index) => (
                      <li key={index}>{asset}</li>
                    ))}
                  </ul>
                </Card>
                <Card title="Vehicle Assets">
                  <p className="mb-4">{gameData.assetCreationPipeline.vehicleAssets.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 list-disc list-inside text-gray-300">
                    {gameData.assetCreationPipeline.vehicleAssets.assetList.map((asset, index) => (
                      <li key={index}>{asset}</li>
                    ))}
                  </ul>
                </Card>
                <Card title="Audio Assets">
                  <p className="mb-4">{gameData.assetCreationPipeline.audioAssets.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 list-disc list-inside text-gray-300">
                    {gameData.assetCreationPipeline.audioAssets.assetList.map((asset, index) => (
                      <li key={index}>{asset}</li>
                    ))}
                  </ul>
                </Card>
                <Card title="Asset Pipeline Details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">Naming Conventions</h5>
                      <p className="text-gray-300 font-mono">{gameData.assetCreationPipeline.pipelineDetails.namingConventions}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">Polycount Target</h5>
                      <p className="text-gray-300 font-mono">{gameData.assetCreationPipeline.pipelineDetails.polycountTarget}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">LOD Levels</h5>
                      <p className="text-gray-300 font-mono">{gameData.assetCreationPipeline.pipelineDetails.lodLevels}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">Texture Map Types</h5>
                      <ul className="list-disc list-inside text-gray-300 font-mono">
                        {gameData.assetCreationPipeline.pipelineDetails.textureMapTypes.map(type => <li key={type}>{type}</li>)}
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
          </Section>
          
          <Section title="Weapons & Equipment">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Firearms</h3>
            <div className="space-y-8">
              {gameData.weapons.map(weapon => (
                <div key={weapon.name} className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                  <h4 className="text-2xl font-bold text-yellow-500">{weapon.name} <span className="text-lg font-normal text-gray-400 ml-2">({weapon.type})</span></h4>
                  <p className="text-gray-300 mt-2 mb-4">{weapon.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">3D Reference</h5>
                      <p className="text-gray-300">{weapon.threeDReference}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">Specifications</h5>
                      <p className="text-gray-300 whitespace-pre-line">{weapon.specs}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">Sound Profile</h5>
                      <p className="text-gray-300">{weapon.soundDescription}</p>
                    </div>
                     <div>
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">Physics</h5>
                      <p className="text-gray-300">{weapon.physicsSpecs}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">Recoil Pattern</h5>
                      <p className="text-gray-300">{weapon.recoilPattern}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">Reload Animation</h5>
                      <p className="text-gray-300">{weapon.reloadAnimation}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h5 className="font-semibold text-yellow-400 mb-1 uppercase tracking-wider">Environmental Acoustics</h5>
                      <p className="text-gray-300">{weapon.environmentalAcoustics}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Gear & Devices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameData.equipment.map(item => (
                <Card key={item.name} title={`${item.name} - ${item.type}`}>
                  <p className="font-semibold text-gray-400">Description:</p>
                  <p className="mb-2">{item.description}</p>
                  <p className="font-semibold text-gray-400">3D Reference:</p>
                  <p>{item.threeDReference}</p>
                </Card>
              ))}
            </div>
          </Section>

          {gameData.levelBlueprints && (
            <Section title="Ultra-Real Level Blueprints">
              <div className="space-y-8">
                {gameData.levelBlueprints.map((blueprint, index) => (
                  <LevelBlueprintCard key={blueprint.title} blueprint={blueprint} index={index} />
                ))}
              </div>
            </Section>
          )}

          {gameData.trailerScript && (
            <Section title="Trailer Script">
              <TrailerScriptDisplay script={gameData.trailerScript} />
            </Section>
          )}

          <Section title="Enemy AI (AI Systems)">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Core Logic & Behaviors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Patrol > Chase > Engage > Retreat"><p>{gameData.enemyAI.patrolChaseEngageRetreat}</p></Card>
                <Card title="Flanking Behavior"><p>{gameData.enemyAI.flankingBehavior}</p></Card>
                <Card title="Urban Corner-Peek AI"><p>{gameData.enemyAI.urbanCornerPeek}</p></Card>
                <Card title="Grenade Logic"><p>{gameData.enemyAI.grenadeLogic}</p></Card>
                <Card title="Suppressive Fire Logic"><p>{gameData.enemyAI.suppressiveFire}</p></Card>
                <Card title="Noise Reaction"><p>{gameData.enemyAI.noiseReaction}</p></Card>
                <Card title="Night Vision Limitations"><p>{gameData.enemyAI.nightVisionLimitations}</p></Card>
                <Card title="Fear / Morale System"><p>{gameData.enemyAI.fearMoraleSystem}</p></Card>
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Technical Blueprints</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Behavior Tree Diagram">
                    <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-900 p-4 rounded-md">{gameData.enemyAI.behaviorTreeDiagram}</pre>
                </Card>
                <Card title="Code Skeleton">
                    <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-900 p-4 rounded-md">{gameData.enemyAI.codeSkeleton}</pre>
                </Card>
                <Card title="AI States & Transitions">
                    <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-900 p-4 rounded-md">{gameData.enemyAI.aiStatesAndTransitions}</pre>
                </Card>
                <Card title="Debug Mode Script">
                    <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-900 p-4 rounded-md">{gameData.enemyAI.debugModeScript}</pre>
                </Card>
            </div>
          </Section>

          {gameData.replitReadyOutputs && (
            <Section title="Replit Code Templates">
              <p className="text-gray-400 mb-6">{gameData.replitReadyOutputs.description}</p>
              
              <Card title="Project Folder Structure">
                <pre className="whitespace-pre text-sm font-mono bg-gray-900 p-4 rounded-md w-full overflow-x-auto">
                  <code>{gameData.replitReadyOutputs.folderStructure}</code>
                </pre>
              </Card>

              <h3 className="text-2xl font-bold text-yellow-400 mt-10 mb-4">Code Scaffolding</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {gameData.replitReadyOutputs.codeTemplates.map(template => (
                  <Card key={template.filePath} title={template.filePath}>
                     <div className="mb-2">
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
                            {template.language}
                        </span>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-900 p-4 rounded-md w-full overflow-x-auto">
                      <code>{template.code}</code>
                    </pre>
                  </Card>
                ))}
              </div>
            </Section>
          )}

          <Section title="QA & Deployment Plan">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Testing Protocols"><p className="whitespace-pre-line">{gameData.qaBuildDeploymentPlan.testingProtocols}</p></Card>
                <Card title="Optimization Guide"><p className="whitespace-pre-line">{gameData.qaBuildDeploymentPlan.optimizationGuide}</p></Card>
                <Card title="WebGL Memory Guidelines"><p className="whitespace-pre-line">{gameData.qaBuildDeploymentPlan.webglMemoryGuidelines}</p></Card>
                <Card title="Build Pipeline"><p className="whitespace-pre-line">{gameData.qaBuildDeploymentPlan.buildPipeline}</p></Card>
                <Card title="Post-Launch Update Roadmap"><p className="whitespace-pre-line">{gameData.qaBuildDeploymentPlan.postLaunchUpdateRoadmap}</p></Card>
                <Card title="Performance Benchmarks"><p className="whitespace-pre-line">{gameData.qaBuildDeploymentPlan.performanceBenchmarks}</p></Card>
            </div>
          </Section>

          <Section title="Notes for Artists">
            <Card title="Artistic & Cultural Direction">
                <p className="whitespace-pre-line">{gameData.notesForArtists}</p>
            </Card>
          </Section>

          <Section title="Cultural Authenticity Checklist">
            <Card title="Guidelines & Review">
                <p className="whitespace-pre-line">{gameData.culturalAuthenticityChecklist}</p>
            </Card>
          </Section>
          
          {gameData.multiplayerModule && (
            <Section title="Multiplayer Module (Optional Blueprint)">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Co-op Mode (2-4 Players)">
                  <p>{gameData.multiplayerModule.coOpMode}</p>
                </Card>
                <Card title="Leaderboards">
                  <p>{gameData.multiplayerModule.leaderboards}</p>
                </Card>
                <Card title="Spectator Mode">
                  <p>{gameData.multiplayerModule.spectatorMode}</p>
                </Card>
                <Card title="Lobby System">
                  <p>{gameData.multiplayerModule.lobbySystem}</p>
                </Card>
                <Card title="Netcode Structure">
                  <p>{gameData.multiplayerModule.netcodeStructure}</p>
                </Card>
                <Card title="Anti-Cheat Basics">
                  <p>{gameData.multiplayerModule.antiCheatBasics}</p>
                </Card>
              </div>
            </Section>
          )}

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
