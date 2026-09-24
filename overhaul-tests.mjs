import assert from 'node:assert/strict';
import {makeGame,openFoundation,recruit,item,equip} from './model.js';
import {processTime} from './simulation.js';
import {assignForest,REGIONS,payRescue} from './forest.js';
import {skillLevel,setMaster,backpackCount,transferBackpack} from './progression.js';
const start=1700000000000;
function setup(seed=123){const s=makeGame('Test',start,seed);openFoundation(s);const w=recruit(s,s.applicants[0].id);return {s,w};}
let {s,w}=setup();assert.equal(REGIONS.length,9);assignForest(s,w,0);processTime(s,start+30*60000);assert.ok(w.stats.forestKills>0||w.forestRescue);assert.equal(w.status,'Active');assert.ok(w.skills.Destruction||w.forestRescue);assert.equal(w.hp>=0,true);if(w.forestRescue){assert.throws(()=>payRescue({...s,gold:0},w));s.gold=10000;payRescue(s,w);assert.equal(w.job,'recovery');}else {const count=backpackCount(w);transferBackpack(s,w);assert.equal(backpackCount(w),0);assert.ok(Object.values(s.materials).reduce((a,b)=>a+b,0)>=count);}
const a=setup(999),b=setup(999);assignForest(a.s,a.w,0);assignForest(b.s,b.w,0);processTime(a.s,start+600000);processTime(a.s,start+1200000);processTime(b.s,start+1200000);assert.deepEqual([a.w.hp,a.w.backpack,a.w.skills,a.w.forestRescue,a.s.rng],[b.w.hp,b.w.backpack,b.w.skills,b.w.forestRescue,b.s.rng]);
const apprentice=setup(321);const next=recruit(apprentice.s,apprentice.s.applicants[0].id);setMaster(apprentice.s,next,apprentice.w);assert.equal(next.masterId,apprentice.w.id);assert.equal(skillLevel(next,'Herbalism'),1);assert.ok(next.legacy.some(x=>x.includes('Apprenticed')));
const migrated=setup(22);delete migrated.w.skills;delete migrated.w.backpack;delete migrated.s.materials;processTime(migrated.s,start+60000);assert.ok(migrated.w.skills&&migrated.w.backpack&&migrated.s.materials);console.log('PASS forest activity, rescue, materials, deterministic offline steps, mentorship, legacy save defaults');
const live=setup(44);assignForest(live.s,live.w,0);processTime(live.s,start+6000);const combat=live.s.forestBattles[live.w.id];assert.equal(combat.kind,'forest');assert.equal(combat.heroes[0].id,live.w.id);assert.equal(combat.enemies[0].side,'enemy');assert.ok(combat.log.length>=1);assert.ok(combat.time>0);
const craft=setup(12);craft.s.rooms.garden=1;craft.w.job='foraging';processTime(craft.s,start+8*60000);assert.ok(craft.s.materials['Wild Herbs']>=2);assert.ok(craft.w.skills.Foraging.xp>0);
const pack=setup(45);pack.s.depth=1;pack.s.expedition={ids:[pack.w.id],floor:1};const found=item(pack.s,1,false,pack.w);assert.equal(found.carriedBy,pack.w.id);assert.ok(pack.w.packItems.includes(found.id));const other=recruit(pack.s,pack.s.applicants[0].id);assert.throws(()=>equip(pack.s,other,found.id));
