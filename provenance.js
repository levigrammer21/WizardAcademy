import {year,archive} from './model.js';
export function notable(it){return it&&(it.rarity>=3||it.roll>=1.75||it.locked);}
export function markWielder(s,w,kind,value=1){for(const id of Object.values(w.equipment||{})){const it=s.items.find(i=>i.id===id);if(!notable(it))continue;it.legacy||={kills:0,bosses:0,deepest:0,riftTitles:0,forestKills:0};if(kind==='deepest')it.legacy.deepest=Math.max(it.legacy.deepest||0,value);else it.legacy[kind]=(it.legacy[kind]||0)+value;}}
export function closeWielder(s,it,w){if(!notable(it))return;const own=it.owners?.findLast(x=>x.id===w.id);if(own)own.until=year(s);archive(s,'items',it.id,it);}
