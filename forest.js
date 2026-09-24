import {rnd,year,attributes,gainXP,news} from './model.js';
import {skillXP,practiceMagic,initializeWizard,backpackCount,backpackCapacity} from './progression.js';
export const REGIONS=[
{name:'Forest Outskirts',level:1,depth:0,creature:'Briar Hare',drops:['Raw Meat','Soft Pelt','Wild Herbs']},
{name:'Whispering Woods',level:5,depth:2,creature:'Dire Wolf',drops:['Raw Meat','Wolf Pelt','Monster Bones','Dire Fang']},
{name:'Fungal Hollow',level:12,depth:5,creature:'Sporeling',drops:['Fungal Spores','Wild Herbs','Mana Crystal']},
{name:'Moonlit Grove',level:22,depth:10,creature:'Moon Wisp',drops:['Wisp Essence','Moonbloom','Mana Crystal']},
{name:'Goblin Warrens',level:35,depth:20,creature:'Goblin Raider',drops:['Goblin Scrap','Monster Bones','Raw Meat']},
{name:'Ancient Thicket',level:50,depth:30,creature:'Elder Treant',drops:['Treant Bark','Ancient Sap','Wild Herbs']},
{name:'Wisp Marsh',level:70,depth:45,creature:'Marsh Wisp',drops:['Wisp Essence','Fungal Spores','Mana Crystal']},
{name:'Spiderwood',level:95,depth:60,creature:'Silk Widow',drops:['Spider Silk','Monster Bones','Venom Sac']},
{name:'The Deep Wilds',level:130,depth:90,creature:'Wild Guardian',drops:['Ancient Sap','Mana Crystal','Treant Bark']}];
export function assignForest(s,w,index){if(w.status!=='Active'||s.expedition?.ids.includes(w.id)||w.forestRescue)throw Error('This wizard is unavailable.');const r=REGIONS[index];if(!r||s.depth<r.depth)throw Error('Explore more dungeon floors to find this region.');initializeWizard(w);w.forestRegion=index;w.job='forest';w.forestProgress=0;}
export function returnForest(s,w,reason='Returned'){w.job='rest';w.forestProgress=0;w.forestLast=reason;w.forestRegion=null;if(reason!=='Returned')news(s,`${w.name} returned from the forest: ${reason}.`,'forest');}
export function payRescue(s,w){if(!w.forestRescue)throw Error('No rescue bill is due.');if(s.gold<w.forestRescue)throw Error(`Recovery requires ${w.forestRescue} gold.`);s.gold-=w.forestRescue;w.forestRescue=0;w.job='recovery';w.hp=Math.max(1,Math.round(attributes(s,w).hp*.25));news(s,`${w.name} was carted home and is recovering.`,'recovery');}
export function forestTick(s,dt){for(const w of s.wizards){if(w.status!=='Active'||w.job!=='forest'||s.expedition?.ids.includes(w.id))continue;initializeWizard(w);const r=REGIONS[w.forestRegion];if(!r){returnForest(s,w);continue;}const a=attributes(s,w),rules=w.forestRules;w.forestProgress=(w.forestProgress||0)+dt;let loops=0;while(w.forestProgress>=90000&&loops++<480){w.forestProgress-=90000;const health=w.hp??a.hp,threshold=Math.max(5,Math.min(90,Number(rules.retreat)||30));if(health/a.hp*100<=threshold&&rules.risk!=='Aggressive'){returnForest(s,w,'Low health');break;}const danger=(r.level/(w.level*12+10))*(rules.risk==='Cautious'?.65:rules.risk==='Aggressive'?1.4:1);const damage=Math.max(1,Math.round(a.hp*(.015+danger*.1)*(.7+rnd(s)*.6)-a.defense*.06));w.hp=Math.max(0,health-damage);if(w.hp<=0){const cost=Math.round(24+r.level*1.8+w.level*1.2);w.forestRescue=cost;w.job='rescued';w.forestLast=`Carted out · ${cost} gold due`;news(s,`${w.name} was incapacitated in ${r.name}. Recovery costs ${cost} gold.`,'forest');break;}
 w.stats.forestKills=(w.stats.forestKills||0)+1;gainXP(s,w,Math.max(2,Math.round(r.level*.7)));practiceMagic(s,w,s.items.find(i=>i.id===w.equipment.focus)?.family||'arcane',2+r.level*.15);const drop=r.drops[Math.floor(rnd(s)*r.drops.length)];const skill=drop.includes('Herb')||drop==='Moonbloom'?'Herbalism':drop.includes('Crystal')?'Mining':drop.includes('Bark')?'Woodcutting':'Foraging';skillXP(s,w,skill,3+r.level*.25);if(rules.loot!=='Valuable items'||r.drops.indexOf(drop)===r.drops.length-1){w.backpack[drop]=(w.backpack[drop]||0)+1;}
 if(backpackCount(w)>=backpackCapacity(w)){if(rules.full==='Drop lowest'){const key=Object.keys(w.backpack).find(k=>w.backpack[k]>0);if(key)w.backpack[key]--;}else{returnForest(s,w,'Inventory full');break;}}
 if(s.potions>0&&rules.potions!=='Conservative'&&w.hp/a.hp<(rules.potions==='Liberal'?.5:.25)){s.potions--;w.hp=Math.min(a.hp,w.hp+a.hp*.45);}
 if(w.stats.forestKills%100===0)news(s,`${w.name} has defeated ${w.stats.forestKills} forest creatures.`,'forest');
 }}}
