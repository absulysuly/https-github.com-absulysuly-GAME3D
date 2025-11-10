import type { GameConcept } from '@/types';

export async function fetchGameConcept(): Promise<GameConcept> {
  const response = await fetch('/api/game-concept');

  if (!response.ok) {
    throw new Error(`Failed to fetch game concept: ${response.statusText}`);
  }

  const data = (await response.json()) as GameConcept;
  return data;
}
