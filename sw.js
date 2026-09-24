// App shell only. Never intercept authentication, Firestore, or other origins.
const PREFIX='wizard-academy-shell-'+encodeURIComponent(self.registration.scope)+'-';
const CACHE=PREFIX+'2.0.0';
const ASSETS=["./roster.js","./forest.js","./progression.js","./", "./index.html", "./style.css", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png", "./academy.js", "./app.js", "./arena.js", "./combat-events.js", "./combat.js", "./data.js", "./duels.js", "./equipment.js", "./firebase-config.js", "./jerseys.js", "./model.js", "./persistence.js", "./playback.js", "./pwa.js", "./rewards.js", "./rift-motion.js", "./room-life.js", "./simulation.js", "./sound.js", "./sports.js", "./tasks.js", "./tutorial.js", "./workers.js"];
const URLS=new Set(ASSETS.map(path=>new URL(path,self.registration.scope).href));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(path=>new Request(new URL(path,self.registration.scope),{cache:'reload'}))))));
// New versions wait by default. The player explicitly saves before activation.
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 const canonical=new URL(url.pathname,url.origin).href;
 if(!URLS.has(canonical))return;
 // A coherent cached release prevents mixing new HTML with older modules.
 event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(canonical);if(cached)return cached;return fetch(request);})());
});
