let promptEvent=null,registration=null,message='Installation is available from your browser’s menu.',notify=()=>{};
export function installStatus(){return {standalone:!!globalThis.matchMedia?.('(display-mode: standalone)').matches||!!globalThis.navigator?.standalone,update:!!registration?.waiting,message};}
export function startPWA(onChange=()=>{}){
 notify=onChange;
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;message='Ready to install. Tap Install app.';notify();});
 window.addEventListener('appinstalled',()=>{promptEvent=null;message='Installed. Launch Wizard Academy from your home screen.';notify();});
 if(!('serviceWorker' in navigator)||!window.isSecureContext){message='Installation requires HTTPS. Open your published GitHub Pages address.';return;}
 navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(reg=>{
  registration=reg;message=reg.waiting?'An update is ready. Save and reload when convenient.':'Game caching is starting. Keep this page open until ready.';notify();
  navigator.serviceWorker.ready.then(()=>{message=registration.waiting?'An update is ready. Save and reload when convenient.':'Game files are cached for offline local play.';notify();});
  reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed'){message=navigator.serviceWorker.controller?'An update is ready. Save and reload when convenient.':'Game files are cached for offline local play.';notify();}});});
 }).catch(()=>{message='Offline installation could not finish. Check your connection and reload the published site.';notify();});
}
export async function installApp(){if(!promptEvent){message=installStatus().standalone?'The app is already running standalone.':'Use the browser instructions below. This browser has not offered an automatic installation prompt.';notify();return;}const event=promptEvent;promptEvent=null;await event.prompt();const choice=await event.userChoice;message=choice.outcome==='accepted'?'Installation requested. Look for the academy icon on your home screen.':'Installation dismissed. You can install later from the browser menu.';notify();}
export async function applyAppUpdate(){if(!registration?.waiting){message='No waiting update. Close and reopen the app to check again.';notify();return;}navigator.serviceWorker.addEventListener('controllerchange',()=>location.reload(),{once:true});registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});}
