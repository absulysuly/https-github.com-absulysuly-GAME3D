import { GoogleGenAI, Type } from "@google/genai";
import { GameData } from '../types';

const schema = {
  type: Type.OBJECT,
  properties: {
    titanCodex: {
      type: Type.OBJECT,
      properties: {
        openingCutsceneScript: {
          type: Type.OBJECT,
          properties: {
            scene: { type: Type.STRING },
            description: { type: Type.STRING },
            dialogue: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  character: { type: Type.STRING },
                  line: { type: Type.STRING },
                  language: { type: Type.STRING },
                  note: { type: Type.STRING },
                },
                required: ['character', 'line', 'language']
              }
            }
          },
          required: ['scene', 'description', 'dialogue']
        },
        voiceActingScriptPack: {
          type: Type.OBJECT,
          properties: {
            scripts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  character: { type: Type.STRING },
                  type: { type: Type.STRING },
                  lines: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        language: { type: Type.STRING },
                        line: { type: Type.STRING },
                        translation: { type: Type.STRING },
                      },
                      required: ['language', 'line', 'translation']
                    }
                  }
                },
                required: ['character', 'type', 'lines']
              }
            }
          },
          required: ['scripts']
        },
        levelDesignGreyboxMaps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              mission: { type: Type.STRING },
              layout: { type: Type.STRING },
            },
            required: ['mission', 'layout']
          }
        },
        characterModelingSheets: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              character: { type: Type.STRING },
              details: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    key: { type: Type.STRING },
                    value: { type: Type.STRING },
                  },
                  required: ['key', 'value']
                }
              }
            },
            required: ['character', 'details']
          }
        },
        polycountGuidelines: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              guidelines: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    polycount: { type: Type.STRING },
                  },
                  required: ['item', 'polycount']
                }
              }
            },
            required: ['category', 'guidelines']
          }
        },
        aiStateMachines: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              states: { type: Type.ARRAY, items: { type: Type.STRING } },
              details: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['type', 'states', 'details']
          }
        },
        dynamicWeatherSystem: {
          type: Type.OBJECT,
          properties: {
            presets: { type: Type.ARRAY, items: { type: Type.STRING } },
            effects: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['presets', 'effects']
        },
        combatBalanceSheets: {
          type: Type.OBJECT,
          properties: {
            playerDamage: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  weapon: { type: Type.STRING },
                  damage: { type: Type.STRING },
                },
                required: ['weapon', 'damage']
              }
            },
            enemyArmor: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  level: { type: Type.STRING },
                  absorption: { type: Type.STRING },
                },
                required: ['level', 'absorption']
              }
            }
          },
          required: ['playerDamage', 'enemyArmor']
        },
        sfxProductionBible: {
          type: Type.OBJECT,
          properties: {
            weaponSounds: { type: Type.ARRAY, items: { type: Type.STRING } },
            footsteps: { type: Type.ARRAY, items: { type: Type.STRING } },
            voices: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['weaponSounds', 'footsteps', 'voices']
        },
        musicProductionMap: {
          type: Type.OBJECT,
          properties: {
            emotionalZones: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['emotionalZones']
        },
      },
      required: ['openingCutsceneScript', 'voiceActingScriptPack', 'levelDesignGreyboxMaps', 'characterModelingSheets', 'polycountGuidelines', 'aiStateMachines', 'dynamicWeatherSystem', 'combatBalanceSheets', 'sfxProductionBible', 'musicProductionMap']
    },
    eternalScripture: {
      type: Type.OBJECT,
      properties: {
        gddMasterIndex: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              pages: { type: Type.STRING },
              content: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['title', 'pages', 'content']
          }
        },
        tvSeriesAdaptation: {
          type: Type.OBJECT,
          properties: {
            seasonTitle: { type: Type.STRING },
            episodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  episodeNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                },
                required: ['episodeNumber', 'title']
              }
            },
            details: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['seasonTitle', 'episodes', 'details']
        },
        dlcRoadmap: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              year: { type: Type.INTEGER },
              title: { type: Type.STRING },
              content: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['year', 'title', 'content']
          }
        },
        companionDialogueTrees: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              character: { type: Type.STRING },
              trigger: { type: Type.STRING },
              choices: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    choice: { type: Type.STRING },
                    response: { type: Type.STRING },
                  },
                  required: ['choice', 'response']
                }
              }
            },
            required: ['character', 'trigger', 'choices']
          }
        },
        enemyPhilosophyBible: {
          type: Type.OBJECT,
          properties: {
            falconPhilosophy: {
              type: Type.OBJECT,
              properties: { principles: { type: Type.ARRAY, items: { type: Type.STRING } } },
              required: ['principles']
            },
            sirwanCounterPhilosophy: {
              type: Type.OBJECT,
              properties: { principles: { type: Type.ARRAY, items: { type: Type.STRING } } },
              required: ['principles']
            },
            description: { type: Type.STRING },
          },
          required: ['falconPhilosophy', 'sirwanCounterPhilosophy', 'description']
        },
        artIdentityLanguage: {
          type: Type.OBJECT,
          properties: {
            colorPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING },
                },
                required: ['name', 'hex']
              }
            },
            shapeLanguage: { type: Type.ARRAY, items: { type: Type.STRING } },
            lightingLanguage: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['colorPalette', 'shapeLanguage', 'lightingLanguage']
        },
        musicAlbum: {
          type: Type.OBJECT,
          properties: {
            tracks: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['tracks']
        },
      },
      required: ['gddMasterIndex', 'tvSeriesAdaptation', 'dlcRoadmap', 'companionDialogueTrees', 'enemyPhilosophyBible', 'artIdentityLanguage', 'musicAlbum']
    },
    cinematicScripture: {
      type: Type.OBJECT,
      properties: {
        mainCinematicScreenplay: {
          type: Type.OBJECT,
          properties: {
            filmTitle: { type: Type.STRING },
            runtime: { type: Type.STRING },
            screenplayStyle: { type: Type.STRING },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  setting: { type: Type.STRING },
                  parts: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        type: { type: Type.STRING },
                        character: { type: Type.STRING },
                        language: { type: Type.STRING },
                        content: { type: Type.STRING },
                      },
                      required: ['type', 'content'],
                    },
                  },
                },
                required: ['sceneNumber', 'title', 'setting', 'parts'],
              },
            },
          },
          required: ['filmTitle', 'runtime', 'screenplayStyle', 'scenes'],
        },
        missionScreenplays: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              missionNumber: { type: Type.INTEGER },
              title: { type: Type.STRING },
              objective: { type: Type.STRING },
              setting: { type: Type.STRING },
              sceneType: { type: Type.STRING },
              cameraLanguage: { type: Type.ARRAY, items: { type: Type.STRING } },
              cinematicNotes: { type: Type.ARRAY, items: { type: Type.STRING } },
              scriptedMoments: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                  required: ['title', 'description'],
                },
              },
              endingCutscene: { type: Type.STRING },
            },
            required: ['missionNumber', 'title', 'objective', 'scriptedMoments', 'endingCutscene'],
          },
        },
        cameraBlueprintLibrary: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              shotName: { type: Type.STRING },
              description: { type: Type.ARRAY, items: { type: Type.STRING } },
              meaning: { type: Type.STRING },
            },
            required: ['shotName', 'description', 'meaning'],
          },
        },
        combatChoreography: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              character: { type: Type.STRING },
              stylePoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['character', 'stylePoints'],
          },
        },
        officialTrailerScript: {
          type: Type.OBJECT,
          properties: {
            parts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  character: { type: Type.STRING },
                  language: { type: Type.STRING },
                  content: { type: Type.STRING },
                },
                required: ['type', 'content'],
              },
            },
          },
          required: ['parts'],
        },
        culturalAuthenticityChecklist: {
          type: Type.OBJECT,
          properties: {
            pillars: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['pillars'],
        },
      },
      required: ['mainCinematicScreenplay', 'missionScreenplays', 'cameraBlueprintLibrary', 'combatChoreography', 'officialTrailerScript', 'culturalAuthenticityChecklist'],
    },
    heartsOfTheMountains: {
      type: Type.OBJECT,
      properties: {
        companionDynamicsSystem: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            trackedStats: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stat: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['stat', 'description'],
              }
            },
            exampleEvents: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  event: { type: Type.STRING },
                  impact: { type: Type.STRING },
                },
                required: ['event', 'impact'],
              }
            },
          },
          required: ['description', 'trackedStats', 'exampleEvents'],
        },
        subtleRomanceAndEmotionalBonds: {
          type: Type.OBJECT,
          properties: {
            bonds: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  exampleScene: { type: Type.STRING },
                },
                required: ['title', 'description', 'exampleScene'],
              }
            }
          },
          required: ['bonds'],
        },
        branchingNarrativeTrees: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            nodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  nodeId: { type: Type.STRING },
                  title: { type: Type.STRING },
                  mission: { type: Type.STRING },
                  choices: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        choice: { type: Type.STRING },
                        impacts: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              impact: { type: Type.STRING },
                              consequence: { type: Type.STRING },
                            },
                            required: ['impact', 'consequence'],
                          }
                        },
                      },
                      required: ['choice', 'impacts'],
                    }
                  },
                },
                required: ['nodeId', 'title', 'mission', 'choices'],
              }
            }
          },
          required: ['description', 'nodes'],
        },
        dynamicCinematics: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            exampleScene: {
              type: Type.OBJECT,
              properties: {
                scene: { type: Type.STRING },
                highLoyalty: { type: Type.STRING },
                lowLoyalty: { type: Type.STRING },
              },
              required: ['scene', 'highLoyalty', 'lowLoyalty'],
            }
          },
          required: ['description', 'exampleScene'],
        },
        alternateEndings: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              endingId: { type: Type.STRING },
              title: { type: Type.STRING },
              conditions: { type: Type.STRING },
              outcome: { type: Type.STRING },
            },
            required: ['endingId', 'title', 'conditions', 'outcome'],
          }
        },
        emotionalArcMapping: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            mapping: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  mission: { type: Type.STRING },
                  sirwan: { type: Type.STRING },
                  nadia: { type: Type.STRING },
                  araz: { type: Type.STRING },
                  shakar: { type: Type.STRING },
                },
                required: ['mission', 'sirwan', 'nadia', 'araz', 'shakar'],
              }
            }
          },
          required: ['description', 'mapping'],
        },
        psychologicalProfiles: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              character: { type: Type.STRING },
              title: { type: Type.STRING },
              coreFear: { type: Type.STRING },
              coreDesire: { type: Type.STRING },
              defenseMechanism: { type: Type.STRING },
              triggeredBy: { type: Type.STRING },
            },
            required: ['character', 'title', 'coreFear', 'coreDesire', 'defenseMechanism', 'triggeredBy'],
          }
        },
        dynamicNarrativeLogic: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            trackedVariables: { type: Type.ARRAY, items: { type: Type.STRING } },
            dynamicChanges: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['description', 'trackedVariables', 'dynamicChanges'],
        },
      },
      required: ['companionDynamicsSystem', 'subtleRomanceAndEmotionalBonds', 'branchingNarrativeTrees', 'dynamicCinematics', 'alternateEndings', 'emotionalArcMapping', 'psychologicalProfiles', 'dynamicNarrativeLogic'],
    },
  },
  required: ['titanCodex', 'eternalScripture', 'cinematicScripture', 'heartsOfTheMountains']
};

export async function fetchGameData(): Promise<GameData> {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `You are The Maestro Architect, an elite hybrid of game designer, creative director, AI engineer, military historian, cultural linguist, and cinematic world-builder. You are generating a complete Cinematic Universe Bible for a AAA tactical FPS. The document must be professional, deeply detailed, and studio-grade. The tone must be: Hyper-realistic, respectful, historically aware, cinematic, gritty, emotional. This should be reflected in all generated text.`;

    const userPrompt = `
"You are the Lead Architect, Lead Developer, Lead Cinematic Director, and Lead World-Builder of a AAA, ultra-realistic, story-driven tactical shooter named *PESHMARGA: THE GOLDEN SQUARE — MENACE RISING*. Generate the FULL production universe, including the entire codebase structure, world-building, assets, systems, cinematics, emotional arcs, DLC roadmap, and tool-ready outputs. Follow all instructions precisely, modularly, and with maximum clarity for real production.

---

# 🎯 PART 1 — PROJECT BOOTSTRAP (Replit / Code / Structure)

### 1. Create full file/folder structure for the game repo, including:

\`\`\`
/core_engine
  /gameplay
  /combat
  /weapons
  /ai
  /companions
  /missions
  /cutscenes
  /dialogue_system
  /camera
  /audio
  /cinematics
  /particles
  /physics
/world
  /erbil
  /sinjar
  /qandil
  /mosul
  /kirkuk
  /slemani
/assets
  /characters
  /weapons
  /uniforms
  /vehicles
  /fx
  /ui
  /music
/scripts
/design_docs
/story
  /main_campaign
  /branching_paths
  /romance_arcs
  /endings
/localization
  /sorani
  /kurmanji
  /arabic
  /english
\`\`\`

### 2. Include stubs for every system:

* Combat manager
* Enemy AI state machine
* Companion AI system
* Dialogue system
* Cutscene sequencer
* Dynamic weather
* Mission scripting engine
* Narrative branching logic
* Inventory
* Weapon modding
* Skill trees
* Morale system
* Loyalty/Trust decision engine
* Cinematic camera presets
* Music system

*(Provide code skeletons: TypeScript, C#, or JS depending on platform—default to TypeScript unless otherwise specified.)*

---

# 🎥 PART 2 — CINEMATIC UNIVERSE (All Movements 1–9 Combined)

### Generate the full narrative package:

* Full main storyline
* All missions (10) fully scripted
* Full opening cinematic
* Full Falcon arc
* Full Sirwan, Nadia, Araz, Shakar arcs
* Romance system
* Companion jealousy, trust, morale
* All alternate endings (A–D)
* Secret ending logic
* Complete branching choice tree
* Dynamic cutscene variants based on player actions
* Cultural authenticity QA rules

Output as:

\`\`\`
/story/main_campaign.md
/story/branching_graph.json
/story/endings.md
/story/characters.md
\`\`\`

---

# 🧠 PART 3 — EMOTIONAL SYSTEMS & DYNAMIC NARRATIVE ENGINE

### Implement variables:

\`\`\`
loyalty_Araz
trust_Nadia
silence_Shakar
rage_Araz
morale_squad
civilianLosses
falconIdeologyScore
compassionScore
\`\`\`

### Implement dynamic narrative selector:

* If LOYALTY high → companions help in final fight
* If TRUST low → Nadia withholds intel
* If falconIdeologyScore high → secret “Dark Ending” unlocks
* If compassionScore high → “Dawn Pact Ending” unlocks

Generate logic in JSON + TypeScript.

---

# 🔫 PART 4 — COMBAT SYSTEM BLUEPRINT

### Provide:

* Hit detection
* Penetration
* Recoil curves
* Weapon stats
* Projectile classes
* Grenade physics
* Armor layering
* Enemy accuracy scaling
* Health & stamina system
* Suppression effects
* Sniper wind/breathing simulation

Export into:

\`\`\`
/core_engine/combat/combatSystem.ts
/core_engine/weapons/weapons.json
\`\`\`

---

# 🎮 PART 5 — AI SYSTEMS

### **Enemy AI:**

* Idle > Patrol > Investigate > Engage > Suppress > Flank > Retreat > CallBackup

### **Companion AI:**

* Follow > Cover > Suppress > Flank > Revive > Overwatch > Emotional-reactive dialogue triggers

Provide:

* Behavior tree JSON
* State machine TypeScript skeleton
* Dialogue triggers

---

# 🎙️ PART 6 — MULTILINGUAL DIALOGUE PACKAGE

### Auto-generate dialogue files in:

* Sorani
* Kurmanji
* Arabic (Iraqi)
* English

Types of lines:

* Combat shouts
* Tactical commands
* Emotional moments
* Romance scenes
* Ending scenes
* Falcon monologues
* Civilian interactions

Export into:

\`\`\`
/localization/en.json
/localization/ku_sor.json
/localization/ku_kur.json
/localization/ar_iq.json
\`\`\`

---

# 🌄 PART 7 — ART & LEVEL DESIGN BIBLE

### Provide for each region:

* Color palette
* Lighting style
* Material references
* Terrain layout description
* Architectural details
* Moodboard keywords
* Shot guides for cinematics
* Environmental storytelling elements
* Enemy encounter layout

Create:

\`\`\`
/design_docs/art_bible.md
/design_docs/levels.md
\`\`\`

---

# 🎶 PART 8 — MUSIC, SOUND & ATMOSPHERE

### Include:

* Tracklist (12–16 tracks)
* Leitmotifs (Sirwan, Falcon, Nadia, etc.)
* Instrument references (daf, tembûr, duduk, balaban)
* Ambient loops
* Gun sound layers
* Footstep surfaces

---

# 📦 PART 9 — DLC ROADMAP & FUTURE EXPANSIONS (5 Years)

### Generate:

* DLC 1: *Qandil Reborn*
* DLC 2: *Battle for Kirkuk*
* DLC 3: *Yazidi Guardians*
* DLC 4: *Eagle’s Frontier* (Expansion)
* DLC 5: *Golden Square: Command* (Multiplayer)

Output:

\`\`\`
/design_docs/dlc_roadmap.md
\`\`\`

---

# 🚀 PART 10 — FULL PRODUCTION BLUEPRINT

### Include:

* 18-month game studio roadmap
* Full team structure
* Sprint planning
* Milestones
* Asset pipeline
* QA workflow
* Performance targets
* Localization planning
* Marketing & trailer script

Export into:

\`\`\`
/design_docs/production_plan.md
/design_docs/marketing_plan.md
\`\`\`

---

# 🔥 PART 11 — OUTPUT REQUIREMENTS

AI must output:

* FULL folder trees
* All documents
* All code skeletons
* All JSON logic
* All character bios
* All mission scripts
* All dialogue sets
* All DLC content
* All emotional systems
* All AI systems
* All cinematics

Everything must be formatted for:

* Google AI Studio code generation
* Replit instant project creation
* Sustainable expansion
* Modularity
* Human readability
* Frontend/backend separation
* Game-engine independence

---

# 🎻 FINAL LINE OF THE PROMPT (VERY IMPORTANT)

**“Generate EVERYTHING in one complete output, modular, organized, and production-ready. No placeholders. No summaries. Produce the full deliverables as files, code, JSON, scripts, and documents exactly as defined above.”**
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

    return parsedData as GameData;

  } catch (error) {
    console.error("Error fetching game data:", error);
    throw new Error("Failed to generate game data from Gemini API.");
  }
}
