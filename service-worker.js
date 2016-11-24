'use strict';

self.addEventListener('push', function (event) {
    console.log('Received a push message', event);

    // var title = 'Yay a message.';
    // var body = 'We have received a push message.';
    // var icon = '/images/icon-192x192.png';
    // var tag = 'simple-push-demo-notification-tag';

    // event.waitUntil(
    //   self.registration.showNotification(title, {
    //     body: body,
    //     icon: icon,
    //     tag: tag
    //   })
    // );
    event.waitUntil(fetch('https://mkp-inboxnotification.fwd.wf/inbox/announcement-latest').then(function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        return response.json().then(function (data) {
            if (data.error || !data) {
                console.error('The API returned an error.', data.error);
                throw new Error();
            }
            // var notificationTitle = data.notification.title;
            // var body = data.notification.body;
            // var icon = data.notification.icon;
            // var tag = data.notification.tag;
            // var badge = data.notification.badge;
            // var data = data.notification.data;
            var notificationTitle = data.shortTxt;
            var body = data.longTxt;
            var icon = 'images/bms.jpg';
            var tag = 'simple-push-demo-notification-tag';
          //  var badge = 3;
            var data = "33";

            return self.registration.showNotification(notificationTitle, {
                body: body,
                icon: icon,
                tag: tag,
              //  badge: badge,
                data: data
            });
        });
    }));
});

self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn’t close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === '/' && 'focus' in client) {
                return client.focus();
            }
        }
        if (clients.openWindow) {
            return clients.openWindow('/');
        }
    }));
});