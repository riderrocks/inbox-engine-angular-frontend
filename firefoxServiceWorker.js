/**
 * Created by jeevann on 25/11/16.
 */
<<<<<<< HEAD

'use strict';

=======
'use strict';
var inboxBaseUrl = "https://172.16.65.3/inbox-engine";
>>>>>>> a0a549aca4bd9f6beaf7a86efb1909af0cb26a85
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

<<<<<<< HEAD
    event.waitUntil(fetch('https://backend-inboxenginenotification.fwd.wf/inbox/latestAnnouncement').then(function(response) {
=======
    event.waitUntil(fetch(inboxBaseUrl+'/inbox/latestAnnouncement').then(function(response) {
>>>>>>> a0a549aca4bd9f6beaf7a86efb1909af0cb26a85
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

<<<<<<< HEAD
            console.log(data);
            
            var notificationTitle = data[0].shortTxt;
            var body = data[0].longTxt;
            var icon = data[0].imgURL;
            var tag = 'simple-push-demo-notification-tag';
            var callToAction = {
                url: data[0].appCodes[0].callToAction[0].link
=======
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
>>>>>>> a0a549aca4bd9f6beaf7a86efb1909af0cb26a85
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
