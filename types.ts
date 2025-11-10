
export interface GameConcept {
  title: string;
  narrative: Narrative;
  visualStyle: VisualStyle;
  locations: Location[];
  gameplayMechanics: GameplayMechanic[];
  missions: Mission[];
  factions: Faction[];
  audio: AudioDetails;
}

export interface Narrative {
  playerRole: string;
  storyArc: string;
  historicalFidelity: string;
}

export interface VisualStyle {
  artStyle: string;
  colorPalette: string;
}

export interface Location {
  name: string;
  description: string;
}

export interface GameplayMechanic {
  name: string;
  description: string;
}

export interface Mission {
  title: string;
  location: string;
  description: string;
}

export interface Faction {
  name: string;
  description: string;
}

export interface AudioDetails {
  soundtrack: string;
  soundEffects: string;
}
