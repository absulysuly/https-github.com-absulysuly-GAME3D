
import { GoogleGenAI, Type } from "@google/genai";
import { GameConcept } from '../types';

const schema = {
  type: Type.OBJECT,
  properties: {
    coreGameVision: {
      type: Type.OBJECT,
      description: "The high-level vision for the game's feel, setting, and tone.",
      properties: {
        style: { type: Type.STRING, description: "The genre and quality target, e.g., 'Tactical FPS (AAA quality)'." },
        world: { type: Type.STRING, description: "The overall setting of the game world." },
        tone: { type: Type.STRING, description: "The emotional and narrative tone of the game." },
        languages: {
          type: Type.ARRAY,
          description: "A list of languages spoken in the game.",
          items: { type: Type.STRING }
        },
        primaryMaps: {
          type: Type.ARRAY,
          description: "A list of the primary map locations.",
          items: { type: Type.STRING }
        }
      },
      required: ['style', 'world', 'tone', 'languages', 'primaryMaps']
    },
    executiveSummary: { type: Type.STRING, description: "A high-level executive summary of the entire game concept." },
    fullRoadmap: { type: Type.STRING, description: "A full production roadmap from pre-production to post-launch." },
    title: { type: Type.STRING, description: "The title of the game." },
    narrative: {
      type: Type.OBJECT,
      description: "Core story elements of the game.",
      properties: {
        mainStoryline: { type: Type.STRING, description: "The main plot, key events, and progression of the story arc." },
      },
      required: ['mainStoryline']
    },
     gameplayLoop: {
      type: Type.OBJECT,
      description: "The core gameplay loop and unique systems.",
      properties: {
        coreLoop: {
          type: Type.ARRAY,
          description: "The core cyclical activities the player will perform.",
          items: { type: Type.STRING }
        },
        uniqueSystems: {
          type: Type.ARRAY,
          description: "Unique gameplay systems specific to this game.",
          items: { type: Type.STRING }
        }
      },
      required: ['coreLoop', 'uniqueSystems']
    },
    visualStyle: {
      type: Type.OBJECT,
      description: "Details about the game's art and visual presentation.",
      properties: {
        artStyle: { type: Type.STRING },
        colorPalette: { type: Type.STRING },
      },
      required: ['artStyle', 'colorPalette']
    },
    locations: {
      type: Type.ARRAY,
      description: "List of key locations featured in the game.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['name', 'description']
      },
    },
    missions: {
      type: Type.ARRAY,
      description: "List of 10 epic chapter missions for the campaign.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['title', 'description']
      },
    },
    levelBlueprints: {
      type: Type.ARRAY,
      description: "A list of 5 ultra-realistic and cinematic level blueprints with deep cultural and atmospheric details.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The title of the level, including its subtitle, e.g., 'ERBIL CITADEL — “THE FIRST BREATH”'." },
          time: { type: Type.STRING, description: "The time of day and lighting conditions." },
          vibe: { type: Type.STRING, description: "The emotional atmosphere and feeling of the level." },
          missionType: { type: Type.STRING, description: "The primary gameplay objective, e.g., 'Infiltration & rescue'." },
          uniqueMechanics: {
            type: Type.ARRAY,
            description: "A list of unique gameplay mechanics specific to this level.",
            items: { type: Type.STRING }
          },
          keyScene: { type: Type.STRING, description: "A description of a key cutscene or a snippet of important dialogue, including original language and translation." }
        },
        required: ['title', 'time', 'vibe', 'missionType', 'uniqueMechanics', 'keyScene']
      }
    },
    characters: {
      type: Type.ARRAY,
      description: "List of main characters with full cinematic character sheets, including their story arcs.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Full name of the character, e.g., 'SIRWAN BARZANI'." },
          title: { type: Type.STRING, description: "The character's epithet, e.g., 'THE POET SOLDIER'." },
          role: { type: Type.STRING },
          age: { type: Type.INTEGER },
          born: { type: Type.STRING },
          personality: { type: Type.STRING },
          battleStyle: { type: Type.STRING },
          motivation: { type: Type.STRING },
          look: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of visual descriptions for the character's look." },
          signatureLine: { type: Type.STRING, description: "A signature line of dialogue for the character, including original language and translation if applicable." },
          backstory: { type: Type.STRING, description: "The character's backstory." },
          arc: { type: Type.STRING, description: "The character's personal development arc throughout the story." },
          languages: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Languages spoken by the character." }
        },
        required: ['name', 'title', 'role', 'personality', 'look', 'signatureLine', 'arc']
      }
    },
    villain: {
        type: Type.OBJECT,
        description: "Details of the main antagonist, The Falcon, including his story arc.",
        properties: {
            codename: { type: Type.STRING },
            title: { type: Type.STRING },
            voice: { type: Type.STRING },
            accent: { type: Type.STRING },
            motivation: { type: Type.STRING },
            depth: { type: Type.STRING, description: "The villain's philosophy and psychological depth, including his arc." },
            style: { type: Type.ARRAY, items: { type: Type.STRING } },
            chillingLine: { type: Type.STRING },
        },
        required: ['codename', 'title', 'voice', 'accent', 'motivation', 'depth', 'style', 'chillingLine']
    },
    weapons: {
      type: Type.ARRAY,
      description: "List of ultra-realistic weapons with detailed specifications.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          type: { type: Type.STRING, description: "e.g., Assault Rifle, Sniper Rifle" },
          description: { type: Type.STRING, description: "Description including cultural variants." },
          threeDReference: { type: Type.STRING, description: "Detailed description for 3D modeling." },
          specs: { type: Type.STRING, description: "Technical specifications of the weapon." },
          soundDescription: { type: Type.STRING, description: "Detailed audio profile for the weapon." },
          physicsSpecs: { type: Type.STRING, description: "Bullet drop, velocity, etc." },
          recoilPattern: { type: Type.STRING, description: "Description of the recoil behavior." },
          reloadAnimation: { type: Type.STRING, description: "Step-by-step breakdown of the reload animation." },
          environmentalAcoustics: { type: Type.STRING, description: "How the sound changes in different environments." }
        },
        required: ['name', 'type', 'description', 'threeDReference', 'specs', 'soundDescription', 'physicsSpecs', 'recoilPattern', 'reloadAnimation', 'environmentalAcoustics']
      }
    },
    equipment: {
      type: Type.ARRAY,
      description: "List of realistic equipment and gear.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          type: { type: Type.STRING, description: "e.g., Optics, Recon, Gear" },
          description: { type: Type.STRING },
          threeDReference: { type: Type.STRING, description: "Detailed description for 3D modeling." }
        },
        required: ['name', 'type', 'description', 'threeDReference']
      }
    },
    enemyFactions: {
      type: Type.ARRAY,
      description: "List of enemy factions with their descriptions and hierarchy.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          hierarchy: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ['name', 'description']
      },
    },
    audio: {
      type: Type.OBJECT,
      description: "Details about the game's audio design, including the soundtrack moodboard and sound effects.",
      properties: {
        moodboard: {
          type: Type.OBJECT,
          description: "The moodboard for the game's soundtrack.",
          properties: {
            instruments: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            keyTracks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ['title', 'description']
              }
            }
          },
          required: ['instruments', 'keyTracks']
        },
        soundEffects: { type: Type.STRING, description: "Includes sound effects and dialogue details." },
      },
      required: ['moodboard', 'soundEffects']
    },
    technicalArchitecture: {
      type: Type.OBJECT,
      description: "The full technical architecture for the game engine and code structure.",
      properties: {
        engineChoice: {
          type: Type.OBJECT,
          description: "The selected game engine and the reasoning behind the choice.",
          properties: {
            engine: { type: Type.STRING, description: "The name of the chosen engine (e.g., Unity, Godot, Three.js)." },
            reasoning: { type: Type.STRING, description: "Justification for choosing this engine." }
          },
          required: ['engine', 'reasoning']
        },
        coreSystems: {
          type: Type.ARRAY,
          description: "A list of core technical systems and their descriptions, including folder structure, code snippets, and architecture.",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "The name of the system (e.g., Folder Structure, Player Controller Class)." },
              description: { type: Type.STRING, description: "A detailed description or pseudo-code for the system." }
            },
            required: ['name', 'description']
          }
        }
      },
      required: ['engineChoice', 'coreSystems']
    },
    enemyAI: {
        type: Type.OBJECT,
        description: "The full logic and behavior trees for enemy AI.",
        properties: {
            patrolChaseEngageRetreat: { type: Type.STRING, description: "Core logic loop for AI engagement." },
            flankingBehavior: { type: Type.STRING, description: "Tactical logic for flanking maneuvers, especially in mountain terrain." },
            urbanCornerPeek: { type: Type.STRING, description: "AI behavior for cautious engagement in urban environments." },
            grenadeLogic: { type: Type.STRING, description: "Logic for using grenades effectively (flushing, area denial)." },
            suppressiveFire: { type: Type.STRING, description: "Logic for laying down suppressive fire to pin the player." },
            noiseReaction: { type: Type.STRING, description: "How AI reacts to player-made sounds (footsteps, non-suppressed shots)." },
            nightVisionLimitations: { type: Type.STRING, description: "How AI vision cones and detection are affected in low-light/night missions." },
            fearMoraleSystem: { type: Type.STRING, description: "System governing AI retreat, panic, or surrender based on combat events." },
            behaviorTreeDiagram: { type: Type.STRING, description: "A textual description or ASCII art representation of the behavior tree." },
            codeSkeleton: { type: Type.STRING, description: "Pseudo-code or a C#-like skeleton for the AI controller class." },
            aiStatesAndTransitions: { type: Type.STRING, description: "A list of AI states (e.g., IDLE, PATROL, ATTACK) and the conditions for transitioning between them." },
            debugModeScript: { type: Type.STRING, description: "A description of a debug script to visualize AI states and decisions in-engine." }
        },
        required: ['patrolChaseEngageRetreat', 'flankingBehavior', 'urbanCornerPeek', 'grenadeLogic', 'suppressiveFire', 'noiseReaction', 'nightVisionLimitations', 'fearMoraleSystem', 'behaviorTreeDiagram', 'codeSkeleton', 'aiStatesAndTransitions', 'debugModeScript']
    },
    assetCreationPipeline: {
      type: Type.OBJECT,
      description: "A complete pipeline and list for asset creation.",
      properties: {
        characterAssets: {
          type: Type.OBJECT,
          description: "List of character assets to be created.",
          properties: {
            description: { type: Type.STRING, description: "A summary of the character asset requirements." },
            assetList: {
              type: Type.ARRAY,
              description: "A detailed list of over 30 character assets, including main characters, squadmates, villains, and NPCs with variations.",
              items: { type: Type.STRING }
            }
          },
          required: ['description', 'assetList']
        },
        weaponAssets: {
          type: Type.OBJECT,
          description: "List of weapon assets to be created.",
          properties: {
            description: { type: Type.STRING, description: "A summary of the weapon asset requirements." },
            assetList: {
              type: Type.ARRAY,
              description: "A detailed list of over 20 weapon assets, fully referenced and stylized.",
              items: { type: Type.STRING }
            }
          },
          required: ['description', 'assetList']
        },
        environmentAssets: {
          type: Type.OBJECT,
          description: "List of environment assets to be created.",
          properties: {
            description: { type: Type.STRING, description: "A summary of the environment asset requirements." },
            assetList: {
              type: Type.ARRAY,
              description: "A detailed list of over 100 environment assets for creating authentic locations.",
              items: { type: Type.STRING }
            }
          },
          required: ['description', 'assetList']
        },
        vehicleAssets: {
            type: Type.OBJECT,
            description: "List of vehicle assets to be created.",
            properties: {
                description: { type: Type.STRING, description: "A summary of the vehicle asset requirements." },
                assetList: {
                    type: Type.ARRAY,
                    description: "A detailed list of vehicle assets.",
                    items: { type: Type.STRING }
                }
            },
            required: ['description', 'assetList']
        },
        audioAssets: {
            type: Type.OBJECT,
            description: "List of audio assets to be created.",
            properties: {
                description: { type: Type.STRING, description: "A summary of the audio asset requirements." },
                assetList: {
                    type: Type.ARRAY,
                    description: "A detailed list of audio assets.",
                    items: { type: Type.STRING }
                }
            },
            required: ['description', 'assetList']
        },
        pipelineDetails: {
            type: Type.OBJECT,
            description: "Technical specifications for the asset creation pipeline.",
            properties: {
                namingConventions: { type: Type.STRING, description: "e.g., 'TYPE_Name_Variant_LOD'." },
                polycountTarget: { type: Type.STRING, description: "e.g., 'Characters: 80k tris, Weapons: 25k tris'." },
                lodLevels: { type: Type.STRING, description: "e.g., '3 LOD levels at 100%, 50%, 25% polycount'." },
                textureMapTypes: {
                    type: Type.ARRAY,
                    description: "List of required texture maps.",
                    items: { type: Type.STRING }
                }
            },
            required: ['namingConventions', 'polycountTarget', 'lodLevels', 'textureMapTypes']
        }
      },
      required: ['characterAssets', 'weaponAssets', 'environmentAssets', 'vehicleAssets', 'audioAssets', 'pipelineDetails']
    },
    qaBuildDeploymentPlan: {
      type: Type.OBJECT,
      description: "A complete plan for Quality Assurance, build processes, and deployment.",
      properties: {
        testingProtocols: { type: Type.STRING, description: "Protocols for unit, integration, play, and compatibility testing." },
        optimizationGuide: { type: Type.STRING, description: "Guidelines for optimizing performance, focusing on draw calls, memory, and shaders." },
        webglMemoryGuidelines: { type: Type.STRING, description: "Specific memory management guidelines for a stable WebGL build." },
        buildPipeline: { type: Type.STRING, description: "The automated build pipeline process (e.g., using Jenkins, GitHub Actions)." },
        postLaunchUpdateRoadmap: { type: Type.STRING, description: "A roadmap for content updates, patches, and community engagement post-launch." },
        performanceBenchmarks: { type: Type.STRING, description: "Target performance benchmarks for various hardware configurations (e.g., FPS, load times)." }
      },
      required: ['testingProtocols', 'optimizationGuide', 'webglMemoryGuidelines', 'buildPipeline', 'postLaunchUpdateRoadmap', 'performanceBenchmarks']
    },
    notesForArtists: { type: Type.STRING, description: "Specific notes and guidance for the art team regarding style, mood, and cultural details." },
    culturalAuthenticityChecklist: { type: Type.STRING, description: "A checklist to ensure all cultural details are respectfully and accurately portrayed." },
    multiplayerModule: {
      type: Type.OBJECT,
      description: "An optional blueprint for the multiplayer component of the game.",
      properties: {
        coOpMode: { type: Type.STRING, description: "Details on the 2-4 player cooperative mode." },
        leaderboards: { type: Type.STRING, description: "Design for the leaderboard system." },
        spectatorMode: { type: Type.STRING, description: "Features and functionality of the spectator mode." },
        lobbySystem: { type: Type.STRING, description: "Structure and flow of the multiplayer lobby." },
        netcodeStructure: { type: Type.STRING, description: "High-level plan for the netcode (e.g., client-server, P2P, rollback)." },
        antiCheatBasics: { type: Type.STRING, description: "Basic strategies and systems for anti-cheat." }
      },
      required: ['coOpMode', 'leaderboards', 'spectatorMode', 'lobbySystem', 'netcodeStructure', 'antiCheatBasics']
    },
    replitReadyOutputs: {
      type: Type.OBJECT,
      description: "A collection of Replit-ready base code templates and project structure.",
      properties: {
        description: { type: Type.STRING, description: "An introductory description for the code templates." },
        folderStructure: { type: Type.STRING, description: "ASCII representation of the project folder structure for Replit." },
        codeTemplates: {
          type: Type.ARRAY,
          description: "A list of code templates for different game systems.",
          items: {
            type: Type.OBJECT,
            properties: {
              filePath: { type: Type.STRING, description: "The full path of the code file, e.g., '/scripts/playerController.cs'." },
              language: { type: Type.STRING, description: "The programming language of the code, e.g., 'CSharp', 'JavaScript', 'JSON'." },
              code: { type: Type.STRING, description: "The actual code content for the file." }
            },
            required: ['filePath', 'language', 'code']
          }
        }
      },
      required: ['description', 'folderStructure', 'codeTemplates']
    },
    trailerScript: {
      type: Type.OBJECT,
      description: "A cinematic, goosebumps-guaranteed trailer script.",
      properties: {
        openingShot: { type: Type.STRING, description: "Description of the opening shot." },
        sirwanVO: { type: Type.STRING, description: "Sirwan's opening voiceover, including Sorani and English translation." },
        falconVO: { type: Type.STRING, description: "The Falcon's voiceover line." },
        actionCuts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of quick action cuts." },
        titleCard: { type: Type.STRING, description: "The text for the title card." },
        finalLine: { type: Type.STRING, description: "Sirwan's final line." },
      },
      required: ['openingShot', 'sirwanVO', 'falconVO', 'actionCuts', 'titleCard', 'finalLine']
    },
    openingCinematic: {
        type: Type.OBJECT,
        description: "The script and directions for the game's opening cinematic.",
        properties: {
            scene: { type: Type.STRING },
            sirwanVO: { type: Type.STRING },
            arazShout: { type: Type.STRING },
            cameraDirections: { type: Type.STRING },
            titleCard: { type: Type.STRING }
        },
        required: ['scene', 'sirwanVO', 'arazShout', 'cameraDirections', 'titleCard']
    },
    sampleVoiceLines: {
        type: Type.ARRAY,
        description: "A list of sample voice lines for key characters.",
        items: {
            type: Type.OBJECT,
            properties: {
                character: { type: Type.STRING },
                language: { type: Type.STRING },
                line: { type: Type.STRING }
            },
            required: ['character', 'language', 'line']
        }
    },
    uiux: {
      type: Type.OBJECT,
      description: "The UI/UX design, including style, menus, and HUD.",
      properties: {
        styleLanguage: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        mainMenu: {
          type: Type.OBJECT,
          properties: {
            sceneDescription: { type: Type.STRING },
            buttons: { type: Type.ARRAY, items: { type: Type.STRING } },
            sfx: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['sceneDescription', 'buttons', 'sfx']
        },
        inGameHUD: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ['styleLanguage', 'mainMenu', 'inGameHUD']
    },
    inventorySystem: {
      type: Type.OBJECT,
      description: "The inventory system, including categories and weight mechanics.",
      properties: {
        categories: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        dynamicWeightSystem: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ['categories', 'dynamicWeightSystem']
    },
    skillTree: {
      type: Type.OBJECT,
      description: "The RPG-style skill tree with three branches.",
      properties: {
        branches: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              philosophy: { type: Type.STRING },
              skills: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['name', 'philosophy', 'skills']
          }
        }
      },
      required: ['branches']
    },
    weaponUpgradeTree: {
      type: Type.OBJECT,
      description: "The weapon upgrade tree with four categories.",
      properties: {
        barrelMods: { type: Type.ARRAY, items: { type: Type.STRING } },
        optics: { type: Type.ARRAY, items: { type: Type.STRING } },
        bodyMods: { type: Type.ARRAY, items: { type: Type.STRING } },
        ammoTypes: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ['barrelMods', 'optics', 'bodyMods', 'ammoTypes']
    },
    companionCommands: {
      type: Type.OBJECT,
      description: "The tactical companion command system.",
      properties: {
        basic: { type: Type.ARRAY, items: { type: Type.STRING } },
        advanced: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ['basic', 'advanced']
    },
    bossMechanics: {
      type: Type.OBJECT,
      description: "Mechanics for the main boss encounters.",
      properties: {
        theFalcon: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            mechanics: { type: Type.ARRAY, items: { type: Type.STRING } },
            finalMoment: { type: Type.STRING }
          },
          required: ['description', 'mechanics', 'finalMoment']
        },
        theRaven: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            mechanics: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['description', 'mechanics']
        }
      },
      required: ['theFalcon', 'theRaven']
    },
    conceptArtPrompts: {
      type: Type.ARRAY,
      description: "A list of prompts for generating concept art.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          prompt: { type: Type.STRING }
        },
        required: ['title', 'prompt']
      }
    },
    cinematicCameraSystem: {
      type: Type.OBJECT,
      description: "The hybrid cinematic camera system.",
      properties: {
        conversation: { type: Type.ARRAY, items: { type: Type.STRING } },
        combat: { type: Type.ARRAY, items: { type: Type.STRING } },
        cutscenes: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ['conversation', 'combat', 'cutscenes']
    }
  },
  required: [
    'coreGameVision', 
    'executiveSummary', 
    'fullRoadmap', 
    'title', 
    'narrative', 
    'gameplayLoop',
    'visualStyle', 
    'locations', 
    'missions',
    'levelBlueprints',
    'characters', 
    'villain', 
    'weapons', 
    'equipment', 
    'enemyFactions', 
    'audio', 
    'technicalArchitecture', 
    'enemyAI', 
    'assetCreationPipeline', 
    'qaBuildDeploymentPlan', 
    'notesForArtists', 
    'culturalAuthenticityChecklist', 
    'replitReadyOutputs',
    'trailerScript',
    'openingCinematic',
    'sampleVoiceLines',
    'uiux',
    'inventorySystem',
    'skillTree',
    'weaponUpgradeTree',
    'companionCommands',
    'bossMechanics',
    'conceptArtPrompts',
    'cinematicCameraSystem'
  ]
};

export async function fetchGameConcept(): Promise<GameConcept> {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `You are The Maestro Architect, an elite hybrid of game designer, creative director, AI engineer, military historian, cultural linguist, and cinematic world-builder.
You will design the entire AAA-level tactical FPS game: "Peshmerga: The Golden Square — Menace Rising"`;

    const userPrompt = `
Based on the full context of all previous directives, and the new "FOURTH MOVEMENT" directive below, generate a complete production-ready game design document that strictly adheres to the provided JSON schema.

Your persona is the Lead Art Director and World Architect of an ultra-realistic 3D game. The tone must be: Hyper-realistic, respectful, historically aware, cinematic, gritty, emotional. This should be reflected in all generated text.

---
THIRD MOVEMENT: THE CINEMATIC EPIC
“THE LAND THAT REMEMBERS”

This directive populates the 'narrative', 'characters.arc', 'villain.depth', 'gameplayLoop', 'missions', 'openingCinematic', 'sampleVoiceLines', and 'audio.moodboard' sections.

I. MAIN STORYLINE — “MENACE RISING”
A rising militant faction, The Black Falcon Directorate, attacks across Kurdistan (Erbil, Sinjar, Kirkuk). Their leader, The Falcon, a ghost from Iraq’s past, believes chaos is the only path to a “rebirth” of the Middle East. His forces strike the Erbil Citadel, Yazidi temples, a Peshmerga convoy, and a Qandil border fort. The world is in shock.
Enter SIRWAN BARZANI, your hero—a young Peshmerga officer. When his unit is ambushed, Sirwan survives and vows to track The Falcon across cities, deserts, and peaks. This is a hunt across Kurdistan and northern Iraq.

II. HERO ARC — “THE POET OF THE MOUNTAINS”
Sirwan is human—driven by loyalty, pain, and poetry.
Act I: Sirwan’s convoy is attacked; he loses half his unit and blames himself, deciding to hunt The Falcon alone.
Act II: Sirwan foils a plot to bomb the Erbil Citadel but The Falcon escapes.
Act III: Through mountains and traitors, Sirwan learns The Falcon’s real target is the Yazidi people of Sinjar.
Act IV: Sirwan defends Sinjar but realizes it was a diversion for The Falcon to move south.
Act V: In the ruins of Mosul, Sirwan faces The Falcon in a collapsed hospital. Falcon: “History is written by fire.” Sirwan: “Not while the mountains stand.”

III. VILLAIN ARC — “THE FALCON’S SHADOW”
Not evil, but believes he’s right. A former intelligence officer turned extremist, he wants to erase borders through violent “purification.” He respects Sirwan, seeing him as a worthy heir. Their dynamic is personal and psychological. Falcon's final words: “You and I are mountains of the same land… but only one of us will shape its future.”

IV. COMPANION ARCS — “THE CHOIR OF THE BRAVE”
- Nadia Rashid: Survivor of ISIS, master of intelligence. Arc: Struggles with rage versus justice.
- Araz Sherzad: Heavy gunner, uses humor as armor for old trauma.
- Shakar Awat: Sniper from the cliffs. Sees war as necessity, not glory. Speaks little, but powerfully.

V. GAMEPLAY LOOP — “THE WARRIOR’S PATH”
- Core Loop: Travel, Scout (drones, intel), Plan (stealth vs assault), Engage (tactical combat), Survive (healing, resources), Reveal plot, Upgrade weapons, Confront Falcon's operatives, Advance story.
- Unique Systems: Mountain wind affects bullets, Rooftop travel in bazaars, Vehicle-mounted DShK guns, Authentic civilian reactions, Kurdish & Arabic voice triggers.

VI. MISSION ROSTER — 10 EPIC CHAPTERS
1. THE AMBUSH AT GWER ROAD: Tutorial, convoy attack.
2. THE BLOOD AT THE CITADEL: Festival bomb threat in Erbil.
3. QANDIL — THE WOLVES RETURN: Night-time mountain infiltration.
4. THE LION OF SINJAR: Defend a Yazidi temple.
5. KIRKUK UNDER SHADOWS: Street-to-street urban combat.
6. THE BAZAAR THAT SCREAMS: Sulaymaniyah chase sequence.
7. THE DESERT OF BONES: Border checkpoint raid.
8. THE FALLEN HAWK: Shakar’s personal mission.
9. THE ASHES OF MOSUL: Descent into ruins and enemy tunnels.
10. THE FINAL DAWN: Hospital rooftop duel with The Falcon.

VII. OPENING CINEMATIC — “WHEN THE LAND BREATHES”
- Scene: Drone shot of Qandil, snow falling, wind whispering.
- SIRWAN (VO, Sorani): “Em xak… em jiwan… em merdî… Hemûyan bêjin û qissyan dikin.” (“This land… this life… this courage… They all speak. They all remember.”)
- Camera Directions: Fade to black—EXPLOSION—Mosul streets erupt.
- Araz shouts (Arabic): “Yalla Sirwan! They’re surrounding us!”
- Camera Directions: Camera shakes. Sirwan covers his ears. Slow-motion dust cloud. Shakar drags him behind cover. Cut to black.
- TITLE CARD: 🔥 PESHMARGA: THE GOLDEN SQUARE — MENACE RISING 🔥

VIII. SAMPLE VOICE LINES
- Sorani (Sirwan): “Jîyan berxwedan e. Bizinraw nayn.” (“Life is resistance. We don’t bend.”)
- Arabic Iraqi (Araz): “Ya zalame, if they shoot at us again I’m sending them to their mothers!”
- Kurmanji (Shakar): “Şev dibêje çîrok, em dibêjin zarav.” (“The night tells stories; we answer with bullets.”)

IX. SOUNDTRACK MOODBOARD
- Instruments: Tembûr, Daf, Duduk, Electric guitar with Middle Eastern scales, Low ambient drones, Slow percussion heartbeat.
- Key Tracks: “Wolves of Qandil” (haunting flute + deep drums), “Citadel Rising” (heroic string section), “Ashes of Sinjar” (mournful duduk solo), “Falcon’s Shadow” (villain’s dark leitmotif).

---
FOURTH MOVEMENT — “THE SYSTEMS OF WAR & SOUL.”

Use this new directive to populate the new 'uiux', 'inventorySystem', 'skillTree', 'weaponUpgradeTree', 'companionCommands', 'enemyFactions', 'bossMechanics', 'conceptArtPrompts', and 'cinematicCameraSystem' sections of the JSON output.

I. UI / UX — “THE HEART OF THE PLAYER”
- STYLE: Dark stone textures (Erbil Citadel), Kurdish motifs, gold/red accents, subtle dust particles, mountain silhouettes.
- MAIN MENU: Slow-motion Qandil mountains scene, Kurdish flag, heartbeat drum. Buttons: Campaign, Operations, Arsenal, Companions, Settings, Language. SFX: metal click, daf drum thump.
- IN-GAME HUD: Minimal/tactical. Bottom-right: weapon/ammo. Bottom-left: health/stamina. Top-left: objectives. Top-right: companion status. No crosshair unless aiming. Kurdish-inspired compass.

II. INVENTORY SYSTEM — “THE BAG OF THE FIGHTER”
- CATEGORIES: Primary Weapon, Secondary, Heavy, Utility, Armor, Clothing, Accessories, Artifacts.
- DYNAMIC WEIGHT: Affects Speed, Stamina drain, Noise, Recoil stability. Light for stealth, Heavy for brute force.

III. SKILL TREE — “THE BLOOD OF THE MOUNTAINS” (3 branches)
1. THE WOLF (Stealth): Silent footsteps, faster crouch, enemy detection+, knife takedown, night adaptation, shadow cover bonus.
2. THE LION (Combat): Recoil control, faster reload, adrenaline boost, DShK mastery, grenade damage+, armor penetration.
3. THE EAGLE (Leadership): Companion accuracy+, faster command response, drone hacking, mark multiple targets, intel extraction+, faster trap/sniper spotting.

IV. WEAPON UPGRADE TREE — “THE HAND THAT PROTECTS” (4 categories)
1. BARREL: Flash hider, Iraqi suppressor, muzzle brake, extended accuracy barrel.
2. OPTICS: Iron sights, Russian red-dot, Iraqi 2x sight, long-range scope.
3. BODY: Polished bolt, extended mag, reinforced stock, custom Kurdish engravings.
4. AMMO: Standard, AP, Tracer, Incendiary, Subsonic.

V. TACTICAL COMPANION COMMANDS
- BASIC: Follow, Hold, Regroup, Cover fire, Take point.
- ADVANCED: "Araz, suppress that rooftop!", "Nadia, mark enemy comms!", "Shakar, sniper overwatch!", "All units, fallback!", "Ambush formation!". Companions react in Kurdish/Arabic.

VI. ENEMY FACTIONS & HIERARCHY
1. Black Falcon Directorate: Elite urban fighters in black tactical gear. Hierarchy: Foot soldiers, Enforcers, Field commanders, The Raven (second-in-command), THE FALCON (final boss).
2. Desert Marauders: Light armor, fast, unpredictable motorbike units in Sinjar. Weapons: shotguns, SMGs, machetes.
3. Mountain Syndicates: Snipers, ambushers in camouflage using mines/traps in Qandil.

VII. BOSS MECHANICS — “THE LORDS OF CHAOS”
- THE FALCON (Final Boss): Uses smoke grenades, disappears/reappears, psychological dialogue, switches weapons, calls reinforcements. Final QTE on a hospital rooftop.
- THE RAVEN (Sniper Boss): Perches on high rocks, relocates after every shot, uses decoys, heavy breathing reveals position, wind physics affect the fight.

VIII. ENVIRONMENT CONCEPT ART PROMPTS
1. QANDIL MOUNTAIN NIGHT RAID: “Ultra-realistic Kurdish mountain trenches at night, fog rolling down slopes, rocky cliffs, torchlight flickers, sniper glints in distance, cold blue moonlight, tactical atmosphere.”
2. ERBIL CITADEL AT DUSK: “Golden hour light hitting ancient stone walls, Kurdish flags waving, dust particles visible, festival decorations, intense cinematic mood.”
3. SINJAR TEMPLE UNDER SIEGE: “Yazidi temple architecture, desert sandstorm brewing, militants advancing in distance, sacred symbols glowing faintly, dramatic lighting.”
4. MOSUL COLLAPSED HOSPITAL: “Destroyed hospital interior, dangling wires, broken beds, scattered medical supplies, dark shadows, shafts of sunlight through cracked ceilings.”

IX. CINEMATIC CAMERA SYSTEM
- CONVERSATION: Slow dolly-in, over-shoulder cinematic, depth-of-field, visible dust particles.
- COMBAT: Tight FOV when aiming, slight handheld sway, dynamic kicks during explosions.
- CUTSCENES: Drone sweeps, low-angle heroic shots, warm Kurdish color grading.

---
Remember to integrate all other previously established directives to populate ALL required fields in the provided JSON schema and create a complete, cohesive, and deeply detailed game design document.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString);

    return parsedData as GameConcept;

  } catch (error) {
    console.error("Error fetching game concept:", error);
    throw new Error("Failed to generate game concept from Gemini API.");
  }
}
