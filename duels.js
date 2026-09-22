import * as M from './model.js';
import * as C from './combat.js';
import {FAMILIES} from './data.js';
import {advanceCombatPlayback} from './playback.js';
import {highlight} from './rewards.js';
export const CHALLENGERS=[
 ['Percival Paperhat','The club secretary. A brave hat, a very modest spell.',48,5,0,null],
 ['Tansy Two-Wands','A quicker opponent. More confidence than accuracy.',85,7,1,null],
 ['The Copper Prefect','A barrier absorbs the opening volley.',130,9,3,'mirror'],
 ['Mirelle Moth','Lingering poison rewards a fast finish or cleansing.',175,11,3,'poison'],
 ['Osric Inkdrinker','Drains mana on every hit. Make your opening casts count.',230,14,5,'drain'],
 ['Captain Chalk','An armored veteran. Power and damage over time help.',300,17,14,null],
 ['The Glass Twins','A second pair of echoes joins at half health.',380,20,8,'summon'],
 ['Vesper Quickthorn','Poison and a dangerous second phase.',490,24,10,'poison'],
 ['Professor Nocturne','Mana drain tests your fallback attack.',620,29,12,'drain'],
 ['The Violet Marshal','A second barrier turns this into an endurance test.',800,34,16,'mirror'],
 ['Madam Lastword','After thirty combat seconds, her patience expires.',1050,40,18,'enrage'],
 ['Aurelius Unbroken','The reigning champion calls two echoes at half health.',1400,47,22,'summon']
].map(([name,hint,hp,power,defense,mechanic],i)=>({id:i,name,hint,hp,power,defense,mechanic,gold:40+i*25,xp:30+i*8,prestige:i%3===2?3:1}));
export const clubRank=s=>['Unranked','Copper Wand','Silver Wand','Violet Wand','Club Champion'][Math.floor((s.dueling?.cleared?.length||0)/3)];
export function startDuel(s,wizardId,index){
 if(!s.rooms.training)throw Error('Open the Practice Hall first.');
 if(s.expedition)throw Error('Return your expedition before starting a duel.');
 if(s.duel&&!s.duel.finished)throw Error('Finish the current bout first.');
 s.dueling ||= {cleared:[],best:{}};
 const opponent=CHALLENGERS[index],w=s.wizards.find(w=>w.id===wizardId&&w.status==='Active'&&!w.injury);
 if(!opponent||index>s.dueling.cleared.length||!w)throw Error('Choose an unlocked challenger and a healthy active wizard.');
 const run=M.makeGame('Warded practice',s.lastWall,Math.floor(M.rnd(s)*4294967296));run.id=M.uid(s,'duel');run.practice=true;run.depth=1;run.settings=M.clone(s.settings);run.time=s.time;run.wizards=[M.clone(w)];run.items=M.clone(s.items.filter(i=>Object.values(w.equipment).includes(i.id)));run.wizards[0].stats={};run.wizards[0].yearStats={};
 for(const f of FAMILIES)for(let tier=1;tier<=3;tier++)run.runes[f.id+(tier>1?tier:'')]=9999;
 const attrs=M.attributes(run,run.wizards[0]);run.wizards[0].hp=attrs.hp;run.wizards[0].mana=attrs.mana;
 C.startExpedition(run,[w.id],1,true);
 const c=run.combat;c.boss=!!opponent.mechanic;c.mechanic=opponent.mechanic;c.kind='duel';c.enemies=[{...c.enemies[0],duelist:true,color:['#bf7fc9','#77b8c2','#d4aa5c'][index%3],skin:'#e5bb97',name:opponent.name,hp:opponent.hp,maxHP:opponent.hp,power:opponent.power,defense:opponent.defense,assassin:false,barrier:opponent.mechanic==='mirror'?opponent.hp*.15:0}];c.log=[{t:0,text:opponent.hint}];
 s.duel={id:run.id,index,wizard:w.id,name:w.name,run,finished:false};
 return s.duel;
}
export function finishDuel(s,withdraw=false){
 const d=s.duel;if(!d||d.finished)return false;
 if(!withdraw&&d.run.combat.state==='fighting')return false;
 const c=d.run.combat,opponent=CHALLENGERS[d.index],won=!withdraw&&c.state==='victory',first=won&&!s.dueling.cleared.includes(d.index),w=s.wizards.find(w=>w.id===d.wizard);
 d.finished=true;d.won=won;d.first=first;d.reward=first?{gold:opponent.gold,xp:opponent.xp,prestige:opponent.prestige}:null;
 if(withdraw)c.state='withdrawn';
 M.stat(s,w,'duels');if(won){M.stat(s,w,'duelWins');s.dueling.best[d.index]=Math.min(s.dueling.best[d.index]??Infinity,c.time);}
 if(first){s.dueling.cleared.push(d.index);s.gold+=opponent.gold;s.prestige+=opponent.prestige;if(w?.status==='Active')M.gainXP(s,w,opponent.xp);highlight(s,{kind:'duel',name:d.name,opponent:opponent.name,rank:clubRank(s),gold:opponent.gold});M.news(s,`${d.name} defeats ${opponent.name} in the Dueling Club. ${clubRank(s)} · ${s.dueling.cleared.length}/12 challengers beaten.`,'achievement');}
 if(w)M.refreshRecords(s,w);
 M.archive(s,'battles',d.id,{id:d.id,kind:'duel',year:M.year(s),wizard:d.wizard,name:d.name,opponent:opponent.name,won,first,time:c.time,reward:d.reward});
 // Keep only the visible bout, never its sandbox archive or simulated economy.
 d.run.pending={};d.run.feed=[];d.run.lost=[];
 return true;
}
export function stepDuel(s,dt){if(!s.duel||s.duel.finished)return false;advanceCombatPlayback(s.duel.run,dt,C.stepCombat);return finishDuel(s);}
