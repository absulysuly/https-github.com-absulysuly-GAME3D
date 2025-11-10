'use client';

import { useEffect, useMemo, useState } from 'react';
import Card from '@/components/Card';
import JsonModal from '@/components/JsonModal';
import LocationCard from '@/components/LocationCard';
import Section from '@/components/Section';
import TopNavBar, { NavigationSection } from '@/components/TopNavBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { GameConcept } from '@/types';
import { fetchGameConcept } from '@/services/gameConceptService';

const locationImages: Record<string, string> = {
  'Slemani (Sulaymaniyah)': 'https://picsum.photos/seed/slemani/800/600',
  'Erbil (Hawler)': 'https://picsum.photos/seed/erbil/800/600',
  Duhok: 'https://picsum.photos/seed/duhok/800/600',
  Mosul: 'https://picsum.photos/seed/mosul/800/600',
  Baghdad: 'https://picsum.photos/seed/baghdad/800/600',
};

export default function HomePage() {
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
        setError('Failed to load game concept. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    void loadGameConcept();
  }, []);

  const navigationSections: NavigationSection[] = useMemo(
    () => [
      { id: 'narrative', label: 'Narrative' },
      { id: 'visual-style', label: 'Visuals' },
      { id: 'mechanics', label: 'Mechanics' },
      { id: 'missions', label: 'Missions' },
      { id: 'factions', label: 'Factions' },
      { id: 'audio', label: 'Audio' },
    ],
    []
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-red-400">
        <div className="rounded-lg border border-red-500 bg-red-900/20 p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold">An Error Occurred</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!gameData) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <TopNavBar
        onOpenJson={() => setIsJsonModalOpen(true)}
        sections={navigationSections}
      />

      <header
        className="relative flex h-[26rem] items-center justify-center overflow-hidden text-center"
      >
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/kurdistan/1920/1080"
            alt="Kurdistan mountains"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-extrabold uppercase tracking-widest text-white drop-shadow-lg md:text-7xl">
            {gameData.title}
          </h1>
          <p className="mt-2 text-lg text-yellow-400 md:text-xl">
            A Tactical FPS Game Concept
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-12">
        <Section id="narrative" title="Core Concept & Narrative">
          <div className="space-y-6">
            <Card title="Player Role">
              <p>{gameData.narrative.playerRole}</p>
            </Card>
            <Card title="Story Arc">
              <p>{gameData.narrative.storyArc}</p>
            </Card>
            <Card title="Historical Fidelity">
              <p>{gameData.narrative.historicalFidelity}</p>
            </Card>
          </div>
        </Section>

        <Section id="visual-style" title="Visual Style & Environment">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card title="Art Style">
              <p>{gameData.visualStyle.artStyle}</p>
            </Card>
            <Card title="Color Palette">
              <p>{gameData.visualStyle.colorPalette}</p>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {gameData.locations.map((loc) => (
              <LocationCard
                key={loc.name}
                name={loc.name}
                description={loc.description}
                imageUrl={locationImages[loc.name] ?? 'https://picsum.photos/800/600'}
              />
            ))}
          </div>
        </Section>

        <Section id="mechanics" title="Key Gameplay Mechanics">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gameData.gameplayMechanics.map((mech) => (
              <Card key={mech.name} title={mech.name}>
                <p>{mech.description}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="missions" title="Mission Structure">
          <div className="space-y-6">
            {gameData.missions.map((mission) => (
              <div
                key={mission.title}
                className="rounded-r-lg border-l-4 border-yellow-600 bg-slate-800/60 p-6 shadow-md"
              >
                <h3 className="text-xl font-bold text-yellow-400">
                  {mission.title}
                </h3>
                <p className="mb-2 text-sm text-slate-400">
                  Location: {mission.location}
                </p>
                <p className="text-slate-200">{mission.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="factions" title="Character & Faction Depth">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gameData.factions.map((faction) => (
              <Card key={faction.name} title={faction.name}>
                <p>{faction.description}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="audio" title="Audio & Atmosphere">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card title="Soundtrack">
              <p>{gameData.audio.soundtrack}</p>
            </Card>
            <Card title="Audio & Dialogue">
              <p>{gameData.audio.soundEffects}</p>
            </Card>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center text-slate-400 md:flex-row md:text-left">
          <p className="text-sm">
            Game concept generated by Google Gemini API.
          </p>
          <button
            type="button"
            onClick={() => setIsJsonModalOpen(true)}
            className="rounded-md bg-yellow-500/10 px-5 py-2 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            View/Download Generated JSON
          </button>
        </div>
      </footer>

      <JsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        jsonData={gameData}
      />
    </div>
  );
}
