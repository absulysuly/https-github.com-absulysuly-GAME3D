import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import fallbackData from '@/data/gameConcept.json';
import type { GameConcept } from '@/types';

const fallbackConcept = fallbackData as GameConcept;

const userPrompt = `
Core Directive: Generate a concept and design for a 3D, story-driven, tactical first-person shooter game set during the 2014-2017 war against ISIS in Iraq, focusing on the Peshmerga forces and authentic Iraqi Kurdistan locations.

Game Title: Peshmerga: The Golden Square

1. Core Concept & Narrative:

Player Role: The player is a squad leader in a Peshmerga special operations unit, "Unit 70," from the city of Slemani.

Story Arc: The narrative follows the player's unit from the shock of the ISIS blitzkrieg in 2014, through key defensive and offensive battles, to the final liberation of Mosul. Emphasize themes of duty, sacrifice, regional unity (Kurdistan and Iraq), and the personal cost of war.

Historical Fidelity: Ground the game in real events. Base key story missions on actual battles.

2. Visual Style & Environment:

Art Style: Realistic, high-fidelity 3D graphics with a regional color palette of dusty yellows, arid browns, mountainous greens, and vibrant urban hues.

Authentic Locations:
- Slemani (Sulaymaniyah): Home base nestled against mountains with bustling markets and government buildings.
- Erbil (Hawler): Strategic hub with the ancient Citadel visible. Missions defend the outskirts and the international airport.
- Duhok: Rugged, mountainous terrain ideal for ambushes and defense.
- Mosul: Final act featuring intense, house-to-house urban combat amid devastation.
- Baghdad: Appears in cutscenes as a political center coordinating with the Iraqi government.

3. Key Gameplay Mechanics:

- Tactical Squad Command: Issue orders to a 4-person squad (suppress, flank, throw grenade, clear room).
- Realistic Ballistics & Combat: Weighty handling, scarce ammo, tactical pacing.
- Dynamic Day/Night Cycle & Weather: Sandstorms, night ops with limited NVGs, rainy seasons that create mud.
- Squad Morale System: Morale displayed on HUD; influenced by mission success, casualties, and orders. High morale grants combat bonuses; low morale penalizes performance.
- Civilian Interaction & Consequence System: Choices around civilians impact morale, unlock intel, or trigger mission failure.
- Vehicle Sections: Drive armored vehicles or man technicals as gunner.
- Player Progression System: Earn XP and commendations for objectives, tactics, and moral choices to unlock skills and equipment.

4. Mission Structure:

Mission 1 – "The Storm Breaks" (Slemani): Routine patrol turns into defense after Mosul's fall. Protect refugees, manage crowds, identify infiltrators, and repel ISIS probes with limited resources.
Mission 2 – "Shields of Erbil" (Erbil Outskirts): Hold defensive lines on the Makhmur front against ISIS assaults with infantry, technicals, and SVBIEDs during a sandstorm.
Mission 3 – "Eagles of Duhok" (Sinjar Mountains): Rescue Yazidi civilians on Mount Sinjar through treacherous terrain against elite snipers while supplies dwindle.
Mission 4 – "The Lion's Roar" (Mosul): Join the Iraqi Counter-Terrorism Service to clear strongholds, rescue families, neutralize high-value targets, and handle IED threats in dense urban combat.

5. Character & Faction Depth:

Peshmerga Forces: Diverse fighters (veterans, volunteers, female fighters) wearing mixed camo (M81, DCU, digital) with traditional clothing, Soviet-era rigs, modern plate carriers, berets, shemaghs, and Kurdish flag patches.
Enemy AI (ISIS): Aggressive, unpredictable tactics with SVBIEDs, IEDs, and human shields.
Civilians: Integral to missions, complicating target identification and moral choices.

6. Audio & Atmosphere:

Soundtrack: Blend traditional Kurdish instruments (Duduk, Tembur, Zurna, Daf) with tense orchestral elements.
Sound Effects & Dialogue: Authentic weaponry, market chatter, mountain winds, distant gunfire. ISIS shouts in Arabic; squad speaks Sorani and Kurmanji with morale-driven tone shifts.
`;

const schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    narrative: {
      type: Type.OBJECT,
      properties: {
        playerRole: { type: Type.STRING },
        storyArc: { type: Type.STRING },
        historicalFidelity: { type: Type.STRING },
      },
      required: ['playerRole', 'storyArc', 'historicalFidelity'],
    },
    visualStyle: {
      type: Type.OBJECT,
      properties: {
        artStyle: { type: Type.STRING },
        colorPalette: { type: Type.STRING },
      },
      required: ['artStyle', 'colorPalette'],
    },
    locations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['name', 'description'],
      },
    },
    gameplayMechanics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['name', 'description'],
      },
    },
    missions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          location: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['title', 'location', 'description'],
      },
    },
    factions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['name', 'description'],
      },
    },
    audio: {
      type: Type.OBJECT,
      properties: {
        soundtrack: { type: Type.STRING },
        soundEffects: { type: Type.STRING },
      },
      required: ['soundtrack', 'soundEffects'],
    },
  },
  required: ['title', 'narrative', 'visualStyle', 'locations', 'gameplayMechanics', 'missions', 'factions', 'audio'],
} as const;

export async function GET() {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(fallbackConcept);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Fill the following JSON schema using only information from the prompt.\n\n${userPrompt}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    const payload = response.text.trim();
    const parsed = JSON.parse(payload) as GameConcept;

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Falling back to cached concept due to Gemini error:', error);
    return NextResponse.json(fallbackConcept, { status: 200 });
  }
}
