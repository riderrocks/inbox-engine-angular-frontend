/**
 * Created by jeevann on 25/11/16.
 */
'use strict';
var inboxBaseUrl = "https://172.16.65.3/inbox-engine";
self.addEventListener('push', function(event) {
    console.log('Received a push message', event);

    // var title = 'Yay a message.';
    // var body = 'We have received a push message.';
    // var icon = '/images/icon-192x192.png';
    // var tag = 'simple-push-demo-notification-tag';

    // return self.registration.showNotification(title, {
    //     body: body,
    //     icon: icon,
    //     tag: tag,
    // });

    event.waitUntil(fetch(inboxBaseUrl+'/inbox/latestAnnouncement').then(function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        return response.json().then(function(data) {
            if (data.error || !data) {
                console.error('The API returned an error.', data.error);
                throw new Error();
            }

            var appCode=data.appCodes[0].appCode;
            var memberId="MYID04";
            var regionCode="MUM";
            var viewedAnnouncements=data._id;
            // console.log(appCode);
            // console.log(memberId);
            // console.log(regionCode);
            // console.log(viewedAnnouncements);
            var notificationTitle = data.shortTxt;            
            var body = data.longTxt;
            var icon = data.imgURL;
            var tag = 'simple-push-demo-notification-tag';
            var callToAction = {
                url: data.appCodes[0].callToAction[0].link
            };

            return self.registration.showNotification(notificationTitle, {
                body: body,
                icon: icon,
                tag: tag,
                data: callToAction
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
