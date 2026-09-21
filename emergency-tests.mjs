import assert from 'node:assert/strict';
import * as M from './model.js';
import * as L from './sports.js';
function game(){const s=M.makeGame('Recovery',1000000,99);M.openFoundation(s);L.createLeague(s);return s;}
const s=game(),pool=s.applicants.map(w=>w.id);s.gold=0;s.prestige=100000;s.rooms.rift=1;
const recruits=M.emergencyRecruit(s);assert.equal(recruits.length,5);assert.equal(M.active(s).length,5);assert.equal(s.gold,0);assert.deepEqual(s.applicants.map(w=>w.id),pool);assert.equal(new Set(s.lineup).size,5);
for(const w of recruits){assert.equal(w.level,1);assert.equal(w.sportLevel,1);assert.ok(w.potential<=45);assert.ok(w.hpBase<=84);assert.ok(Object.values(w.equipment).every(x=>x===null));assert.ok(s.pending['wizards/'+w.id].data.emergency);}
const saved=JSON.stringify(s);assert.throws(()=>M.emergencyRecruit(s));assert.equal(JSON.stringify(s),saved);
const victim=recruits[0];M.die(s,victim,'test loss');const old=s.lineup[1];const replacement=M.emergencyRecruit(s);assert.equal(replacement.length,1);assert.equal(victim.status,'Deceased');assert.equal(s.lineup[0],replacement[0].id);assert.equal(s.lineup[1],old);assert.equal(new Set(M.active(s).map(w=>w.jersey)).size,5);
const rival=s.league.schools.find(t=>t.id!=='player'&&t.league===0),match=L.simulateMatch(s,'player',rival.id);assert.ok(!match.forfeit);assert.throws(()=>M.emergencyRecruit(s));
for(const w of M.active(s))w.injury={name:'bruise',until:s.time+10000};assert.throws(()=>M.emergencyRecruit(s));
const empty=M.makeGame('Closed',0,1);assert.throws(()=>M.emergencyRecruit(empty));
console.log('PASS Emergency recruitment: free recovery to five, basic stats, unchanged applicant pool, archived origin, permanent losses, lineup/jersey repair, and no repeat or injury bypass.');
