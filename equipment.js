import {attributes} from './model.js';
export const SLOTS=['focus','robe','charm'];
export function slotItems(s,w,slot){if(!SLOTS.includes(slot))return [];return s.items.filter(i=>i.slot===slot).sort((a,b)=>Number(b.id===w.equipment[slot])-Number(a.id===w.equipment[slot])||Number(!!a.owner&&a.owner!==w.id)-Number(!!b.owner&&b.owner!==w.id)||b.power-a.power);}
export function compareLoadout(s,w,item){if(!item||!SLOTS.includes(item.slot))throw Error('Invalid equipment slot.');const before=attributes(s,w),after=attributes(s,{...w,equipment:{...w.equipment,[item.slot]:item.id}});return {before,after,current:s.items.find(i=>i.id===w.equipment[item.slot])||null};}
