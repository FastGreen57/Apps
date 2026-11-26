const V="ferrari-timeline-v5";const ASSETS=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const req=e.request;if(req.method!=="GET")return;const u=new URL(req.url);
 const keep=u.origin===self.location.origin||/fonts\.(googleapis|gstatic)\.com$|(upload|thumb)\.wikimedia\.org$/.test(u.hostname);
 if(u.hostname==="en.wikipedia.org"){e.respondWith(fetch(req).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(req,cp));return res}).catch(()=>caches.match(req)));return}
 e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{if(keep&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(V).then(c=>c.put(req,cp))}return res}).catch(()=>req.mode==="navigate"?caches.match("index.html"):undefined)))});