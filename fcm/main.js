'use strict';

var API_KEY = window.GoogleSamples.Config.gcmAPIKey;
var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';
var isPushEnabled = false;

function endpointWorkaround(pushSubscription) {
    if (pushSubscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') !== 0) {
        return pushSubscription.endpoint;
    }
    var mergedEndpoint = pushSubscription.endpoint;
    if (pushSubscription.subscriptionId &&
        pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
        mergedEndpoint = pushSubscription.endpoint + '/' +
            pushSubscription.subscriptionId;
    }
    return mergedEndpoint;
}

function sendSubscriptionToServer(subscription) {
    var mergedEndpoint = endpointWorkaround(subscription);
    var endpointSections = mergedEndpoint.split('/');
    var subscriptionId = endpointSections[endpointSections.length - 1];
    localStorage.setItem('subscriptionId', subscriptionId);
    localStorage.setItem('notification_subscribe', true);
    showCurlCommand(mergedEndpoint);
}

function showCurlCommand(mergedEndpoint) {
    if (mergedEndpoint.indexOf(GCM_ENDPOINT) !== 0) {
        console.error('This browser isn\'t currently ' +
            'supported for this demo');
        return;
    }
    var endpointSections = mergedEndpoint.split('/');
    var subscriptionId = endpointSections[endpointSections.length - 1];

    var curlCommand = 'curl --header "Authorization: key=' + API_KEY +
        '" --header Content-Type:"application/json" ' + GCM_ENDPOINT +
        ' -d "{\\"registration_ids\\":[\\"' + subscriptionId + '\\"]}"';
    console.log(curlCommand);
}

function unsubscribe() {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription().then(
            function (pushSubscription) {
                if (!pushSubscription) {
                    isPushEnabled = false;
                    return;
                }
                pushSubscription.unsubscribe().then(function () {
                    isPushEnabled = false;
                }).catch(function (e) {
                    console.error('Unsubscription error: ', e);
                });
            }).catch(function (e) {
            console.error('Error thrown while unsubscribing from ' +
                'push messaging.', e);
        });
    });
}

function subscribe() {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true
        })
            .then(function (subscription) {
                isPushEnabled = true;
                return sendSubscriptionToServer(subscription);
            })
            .catch(function (e) {
                if (Notification.permission === 'denied') {
                    console.error('Permission for Notifications was denied');
                } else {
                    console.error('Unable to subscribe to push.', e);
                }
            });
    });
}

function initialiseState() {
    console.log('called');
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.error('Notifications aren\'t supported.');
        return;
    }
    if (Notification.permission === 'denied') {
        console.error('The user has blocked notifications.');
        return;
    }
    if (!('PushManager' in window)) {
        console.error('Push messaging isn\'t supported.');
        return;
    }
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                if (!subscription) {
                    subscribe();
                    return;
                }
                // sendSubscriptionToServer(subscription);
                isPushEnabled = true;
            })
            .catch(function (err) {
                console.error('Error during getSubscription()', err);
            });
    });
}

window.addEventListener('load', function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(initialiseState);
    } else {
        console.error('Service workers aren\'t supported in this browser.');
    }
});
