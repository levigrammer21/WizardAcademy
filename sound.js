// Original procedural audio. No downloads, game RNG, or persisted audio queues.
export const AUDIO_DEFAULTS={enabled:true,master:.32,effects:.7,ambience:.25,music:.18};
export function audioSettings(s){const raw=s?.settings?.audio||{};return Object.fromEntries(Object.entries(AUDIO_DEFAULTS).map(([k,v])=>[k,k==='enabled'?raw[k]!==false:Number.isFinite(raw[k])?Math.max(0,Math.min(1,raw[k])):v]));}
let context=null,master=null,buses={},getState=()=>null,started=false,nextAmbient=0,nextMusic=0,lastCue=new Map(),voices=0,observed=null,musicStep=0,activeSources=new Set();
const FREQ={fire:165,frost:740,storm:247,restoration:660,necromancy:110,arcane:440,nature:330,shadow:147,radiant:880,barrier:554,missile:494,hostile:196};
function ready(){return context?.state==='running'&&audioSettings(getState()?.s).enabled&&!globalThis.document?.hidden;}
export function refreshAudio(){if(!context)return;const a=audioSettings(getState()?.s),t=context.currentTime;master.gain.setTargetAtTime(a.enabled?a.master:0,t,.06);for(const k of ['effects','ambience','music'])buses[k].gain.setTargetAtTime(a[k],t,.08);}
function tone(freq,duration=.25,type='sine',volume=.08,delay=0,end=freq,bus='effects',pan=0){if(!ready()||voices>=28||audioSettings(getState()?.s)[bus]<=0)return;const at=context.currentTime+delay,o=context.createOscillator(),g=context.createGain(),p=context.createStereoPanner?.();o.type=type;o.frequency.setValueAtTime(Math.max(25,freq),at);o.frequency.exponentialRampToValueAtTime(Math.max(25,end),at+duration);g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(volume,at+.018);g.gain.exponentialRampToValueAtTime(.0001,at+duration);o.connect(g);if(p){p.pan.value=Math.max(-.7,Math.min(.7,pan));g.connect(p);p.connect(buses[bus]);}else g.connect(buses[bus]);voices++;activeSources.add(o);o.onended=()=>{voices--;activeSources.delete(o);o.disconnect();g.disconnect();p?.disconnect();};o.start(at);o.stop(at+duration+.03);}
function air(duration=.2,volume=.04,cutoff=1200,bus='effects',pan=0){if(!ready()||voices>=28||audioSettings(getState()?.s)[bus]<=0)return;const length=Math.ceil(context.sampleRate*duration),buffer=context.createBuffer(1,length,context.sampleRate),data=buffer.getChannelData(0);let seed=93271;for(let i=0;i<length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;data[i]=(seed/2147483648-1);}const src=context.createBufferSource(),filter=context.createBiquadFilter(),g=context.createGain();filter.type='lowpass';filter.frequency.value=cutoff;src.buffer=buffer;const t=context.currentTime;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(volume,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+duration);src.connect(filter);filter.connect(g);g.connect(buses[bus]);voices++;activeSources.add(src);src.onended=()=>{voices--;activeSources.delete(src);src.disconnect();filter.disconnect();g.disconnect();};src.start();src.stop(t+duration+.02);}
function chime(notes,volume=.075,spacing=.11){notes.forEach((f,i)=>tone(f,.65,'sine',volume,i*spacing));}
export function sound(name,opts={}){try{if(!ready())return;const now=context.currentTime,key=name==='cast'?'cast':name,last=lastCue.get(key)??-999,cooldown={cast:.17,impact:.14,heal:.3,production:2,notice:1,select:.06,room:.15}[name]??.25;if(now-last<cooldown)return;lastCue.set(key,now);const f=FREQ[opts.family]||440,pan=opts.pan||0;
 switch(name){
 case 'select':tone(660,.07,'sine',.045,0,530);break;
 case 'close':tone(440,.12,'sine',.045,0,280);break;
 case 'room':chime(({runes:[440,660,880],storage:[330,494],gate:[110,165,147],rift:[392,523,784],infirmary:[523,660,784],archives:[294,440],hall:[392,587,784],garden:[330,494,660]})[opts.room]||[392,494],.055);air(.16,.025,700);break;
 case 'cast':tone(f,.27,opts.family==='storm'?'triangle':'sine',.065,0,f*1.7,'effects',pan);if(['fire','storm','hostile'].includes(opts.family))air(.18,.035,opts.family==='fire'?650:1700);break;
 case 'impact':tone(f*.6,.16,'triangle',.055,0,f*.32,'effects',pan);air(.11,.035,800);break;
 case 'critical':chime([330,660],.075,.06);break;
 case 'heal':chime([523,660,784],.055,.07);break;
 case 'shield':tone(554,.55,'sine',.09,0,440);tone(831,.65,'sine',.04);break;
 case 'summon':tone(98,.9,'triangle',.065,0,196);chime([294,349,440],.045,.14);break;
 case 'phase':chime([147,220,294],.065,.17);break;
 case 'death':chime([294,247,196],.06,.16);break;
 case 'victory':chime([392,494,587,784],.08,.14);break;
 case 'defeat':chime([294,262,196,147],.06,.2);break;
 case 'loot':chime([660,880,1320],.07,.1);break;
 case 'rare':chime([392,587,784,988,1175],.07,.15);break;
 case 'equip':tone(330,.13,'triangle',.055,0,660);chime([660,988],.045,.08);break;
 case 'production':chime([523,784],.045,.09);break;
 case 'level':chime([440,554,660,880],.06,.12);break;
 case 'upgrade':chime([262,392,523,659],.07,.14);break;
 case 'recruit':chime([392,494,659],.07,.12);break;
 case 'coins':chime([1109,1319],.045,.045);break;
 case 'rift-pass':tone(480,.16,'sine',.05,0,780);break;
 case 'rift-goal':chime([523,659,784,1047],.07,.085);air(.7,.055,600);break;
 case 'rift-save':tone(247,.22,'triangle',.075,0,165);air(.2,.045,1100);break;
 case 'rift-whistle':tone(1100,.2,'sine',.045,0,1250);break;
 case 'notice':chime([494,587],.04,.12);break;
 default:tone(494,.13,'sine',.04);
 }
 }catch{/* Audio must never interrupt gameplay. */}}
export function observeAudio(s,route){const snap={id:s.id,time:s.time,items:s.stats.items||0,runes:s.stats.runes||0,seals:s.stats.seals||0,research:s.stats.research||0,potions:s.potions,levels:s.wizards.reduce((n,w)=>n+w.level+w.sportLevel,0),combat:s.combat?.id,state:s.combat?.state,feed:s.feed[0]?.id};const old=observed;observed=snap;if(!old||old.id!==snap.id||snap.time-old.time>15000)return;
 if(route?.type==='combat'&&snap.combat===old.combat&&snap.state!==old.state){if(snap.state==='victory')sound('victory');if(snap.state==='defeat')sound('defeat');}
 if(snap.items>old.items)sound((s.highlights?.find(m=>m.kind==='loot')?.item.rarity??0)>=2?'rare':'loot');
 else if(snap.levels>old.levels)sound('level');
 else if(route?.type==='room'&&['runes','garden','observatory'].includes(route.id)&&(snap.runes>old.runes||snap.seals>old.seals||snap.research>old.research||snap.potions>old.potions))sound('production');
 if(snap.feed!==old.feed){const kind=s.feed[0]?.kind;if(['championship','achievement','retirement','event','death'].includes(kind))sound(kind==='death'?'death':kind==='championship'?'victory':'notice');}}
export function startAudio(state){if(started)return;started=true;getState=state;const unlock=()=>{try{if(!context){const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;if(!Audio)return;context=new Audio();master=context.createGain();const limiter=context.createDynamicsCompressor();limiter.threshold.value=-18;limiter.ratio.value=5;master.connect(limiter);limiter.connect(context.destination);for(const k of ['effects','ambience','music']){buses[k]=context.createGain();buses[k].connect(master);}}refreshAudio();if(context.state==='suspended')context.resume().catch(()=>{});}catch{}};
 document.addEventListener('pointerdown',unlock,{passive:true});document.addEventListener('keydown',unlock);
 document.addEventListener('visibilitychange',()=>{if(!context)return;if(document.hidden){for(const source of activeSources){try{source.stop();}catch{}}context.suspend().catch(()=>{});}else{nextAmbient=0;nextMusic=0;observed=null;/* Resume on the next gesture; never replay missed sounds. */}});
 setInterval(()=>{try{refreshAudio();if(!ready()||!getState()?.s)return;const t=context.currentTime,route=getState()?.route;if(t>=nextAmbient){nextAmbient=t+6;const dungeon=['combat','duel'].includes(route?.type),rift=route?.type==='match';tone(dungeon?73:rift?130:110,4,'sine',.045,0,dungeon?74:111,'ambience');air(2.5,.015,dungeon?300:rift?800:450,'ambience');}if(t>=nextMusic){nextMusic=t+3.4;if(['combat','duel','match'].includes(route?.type))return;const notes=[261.63,392,329.63,493.88,440,329.63,392,293.66];tone(notes[musicStep++%notes.length],2.6,'sine',.05,0,notes[(musicStep-1)%notes.length],'music');tone(130.81,3,'sine',.025,0,130.81,'music');}}catch{}},500);
}
