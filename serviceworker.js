const CACHE_NAME = 'blogbreeze-v1';
const filesToCache = [
  '/', 
  'index.html',
  'manifest.json',
  '/src/assets/react.svg',
  '/src/Pages/Home.jsx',
  '/src/Pages/About.jsx',
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
self.addEventListener('fetch', function (event) {
  console.log('Service Worker: Fetching', event.request.url);

  // Skip caching for Firebase API requests
  if (event.request.url.includes('firestore.googleapis.com')) {
    // Always fetch Firebase data from the network (no cache)
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    checkResponse(event.request)
      .catch(function () {
        console.log('Fetch from cache successful!');
        return returnFromCache(event.request);
      })
  );

  console.log('Fetch successful!');
  event.waitUntil(addToCache(event.request));
});

// Sync event: Handling background sync
self.addEventListener('sync', function (event) {
  if (event.tag === 'syncMessage') {
    console.log('Sync successful!');
    // You can add more background sync logic here
  }
});

// Placeholder functions for cache and response handling
async function checkResponse(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  return fetch(request);
}

function returnFromCache(request) {
  return caches.match(request);
}

async function addToCache(request) {
  const response = await fetch(request);
  if (!response || response.status !== 200 || response.type !== 'basic') {
    return response;
  }
  const cache = await caches.open(CACHE_NAME);
  console.log('Service Worker: Adding to cache', request.url);
  cache.put(request, response);
  return response;
}

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
          icon: '/icon.png', // Icon for the notification
          badge: '/icon.png', // Badge icon for the notification
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