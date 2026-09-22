// Probabilities are conditional on finding equipment, not on defeating an enemy.
export function rarityOdds(floor=1,boss=false){
 const t=Math.min(1.5,Math.max(0,Math.log(Math.max(1,floor))/Math.log(200)));
 const p=[0,.24+.10*t,.05+.14*t,.009+.046*t,.0009+.0111*t,.0001+.0029*t];
 p[0]=1-p.slice(1).reduce((a,b)=>a+b,0);
 const weights=p.map((v,i)=>v*(boss?[1,1,1.2,1.5,2,2][i]:1)),total=weights.reduce((a,b)=>a+b,0);
 return weights.map(v=>v/total);
}
export function rollRarity(value,floor,boss){const p=rarityOdds(floor,boss);let sum=0;for(let i=0;i<p.length;i++){sum+=p[i];if(value<sum)return i;}return 5;}
export function highlight(s,event){
 if(s.practice)return;
 s.highlights ||= [];
 // Offline gains collapse into one meaningful level journey per wizard and discipline.
 const old=event.kind==='level'&&s.highlights.find(x=>!x.seen&&x.kind==='level'&&x.wizard===event.wizard&&x.sport===event.sport);
 if(old){old.to=event.to;old.time=s.time;return;}
 s.highlights.unshift({...event,id:'moment_'+(++s.serial),time:s.time,seen:false});
 s.highlights=s.highlights.slice(0,40);
}
