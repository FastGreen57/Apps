const V="ferrari-timeline-v6";const ASSETS=["./","index.html","values.json","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
const netFirst=req=>fetch(req).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(req,cp))}return res}).catch(()=>caches.match(req,{ignoreSearch:true}));
self.addEventListener("fetch",e=>{const req=e.request;if(req.method!=="GET")return;const u=new URL(req.url);
 if(u.origin===self.location.origin&&(u.pathname.endsWith("values.json")||req.mode==="navigate"||u.pathname.endsWith("/index.html"))){e.respondWith(netFirst(req));return}
 const keep=u.origin===self.location.origin||/fonts\.(googleapis|gstatic)\.com$|(upload|thumb)\.wikimedia\.org$/.test(u.hostname);
 e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{if(keep&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(V).then(c=>c.put(req,cp))}return res})))});
