import { GoogleGenAI, Type } from "@google/genai";
import { GameConcept } from '../types';

const userPrompt = `
Core Directive: Generate a concept and design for a 3D, story-driven, tactical first-person shooter game set during the 2014-2017 war against ISIS in Iraq, with a specific focus on the Peshmerga forces and authentic Iraqi Kurdistan locations.

Game Title: Peshmerga: The Golden Square

1. Core Concept & Narrative:

Player Role: The player is a squad leader in a Peshmerga special operations unit, "Unit 70," from the city of Slemani.

Story Arc: The narrative follows the player's unit from the shock of the ISIS blitzkrieg in 2014, through key defensive and offensive battles, to the final liberation of Mosul. The story should emphasize themes of duty, sacrifice, regional unity (Kurdistan, Iraq), and the personal cost of war.

Historical Fidelity: The game must be grounded in real events. Key story missions should be based on actual battles.

2. Visual Style & Environment:

Art Style: Realistic, high-fidelity 3D graphics with a color palette that reflects the region: dusty yellows, arid browns, with contrasts of green in the mountains and the vibrant colors of urban areas.

Authentic Locations (Must be accurately represented):

Slemani (Sulaymaniyah): The player's home base. Missions start here. Show the city nestled against the mountains, with bustling markets and government buildings.

Erbil (Hawler): A modern, strategic hub. Include the ancient Citadel as a landmark visible in the background. Missions here involve defending the outskirts and the international airport.

Duhok: A key province. Show the rugged, mountainous terrain perfect for ambushes and defensive positions.

Mosul: The final act of the game. Depict the intense, house-to-house urban combat in the devastated city. Show the destruction of historical sites and the desperate civilian population.

Baghdad: Appears in cutscenes or as a political hub for coordinating with the Iraqi central government. The environment should feel different—more central Iraqi, less mountainous.

3. Key Gameplay Mechanics:

Tactical Squad Command: The player can issue commands to their 4-man squad (suppress, flank, throw grenade, clear room).

Realistic Ballistics & Combat: Weapon handling should feel weighty and authentic. Ammunition and resources are often scarce, encouraging tactical play over run-and-gun.

Dynamic Day/Night Cycle & Weather: Include missions with sandstorms that limit visibility, night operations with limited NVGs, and rainy seasons that turn terrain to mud.

Squad Morale System: The player's 4-man squad has a dynamic morale level, clearly displayed on the HUD. Morale is directly influenced by mission success, casualty rates (both for the squad and civilians), and the player's orders. High morale provides combat bonuses, such as improved accuracy and faster reload times. Conversely, low morale results in significant penalties, including reduced accuracy, slower movement, and a chance for squad members to hesitate during combat.

Civilian Interaction & Consequence System: In urban missions (e.g., Mosul), players encounter civilians and must make critical decisions. Engaging suspected insurgents near non-combatants can lead to civilian casualties, lower squad morale, negative story outcomes, or even mission failure. Prioritizing civilian safety by holding fire or creating safe passages can build trust, unlock valuable intel from the local populace, or open up new side objectives. These choices are presented with clear, meaningful branching possibilities.

Vehicle Sections: Include sequences where the player is a gunner in a technical (machine gun-mounted pickup truck) or drives armored vehicles.

Player Progression System: Players earn Experience Points (XP) and Commendations for completing objectives, tactical proficiency (headshots, flanking maneuvers), and positive moral choices (saving civilians). XP is used to unlock skills in a skill tree, enhancing abilities like weapon handling, stamina, or advanced squad commands. Commendations are spent to requisition new weapons and equipment, progressing from early-war captured gear to advanced international military hardware as the campaign unfolds. This system reflects the player's growth from a soldier into a seasoned special forces leader.

4. Mission Structure (Example Missions):

Mission 1: "The Storm Breaks" (Slemani): A narrative intro. The player's unit is on a routine patrol when news breaks of the fall of Mosul. The mission shifts to a frantic defense of the city's outskirts as refugees flee. The primary objective is to establish a defensive perimeter at a key checkpoint to protect these civilians and repel the initial ISIS probes. Challenges include managing the chaotic crowds, identifying enemy combatants mixed with non-combatants, and facing the first wave of fanatical ISIS fighters with limited resources.

Mission 2: "Shields of Erbil" (Erbil Outskirts): A desperate defensive battle on the Makhmur front, holding the line against an ISIS offensive that threatens the capital. The objective is to hold a series of defensive positions against a coordinated ISIS assault involving infantry, technicals, and SVBIEDs. The player will face challenges like constant enemy pressure, the need to coordinate with other Peshmerga units, calling in limited air support, and dealing with flanking maneuvers through open terrain, possibly during a sandstorm that severely limits visibility.

Mission 3: "Eagles of Duhok" (Sinjar Mountains): A high-stakes rescue mission to save Yazidi civilians trapped on Mount Sinjar. The objective is to navigate treacherous mountain paths to reach the civilians, provide them with aid, and escort them to a safe extraction point. Challenges include fighting in rugged, vertical terrain that favors ambushes, facing elite ISIS snipers, dealing with severe resource scarcity, and protecting the vulnerable civilians during a perilous extraction.

Mission 4: "The Lion's Roar" (Mosul): The final, multi-stage mission. The player's unit is attached to the Iraqi Counter-Terrorism Service for the brutal urban fight to reclaim the heart of Mosul. The objective is to systematically clear ISIS strongholds, rescue trapped families, and neutralize high-value targets in the dense urban landscape. The challenges are immense: intense house-to-house fighting, the constant threat of IEDs and booby traps, the moral complexity of distinguishing combatants from civilians used as human shields, and the severe impact that choices have on squad morale and the mission's outcome.

5. Character & Faction Depth:

Peshmerga Forces: Depict their diversity—seasoned veterans, young volunteers, female fighters (represented accurately in support and combat roles). Their appearance must be highly authentic to the 2014-2017 period, emphasizing a non-standardized, battle-hardened look.
- **Uniforms:** A mix of camouflage patterns should be prevalent, including US Woodland (M81), three-color Desert Camouflage Uniform (DCU), and various digital patterns alongside simple olive drab or khaki fatigues. Uniforms should appear worn and dusty.
- **Gear & Vests:** Equipment is a bricolage of old and new. Players will see everything from old Soviet-style chest rigs and simple webbing for AK-47 magazines to more modern plate carriers and tactical vests, often worn over traditional clothing. This mix-and-match aesthetic is crucial.
- **Headwear:** Headwear is a key identifier. Include the iconic red-and-white or black-and-white Kurdish shemagh (jamedani) worn in various styles, colored berets (red, maroon) for specific units, and a limited number of modern combat helmets for special forces units like the player's.
- **Insignia:** The Kurdish flag patch must be prominently displayed on the upper arm of most fighters. Unit-specific insignia should also be visible.

Enemy AI (ISIS): Enemy behavior should be aggressive and unpredictable, using suicide vehicles (SVBIEDs), IEDs, and human shields.

Civilians: A core part of the environment. The player must often identify combatants hiding among non-combatants, adding a moral layer to the combat.

6. Audio & Atmosphere:

Soundtrack: A blend of traditional Kurdish instrumentation with modern, tense orchestral music. Specific instruments to feature include the soulful Duduk, the rhythmic Tembur, the piercing Zurna, and the deep percussion of the Daf drum to create a powerful and authentic soundscape.

Audio & Dialogue: Authentic sound effects for weapons and environments are critical. To enhance immersion, include:
- Ambient Sounds: The distant call to prayer from mosques, the chatter of markets in safe zones like Slemani, the howling wind in the Sinjar mountains, and the unsettling, debris-strewn silence of Mosul broken by distant gunfire.
- Enemy Dialogue: ISIS fighters should shout tactical commands and religious phrases in Arabic. Their chatter on radios should be audible, sometimes taunting, adding to the psychological tension.
- Squad Dialogue: The player's squad communicates in authentic Kurdish dialects (Sorani and Kurmanji), with subtitles. Their tone and dialogue should shift based on their morale level, from confident and professional to strained and fearful.
`;

const schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "The title of the game." },
    narrative: {
      type: Type.OBJECT,
      description: "Core story elements of the game.",
      properties: {
        playerRole: { type: Type.STRING, description: "The role of the player in the game." },
        storyArc: { type: Type.STRING, description: "The main plot and progression of the story." },
        historicalFidelity: { type: Type.STRING, description: "The game's commitment to historical accuracy." },
      },
      required: ['playerRole', 'storyArc', 'historicalFidelity']
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
    gameplayMechanics: {
      type: Type.ARRAY,
      description: "List of core gameplay mechanics.",
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
      description: "List of example missions in the game.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          location: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['title', 'location', 'description']
      },
    },
    factions: {
      type: Type.ARRAY,
      description: "List of factions present in the game.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['name', 'description']
      },
    },
    audio: {
      type: Type.OBJECT,
      description: "Details about the game's audio design, including music and sound effects.",
      properties: {
        soundtrack: { type: Type.STRING },
        soundEffects: { type: Type.STRING, description: "Includes sound effects and dialogue details." },
      },
      required: ['soundtrack', 'soundEffects']
    },
  },
  required: ['title', 'narrative', 'visualStyle', 'locations', 'gameplayMechanics', 'missions', 'factions', 'audio']
};

export async function fetchGameConcept(): Promise<GameConcept> {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the detailed game design document below, please populate the provided JSON schema. Ensure all fields are filled accurately from the provided text.\n\n${userPrompt}`,
      config: {
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