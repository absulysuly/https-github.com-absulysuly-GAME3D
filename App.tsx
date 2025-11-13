import React, { useState, useEffect } from 'react';
import { GameData, ScreenplayPart, TrailerScriptPart } from './types';
import { fetchGameData } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import Section from './components/Section';
import Card from './components/Card';
import JsonModal from './components/JsonModal';

const App: React.FC = () => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadGameData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchGameData();
        setGameData(data);
      } catch (err) {
        setError("Failed to load game concept. Please check the API key and try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadGameData();
  }, []);

  const renderScreenplayPart = (part: ScreenplayPart, index: number) => {
    switch(part.type) {
      case 'CAMERA':
      case 'ACTION':
      case 'SFX':
      case 'CUT_TO':
        return <p key={index} className="text-gray-400 my-2">{part.content}</p>;
      case 'NARRATION':
        return (
          <div key={index} className="my-3 ml-12">
            <p className="font-bold">{part.character} (V.O.)</p>
            <p className="italic text-gray-300">"{part.content}"</p>
          </div>
        );
      case 'DIALOGUE':
        return (
          <div key={index} className="my-3 ml-12">
            <p className="font-bold">{part.character} ({part.language})</p>
            <p className="text-gray-300">"{part.content}"</p>
          </div>
        );
      default:
        return <p key={index}>{part.content}</p>;
    }
  };
  
  const renderTrailerPart = (part: TrailerScriptPart, index: number) => {
    switch(part.type) {
      case 'V.O.':
        return <p key={index} className="italic"><strong className="text-yellow-400">{part.character} (V.O.):</strong> {part.content}</p>;
      case 'CUT':
        return <p key={index} className="text-gray-400 font-semibold my-2">CUT TO: {part.content}</p>;
      case 'TITLE_CARD':
        return <p key={index} className="text-center font-bold text-yellow-500 text-xl my-4">{part.content}</p>;
      default:
        return <p key={index}>{part.content}</p>;
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 flex items-center justify-center p-4">
        <div className="bg-red-900/20 border border-red-500 p-8 rounded-lg text-center">
          <h1 className="text-2xl font-bold mb-4">An Error Occurred</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!gameData) {
    return null;
  }

  const { titanCodex, eternalScripture, cinematicScripture, heartsOfTheMountains } = gameData;

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
        <header
          className="relative h-96 flex items-center justify-center text-center p-4 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('https://picsum.photos/seed/qandil/1920/1080')` }}>
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-wider uppercase" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
              Peshmerga: The Golden Square
            </h1>
            <p className="text-yellow-400 mt-2 text-lg md:text-xl">The Complete Cinematic Universe Bible</p>
          </div>
        </header>

        <main className="container mx-auto p-4 md:p-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">THE SIXTH MOVEMENT</h2>
            <p className="text-yellow-500 text-2xl tracking-widest uppercase">“THE TITAN CODEX”</p>
          </div>

          <Section title="I. Opening Cutscene Script">
            <Card title={titanCodex.openingCutsceneScript.scene}>
              <p className="italic text-gray-400 mb-4">{titanCodex.openingCutsceneScript.description}</p>
              <div className="space-y-3 border-l-2 border-yellow-700 pl-4">
                {titanCodex.openingCutsceneScript.dialogue.map((d, i) => (
                  <div key={i}>
                    <strong className="text-yellow-400">{d.character} ({d.language}):</strong>
                    <p className="pl-4 italic">"{d.line}"</p>
                  </div>
                ))}
              </div>
            </Card>
          </Section>

          <Section title="II. Voice Acting Script Pack">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {titanCodex.voiceActingScriptPack.scripts.map(script => (
                <Card key={script.character} title={`${script.character} - ${script.type}`}>
                  <ul className="space-y-2">
                    {script.lines.map((line, i) => (
                      <li key={i}>
                        <strong className="text-yellow-500">{line.language}:</strong> "{line.line}"
                        <em className="text-gray-400 text-sm block">({line.translation})</em>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="III. Level Design Greybox Maps">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {titanCodex.levelDesignGreyboxMaps.map(map => (
                <Card key={map.mission} title={map.mission}>
                  <pre className="bg-gray-900 p-3 rounded text-sm whitespace-pre-wrap font-mono">{map.layout}</pre>
                </Card>
              ))}
            </div>
          </Section>
          
          <Section title="IV. Character Modeling Sheets">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {titanCodex.characterModelingSheets.map(sheet => (
                  <Card key={sheet.character} title={sheet.character}>
                      <ul className="space-y-1 text-sm">
                          {sheet.details.map(detail => <li key={detail.key}><strong className="text-yellow-400/80">{detail.key}:</strong> {detail.value}</li>)}
                      </ul>
                  </Card>
              ))}
            </div>
          </Section>

          <Section title="V. 3D Polycount Guidelines">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {titanCodex.polycountGuidelines.map(cat => (
                  <Card key={cat.category} title={cat.category}>
                      <ul className="space-y-1 text-sm">
                          {cat.guidelines.map(g => <li key={g.item}><strong className="text-yellow-400/80">{g.item}:</strong> {g.polycount}</li>)}
                      </ul>
                  </Card>
              ))}
            </div>
          </Section>

           <Section title="VI. AI State Machines">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {titanCodex.aiStateMachines.map(sm => (
                    <Card key={sm.type} title={sm.type}>
                        <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">States</h4>
                        <p className="text-sm mb-3 bg-gray-900 p-2 rounded">{sm.states.join(' → ')}</p>
                        <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">{sm.type.includes('ENEMY') ? 'Conditions' : 'Reactions'}</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">{sm.details.map(d => <li key={d}>{d}</li>)}</ul>
                    </Card>
                ))}
              </div>
          </Section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Section title="VII. Dynamic Weather System">
                <Card title="Presets & Effects">
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Presets</h4>
                    <p className="text-sm mb-3">{titanCodex.dynamicWeatherSystem.presets.join(' • ')}</p>
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Effects</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">{titanCodex.dynamicWeatherSystem.effects.map(e => <li key={e}>{e}</li>)}</ul>
                </Card>
            </Section>
            
            <Section title="VIII. Combat Balance Sheets">
                <Card title="Damage & Armor Tuning">
                    <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Player Damage</h4>
                    <div className="grid grid-cols-2 gap-1 text-sm mb-3">
                        {titanCodex.combatBalanceSheets.playerDamage.map(pd => <div key={pd.weapon}>{pd.weapon}: <span className="font-bold">{pd.damage}</span></div>)}
                    </div>
                     <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Enemy Armor</h4>
                    <div className="grid grid-cols-3 gap-1 text-sm">
                        {titanCodex.combatBalanceSheets.enemyArmor.map(ea => <div key={ea.level}>{ea.level}: <span className="font-bold">{ea.absorption}</span></div>)}
                    </div>
                </Card>
            </Section>
          </div>

           <div className="text-center my-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white">THE SEVENTH MOVEMENT</h2>
            <p className="text-yellow-500 text-2xl tracking-widest uppercase">“THE ETERNAL SCRIPTURE”</p>
          </div>

          <Section title="I. GDD Master Index">
              <Card title="Full 200-Page Game Design Document Outline">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {eternalScripture.gddMasterIndex.map(section => (
                          <div key={section.title} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                              <h4 className="font-bold text-yellow-500">{section.title} <span className="text-xs text-gray-400">({section.pages})</span></h4>
                              <ul className="list-disc list-inside text-xs mt-2 space-y-1 text-gray-300">
                                  {section.content.map(item => <li key={item}>{item}</li>)}
                              </ul>
                          </div>
                      ))}
                  </div>
              </Card>
          </Section>
          
          <Section title="II. TV Series Adaptation">
              <Card title={`${eternalScripture.tvSeriesAdaptation.seasonTitle} (Vision Document)`}>
                  <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                      {eternalScripture.tvSeriesAdaptation.episodes.map(ep => <li key={ep.episodeNumber} className="text-sm bg-gray-900 p-2 rounded text-center"><strong>E{ep.episodeNumber}</strong><br/>{ep.title}</li>)}
                  </ul>
                  <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Details</h4>
                   <p className="text-sm">{eternalScripture.tvSeriesAdaptation.details.join(' • ')}</p>
              </Card>
          </Section>

          <Section title="III. DLC & Future Expansions Roadmap">
              <div className="space-y-4">
                  {eternalScripture.dlcRoadmap.map(dlc => (
                      <Card key={dlc.year} title={`Year ${dlc.year}: ${dlc.title}`}>
                           <ul className="list-disc list-inside space-y-1 text-sm">{dlc.content.map(item => <li key={item}>{item}</li>)}</ul>
                      </Card>
                  ))}
              </div>
          </Section>

          <Section title="IV. Companion Dialogue Trees">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {eternalScripture.companionDialogueTrees.map(scene => (
                      <Card key={scene.character} title={`${scene.character} - ${scene.trigger}`}>
                          <div className="space-y-3">
                              {scene.choices.map(choice => (
                                  <div key={choice.choice} className="text-sm">
                                      <p className="font-bold text-yellow-400/80">Player: "{choice.choice}"</p>
                                      <p className="pl-4 italic">Response: "{choice.response}"</p>
                                  </div>
                              ))}
                          </div>
                      </Card>
                  ))}
              </div>
          </Section>
          
          <Section title="V. Enemy Philosophy Bible">
              <Card title={eternalScripture.enemyPhilosophyBible.description}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <h4 className="font-bold text-red-500 mb-2">The Falcon's Principles</h4>
                          <ul className="list-decimal list-inside space-y-1 text-sm">{eternalScripture.enemyPhilosophyBible.falconPhilosophy.principles.map(p => <li key={p}>{p}</li>)}</ul>
                      </div>
                      <div>
                          <h4 className="font-bold text-yellow-500 mb-2">Sirwan's Counter-Philosophy</h4>
                          <ul className="list-decimal list-inside space-y-1 text-sm">{eternalScripture.enemyPhilosophyBible.sirwanCounterPhilosophy.principles.map(p => <li key={p}>{p}</li>)}</ul>
                      </div>
                  </div>
              </Card>
          </Section>

           <Section title="VI. Art Identity Language">
              <Card title="Visual Soul of the Universe">
                  <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Color Palette</h4>
                  <div className="flex flex-wrap gap-4 mb-4">
                      {eternalScripture.artIdentityLanguage.colorPalette.map(c => (
                          <div key={c.name} className="text-center">
                              <div style={{ backgroundColor: c.hex }} className="w-16 h-16 rounded-full border-2 border-gray-700 shadow-md"></div>
                              <p className="text-xs mt-1">{c.name}<br/>{c.hex}</p>
                          </div>
                      ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                       <div>
                          <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Shape Language</h4>
                          <ul className="list-disc list-inside">{eternalScripture.artIdentityLanguage.shapeLanguage.map(s => <li key={s}>{s}</li>)}</ul>
                       </div>
                       <div>
                           <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Lighting Language</h4>
                           <ul className="list-disc list-inside">{eternalScripture.artIdentityLanguage.lightingLanguage.map(l => <li key={l}>{l}</li>)}</ul>
                       </div>
                  </div>
              </Card>
          </Section>
          
           <Section title="VII. Music Album">
              <Card title="Full Score Document">
                  <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 list-disc list-inside">
                      {eternalScripture.musicAlbum.tracks.map(track => <li key={track}>{track}</li>)}
                  </ul>
              </Card>
          </Section>

          <div className="text-center my-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white">THE EIGHTH MOVEMENT</h2>
            <p className="text-yellow-500 text-2xl tracking-widest uppercase">“THE CINEMATIC SCRIPTURE”</p>
          </div>

          <Section title="I. Main Cinematic Screenplay">
            <Card title={`${cinematicScripture.mainCinematicScreenplay.filmTitle} (Extended Cut)`}>
              <div className="mb-4 text-sm text-gray-400">
                <p><strong>Runtime:</strong> {cinematicScripture.mainCinematicScreenplay.runtime}</p>
                <p><strong>Style:</strong> {cinematicScripture.mainCinematicScreenplay.screenplayStyle}</p>
              </div>
              <div className="space-y-8">
                {cinematicScripture.mainCinematicScreenplay.scenes.map(scene => (
                  <div key={scene.sceneNumber} className="border-t border-gray-700 pt-4">
                    <h4 className="font-bold text-yellow-500 text-lg">SCENE {scene.sceneNumber} — {scene.title}</h4>
                    <p className="text-sm text-gray-500 mb-4">{scene.setting}</p>
                    <div className="bg-gray-900/50 p-4 rounded-lg font-mono text-sm text-gray-300 whitespace-pre-wrap">
                      {scene.parts.map(renderScreenplayPart)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Section>
          
          <Section title="II. Mission-by-Mission Screenplay Structure">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cinematicScripture.missionScreenplays.map(mission => (
                <Card key={mission.missionNumber} title={`Mission ${mission.missionNumber}: ${mission.title}`}>
                  <p className="text-xs text-gray-400 mb-2"><strong>Objective:</strong> {mission.objective}</p>
                  {mission.cinematicNotes && <div className="mb-3"><h5 className="font-semibold text-yellow-500/80 text-sm">Cinematic Notes</h5><p className="text-xs">{mission.cinematicNotes.join(', ')}</p></div>}
                  <div className="mb-3"><h5 className="font-semibold text-yellow-500/80 text-sm">Key Scripted Moments</h5><ul className="list-disc list-inside text-xs">{mission.scriptedMoments.map(m => <li key={m.title}><strong>{m.title}:</strong> {m.description}</li>)}</ul></div>
                  <div><h5 className="font-semibold text-yellow-500/80 text-sm">Ending Cutscene</h5><p className="text-xs">{mission.endingCutscene}</p></div>
                </Card>
              ))}
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Section title="III. Cutscene Camera Blueprint Library">
              <div className="space-y-4">
                {cinematicScripture.cameraBlueprintLibrary.map(bp => (
                  <Card key={bp.shotName} title={`${bp.shotName} Shot`}>
                    <p className="text-sm mb-2">{bp.description.join(' ')}</p>
                    <p className="text-xs text-yellow-400"><strong>Meaning:</strong> {bp.meaning}</p>
                  </Card>
                ))}
              </div>
            </Section>

            <Section title="IV. Combat Choreography">
              <div className="space-y-4">
                {cinematicScripture.combatChoreography.map(cc => (
                  <Card key={cc.character} title={cc.character}>
                    <ul className="list-disc list-inside text-sm space-y-1">{cc.stylePoints.map(p => <li key={p}>{p}</li>)}</ul>
                  </Card>
                ))}
              </div>
            </Section>
          </div>
          
           <Section title="V. Official Game Reveal Trailer Script">
              <Card title="Trailer Script">
                <div className="font-mono text-sm space-y-2 text-gray-300">
                  {cinematicScripture.officialTrailerScript.parts.map(renderTrailerPart)}
                </div>
              </Card>
          </Section>

          <Section title="VI. Cultural Authenticity QA Checklist">
            <Card title="Ensuring Respectful & Accurate Representation">
              <ul className="list-disc list-inside text-sm space-y-2">
                {cinematicScripture.culturalAuthenticityChecklist.pillars.map(pillar => <li key={pillar}>{pillar}</li>)}
              </ul>
            </Card>
          </Section>

          <div className="text-center my-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white">THE NINTH MOVEMENT</h2>
            <p className="text-yellow-500 text-2xl tracking-widest uppercase">“HEARTS OF THE MOUNTAINS”</p>
          </div>

          <Section title="1. Companion Dynamics System">
            <Card title={heartsOfTheMountains.companionDynamicsSystem.description}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Tracked Stats</h4>
                  <ul className="space-y-1 text-sm">
                    {heartsOfTheMountains.companionDynamicsSystem.trackedStats.map(stat => (
                      <li key={stat.stat}><strong>{stat.stat}:</strong> {stat.description}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Example Events</h4>
                  <ul className="space-y-2 text-sm">
                    {heartsOfTheMountains.companionDynamicsSystem.exampleEvents.map(event => (
                      <li key={event.event}>
                        <p><strong>Event:</strong> {event.event}</p>
                        <p className="pl-4 text-gray-400"><strong>Impact:</strong> {event.impact}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </Section>

          <Section title="2. Subtle Romance & Emotional Bonds">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heartsOfTheMountains.subtleRomanceAndEmotionalBonds.bonds.map(bond => (
                <Card key={bond.title} title={bond.title}>
                  <p className="text-sm mb-3">{bond.description}</p>
                  <div className="text-xs bg-gray-900 p-3 rounded-md italic">
                    <h5 className="font-bold text-yellow-500/80 not-italic mb-1">Example Scene</h5>
                    {bond.exampleScene}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="3. Branching Narrative Trees (Key Decision Nodes)">
            <div className="space-y-6">
              {heartsOfTheMountains.branchingNarrativeTrees.nodes.map(node => (
                <Card key={node.nodeId} title={`${node.title} (${node.mission})`}>
                  {node.choices.map((choice, i) => (
                    <div key={i} className={`py-3 ${i < node.choices.length - 1 ? 'border-b border-gray-700' : ''}`}>
                      <p className="font-bold text-yellow-400 mb-2">Choice: {choice.choice}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {choice.impacts.map((impact, j) => (
                          <div key={j} className="bg-gray-900/50 p-2 rounded">
                            <p className="font-semibold text-gray-300">{impact.impact}</p>
                            <p className="text-xs text-gray-400">{impact.consequence}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          </Section>

          <Section title="4. Dynamic Cinematics">
            <Card title={heartsOfTheMountains.dynamicCinematics.description}>
              <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Example: {heartsOfTheMountains.dynamicCinematics.exampleScene.scene}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-green-900/20 border border-green-700 p-3 rounded">
                  <h5 className="font-bold text-green-400">High Loyalty</h5>
                  <p className="text-gray-300">{heartsOfTheMountains.dynamicCinematics.exampleScene.highLoyalty}</p>
                </div>
                <div className="bg-red-900/20 border border-red-700 p-3 rounded">
                  <h5 className="font-bold text-red-400">Low Loyalty</h5>
                  <p className="text-gray-300">{heartsOfTheMountains.dynamicCinematics.exampleScene.lowLoyalty}</p>
                </div>
              </div>
            </Card>
          </Section>

          <Section title="5. Alternate Endings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heartsOfTheMountains.alternateEndings.map(ending => (
                <Card key={ending.endingId} title={`${ending.endingId}: ${ending.title}`}>
                  <h5 className="font-semibold text-yellow-500/80 text-sm mb-1">Conditions</h5>
                  <p className="text-xs mb-3">{ending.conditions}</p>
                  <h5 className="font-semibold text-yellow-500/80 text-sm mb-1">Outcome</h5>
                  <p className="text-xs">{ending.outcome}</p>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="6. Emotional Arc Mapping">
            <Card title={heartsOfTheMountains.emotionalArcMapping.description}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-700 text-yellow-400 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="p-2">Mission</th>
                      <th className="p-2">Sirwan</th>
                      <th className="p-2">Nadia</th>
                      <th className="p-2">Araz</th>
                      <th className="p-2">Shakar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {heartsOfTheMountains.emotionalArcMapping.mapping.map(row => (
                      <tr key={row.mission} className="border-b border-gray-700 hover:bg-gray-800/50">
                        <td className="p-2 font-semibold">{row.mission}</td>
                        <td className="p-2">{row.sirwan}</td>
                        <td className="p-2">{row.nadia}</td>
                        <td className="p-2">{row.araz}</td>
                        <td className="p-2">{row.shakar}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Section>

          <Section title="7. Psychological Profiles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heartsOfTheMountains.psychologicalProfiles.map(profile => (
                <Card key={profile.character} title={`${profile.character} - ${profile.title}`}>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Core Fear:</strong> {profile.coreFear}</li>
                    <li><strong>Core Desire:</strong> {profile.coreDesire}</li>
                    <li><strong>Defense Mechanism:</strong> {profile.defenseMechanism}</li>
                    <li><strong>Triggered By:</strong> {profile.triggeredBy}</li>
                  </ul>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="8. Dynamic Narrative Logic">
            <Card title={heartsOfTheMountains.dynamicNarrativeLogic.description}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Tracked Variables</h4>
                  <ul className="list-disc list-inside space-y-1">{heartsOfTheMountains.dynamicNarrativeLogic.trackedVariables.map(v => <li key={v}>{v}</li>)}</ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-500 text-sm uppercase tracking-wider mb-2">Dynamic Changes</h4>
                  <ul className="list-disc list-inside space-y-1">{heartsOfTheMountains.dynamicNarrativeLogic.dynamicChanges.map(c => <li key={c}>{c}</li>)}</ul>
                </div>
              </div>
            </Card>
          </Section>

        </main>

        <footer className="bg-gray-950 text-center p-6 mt-8 border-t border-gray-800">
          <p className="text-gray-500 mb-4">Universe Bible generated by Google Gemini API.</p>
          <button
            onClick={() => setIsJsonModalOpen(true)}
            className="bg-gray-700 text-yellow-400 px-6 py-2 rounded-md hover:bg-gray-600 hover:text-white transition-colors duration-200"
          >
            View/Download Generated JSON
          </button>
        </footer>
      </div>
      <JsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        jsonData={gameData}
      />
    </>
  );
};

export default App;