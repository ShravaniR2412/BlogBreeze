const CACHE_NAME = 'blogbreeze-v1';
const filesToCache = [
  '/', 
  'index.html',
  'manifest.json',
  '/src/assets/react.svg',
  '/public/icon.png',
  '/src/index.css',
  '/src/main.jsx',
];

// Install event: Caching important files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(filesToCache);
      })
  );
});

// Activate event: Cleaning up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Intercepting requests and serving from cache if available
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Service Worker: Returning cached response');
          return cachedResponse; // Return the cached response if available
        }

        return fetch(event.request)
          .then((networkResponse) => {
            caches.open(CACHE_NAME).then((cache) => {
              console.log('Service Worker: Caching new response for', event.request.url);
              cache.put(event.request, networkResponse.clone()); // Cache the new response
            });
            return networkResponse;
          });
      })
  );
});

self.addEventListener('push', (event) => {
    console.log('Push notification received:', event);
  
    if (event && event.data) {
      // Parse the push notification data
      const data = event.data.json();
  
      if (data.method === 'pushMessage') {
        console.log('Push notification sent with message:', data.message);
  
        // Set up notification options (like body, icon, etc.)
        const options = {
          body: data.message || 'Hello, this is a default message!', // Default or push message
          icon: '/src/assets/react.svg', // Icon for the notification
          badge: '/src/assets/react.svg', // Badge icon for the notification
        };
  
        // Check if the notification permission is granted before showing the notification
        if (Notification.permission === 'granted') {
          // Show the notification with a title
          event.waitUntil(
            self.registration.showNotification('Blog Breeze', options)
          );
        } else {
          console.log('Notification permission not granted yet.');
        }
      }
    }
  });