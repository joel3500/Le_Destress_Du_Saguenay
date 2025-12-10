//Service worker ultra-simple (cache-first pour HTML/CSS/JS/images)
const CACHE = "destresseur-v1";
const ASSETS = ["/","/index.html","/css/design_jardin_secret.css","/js/data.js","/img/background_image/blue_sky.jpg"];
self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request).then(resp=>{
      const copy = resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request, copy));
      return resp;
    }))
  );
});
