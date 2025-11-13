// From Sixth Movement
export interface CutsceneScript {
  scene: string;
  description: string;
  dialogue: string[]; // Simplified from array of objects
}

export interface VoiceLine {
  language: string;
  line: string;
  translation: string;
}

export interface VoiceActingScript {
  character: string;
  type: string;
  lines: string[]; // Simplified from array of objects
}

export interface VoiceActingScriptPack {
  scripts: VoiceActingScript[];
}

export interface GreyboxMap {
  mission: string;
  layout: string;
}

export interface CharacterModelingSheet {
  character: string;
  details: { key: string; value: string }[];
}

export interface PolycountGuidelineCategory {
  category: string;
  guidelines: { item: string; polycount: string }[];
}

export interface AIStateMachine {
  type: string;
  states: string[];
  details: string[];
}

export interface DynamicWeather {
  presets: string[];
  effects: string[];
}

export interface CombatBalanceSheet {
  playerDamage: { weapon: string; damage: string }[];
  enemyArmor: { level: string; absorption: string }[];
}

export interface SFXProductionBible {
  weaponSounds: string[];
  footsteps: string[];
  voices: string[];
}

export interface MusicProductionMap {
  emotionalZones: string[];
}

// From Seventh Movement
export interface GDDSection {
  title: string;
  pages: string;
  content: string[];
}

export interface TVEpisode {
  episodeNumber: number;
  title: string;
}

export interface TVSeriesAdaptation {
  seasonTitle: string;
  episodes: TVEpisode[];
  details: string[];
}

export interface DLC {
  year: number;
  title: string;
  content: string[];
}

export interface DialogueChoice {
  choice: string;
  response: string;
}

export interface DialogueScene {
  character: string;
  trigger: string;
  choices: DialogueChoice[];
}

export interface Philosophy {
  principles: string[];
}

export interface EnemyPhilosophyBible {
  falconPhilosophy: Philosophy;
  sirwanCounterPhilosophy: Philosophy;
  description: string;
}

export interface ColorPaletteItem {
  name: string;
  hex: string;
}

export interface ArtIdentityLanguage {
  colorPalette: ColorPaletteItem[];
  shapeLanguage: string[];
  lightingLanguage: string[];
}

export interface MusicAlbumFull {
  tracks: string[];
}

// From Eighth Movement
export interface ScreenplayPart {
  type: 'NARRATION' | 'DIALOGUE' | 'ACTION' | 'SFX' | 'CAMERA' | 'CUT_TO';
  character?: string;
  language?: string;
  content: string;
}
export interface ScreenplayScene {
  sceneNumber: number;
  title: string;
  setting: string;
  parts: ScreenplayPart[];
}
export interface MainCinematicScreenplay {
  filmTitle: string;
  runtime: string;
  screenplayStyle: string;
  scenes: ScreenplayScene[];
}

export interface MissionScreenplay {
  missionNumber: number;
  title: string;
  objective: string;
  setting?: string;
  sceneType?: string;
  cameraLanguage?: string[];
  cinematicNotes?: string[];
  scriptedMoments: string[]; // Simplified from array of objects
  endingCutscene: string;
}

export interface CameraBlueprint {
  shotName: string;
  description: string[];
  meaning: string;
}

export interface TrailerScriptPart {
  type: 'V.O.' | 'CUT' | 'TITLE_CARD';
  character?: string;
  language?: string;
  content: string;
}
export interface OfficialTrailerScript {
  parts: TrailerScriptPart[];
}

export interface CulturalAuthenticityChecklist {
  pillars: string[];
}

// New interface for CombatChoreography
export interface CombatChoreography {
  character: string;
  stylePoints: string[];
}

// From Ninth Movement
export interface CompanionDynamicsSystem {
  description: string;
  trackedStats: { stat: string; description: string }[];
  exampleEvents: { event: string; impact: string }[];
}

export interface EmotionalBond {
  title: string;
  description: string;
  exampleScene: string;
}

export interface EmotionalBonds {
  bonds: EmotionalBond[];
}

export interface DecisionChoice {
  choice: string;
  impacts: string[];
}

export interface KeyDecisionNode {
  nodeId: string;
  title: string;
  mission: string;
  choices: DecisionChoice[];
}

export interface BranchingNarrativeTrees {
  description: string;
  nodes: KeyDecisionNode[];
}

export interface DynamicCinematics {
  description: string;
  exampleScene: {
    scene: string;
    highLoyalty: string;
    lowLoyalty: string;
  };
}

export interface AlternateEnding {
  endingId: string;
  title: string;
  conditions: string;
  outcome: string;
}

export interface EmotionalArcMapEntry {
  mission: string;
  sirwan: string;
  nadia: string;
  araz: string;
  shakar: string;
}

export interface EmotionalArcMapping {
  description: string;
  mapping: EmotionalArcMapEntry[];
}

export interface PsychologicalProfile {
  character: string;
  title: string;
  coreFear: string;
  coreDesire: string;
  defenseMechanism: string;
  triggeredBy: string;
}

export interface DynamicNarrativeLogic {
  description: string;
  trackedVariables: string[];
  dynamicChanges: string[];
}

export interface HeartsOfTheMountains {
  companionDynamicsSystem: CompanionDynamicsSystem;
  subtleRomanceAndEmotionalBonds: EmotionalBonds;
  branchingNarrativeTrees: BranchingNarrativeTrees;
  dynamicCinematics: DynamicCinematics;
  alternateEndings: AlternateEnding[];
  emotionalArcMapping: EmotionalArcMapping;
  psychologicalProfiles: PsychologicalProfile[];
  dynamicNarrativeLogic: DynamicNarrativeLogic;
}

export interface CinematicScripture {
  mainCinematicScreenplay: MainCinematicScreenplay;
  missionScreenplays: MissionScreenplay[];
  cameraBlueprintLibrary: CameraBlueprint[];
  combatChoreography: CombatChoreography[];
  officialTrailerScript: OfficialTrailerScript;
  culturalAuthenticityChecklist: CulturalAuthenticityChecklist;
}

export interface TitanCodex {
  openingCutsceneScript: CutsceneScript;
  voiceActingScriptPack: VoiceActingScriptPack;
  levelDesignGreyboxMaps: GreyboxMap[];
  characterModelingSheets: CharacterModelingSheet[];
  polycountGuidelines: PolycountGuidelineCategory[];
  aiStateMachines: AIStateMachine[];
  dynamicWeatherSystem: DynamicWeather;
  combatBalanceSheets: CombatBalanceSheet;
  sfxProductionBible: SFXProductionBible;
  musicProductionMap: MusicProductionMap;
}

export interface EternalScripture {
  gddMasterIndex: GDDSection[];
  tvSeriesAdaptation: TVSeriesAdaptation;
  dlcRoadmap: DLC[];
  companionDialogueTrees: DialogueScene[];
  enemyPhilosophyBible: EnemyPhilosophyBible;
  artIdentityLanguage: ArtIdentityLanguage;
  musicAlbum: MusicAlbumFull;
}

export interface GameData {
  titanCodex: TitanCodex;
  eternalScripture: EternalScripture;
  cinematicScripture: CinematicScripture;
  heartsOfTheMountains: HeartsOfTheMountains;
}