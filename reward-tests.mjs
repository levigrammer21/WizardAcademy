import assert from 'node:assert/strict';
import * as M from './model.js';
import {rarityOdds,rollRarity,highlight} from './rewards.js';
import {CHALLENGERS,startDuel,stepDuel,finishDuel,clubRank} from './duels.js';
const create=()=>{const s=M.makeGame('Reward tests',0,123);M.openFoundation(s);M.recruit(s,s.applicants[0].id);s.rooms.training=1;return s;};
for(const floor of [1,10,200,10000])for(const boss of [false,true]){const p=rarityOdds(floor,boss);assert.ok(p.every(x=>Number.isFinite(x)&&x>0));assert.ok(Math.abs(p.reduce((a,b)=>a+b,0)-1)<1e-10);for(let i=0;i<1000;i++)assert.ok(rollRarity(i/1000,floor,boss)>=0);}
assert.ok(rarityOdds(1)[2]<.06);assert.ok(rarityOdds(200)[5]>rarityOdds(10)[5]);assert.ok(rarityOdds(10,true)[4]>rarityOdds(10)[4]);
const s=create(),w=s.wizards[0];M.gainXP(s,w,100);M.gainXP(s,w,250);assert.equal(s.highlights.length,1);assert.equal(s.highlights[0].from,1);assert.equal(s.highlights[0].to,3);s.highlights[0].seen=true;M.gainXP(s,w,1000);assert.equal(s.highlights.length,2);
for(let i=0;i<60;i++)highlight(s,{kind:'duel',name:'Test'});assert.equal(s.highlights.length,40);
const original=create();const before=JSON.stringify({w:original.wizards,items:original.items,runes:original.runes,depth:original.depth,lost:original.lost});
startDuel(original,original.wizards[0].id,0);original.duel.run.combat.heroes[0].power=10000;while(!original.duel.finished)stepDuel(original,.25);
assert.equal(original.duel.won,true);assert.equal(original.gold,650+CHALLENGERS[0].gold);const gold=original.gold;assert.equal(finishDuel(original),false);assert.equal(original.gold,gold);assert.equal(original.wizards[0].status,'Active');assert.equal(original.depth,0);assert.equal(original.runes.fire,0);
startDuel(original,original.wizards[0].id,0);original.duel.run.combat.heroes[0].power=10000;while(!original.duel.finished)stepDuel(original,.25);assert.equal(original.gold,gold);assert.equal(original.duel.first,false);
const loss=create();startDuel(loss,loss.wizards[0].id,0);const real=M.clone(loss.wizards[0]);loss.duel.run.combat.heroes[0].power=0;loss.duel.run.combat.enemies[0].power=10000;while(!loss.duel.finished)stepDuel(loss,.25);assert.equal(loss.duel.won,false);assert.equal(loss.wizards[0].hp,real.hp);assert.equal(loss.wizards[0].status,'Active');assert.deepEqual(loss.wizards[0].equipment,real.equipment);assert.equal(loss.lost.length,0);assert.equal(loss.highlights,undefined);
const resumed=create();startDuel(resumed,resumed.wizards[0].id,0);for(let i=0;i<20;i++)stepDuel(resumed,.25);const copy=M.clone(resumed);for(let i=0;i<2000&&!resumed.duel.finished;i++)stepDuel(resumed,.25);for(let i=0;i<2000&&!copy.duel.finished;i++)stepDuel(copy,.25);assert.deepEqual(copy.duel,resumed.duel);assert.equal(copy.gold,resumed.gold);
assert.throws(()=>startDuel(create(),'bad',0));const locked=create();assert.throws(()=>startDuel(locked,locked.wizards[0].id,2));assert.equal(clubRank({dueling:{cleared:[0,1,2]}}),'Copper Wand');
console.log('PASS rarity probabilities, bounded offline milestones, nonlethal duels, first-win idempotence, rematches, serialization resume and challenger gates.');
