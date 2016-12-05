'use strict';
var inboxBaseUrl = "https://172.16.65.3/inbox-engine";
var link = null;
self.addEventListener('push', function (event) {
    console.log('Received a push message', event);

    event.waitUntil(fetch(inboxBaseUrl + '/inbox/latestAnnouncement').then(function (response) {
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

            //var appCode=data.appCodes[0].appcode;
            var memberId="MYID04";
            var regionCode="MUM";
            var viewedAnnouncements=data._id;
            // console.log(data.appCodes[0].appCode);
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
            link = data.appCodes[0].callToAction[0].link;
            var text = data.appCodes[0].callToAction[0].text;
            var actions = [];
            if (link && text) {
                var actions = [
                    {action: 'goToUrl', title: text, icon: './images/tick.png'},
                ];
            }
            return self.registration.showNotification(notificationTitle, {
                body: body,
                icon: icon,
                tag: tag,
                // data: callToAction,
                actions: actions
            });
        });
    }));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (event.action === 'goToUrl') {
        if (link) {
            clients.openWindow(link);

        }
    }
});
