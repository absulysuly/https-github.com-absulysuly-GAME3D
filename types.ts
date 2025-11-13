
export interface CoreGameVision {
  style: string;
  world: string;
  tone: string;
  languages: string[];
  primaryMaps: string[];
}

export interface GameConcept {
  coreGameVision: CoreGameVision;
  executiveSummary: string;
  fullRoadmap: string;
  title: string;
  narrative: Narrative;
  gameplayLoop: GameplayLoop;
  visualStyle: VisualStyle;
  locations: Location[];
  missions: Mission[];
  levelBlueprints: LevelBlueprint[];
  characters: Character[];
  villain: Villain;
  weapons: Weapon[];
  equipment: Equipment[];
  enemyFactions: EnemyFaction[];
  audio: AudioDetails;
  technicalArchitecture: TechnicalArchitecture;
  enemyAI: EnemyAI;
  assetCreationPipeline: AssetCreationPipeline;
  qaBuildDeploymentPlan: QABuildDeploymentPlan;
  notesForArtists: string;
  culturalAuthenticityChecklist: string;
  multiplayerModule?: MultiplayerModule;
  replitReadyOutputs: ReplitReadyOutputs;
  trailerScript: TrailerScript;
  openingCinematic: OpeningCinematic;
  sampleVoiceLines: SampleVoiceLine[];
  uiux: UIUX;
  inventorySystem: InventorySystem;
  skillTree: SkillTree;
  weaponUpgradeTree: WeaponUpgradeTree;
  companionCommands: CompanionCommands;
  bossMechanics: BossMechanics;
  conceptArtPrompts: ConceptArtPrompt[];
  cinematicCameraSystem: CinematicCameraSystem;
}

export interface Narrative {
  mainStoryline: string;
}

export interface GameplayLoop {
  coreLoop: string[];
  uniqueSystems: string[];
}

export interface VisualStyle {
  artStyle: string;
  colorPalette: string;
}

export interface Location {
  name: string;
  description: string;
}

export interface Mission {
  title: string;
  description: string;
}

export interface LevelBlueprint {
  title: string;
  time: string;
  vibe: string;
  missionType: string;
  uniqueMechanics: string[];
  keyScene: string;
}

export interface Character {
  name: string;
  title: string;
  role: string;
  age?: number;
  born?: string;
  personality: string;
  battleStyle?: string;
  motivation?: string;
  look: string[];
  signatureLine: string;
  backstory?: string;
  arc?: string;
  languages?: string[];
}

export interface Villain {
  codename: string;
  title: string;
  voice: string;
  accent: string;
  motivation: string;
  depth: string;
  style: string[];
  chillingLine: string;
}

export interface Weapon {
  name: string;
  type: string;
  description: string;
  threeDReference: string;
  specs: string;
  soundDescription: string;
  physicsSpecs: string;
  recoilPattern: string;
  reloadAnimation: string;
  environmentalAcoustics: string;
}

export interface Equipment {
  name: string;
  type: string;
  description: string;
  threeDReference: string;
}

export interface EnemyFaction {
  name: string;
  description: string;
  hierarchy?: string[];
}

export interface SoundtrackMoodboard {
  instruments: string[];
  keyTracks: {
    title: string;
    description: string;
  }[];
}

export interface AudioDetails {
  moodboard: SoundtrackMoodboard;
  soundEffects: string;
}

export interface EngineChoice {
  engine: string;
  reasoning: string;
}

export interface CoreSystem {
  name: string;
  description: string;
}

export interface TechnicalArchitecture {
  engineChoice: EngineChoice;
  coreSystems: CoreSystem[];
}

export interface EnemyAI {
    patrolChaseEngageRetreat: string;
    flankingBehavior: string;
    urbanCornerPeek: string;
    grenadeLogic: string;
    suppressiveFire: string;
    noiseReaction: string;
    nightVisionLimitations: string;
    fearMoraleSystem: string;
    behaviorTreeDiagram: string;
    codeSkeleton: string;
    aiStatesAndTransitions: string;
    debugModeScript: string;
}

export interface AssetCategory {
  description: string;
  assetList: string[];
}

export interface AssetPipelineDetails {
  namingConventions: string;
  polycountTarget: string;
  lodLevels: string;
  textureMapTypes: string[];
}

export interface AssetCreationPipeline {
  characterAssets: AssetCategory;
  weaponAssets: AssetCategory;
  environmentAssets: AssetCategory;
  vehicleAssets: AssetCategory;
  audioAssets: AssetCategory;
  pipelineDetails: AssetPipelineDetails;
}

export interface QABuildDeploymentPlan {
  testingProtocols: string;
  optimizationGuide: string;
  webglMemoryGuidelines: string;
  buildPipeline: string;
  postLaunchUpdateRoadmap: string;
  performanceBenchmarks: string;
}

export interface MultiplayerModule {
  coOpMode: string;
  leaderboards: string;
  spectatorMode: string;
  lobbySystem: string;
  netcodeStructure: string;
  antiCheatBasics: string;
}

export interface CodeTemplate {
  filePath: string;
  language: string;
  code: string;
}

export interface ReplitReadyOutputs {
  description: string;
  folderStructure: string;
  codeTemplates: CodeTemplate[];
}

export interface TrailerScript {
  openingShot: string;
  sirwanVO: string;
  falconVO: string;
  actionCuts: string[];
  titleCard: string;
  finalLine: string;
}

export interface OpeningCinematic {
    scene: string;
    sirwanVO: string;
    arazShout: string;
    cameraDirections: string;
    titleCard: string;
}

export interface SampleVoiceLine {
    character: string;
    language: string;
    line: string;
}

export interface UIUX {
  styleLanguage: string[];
  mainMenu: {
    sceneDescription: string;
    buttons: string[];
    sfx: string[];
  };
  inGameHUD: string[];
}

export interface InventorySystem {
  categories: string[];
  dynamicWeightSystem: string[];
}

export interface SkillBranch {
  name: string;
  philosophy: string;
  skills: string[];
}

export interface SkillTree {
  branches: SkillBranch[];
}

export interface WeaponUpgradeTree {
  barrelMods: string[];
  optics: string[];
  bodyMods: string[];
  ammoTypes: string[];
}

export interface CompanionCommands {
  basic: string[];
  advanced: string[];
}

export interface BossMechanics {
  theFalcon: {
    description: string;
    mechanics: string[];
    finalMoment: string;
  };
  theRaven: {
    description: string;
    mechanics: string[];
  };
}

export interface ConceptArtPrompt {
    title: string;
    prompt: string;
}

export interface CinematicCameraSystem {
    conversation: string[];
    combat: string[];
    cutscenes: string[];
}
