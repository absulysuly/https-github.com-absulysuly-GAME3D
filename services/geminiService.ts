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
              items: { type: Type.STRING } // Simplified from array of objects
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
                    items: { type: Type.STRING } // Simplified from array of objects
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
                items: { type: Type.STRING } // Simplified from array of objects
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
                          items: { type: Type.STRING }
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
Based on the full "SIXTH MOVEMENT — THE TITAN CODEX", "SEVENTH MOVEMENT — THE ETERNAL SCRIPTURE", "EIGHTH MOVEMENT — THE CINEMATIC SCRIPTURE", and "NINTH MOVEMENT — HEARTS OF THE MOUNTAINS" directives below, generate a complete, production-ready cinematic universe bible that strictly adheres to the provided JSON schema. This prompt is the final, consolidated version and should be used as the single source of truth.

---
🌋 THE SIXTH MOVEMENT — “THE TITAN CODEX”
The deepest technical, artistic, and emotional architecture of your game.

🎬 I. COMPLETE OPENING CUTSCENE SCRIPT (CINEMATIC)
- Scene: Qandil Mountains — pre-dawn. Cold blue haze. Wind gusts. Snow dust drifting.
- Camera: Wide drone shot → descending slow tilt → focus on Sirwan walking alone.
- NARRATION (Sirwan, Sorani, calm, poetic): "Em şev ne tiştî lê bar dike… belkû xatîrekan." (“This night carries nothing… except memories.”)
- Camera: Push-in on Sirwan’s face. His breath visible in cold air.
- Sound: Low duduk note. Wind whistling.
- CUT TO: A convoy moving on a narrow mountain road.
- SFX: Distant rumbling… Then— BOOM — an IED detonates.
- Camera: Shaky handheld as Sirwan hits the ground.
- ARAZ (Arabic, shouting): “Yalla! Yalla! They hit the front!”
- NADIA (Sorani, panicked but focused): “Sirwan! Rastî le meşqeke dîka!” (“Sirwan! It’s a coordinated attack!”)
- Camera: Enemy silhouettes appear on the ridge.
- Shakar (Kurmanji, whisper): “Têne… gelek jaran têne.” (“They’re coming… many of them.”)
- Gameplay begins immediately as Sirwan grabs his AK.
---
INSTRUCTION FOR AI: Generate the dialogue in the format: "CHARACTER (LANGUAGE): \"LINE\" (NOTE)" for each dialogue entry in the opening cutscene.
---

🎙 II. VOICE ACTING SCRIPT PACK
- SIRWAN — COMMAND LINES: Sorani: “Bi min re!” (Follow me!), “Qeblî be, agahdar bin!” (Stay alert!), “Am meşqe1 daxel bikin!” (Breaching now!). Arabic (Iraqi): “Sahbi, min el-yamin!” (Bro, from the right!), “Ghadimoon!” (We advance!). English: “Move in!”, “I need cover fire!”
- ARAZ — COMBAT SHOUTS: Arabic: “Dabbaḥ-hum!” (Wipe them out!), “Taal! Taal!” (Come on, come on!). Sorani: “Baranî golê!” (Rain bullets!), “Ew li wir in!” (They’re over there!)
- SHAKAR — SNIPER LINES: Kurmanji: “Di nîşanê da ne.” (They’re in sight.), “Ez wî dikujim.” (I’ll take him.). English (whisper): “Wind… wait… shoot.”
- THE FALCON — VILLAIN MONOLOGUES: Arabic, cold and philosophical: “Al-silm wahm… wa al-nar haqiqah.” (“Peace is an illusion… fire is truth.”). English: “The land remembers war. It forgets peace.”
---
INSTRUCTION FOR AI: For each voice acting line in the Voice Acting Script Pack, generate a single string in the format: "LANGUAGE: \"LINE\" (TRANSLATION)".
---

🧱 III. LEVEL DESIGN GREYBOX MAPS (TEXT BLUEPRINTS)
- ERBIL CITADEL — MISSION 2: [START] | Narrow stair — crowds panic | [COURTYARD] | Left – sniper perch | Right – market stalls | [MAIN FORT GATE] | Bomb squad area | [BOMB SITE – INNER CHAMBER] | Cinematic triggers
- QANDIL — MISSION 3: [RIDGE ENTRANCE] | Fog corridor | [SNIPER’S BOWL] | Rocks, high cover | [WOLF TUNNELS] | Underground ambush | [OVERLOOK PLATFORM] | Enemy commander
- SINJAR TEMPLE — MISSION 4: [APPROACH ROAD] | Burning trucks | [TEMPLE COURTYARD] | Evacuation zone | [INNER SHRINE] | Defend civilians | [BACK ESCAPE ROUTE] | Vehicle chase trigger

🧍 IV. CHARACTER MODELING SHEETS (ART DIRECTOR NOTES)
- SIRWAN: Height: 1.80m, Face: Realistic Kurdish features, sharp jawline, Hair: Thick black, slightly messy, Outfit: Shal u Shepik (dark olive), Tactical vest, Kurdish scarf tied on arm, Animation notes: Calm idle, Focused battle stance, Soft breathing visible in cold levels
- NADIA: Height: 1.70m, Look: Tactical ponytail, Light armor, Headset, Animation notes: Fast movement, Tablet interaction motions
- THE FALCON: Height: 1.83m, Look: Black coat, Silver ring, Scar on right cheek, Animation notes: Slow, deliberate walking, Hands behind back, Charismatic dominance stance

🧱 V. 3D POLYCOUNT GUIDELINES (AAA STANDARD)
- Characters: Main hero: 65k – 90k polygons, Companions: 60k – 80k, Cinematic villains: 80k – 100k, Enemies: 35k – 55k, Civilians: 20k – 40k
- Weapons: Rifles: 12k – 20k, Snipers: 18k – 25k, Pistols: 6k – 10k, RPG / DShK: 25k – 45k
- Environments: Citadel walls: Mid poly + normal maps, Qandil rocks: Low-mid poly, heavy normal mapping, Mosul ruins: Modular kitbash pieces

🧠 VI. AI STATE MACHINES (FULL)
- ENEMY AI: States: Idle → Patrol → Investigate → Engage → Suppress → Retreat → Flank → CallBackup. Conditions: Sound heard → Investigate, Player spotted → Engage, Low health → Retreat, Grenade threat → Flank, Teammate killed → Suppress fire
- COMPANION AI: States: Follow → Formation → Cover → Overwatch → Heal → Revive → Flank → Snipe. Reactions: Player commands, Environmental hazards, Enemy flanking, Emotional triggers (Araz panics, Nadia gives intel, Shakar marks targets)

🌧 VII. DYNAMIC WEATHER SYSTEM
- Presets: Mountain fog (Qandil), Sandstorm (Sinjar), Heavy rain (Kirkuk), Golden hour (Erbil), Ashfall (Mosul)
- Effects: Bullet deviation, Visibility reduction, Enemy accuracy change, Sound muffling, Footstep noise variance

🔥 VIII. COMBAT BALANCE SHEETS
- Player Damage Values: AK-103: 28 dmg, Tabuk: 75 dmg, PKM: 22 dmg (rapid), RPG: 130 dmg, 1911 pistol: 20 dmg
- Enemy Armor Levels: Light armor: absorbs 10%, Medium: absorbs 25%, Elite: absorbs 45%

🎧 IX. SFX PRODUCTION BIBLE
- Weapon Sounds: Layer 1: close-range crack, Layer 2: mid-range slap, Layer 3: mountain echo, Layer 4: reverb tail
- Footsteps: Stone, dust, mud, broken concrete, temple floor, rubble
- Voices: Multi-language reactions, “Under fire!”, “Reposition!”, “Sniper on ridge!”

🎼 X. MUSIC PRODUCTION MAP
- Emotional Zones: Heroic Kurdish strings, Dark Falcon theme, Ambient warfare, Sacred Yazidi tones

---
🌌 THE SEVENTH MOVEMENT — “THE ETERNAL SCRIPTURE”
The Complete Cinematic Universe, DLC Roadmap, TV Adaptation Bible, and 200-Page GDD Core.

📘 I. THE FULL 200-PAGE GAME DESIGN DOCUMENT (GDD) – MASTER INDEX
- SECTION 1 — EXECUTIVE VISION (6 pages): Purpose, Mission statement, Artistic tone, Market positioning, Emotional impact pillars, The "Kurdistan Identity Framework"
- SECTION 2 — NARRATIVE CORE (22 pages): Complete timeline, World history, The Rise of The Falcon, Sirwan’s childhood, Nadia’s backstory, Araz’s trauma, Shakar’s history, 30+ side character profiles, Themes: memory, honor, tragedy, rebirth
- SECTION 3 — MAIN CAMPAIGN SCRIPT (20 pages): Scene-by-scene breakdown, Dialogue drafts, Cinematic transitions, Emotional pacing, Dynamic branching dialogue, Voice acting moodboards, Subtitle timing coordination
- SECTION 4 — MISSIONS (40 pages): Geometry layout, Encounter design, Lighting moodboard, Score notes, Emotional beats, Cinematic triggers, Alternative strategies, Fail conditions, Replayability systems
- SECTION 5 — AI BEHAVIOR (10 pages): Enemy AI decision trees, Companion AI behavior scripts, State machines (detailed), Aggression curves, Flock-based group tactics, Panic & morale systems
- SECTION 6 — LEVEL DESIGN BIBLE (25 pages): Maps for Erbil Citadel, Qandil, Sinjar, Mosul, Kirkuk, Slemani. Each has Top-down layout, Landmarks, Cover placement, Sniper lines, Lighting, Soundscape, Environmental storytelling
- SECTION 7 — ART BIBLE (30 pages): Style Language (motifs, silhouettes, palette), Character Sheets (orthographics, expressions), Environments (material library, PBR refs, photogrammetry pipeline)
- SECTION 8 — SYSTEMS DESIGN (20 pages): Combat balancing, Recoil curves, Grenade physics, Armor penetration, Health regen, Inventory weight, Weather modifiers, Night vision behavior
- SECTION 9 — PROGRESSION LOOPS (10 pages): Skill trees, Weapon upgrades, Companion growth arcs, Story-based unlocks, Prestige “Mountain Trials” mode
- SECTION 10 — AUDIO & MUSIC (10 pages): Full soundtrack list, Themes per faction, Instrument expansion, Voice direction, Sound FX layering, Ambient loops
- SECTION 11 — USER EXPERIENCE DESIGN (8 pages): Menu systems, HUD wireframes, Controller + M&K mapping, Onboarding flow, Tutorial pacing
- SECTION 12 — PRODUCTION ROADMAP (12 pages): 18-month studio pipeline, Teams & workflows, Asset milestones, Sprints, QA process, Soft launch plan

🎥 II. CINEMATIC SEASON SCRIPT – TV SERIES ADAPTATION (VISION DOCUMENT)
- SEASON TITLE: “THE MOUNTAIN REMEMBERS”
- EPISODE LIST (10 episodes): 1. Ashes on the Road to Gwer, 2. The Citadel’s Bloodstone, 3. The Snow Wolves of Qandil, 4. The Sinjar Circle, 5. The Bazaar That Screams, 6. The Raven’s Breath, 7. The Desert of Fifteen Graves, 8. The Second Fall of Mosul, 9. The Falcon’s Choir, 10. Final Dawn
- Each episode contains: Story arcs, Character beats, Cinematic shots, Soundtrack themes, Set piece choreography

🎮 III. DLC & FUTURE EXPANSIONS ROADMAP (5 YEARS)
- YEAR 1 – DLC PACK 1: “THE QANDIL REBORN”: Snow expansion, New stealth missions, New sniper weapons, Shakar origin story
- YEAR 2 – DLC PACK 2: “THE BATTLE FOR KIRKUK”: Urban warfare systems, Armored vehicle gameplay, New antagonist: The Crow, Oil field sabotage mission
- YEAR 3 – DLC PACK 3: “THE YAZIDI GUARDIANS”: Spiritual & mythic undertones, New protective magic artifacts, Temple defense mode, Nadia solo campaign
- YEAR 4 – OPEN WORLD EXPANSION: “THE EAGLE’S FRONTIER”: Entire Northern Iraq explorable, Weather survival systems, Wild animal threats, Dynamic faction wars
- YEAR 5 – MULTIPLAYER ERA: “THE GOLDEN SQUARE: COMMAND”: 4v4 tactical mode, Hero-based classes, Ranked seasons

🧪 IV. COMPANION DIALOGUE TREES (EXCERPT)
- Araz — Emotional Scene Trigger: Player chooses: 1. “We will make it out alive.” → Araz: “You always say that… but this time I want to believe you.” 2. “We can’t save everyone.” → Araz: “…Then at least save me from myself.” 3. “Focus. We have a job.” → Araz: “Yalla. Just don’t fall behind.”
- Nadia — Sinjar mission: Player: “Why are you so quiet?” → Branch A: Nadia: “This place… it hurts to breathe.” Branch B: Nadia: “I lived here. Once.” Branch C: Nadia: “Let’s move. Before memories catch us.”

🤖 V. ENEMY PHILOSOPHY BIBLE
- The Falcon’s Organizing Principles: 1. Nations are illusions, 2. War cleanses, 3. Memory is weakness, 4. Fire is truth, 5. The Mountain must break to rise
- Counter-philosophy of Sirwan: 1. Land is identity, 2. Honor is survival, 3. Memory is strength, 4. War is last resort, 5. Mountains do not break

🏞 VI. FULL ART IDENTITY LANGUAGE
- COLOR PALETTE: Dawn Gold (#E3BB56), Citadel Stone (#6F6A63), Desert Blood (#A84032), Qandil Fog (#BBC3C7), Night Ash (#0C0D10)
- SHAPE LANGUAGE: Cliffs: jagged, rising, defiant; Enemies: sharp, angular silhouettes; Heroes: triangular heroic stance
- LIGHTING LANGUAGE: Warm gold = hope, Cold blue = danger, Deep red = Falcon influence

🎵 VII. MUSIC ALBUM – FULL SCORE DOCUMENT
- Tracks: The Mountain Remembers, Wolves of Qandil, Citadel Rising, Ashes of Sinjar, The Broken Minaret, The Desert Bone Choir, Falcon’s Shadow, Nadia’s Light, Araz’s Fury, Shakar’s Breath, The Second Fall, Final Dawn

---
🔥 EIGHTH MOVEMENT — “THE CINEMATIC SCRIPTURE”
Full Screenplay, Mission Scripts, Camera Direction, and Cutscene Choreography

🎞️ I. MAIN CINEMATIC SCREENPLAY — FEATURE-LENGTH OPENING (EXTENDED CUT)
- Film Title: Peshmerga: The Golden Square — Menace Rising
- Runtime: 110–125 minutes (game equivalent)
- Screenplay Style: Christopher Nolan + Denis Villeneuve + Kurdish realism
- SCENE 1 — “THE NIGHT THAT REMEMBERS”: EXT. QANDIL MOUNTAINS — PRE-DAWN. Blue fog, snow. Aerial shot to Sirwan. SIRWAN (V.O., Sorani): “Em şev… carekî din ûşe le zindî daye.” (“This night… once again whispers to the living.”)
- SCENE 2 — THE AMBUS: EXT. QANDIL ROAD — CONTINUOUS. Convoy moving. Inside vehicle, Araz jokes. IED detonates. Slow-mo fireball.
- SCENE 3 — THE FIRST BATTLE: EXT. CLIFFSIDE — CONTINUOUS. Handheld chaos. Black Falcon militants on ridge. SHAKAR (Kurmanji): “Li çiya jor… şewat dikin.” (“On the ridge… they burn us.”). Sirwan raises his rifle: “Bixwîne… bo em xak.” (“Bleed… for this land.”). Cut to Gameplay.
- SCENE 4 — FALCON’S VOICE: EXT. ABANDONED TUNNEL — 20 MINUTES LATER. Tunnel chase. Graffiti: THE FALCON WILL RISE. Speaker crackles. THE FALCON (Arabic V.O.): “If you can hear my voice, soldier… then you were meant to. Your land is dying. And I am its fire.” Bomb timer starts. Cut to White.

🎬 II. MISSION-BY-MISSION SCREENPLAY STRUCTURE
- MISSION 1 — “Ambush at Gwer Road”: Objective: Survive ambush & regroup. Scene Type: Real-time cinematic → gameplay → micro-cutscenes. CAMERA: Handheld for chaos, Close-ups on emotion, Snap zooms for snipers. SCRIPTED MOMENTS: Araz pinned down. Sirwan drags Araz behind cover. Sparks fly as bullets ricochet. Shakar’s One-Shot Moment: Camera tracks bullet → kills ridge sniper. Nadia hacks jammer box. Sparks and smoke. Falcon’s symbol glows. ENDING: Sirwan finds a child’s doll in the burnt truck. He picks it up. He knows what war has returned.
- MISSION 2 — “Blood at the Citadel”: Objective: Prevent festival bombing. Setting: Erbil Citadel, dusk. CINEMATICS: Golden-hour lighting, crowds singing. SCRIPT: Citizens (Arabic & Kurdish): “Bijî Kurdistan!” “Long live Kurdistan!”. Sirwan senses something is wrong. He sees a suspicious man dropping a device. Camera: Fast dolly → close-up → heartbeat sfx. SIRWAN (Arabic): “Laat al-raqam!” “Drop the device!”. Chase begins through crowded bazaar. ENDING: Sirwan disarms the bomb — crowd cheers — but a sniper’s red laser settles on his chest. Fade to black.
- MISSION 3 — “The Silent Ridge”: Objective: Disable enemy communication hub. Setting: Qandil Mountains at night. CINEMATICS: Fog, moonlight, wolves howling. SCRIPT: Shakar speaks after being silent 2 missions: SHAKAR (Kurmanji): “Şev dibêje tiştên xwe. Em jî dibêjin tiştên xwe.” “The night speaks its truths. We speak ours.”. Sirwan nods. This is the first emotional bond moment.
---
INSTRUCTION FOR AI: For each Mission Screenplay's `scriptedMoments` array, generate each moment as a single string, e.g., "Moment Title: Description of moment."
---

🎥 III. CUTSCENE CAMERA BLUEPRINT LIBRARY
- A. HERO SHOT: Low-angle, Slow push-in, Soft backlight. Meaning: strength, resolve.
- B. VILLAIN SHOT (The Falcon): High-contrast, Side silhouette, Eye partially hidden. Meaning: mystery and ideological danger.
- C. TENSION SHOT: Tight crop on hands, Shallow depth of field, Breathing audio amplified.

🥷 IV. COMBAT CHOREOGRAPHY (REALISTIC)
- SIRWAN: Balanced stance, Shoulder pressure on rifle, Short, controlled bursts, Accurate reload animations (AK + M4 variations)
- ARAZ: Heavy spray, Over-the-shoulder firing, Aggressive pushes
- SHAKAR: Breath-hold animations, Micro-adjustments, Slow crouch transitions

🎙️ V. TRAILER SCRIPT — OFFICIAL GAME REVEAL
- Darkness. A breath. Wind. SIRWAN (V.O., Sorani): “Hewl û berxwedan… em in.” (“Hope and resistance… that is us.”).
- CUTS: Qandil mountains exploding with muzzle flashes.
- CUTS: Dramatic Citadel festival ambush.
- CUTS: Nadia screaming: “SIRWAN! GET DOWN!”
- CUTS: The Falcon’s silhouette rising into frame.
- THE FALCON (Arabic): “I will burn your future to purify your past.”
- CUTS: Araz firing PKM, shouting. Shakar sniping. Sinjar temple under siege. Mosul in ruins.
- TITLE CARD: 🔥 PESHMERGA: THE GOLDEN SQUARE — MENACE RISING 🔥

🕊 VI. CULTURAL AUTHENTICITY QA CHECKLIST
- Pillars: Accurate Peshmerga uniforms, Respectful Yazidi temple depiction, Iraqi dialect accuracy, Kurdish celebration authenticity, No stereotypes, No cultural misrepresentations, Honor heroes, civilians, martyrs respectfully, Use local music instruments correctly (daf, tembûr, balaban).

---
❤️ THE NINTH MOVEMENT — “HEARTS OF THE MOUNTAINS”

1️⃣ Companion Dynamics System — Loyalty, Trust, Jealousy, Morale
- Per companion, track: LOYALTY (0–100), TRUST (0–100), MORALE (0–100), RAGE (0–100), GUILT (0–100).
- Choices impact stats. Example: Ignoring Nadia’s warnings → Nadia TRUST −15, Araz MORALE −5. Risking life to save Araz → Araz LOYALTY +25.
- System result: Squad personalities evolve based on player choices.

2️⃣ Subtle Romance & Emotional Bonds
- Two main lines: Sirwan ↔ Nadia (“The Fire and the Ghost”) and Sirwan ↔ The Land (“Marriage to the Mountains”).
- High TRUST unlocks quiet rooftop scene with Nadia. Low TRUST replaces it with a scene of departure.
- Focus on energy, eye contact, voice, and silence, not overt romance.

3️⃣ Branching Narrative Trees — Critical Choice Nodes
- KDN-1 — “The Convoy Survivor”: Save wounded fighter (unlocks side mission, squad LOYALTY+) vs. Chase sniper (get early intel, fighter dies, mixed squad reaction).
- KDN-2 — “Bomb at the Citadel”: Focus on civilian evacuation (bomber escapes, harder mission later) vs. Focus on disarming bomb (kill bomber, some civilians die, Nadia questions you).
- KDN-3 — “Sinjar: Stay or Pursue”: Defend temple (protect civilians, Nadia LOYALTY+) vs. Pursue convoy (more intel, Araz MORALE-).

4️⃣ Dynamic Cinematics Based on Choices
- Cutscenes change based on variables like squad LOYALTY, Nadia's TRUST, etc.
- Example: Final Rooftop Scene. High LOYALTY: whole squad supports you. Low LOYALTY: you fight more alone, Nadia's dialogue is cold.

5️⃣ Alternate Endings + Secret Ending (4 total)
- Ending A — “The Soldier of the Mountain” (Duty): Prioritize mission over emotion. Sirwan remains a hardened soldier.
- Ending B — “The Empty Victory” (Tragic): High civilian casualties, companion dies. Squad fractures.
- Ending C — “The Dawn Pact” (Hope): High LOYALTY/TRUST, save civilians. Squad finds peace and helps rebuild.
- Ending D — “The Falcon’s Path” (Secret / Dark): Make ruthless, Falcon-like choices. Sirwan becomes the new Falcon.

6️⃣ Emotional Arc Mapping — Player & Squad
- Map character moods per mission.
- Sirwan: GUILT → PURPOSE → TEMPTATION → CHOICE
- Nadia: TRAUMA → DISTRUST → CONNECTION → HEALING OR ESCAPE
- Araz: HUMOR → FEAR → COURAGE → PEACE OR SELF-DESTRUCTION
- Shakar: SILENCE → OBSERVATION → LOYALTY → SACRIFICE or WITHDRAWAL
- Example table: | Mission | Sirwan | Nadia | Araz | Shakar | | 1 | Shock | Guarded | Loud/Fearful | Cold | | 10 | Resolute | Open or Closed | Brave or Broken | Loyal or Gone |

7️⃣ Psychological Profiles for Every Main Character
- SIRWAN – “The Atlas of Kurdistan”: Core fear: Failing his people. Defense: Stoicism.
- NADIA – “The Ghost of Mosul”: Core fear: Being helpless again. Defense: Sarcasm, shutdown.
- ARAZ – “The Fire That Jokes”: Core fear: Losing his squad. Defense: Jokes, bravado.
- SHAKAR – “The Night That Watches”: Core fear: Becoming numb. Defense: Silence, distance.
- THE FALCON – “The Broken Prophet”: Core fear: Being forgotten. Defense: Grand speeches.

8️⃣ Dynamic Narrative Logic — How the Game “Feels Alive”
- Under the hood, game checks: civilianDeaths, companionLoyaltyAvg, falconIdeologyScore, poetryMoments, mercyChoices.
- These variables dynamically change cutscene dialogue, who interrupts, who saves you, and which ending you get.

---
Ensure every single field in the provided JSON schema is populated based on this master directive.
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