'use strict';

// console.log('Started', self);
self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
    console.log('Activated', event);
});

self.addEventListener('push', function(event) {

    console.log(event);
    if (event.data) {
        console.log(event.data.json());
    }
    console.log('Received push');
    var notificationTitle = 'bookmyshow';
    var notificationOptions = {
        body: 'Click here to book movie',
        icon: './images/ET00035722.jpg',
        badge: './images/icon-72x72.png',
        tag: 'simple-push-demo-notification',
        data: {
            url: 'https://in.bookmyshow.com/buytickets/rustom-bengaluru/movie-bang-ET00035722-MT/20160902'
        }
    };

    event.waitUntil(fetch('https://inboxpushnotification.fwd.wf/push-notifications/app/pushexec.php').then(function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        return response.json().then(function(data) {
            if (data.error || !data.notification) {
                console.error('The API returned an error.', data.error);
                throw new Error();
            }
            var notificationTitle = data.notification.title;
            var body = data.notification.body;
            var icon = data.notification.icon;
            var tag = data.notification.tag;
            var badge = data.notification.badge;
            var data = data.notification.data;

            return self.registration.showNotification(notificationTitle, {
                body: body,
                icon: icon,
                tag: tag,
                badge: badge,
                data: data
            });
        });
    }));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    let clickResponsePromise = Promise.resolve();
    if (event.notification.data && event.notification.data.url) {
        clickResponsePromise = clients.openWindow(event.notification.data.url);
    }

    event.waitUntil(
        Promise.all([
            clickResponsePromise,
            self.analytics.trackEvent('notification-click')
        ])
    );
});

self.addEventListener('notificationclose', function(event) {
    event.waitUntil(
        Promise.all([
            self.analytics.trackEvent('notification-close')
        ])
    );
});

self.addEventListener("activate", function(e) {
    e.waitUntil(caches.keys().then(function(e) {
        return Promise.all(e.map(function(e) {
            return caches["delete"](e)
        }))
    }))
});
