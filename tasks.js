// Shared work rates keep the live task display and offline simulation in agreement.
import {FAMILIES,TRAITS,JOBS,HOUR} from './data.js';
import {attributes,bonus} from './model.js';
export function workRate(s,w){const job=w.job,trait=TRAITS[w.trait][2],room=['blank','seals',...FAMILIES.map(f=>f.id)].includes(job)?'runes':job==='athletics'?'rift':job==='research'?'observatory':job==='garden'?'garden':'training';return (1+(s.rooms[room]||0)*.12)*bonus(s,room)*(trait==='production'?1.15:1)*(w.injury?.65:1);}
export function workDuration(w){return w.job==='blank'?90:w.job==='seals'?240:w.job==='garden'?420:w.job==='research'?900:w.job==='clerical'?120:110*(w.runeTier||1);}
export function taskTime(seconds){seconds=Math.max(0,Math.ceil(seconds));return seconds>=3600?`${Math.floor(seconds/3600)}h ${Math.floor(seconds%3600/60)}m`:seconds>=60?`${Math.floor(seconds/60)}m ${seconds%60}s`:`${seconds}s`;}
export function taskStatus(s,w,elapsed=0){
 if(PRODUCTION_JOBS.includes(w.job)&&w.status==='Active'&&!s.expedition?.ids.includes(w.id))return productionStatus(s,w.job,productionTier(w),elapsed);
 const extra=Math.max(0,Math.min(5,elapsed)),job=w.job,rate=workRate(s,w),a=attributes(s,w),trait=TRAITS[w.trait][2];
 const out={label:JOBS[job]||job,detail:'',fraction:0,remaining:null,cycle:null,blocked:false};
 if(w.status!=='Active')return {...out,label:w.status,detail:'Active assignments have ended.',blocked:true};
 if(s.expedition?.ids.includes(w.id))return {...out,label:'On expedition',detail:`Floor ${s.expedition.floor} · academy work paused`,blocked:true};
 if(job==='training'||job==='athletics'){const sport=job==='athletics',level=sport?w.sportLevel:w.level,xp=sport?w.sportXP:w.xp,goal=100*level**1.3,perSecond=(sport?75:160*(trait==='training'?1.15:1))*rate/(HOUR/1000),current=Math.min(goal,xp+extra*perSecond);return {...out,fraction:current/goal,remaining:(goal-current)/perSecond,detail:`${Math.floor(current)} / ${Math.ceil(goal)} XP · next ${sport?'Rift':'adventure'} level ${level+1} · ${(perSecond*3600).toFixed(0)} XP/hour`};}
 if(job==='rest'||job==='recovery'){const recover=job==='recovery'?3*bonus(s,'infirmary')*(1+s.rooms.infirmary*.2):1.6,hp=Math.min(a.hp,(w.hp??a.hp)+a.hp*extra/900*recover),mana=Math.min(a.mana,(w.mana??a.mana)+a.mana*extra/600*recover),injuryRate=1+(job==='recovery'?bonus(s,'infirmary')+(trait==='recovery'?.2:0):0),injury=Math.max(0,((w.injury?.until||s.time)-s.time)/1000/injuryRate-extra),remaining=Math.max((1-hp/a.hp)*900/recover,(1-mana/a.mana)*600/recover,injury);return {...out,fraction:(hp/a.hp+mana/a.mana)/2,remaining,detail:`${Math.floor(hp)} / ${a.hp} HP · ${Math.floor(mana)} / ${a.mana} mana${w.injury?' · '+w.injury.name+': '+taskTime(injury):remaining<=0?' · fully rested':''}`};}
 if(job==='farm'||job==='boss'){const floor=job==='boss'?s.bossFloor:s.farmFloor,ready=s.wizards.filter(x=>x.status==='Active'&&x.job===job&&!x.injury&&x.hp>attributes(s,x).hp*.5).slice(0,3),reason=s.expedition?'Manual expedition outside':w.injury?'Recover from injury first':w.hp<=a.hp*.5?'Needs over 50% HP':!ready.includes(w)?'Reserve · first three eligible wizards patrol':floor>s.depth||floor<1?'Choose a cleared floor':job==='boss'&&(floor%10!==0||s.seals<1)?'Needs a defeated boss floor and a Boss Seal':'';const phase=(s.time/1000%300)+extra;return {...out,detail:`Floor ${floor} · ${reason||'next scheduled patrol; real combat and permanent risk'}`,blocked:!!reason,fraction:Math.min(1,phase/300),remaining:reason?null:Math.max(0,300-phase),cycle:300};}
 const family=FAMILIES.find(f=>f.id===job),tier=w.runeTier||1,required=tier===3?25:tier===2?10:1,duration=workDuration(w),progress=Math.min(duration,(w.progress||0)+extra*rate);
 let need='',reward='';
 if(family){out.label=`${JOBS[job]} · Tier ${tier}`;reward='12 spell charges · costs 1 unscribed rune';if(w.level<required)need=`Requires wizard level ${required}`;else if(s.blanks<1)need='Needs 1 unscribed rune';}
 else if(job==='blank')reward='1 unscribed rune · no materials required';
 else if(job==='seals'){reward='1 Boss Seal · costs 3 ingredients + 8 gold';if(s.ingredients<3||s.gold<8)need='Needs 3 seal ingredients and 8 gold';}
 else if(job==='garden'){reward='1 potion · costs 6 gold';if(s.gold<6)need='Needs 6 gold';}
 else if(job==='research'){reward='0.25 Prestige · costs 3 unscribed runes';if(s.blanks<3)need='Needs 3 unscribed runes';}
 else if(job==='clerical')reward='2 gold · no materials required';
 // Work is banked up to one finished batch by the existing simulation.
 return {...out,fraction:progress/duration,remaining:need?null:(duration-progress)/rate,cycle:duration/rate,blocked:!!need,detail:need?`${need} · ${progress>=duration?'batch ready; waiting for supplies':'work retained until supplies arrive'}`:reward};
}

export const PRODUCTION_JOBS=['blank','seals','garden','research','clerical',...FAMILIES.map(f=>f.id)];
export const productionKey=(job,tier=1)=>job+':'+(FAMILIES.some(f=>f.id===job)?tier:1);
export const productionTier=w=>FAMILIES.some(f=>f.id===w.job)?(w.runeTier||1):1;
export function initProduction(s){if(s.production)return;s.production={};for(const w of s.wizards){if(w.status==='Active'&&PRODUCTION_JOBS.includes(w.job)){const key=productionKey(w.job,productionTier(w));s.production[key]=(s.production[key]||0)+Math.max(0,w.progress||0);w.progress=0;}}}
export function productionTeam(s,job,tier=1){return s.wizards.filter(w=>w.status==='Active'&&w.job===job&&productionTier(w)===tier);}
export function productionStatus(s,job,tier=1,elapsed=0){const family=FAMILIES.find(f=>f.id===job),team=productionTeam(s,job,tier),required=family?(tier===3?25:tier===2?10:1):1,workers=team.filter(w=>!s.expedition?.ids.includes(w.id)&&w.level>=required),rate=workers.reduce((n,w)=>n+workRate(s,w),0),duration=workDuration({job,runeTier:tier}),key=productionKey(job,tier),stored=s.production?s.production[key]||0:team.reduce((n,w)=>n+(w.progress||0),0),progress=Math.min(duration,stored+Math.max(0,Math.min(5,elapsed))*rate);
 let need='',output='';if(family){output='12 spell charges · costs 1 unscribed rune';if(s.blanks<1)need='Needs 1 unscribed rune';}else if(job==='blank')output='1 unscribed rune · no material cost';else if(job==='seals'){output='1 Boss Seal · costs 3 ingredients + 8 gold';if(s.ingredients<3||s.gold<8)need='Needs 3 seal ingredients + 8 gold';}else if(job==='garden'){output='1 potion · costs 6 gold';if(s.gold<6)need='Needs 6 gold';}else if(job==='research'){output='0.25 Prestige · costs 3 unscribed runes';if(s.blanks<3)need='Needs 3 unscribed runes';}else if(job==='clerical')output='2 gold · no material cost';
 if(!workers.length)need=team.length?(team.some(w=>w.level<required)?'Requires wizard level '+required:'Assigned workers are on expedition'):'No wizards assigned';
 return {key,job,tier,team,workers,rate,duration,stored,label:(JOBS[job]||job)+(family?' · Tier '+tier:''),fraction:progress/duration,remaining:need?null:Math.max(0,(duration-progress)/rate),cycle:rate?duration/rate:null,blocked:!!need,detail:need||output,output};}
export function productionGroups(s,jobs){const groups=[];for(const job of jobs){const tiers=FAMILIES.some(f=>f.id===job)?[1,2,3]:[1];for(const tier of tiers)if(productionTeam(s,job,tier).length)groups.push(productionStatus(s,job,tier));}return groups;}
