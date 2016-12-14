(function() {
    if (localStorage.userId) {
        if ('Notification' in window) {
            Notification.requestPermission();
            console.log('Browser notification is supported');
        } else {
            console.error('Browser notification not supported');
        }
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('firefoxServiceWorker.js', { scope: './' }).then(function(reg) {

                reg.update();

                if (reg.installing) {
                    console.log('Service worker installing');
                } else if (reg.waiting) {
                    console.log('Service worker installed');
                } else if (reg.active) {
                    console.log('Service worker active');
                }
                initialiseState(reg);
            }).catch(function(err) {
                console.error('Error setting up service worker', err);
            });
        } else {
            console.log('Service workers aren\'t supported in this browser.');
        }
    }
})();

function initialiseState(reg) {
    if (!(reg.showNotification)) {
        console.log('Notifications aren\'t supported on service workers.');
        userNotifications = false;
    } else {
        userNotifications = true;
    }
    if (Notification.permission === 'denied') {
        console.error('The user has blocked notifications.');
        return;
    }
    if (!('PushManager' in window)) {
        console.error('Push messaging isn\'t supported.');
        return;
    }

    navigator.serviceWorker.ready.then(function(reg) {
        reg.pushManager.getSubscription()
            .then(function(subscription) {
                if (!subscription) {
                    console.log('Not yet subscribed to Push');
                    subscribe();
                    return;
                }
                var endpoint = subscription.endpoint;
                var key = subscription.getKey('p256dh');
                console.log(key);
                updateStatus(endpoint, key, 'init');
            })
            .catch(function(err) {
                console.error('Error during getSubscription()', err);
            });
        var channel = new MessageChannel();
        channel.port1.onmessage = function(e) {
            console.error(e);
            handleChannelMessage(e.data);
        }

        mySW = reg.active;
        mySW.postMessage('hello', [channel.port2]);
    });
}

function handleChannelMessage(data) {
    if (data.action === 'subscribe' || data.action === 'init') {

    } else if (data.action === 'unsubscribe') {

    } else if (data.action === 'chatMsg') {

    }
}

function subscribe() {
    navigator.serviceWorker.ready.then(function(reg) {
        reg.pushManager.subscribe({ userVisibleOnly: true })
            .then(function(subscription) {
                var endpoint = subscription.endpoint;
                var key = subscription.getKey('p256dh');
                updateStatus(endpoint, key, 'subscribe');
            })
            .catch(function(e) {
                if (Notification.permission === 'denied') {
                    console.error('Permission for Notifications was denied');
                } else {
                    console.error('Unable to subscribe to push.', e);
                }
            });
    });
}

function unsubscribe() {
    navigator.serviceWorker.ready.then(function(reg) {
        reg.pushManager.getSubscription().then(
            function(subscription) {
                var endpoint = subscription.endpoint;
                var key = subscription.getKey('p256dh');
                updateStatus(endpoint, key, 'unsubscribe');
                if (!subscription) {
                    return;
                }

                isPushEnabled = false;

                // setTimeout used to stop unsubscribe being called before the message
                // has been sent to everyone to tell them that the unsubscription has
                // occurred, including the person unsubscribing. This is a dirty
                // hack, and I'm probably going to hell for writing this.
                setTimeout(function() {
                    // We have a subcription, so call unsubscribe on it
                    subscription.unsubscribe().then(function(successful) {
                        subBtn.disabled = false;
                        subBtn.textContent = 'Subscribe to Push Messaging';
                        isPushEnabled = false;
                    }).catch(function(e) {
                        // We failed to unsubscribe, this can lead to
                        // an unusual state, so may be best to remove
                        // the subscription id from your data store and
                        // inform the user that you disabled push

                        console.log('Unsubscription error: ', e);
                        subBtn.disabled = false;
                    })
                }, 3000);
            }).catch(function(e) {
            console.log('Error thrown while unsubscribing from ' +
                'push messaging.', e);
        });
    });
}

function updateStatus(endpoint, key, statusType) {
    if (statusType === 'subscribe' || statusType === 'init') {
        postSubscribeObj(statusType, name, endpoint, key);
        if (statusType === 'subscribe') {
            var endpointSections = endpoint.split('/');
            var subscriptionId = endpointSections[endpointSections.length - 1];
            // localStorage.setItem('notification_subscribe', true);
            // localStorage.setItem('notification_subscriptionId', subscriptionId);
            // localStorage.setItem('notification_userAgent', 'firefox');
            //localStorage.setItem('notification_endpoint', endpoint);
            localStorage.setItem('subscriptionId', subscriptionId);
            localStorage.setItem('notification_subscribe', true);
            localStorage.setItem('subscribedAsGuestUser', false);
            if (!localStorage.userId) {
                localStorage.setItem('subscribedAsGuestUser', true);
            }
            location.reload(true);
        }
    } else if (statusType === 'unsubscribe') {
        postSubscribeObj(statusType, name, endpoint, key);
    }
}

function postSubscribeObj(statusType, name, endpoint, key) {
    var request = new XMLHttpRequest();
    request.open('POST', 'https://127.0.0.1:7000');
    request.setRequestHeader('Content-Type', 'application/json');
    var subscribeObj = {
        statusType: statusType,
        name: "jeeeevs@gmal.com",
        endpoint: endpoint,
        key: btoa(String.fromCharCode.apply(null, new Uint8Array(key)))
    }
    console.log(subscribeObj);
    request.send(JSON.stringify(subscribeObj));
}
