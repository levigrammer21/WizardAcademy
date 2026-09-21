import {combatEventsAfter,combatEventSequence} from './combat-events.js';

const COLORS={missile:'#b7a5ff',fire:'#ffb04f',frost:'#86e7ff',storm:'#cbb2ff',restoration:'#79efb9',necromancy:'#b7dea0',arcane:'#ac98ff',nature:'#b6e76b',shadow:'#e2a4ed',radiant:'#ffe4a0',barrier:'#72e4e9',hostile:'#ef9a9d'};
const THEMES=[
 {name:'The old foundations',floor:'#303448',tile:'#3a4053',wall:'#242738',edge:'#616681',accent:'#a699dc',props:'stone'},
 {name:'The drowned archive',floor:'#243c49',tile:'#2e4b57',wall:'#1e303c',edge:'#557e85',accent:'#7fd6d0',props:'books'},
 {name:'The amethyst vault',floor:'#393049',tile:'#493c5c',wall:'#292039',edge:'#846597',accent:'#c292fa',props:'crystals'},
 {name:'The roots below',floor:'#2c403b',tile:'#354d43',wall:'#20332f',edge:'#63806a',accent:'#b5cf7d',props:'roots'},
 {name:'The cinder cloister',floor:'#42323d',tile:'#543d43',wall:'#2d252f',edge:'#946b70',accent:'#efb075',props:'embers'}
];
export function arenaTheme(floor){return THEMES[Math.floor((Math.max(1,floor)-1)/10)%THEMES.length];}
export function visualHash(value){let hash=2166136261;for(const c of String(value))hash=Math.imul(hash^c.charCodeAt(0),16777619);return hash>>>0;}
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
function circle(ctx,x,y,r,color,alpha=1){ctx.save();ctx.globalAlpha*=alpha;ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,Math.max(0,r),0,Math.PI*2);ctx.fill();ctx.restore();}
function ellipse(ctx,x,y,rx,ry,color,alpha=1){ctx.save();ctx.globalAlpha*=alpha;ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill();ctx.restore();}
function line(ctx,points,color,width=2,alpha=1){ctx.save();ctx.globalAlpha*=alpha;ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();ctx.restore();}
function poly(ctx,points,color){ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();}
function rect(ctx,x,y,w,h,color,r=0){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
function ring(ctx,x,y,r,color,width=2,alpha=1){ctx.save();ctx.globalAlpha*=alpha;ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();ctx.restore();}
function glow(ctx,x,y,r,color,alpha=.2){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,color+'00');circle(ctx,x,y,r,g,alpha);}
function text(ctx,value,x,y,size=12,color='#eee8fa',align='center'){ctx.font=`600 ${size}px system-ui,sans-serif`;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillStyle=color;ctx.fillText(value,x,y);}
function rune(ctx,x,y,r,color,rotation=0,alpha=.5){ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ring(ctx,0,0,r,color,1.3,alpha);ring(ctx,0,0,r*.72,color,1,alpha*.6);for(let i=0;i<6;i++){const a=i*Math.PI/3;line(ctx,[[Math.cos(a)*r*.72,Math.sin(a)*r*.72],[Math.cos(a+.6)*r*.72,Math.sin(a+.6)*r*.72]],color,1,alpha);line(ctx,[[Math.cos(a)*r*.9,Math.sin(a)*r*.9],[Math.cos(a)*r*1.08,Math.sin(a)*r*1.08]],color,2,alpha);}ctx.restore();}

export function drawDungeon(ctx,width,height,combat){
 const theme=arenaTheme(combat.floor),pad=width<450?13:22,wall=36;
 rect(ctx,0,0,width,height,'#101322');
 rect(ctx,pad,wall,width-pad*2,height-wall-pad,theme.floor,8);
 const tileW=width<450?43:62,tileH=39;
 for(let y=wall+8,row=0;y<height-pad;y+=tileH,row++)for(let x=pad+3-(row%2)*tileW/2,col=0;x<width-pad;x+=tileW,col++){
  const seed=visualHash(`${combat.floor}:${row}:${col}`);const tx=Math.max(pad+3,x),tw=Math.min(x+tileW-3,width-pad-3)-tx;if(tw<1)continue;
  rect(ctx,tx,y,tw,Math.min(tileH-3,height-pad-y),seed%5===0?theme.tile:theme.floor,2);
  line(ctx,[[tx,y+1],[tx+tw,y+1]],theme.edge,.6,.24);
  if(seed%11===0)line(ctx,[[tx+tw*.3,y+3],[tx+tw*.5,y+13],[tx+tw*.43,y+24]],'#0b1019',1,.3);
 }
 // Architectural boundaries, a dark exit arch, and a threshold back to the academy.
 rect(ctx,pad,9,width-2*pad,33,theme.wall,5);
 for(let x=pad+2;x<width-pad;x+=51){rect(ctx,x,11,Math.min(47,width-pad-x),24,theme.tile,2);line(ctx,[[x,35],[Math.min(x+47,width-pad),35]],theme.edge,2,.45);}
 const doorX=width*.72;
 rect(ctx,doorX-22,4,44,43,'#131624',17);rect(ctx,doorX-15,7,30,35,'#0b1020',14);
 for(let x=doorX-11;x<doorX+13;x+=8)line(ctx,[[x,11],[x,39]],theme.edge,2,.5);
 rect(ctx,pad,height*.52,6,64,'#ad99ce');rect(ctx,4,height*.52,9,64,theme.wall);
 for(const x of [pad+8,width-pad-8])for(const y of [64,height-42]){ellipse(ctx,x,y+5,10,5,'#0c1021',.45);rect(ctx,x-7,y-9,14,20,theme.wall,3);rect(ctx,x-9,y-12,18,6,theme.edge,2);}
 // Room-specific props sit along the perimeter, outside the combat lanes.
 const propY=height-36;
 if(theme.props==='books')for(const [x,y] of [[width*.22,59],[width*.5,propY]]){rect(ctx,x-24,y-8,48,17,'#685274',2);for(let j=0;j<7;j++)rect(ctx,x-21+j*6,y-8,4,13,['#c0a57a','#86b7b7','#a08bc9'][j%3]);}
 if(theme.props==='crystals')for(const [x,y] of [[width*.14,68],[width*.86,propY]]){ellipse(ctx,x,y+7,22,8,'#16112b',.7);for(let i=0;i<3;i++){const a=x+(i-1)*11;poly(ctx,[[a-6,y],[a-3,y-22-i*3],[a+3,y-28-i*3],[a+7,y],[a,y+6]],['#a077c9','#ba9aeb','#7056a0'][i]);line(ctx,[[a,y-25],[a,y+3]],'#e2d1ff',1,.5);}glow(ctx,x,y-8,28,theme.accent,.13);}
 if(theme.props==='roots'){for(const flip of [0,1]){const x=flip?width-pad:pad;line(ctx,[[x,70],[x+(flip?-18:18),105],[x+(flip?-9:9),155],[x+(flip?-30:30),185]],'#719367',4,.7);for(let i=0;i<5;i++)ellipse(ctx,x+(flip?-12:12),91+i*17,8,3,'#8aad70',.55);}}
 if(theme.props==='stone'||theme.props==='embers'){for(const [x,y] of [[width*.18,propY],[width*.84,66]]){ellipse(ctx,x,y+8,21,9,'#131624',.45);rect(ctx,x-13,y-9,25,21,'#685776',3);line(ctx,[[x-13,y-3],[x+12,y-3]],'#b4a0bf',2,.45);rect(ctx,x-2,y-3,4,8,'#e0b878',1);}}
 for(const x of [width*.32,width*.9]){glow(ctx,x,49,36,'#f4b26d',.12);rect(ctx,x-3,38,6,15,'#66546a',2);poly(ctx,[[x-6,41],[x-4,32],[x,25],[x+5,34],[x+4,42]],'#e8a765');poly(ctx,[[x-2,39],[x,31],[x+3,38]],'#ffe2a2');}
 rune(ctx,width*.52,height*.53,Math.min(width*.19,88),theme.accent,-.1,.12);
 if(combat.boss){rune(ctx,width*.69,height*.53,Math.min(width*.17,73),'#d2a06c',.2,.22);}
 if(combat.kind==='shrine'){rune(ctx,width*.5,height*.36,25,'#8ddeca',0,.45);}
 const shade=ctx.createRadialGradient(width*.5,height*.5,width*.2,width*.5,height*.5,width*.75);shade.addColorStop(0,'#09092100');shade.addColorStop(1,'#080c2466');rect(ctx,0,0,width,height,shade);
}

function drawWizard(ctx,actor,model,t){
 const skin=actor.skin||'#e5bb97',robe=actor.color||'#a084dc',face=model.facing,cast=Math.max(0,model.castUntil-t),step=model.walking?Math.sin(t*9+model.seed)*2:0;
 line(ctx,[[-5,3],[-5+step,12]],'#252239',4);line(ctx,[[5,3],[5-step,12]],'#252239',4);
 poly(ctx,[[-7,-18],[6,-18],[12,7],[-12,7]],robe);
 poly(ctx,[[-2,-17],[2,-17],[4,7],[-4,7]],'#efca86');line(ctx,[[-10,6],[10,6]],'#d9c2f0',1,.6);
 circle(ctx,0,-25,8,skin);ellipse(ctx,0,-19,4,2,'#b58170',.6);
 poly(ctx,[[-12,-30],[-5,-55],[2,-50],[9,-31]],robe);line(ctx,[[-8,-34],[7,-33]],'#f6d99b',3);ellipse(ctx,0,-30,15,4,robe);
 circle(ctx,face*4,-25,1.1,'#302439');
 const handX=face*(cast?17:11),handY=cast?-22:-12;
 line(ctx,[[face*7,-16],[handX,handY]],robe,6);circle(ctx,handX,handY,2.8,skin);
 line(ctx,[[handX,handY+13],[handX+face*2,handY-13]],'#bc966e',2.5);
 const color=COLORS[model.castFamily]||COLORS.missile;circle(ctx,handX+face*2,handY-14,3.2,color);
 if(cast)ring(ctx,handX+face*2,handY-14,7,color,1.2,.7);
}
function drawSkeleton(ctx,marshal=false){
 const bone=marshal?'#efe1b1':'#cfdfb8';line(ctx,[[0,-18],[0,3],[-7,12]],bone,3);line(ctx,[[0,3],[8,11]],bone,3);line(ctx,[[-11,-7],[0,-13],[12,-6]],bone,3);
 for(let y=-15;y<-4;y+=4)line(ctx,[[-5,y],[5,y]],bone,2);circle(ctx,0,-26,8,bone);circle(ctx,-3,-27,1.8,'#273e36');circle(ctx,3,-27,1.8,'#273e36');line(ctx,[[-3,-21],[3,-21]],'#657c58',1.2);
 if(marshal){poly(ctx,[[-8,-32],[-9,-42],[-3,-37],[1,-45],[5,-37],[10,-42],[8,-32]],'#c9b771');line(ctx,[[14,-5],[14,-32]],'#b5cf97',3);}
}
function enemyType(name){name=name.toLowerCase();if(/slime|mite|leech/.test(name))return 'slime';if(/golem|clockwork|parliament/.test(name))return 'golem';if(/mimic/.test(name))return 'mimic';if(/wraith|ghost|hollow|mirror|zero|star/.test(name))return 'wraith';if(/eel|serpent|hound/.test(name))return 'serpent';if(/imp|ghoul|briar|orchard/.test(name))return 'imp';return 'skeleton';}
function drawMonster(ctx,actor,model,t,boss){
 const type=enemyType(actor.name),color=boss?'#c8a2cd':'#b399ad';
 if(type==='skeleton')drawSkeleton(ctx,boss);
 else if(type==='slime'){ctx.fillStyle='#92b2a4';ctx.beginPath();ctx.moveTo(-18,8);ctx.bezierCurveTo(-26,-10,-10,-36,4,-28);ctx.bezierCurveTo(21,-24,26,3,18,9);ctx.closePath();ctx.fill();ellipse(ctx,-4,-20,8,4,'#c8e0be',.35);circle(ctx,-6,-10,3,'#354852');circle(ctx,7,-10,3,'#354852');}
 else if(type==='golem'){rect(ctx,-14,-27,28,31,'#9292ac',5);rect(ctx,-11,-45,22,20,'#b2a5b5',4);rect(ctx,-22,-23,8,28,'#7e7e96',3);rect(ctx,14,-23,8,28,'#7e7e96',3);rect(ctx,-12,2,9,11,'#6c6d86',2);rect(ctx,3,2,9,11,'#6c6d86',2);rect(ctx,-7,-37,5,3,'#f1c78c');rect(ctx,3,-37,5,3,'#f1c78c');rune(ctx,0,-13,8,'#dab791',0,.7);}
 else if(type==='mimic'){rect(ctx,-23,-8,46,20,'#8f5e52',4);poly(ctx,[[-24,-12],[-21,-30],[20,-30],[24,-12]],'#bb8f66');line(ctx,[[-20,-12],[20,-12]],'#241827',6);for(let i=-16;i<20;i+=8)poly(ctx,[[i,-14],[i+5,-14],[i+2,-7]],'#e9dabc');circle(ctx,-9,-23,3,'#f2c799');circle(ctx,9,-23,3,'#f2c799');}
 else if(type==='wraith'){ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-17,8);ctx.quadraticCurveTo(-19,-43,0,-47);ctx.quadraticCurveTo(20,-38,17,7);ctx.lineTo(9,2);ctx.lineTo(0,11);ctx.lineTo(-8,3);ctx.closePath();ctx.fill();ellipse(ctx,0,-27,10,12,'#3a284c');circle(ctx,-4,-30,2,'#c6caff');circle(ctx,4,-30,2,'#c6caff');}
 else if(type==='serpent'){ctx.strokeStyle='#8ba39a';ctx.lineWidth=12;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(18,9);ctx.bezierCurveTo(-26,18,8,-12,-7,-24);ctx.stroke();ellipse(ctx,-8,-29,12,9,'#b1bfa0');circle(ctx,-13,-32,2,'#ede3a7');poly(ctx,[[-21,-29],[-29,-25],[-20,-25]],'#ba7e99');}
 else{poly(ctx,[[-13,7],[-9,-24],[8,-24],[13,7]],'#ac817d');circle(ctx,0,-29,12,'#c09280');poly(ctx,[[-10,-34],[-15,-46],[-3,-38]],'#dabaa2');poly(ctx,[[5,-38],[16,-47],[11,-32]],'#dabaa2');circle(ctx,-4,-30,2,'#f0d39d');circle(ctx,5,-30,2,'#f0d39d');line(ctx,[[-7,-15],[-19,-5]],'#c09280',5);line(ctx,[[9,-15],[19,-7]],'#c09280',5);}
 if(boss){rune(ctx,0,-59,10,'#e2bc79',0,.65);}
}

export class ArenaRenderer {
 constructor(){this.combat=null;this.sequence=0;this.actors=new Map();this.flights=[];this.splats=[];this.rings=[];this.now=0;this.width=0;this.height=0;this.background=null;this.phaseUntil=0;this.sleeping=false;}
 reset(combat,skipPast=false){this.combat=combat;this.sequence=skipPast?combatEventSequence(combat):0;this.actors.clear();this.flights=[];this.splats=[];this.rings=[];this.background=null;this.now=0;this.phaseUntil=0;}
 sync(combat,wizards,width,height,dt,reduced=false){
  if(this.combat!==combat)this.reset(combat,combat.time>1);
  this.now+=Math.min(.06,dt);this.width=width;this.height=height;this.reduced=reduced;
  const all=[...combat.heroes,...combat.enemies,...combat.summons];
  for(const [index,actor] of all.entries()){
   let model=this.actors.get(actor.id);const hero=actor.side==='hero',summon=actor.side==='summon';
   const idx=hero?combat.heroes.indexOf(actor):summon?combat.summons.indexOf(actor):combat.enemies.indexOf(actor),count=hero?combat.heroes.length:summon?Math.max(1,combat.summons.filter(a=>a.hp>0).length):combat.enemies.length;
   const wizard=wizards.find(w=>w.id===actor.id),baseX=hero?({Front:.38,Middle:.28,Back:.17}[actor.position]||.28):summon?.47:.72;
   const baseY=hero?(.34+idx/Math.max(2,count-1)*.48):summon?(.32+(idx%5)*.115):(.38+idx/Math.max(1,count-1)*.42);
   if(!model){model={id:actor.id,x:baseX,y:baseY,baseX,baseY,goalX:baseX,goalY:baseY,seed:visualHash(actor.id)%1000,nextWander:0,hp:actor.hp,displayHP:actor.hp,mana:actor.mana||0,barrier:actor.barrier||0,castUntil:0,castFamily:'missile',facing:hero||summon?1:-1,spawnAt:this.now,deathAt:actor.hp<=0?this.now-2:null,pending:0,lastImpactAt:0,roaming:false};this.actors.set(actor.id,model);if(summon&&actor.hp>0)this.rings.push({x:baseX,y:baseY,color:COLORS.necromancy,at:this.now,life:1.2,kind:'summon'});}
   model.actor=wizard?{...actor,skin:wizard.skin,color:wizard.color}:actor;model.boss=combat.boss&&actor===combat.enemies[0];
   model.baseX=baseX;model.baseY=baseY;
  }
  for(const event of combatEventsAfter(combat,this.sequence)){this.sequence=event.sequence;this.consume(event);}
  for(const model of this.actors.values()){
   const actor=model.actor;
   if(!model.pending){model.hp=actor.hp;model.barrier=actor.barrier||0;if(actor.hp<=0&&model.deathAt===null)model.deathAt=this.now;}
   model.mana=actor.mana||0;
   model.displayHP+=(model.hp-model.displayHP)*Math.min(1,dt*7);
   const alive=model.hp>0;
   if(alive&&!reduced&&combat.state==='fighting'&&this.now>model.nextWander){
    const phase=model.seed+Math.floor(this.now/3.5)*1.7;
    model.goalX=clamp(model.baseX+Math.sin(phase)*.045,.12,.86);model.goalY=clamp(model.baseY+Math.cos(phase*1.6)*.045,.27,.84);model.nextWander=this.now+3.3+(model.seed%13)/10;
   }
   const dx=model.goalX-model.x,dy=model.goalY-model.y,dist=Math.hypot(dx*width,dy*height),speed=(actor.side==='summon'?45:28)*Math.min(dt,.06);
   model.walking=alive&&!reduced&&dist>1.4&&this.now>model.castUntil;
   if(model.walking){const portion=Math.min(1,speed/dist);model.x+=dx*portion;model.y+=dy*portion;}
  }
  for(const flight of this.flights){if(!flight.hit&&this.now>=flight.at+flight.duration){flight.hit=true;this.impact(flight);}}
  this.flights=this.flights.filter(f=>this.now-f.at<f.duration+.08);
  this.splats=this.splats.filter(f=>this.now-f.at<f.life).slice(-30);
  this.rings=this.rings.filter(f=>this.now-f.at<f.life).slice(-24);
 }
 consume(event){
  const target=this.actors.get(event.targetId),source=this.actors.get(event.sourceId)||target;if(!target)return;
  if(event.kind==='phase'){this.phaseUntil=this.now+3;this.rings.push({x:target.x,y:target.y,color:'#d7b27b',at:this.now,life:1.6,kind:'phase'});return;}
  if(event.kind==='death')return; // Death follows the corresponding impact, not the simulation tick.
  if(event.kind==='summon'){if(source){source.castUntil=this.now+.75;source.castFamily='necromancy';}return;}
  const kind=event.kind,color=COLORS[event.family]||COLORS.missile;
  if(source&&kind!=='tick'){source.castUntil=this.now+.45;source.castFamily=event.family;source.facing=target.x>=source.x?1:-1;}
  if(kind==='strike'&&source){source.goalX=clamp(target.x-.065,.15,.83);source.goalY=target.y+.025;source.castUntil=this.now+.1;}
  if(!target.pending&&Number.isFinite(event.hpBefore)){target.hp=event.hpBefore;target.displayHP=event.hpBefore;target.deathAt=null;}
  if(Number.isFinite(event.hpAfter))target.pending++;
  let duration=this.reduced?.16:kind==='tick'?.1:kind==='explosion'?.4:kind==='strike'?.65:source===target?.35:.72;
  duration=Math.max(duration,target.lastImpactAt-this.now+.09);target.lastImpactAt=this.now+duration;
  this.flights.push({event,source:source?.id,target:target.id,fromX:source?.x??target.x,fromY:source?.y??target.y,toX:target.x,toY:target.y,at:this.now,duration,color,kind,hit:false});
  if(this.flights.length>60){const overflow=this.flights.splice(0,this.flights.length-60);for(const f of overflow)if(!f.hit)this.impact(f);}
 }
 impact(flight){const {event}=flight,target=this.actors.get(flight.target);if(!target)return;
  if(Number.isFinite(event.hpAfter)){target.hp=event.hpAfter;target.pending=Math.max(0,target.pending-1);if(target.hp<=0&&target.deathAt===null)target.deathAt=this.now;}
  if(event.kind==='shield')target.barrier=target.actor.barrier||event.amount;
  const heal=event.kind==='heal',label=event.kind==='shield'?'WARD':event.critical?'CRITICAL':event.echoAmount?'ECHO':event.absorbed&&!event.amount?'ABSORBED':'';
  const amount=event.kind==='shield'?event.amount:Math.round(event.amount||0)+(event.echoAmount||0);
  if(amount||event.absorbed){const number=amount?(heal?'+':event.kind==='shield'?'⬡ ':'−')+amount:'⬡ '+event.absorbed;const lane=this.splats.filter(p=>p.target===target.id&&this.now-p.at<1).length%3;
   this.splats.push({target:target.id,x:target.x,y:target.y,number,label,absorbed:event.absorbed&&amount?event.absorbed:0,color:heal?'#9af2c4':event.kind==='shield'?'#9ce7f1':event.critical?'#ffe09a':'#f4deef',at:this.now,life:1.55,lane});}
  this.rings.push({x:target.x,y:target.y,color:flight.color,at:this.now,life:event.kind==='shield'?1.1:.65,kind:event.kind});
 }
 draw(ctx,width,height,combat){
  if(!this.background||this.background.width!==width||this.background.height!==height){this.background=typeof OffscreenCanvas!=='undefined'?new OffscreenCanvas(width,height):document.createElement('canvas');this.background.width=width;this.background.height=height;drawDungeon(this.background.getContext('2d'),width,height,combat);}
  ctx.clearRect(0,0,width,height);ctx.drawImage(this.background,0,0,width,height);
  const scale=clamp(width/700,.72,1.06);
  for(const r of this.rings.filter(r=>['summon','phase'].includes(r.kind))){const t=(this.now-r.at)/r.life;rune(ctx,r.x*width,r.y*height+7,scale*(18+26*t),r.color,t*.5,(1-t)*.7);}
  const models=[...this.actors.values()].sort((a,b)=>a.y-b.y);
  for(const model of models){const a=model.actor,x=model.x*width,y=model.y*height,dead=model.hp<=0,bossScale=model.boss?1.4:1,sz=scale*bossScale;ctx.save();ctx.translate(x,y);ellipse(ctx,0,9*sz,16*sz,6*sz,'#070914',.43);
   if(dead){const p=clamp((this.now-model.deathAt)/.7,0,1);ctx.globalAlpha=.8-p*.36;ctx.rotate(-p*.9);ctx.scale(sz,sz*(1-.2*p));}else{ctx.scale(sz,sz);if(model.walking)ctx.translate(0,Math.sin(this.now*9+model.seed)*.8);}
   if(a.side==='hero')drawWizard(ctx,a,model,this.now);else if(a.side==='summon')drawSkeleton(ctx,/Marshal/.test(a.name));else drawMonster(ctx,a,model,this.now,model.boss);
   ctx.restore();if(dead)continue;
   if(model.barrier>0){ctx.save();ctx.strokeStyle='#95e8ef';ctx.lineWidth=1.8;ctx.globalAlpha=.65;ctx.beginPath();ctx.ellipse(x,y-18*sz,22*sz,35*sz,0,0,Math.PI*2);ctx.stroke();ctx.restore();}
   const status=Object.keys(a.status||{});if(status.length){const col=COLORS[({Burn:'fire',Poison:'nature',Slow:'frost',Shock:'storm',Curse:'arcane',Bleed:'shadow',Blessing:'radiant'})[status[0]]]||'#c0b0e9';ring(ctx,x,y+10*sz,17*sz,col,1,.55);for(let k=0;k<Math.min(3,status.length);k++)circle(ctx,x+(k-1)*7,y+13*sz,2.3,col,.8);}
   const barW=model.boss?70:44,barY=y-63*sz;
   rect(ctx,x-barW/2,barY,barW,4,'#101422',2);rect(ctx,x-barW/2,barY,barW*clamp(model.displayHP/a.maxHP,0,1),4,a.side==='enemy'?'#de91a3':'#77d2b5',2);
   if(a.side==='hero'){rect(ctx,x-barW/2,barY+6,barW,3,'#151426',2);rect(ctx,x-barW/2,barY+6,barW*clamp(model.mana/a.maxMana,0,1),3,'#ac94ee',2);}
   const name=a.side==='hero'?a.name.split(' ')[0]:a.name;const caption=name.length>(width<450?14:22)?name.slice(0,width<450?12:20)+'…':name;
   ctx.save();ctx.shadowColor='#070a16';ctx.shadowBlur=4;text(ctx,caption,clamp(x,48,width-48),y+23*sz,width<450?10:11,a.side==='hero'?'#e8e0fa':a.side==='summon'?'#bdddab':'#dfc7d9');ctx.restore();
  }
  for(const flight of this.flights)if(!flight.hit)this.drawFlight(ctx,flight,width,height,scale);
  for(const r of this.rings.filter(r=>!['summon','phase'].includes(r.kind))){const p=(this.now-r.at)/r.life;ring(ctx,r.x*width,r.y*height-19*scale,(7+p*19)*scale,r.color,1.7,(1-p)*.6);}
  for(const p of this.splats){const elapsed=this.now-p.at,fade=clamp((p.life-elapsed)/.4,0,1),x=clamp(p.x*width+(p.lane-1)*15,42,width-42),y=clamp(p.y*height-69*scale-p.lane*17-(this.reduced?0:elapsed*15),40,height-55);ctx.save();ctx.globalAlpha=fade;ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';ctx.font=`800 ${p.label==='CRITICAL'?20:17}px system-ui,sans-serif`;ctx.strokeStyle='#191428';ctx.lineWidth=4;ctx.strokeText(p.number,x,y);ctx.fillStyle=p.color;ctx.fillText(p.number,x,y);if(p.label)text(ctx,p.label,x,y-15,8,p.color);if(p.absorbed)text(ctx,'⬡ '+p.absorbed+' absorbed',x,y+16,9,'#b6eff0');ctx.restore();}
  if(this.now<this.phaseUntil){const a=clamp((this.phaseUntil-this.now)/.5,0,1);ctx.save();ctx.globalAlpha=a;rect(ctx,width/2-85,48,170,30,'#241c38df',8);text(ctx,'PHASE II · AWAKENED',width/2,63,11,'#f2d29b');ctx.restore();}
 }
 drawFlight(ctx,f,w,h,scale){const p=clamp((this.now-f.at)/f.duration,0,1),source=this.actors.get(f.source),target=this.actors.get(f.target);if(f.kind==='tick')return;const ex=(target?.x??f.toX)*w,ey=(target?.y??f.toY)*h-21*scale,sx=f.fromX*w,sy=f.fromY*h-24*scale;
  if(this.reduced){line(ctx,[[sx,sy],[ex,ey]],f.color,1.5,.28);return;}
  const arc=Math.sin(p*Math.PI)*(f.kind==='heal'?-23:f.kind==='strike'?-8:-12),x=sx+(ex-sx)*p,y=sy+(ey-sy)*p+arc;
  if(f.kind==='strike'){const angle=p*Math.PI*1.4;line(ctx,Array.from({length:8},(_,i)=>[x+Math.cos(angle+i*.12)*12,y+Math.sin(angle+i*.12)*12]),f.color,2,.8);return;}
  if(f.kind==='explosion'){ring(ctx,sx,sy,10+p*34,f.color,2,(1-p)*.5);return;}
  const family=f.event.family;for(let i=4;i>0;i--){const q=Math.max(0,p-i*.035),tx=sx+(ex-sx)*q,ty=sy+(ey-sy)*q+Math.sin(q*Math.PI)*(f.kind==='heal'?-23:-12);circle(ctx,tx,ty,(family==='fire'?5.5:3.5)*scale*(1-i*.12),f.color,.5-i*.07);}
  glow(ctx,x,y,14*scale,f.color,.25);
  if(family==='frost'){poly(ctx,[[x-7*scale,y],[x,y-4*scale],[x+8*scale,y],[x,y+4*scale]],'#b8f1ff');}
  else if(family==='storm'){line(ctx,[[x-9,y+3],[x-2,y-4],[x+1,y+3],[x+9,y-5]],'#e3d6ff',2);}
  else if(f.kind==='heal'){circle(ctx,x,y,5*scale,f.color,.9);line(ctx,[[x-3,y],[x+3,y]],'#efffea',1.5);line(ctx,[[x,y-3],[x,y+3]],'#efffea',1.5);}
  else if(f.kind==='shield'){rune(ctx,x,y,7*scale,f.color,p,1);}
  else{circle(ctx,x,y,(family==='fire'?6:4)*scale,f.color);circle(ctx,x-1,y-1,2*scale,'#fff1d6',.95);}
 }
}

let started=false;
export function startCombatArena(getState){
 if(started)return;started=true;const renderer=new ArenaRenderer();let last=0,visible=false;
 function frame(time){requestAnimationFrame(frame);const state=getState(),canvas=document.getElementById('combat-canvas');if(!state?.combat||!canvas||!canvas.isConnected||document.hidden){visible=false;last=time;return;}
  const dt=clamp((time-last)/1000,0,.06);last=time;
  if(!visible&&renderer.combat===state.combat){renderer.reset(state.combat,true);}visible=true;
  const bounds=canvas.getBoundingClientRect(),w=Math.round(bounds.width),h=Math.round(bounds.height);if(w<1||h<1)return;
  const dpr=Math.min(2,window.devicePixelRatio||1);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
  const ctx=canvas.getContext('2d');if(!ctx)return;ctx.setTransform(dpr,0,0,dpr,0,0);
  const reduced=state.settings?.motion===false||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.sync(state.combat,state.wizards,w,h,dt,reduced);renderer.draw(ctx,w,h,state.combat);
 }
 requestAnimationFrame(frame);
}
