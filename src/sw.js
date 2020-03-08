/* eslint-disable no-undef, no-restricted-globals */
import {precacheAndRoute} from 'workbox-precaching';

// Esperamos al evento "install" para confirmar que el service-worker se ha
// instalado.
self.addEventListener('install', (event) => {
    console.log("El service worker ha sido instalado!");
    // Ya no necesitamos gestionar la caché
  });
  
  // No necesitamos Interceptar las peticiones. En su lugar,
  // llamamos al método de workbox
  precacheAndRoute(self.__WB_MANIFEST);
  
  // Evento activate
  self.addEventListener('activate', (e) => {
    console.log('El nuevo service worker se ha activado');
  });
  
  // Evento de mensajes
  self.addEventListener('message', (e) => {
    // Comprobamos que la acción sea la de saltar
    // el estado de espera
    if (e.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
  });

// ----------------------------------------------------------------------------
// self.addEventListener('install', (event) => {
//   console.log("Service worker!")

//   event.waitUntil(
//     caches.open(cacheName)
//       .then((cache) => {
//         console.log("cache esta abierta");
//         return cache.addAll(filesToCache);
//       })
//   )
// })

// self.addEventListener('activate', (event) => {
//   console.log("el nuevo service worker se ha activado")
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       })
//   )
// });