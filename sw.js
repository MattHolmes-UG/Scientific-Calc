const APP_PREFIX = "Calc_";
const VERSION = "version_1";
const cacheName = `${APP_PREFIX}${VERSION}`;
const cacheFiles = [
  '/Calc/',
  '/Calc/calc.js',
  '/Calc/index.html',
  '/Calc/styles.css',
  '/Calc/bootstrap.min.css',
  '/Calc/bootstap.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName)
      .then((caches) => {
        console.log('cache files added');
        return caches.addAll(cacheFiles);
      })
  )
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      let cacheWhiteList = keyList.filter((key) => {
        return key.indexOf(APP_PREFIX);
      })
      cacheWhiteList.push(cacheName);
      return Promise.all(keyList.map((key, i) => {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i])
          return caches.delete(keyList[i])
        }
      }))
    })
  )
});
self.addEventListener('fetch', (e) => {
  console.log(`fetch request: ${e.request.url}`);
  e.respondWith(
    caches.match().then((request) => {
      if (request) {
        console.log(`responding with cache: ${e.request.url}`);
        return request;
      }
      console.log(`file not cached, fetching: ${e.request.url}`);
      return fetch(e.request);
    })
  )
});