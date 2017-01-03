'use strict';

var inboxUrl = 'http://172.16.65.7:6633/';
var socketUrl = 'http://172.16.65.7:4001';

var app = angular.module('myApp', ['ngRoute', 'myApp.register', 'myApp.home', 'myApp.header', 'myApp.movies', 'myApp.payment', 'myApp.notify', 'myApp.profile']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]).constant('CONFIG', {
    INBOX: {
        baseUrl: inboxUrl,
        socketUrl: socketUrl
    },
    IS: {
        baseUrl: inboxUrl,
        bookMovieApiUrl: inboxUrl + 'is/api/book-movie'
    }
}).directive("bellNotification", ['UserNotificationService', '$filter', 'SocketIoService', function (UserNotificationService, $filter, SocketIoService) {
    var pushMessage = function (message, scope) {
        var notify = UserNotificationService.prepareData([message.notify]);
        if (message.notify.isEdited) {
            var index;
            index = scope.notifications.id.indexOf(message.notify._id);
            if (index >= 0) {
                if (scope.notifications.data[index].viewed === true) {
                    scope.notViewedCount += 1;
                }
                scope.notifications.data[index] = notify.data[0];
                scope.notifications.id[index] = notify.id[0];
            }else{
                scope.notifications.data.unshift(notify.data[0]);
                scope.notifications.id.unshift(notify.id[0]);
                scope.notViewedCount += 1;
            }
        } else {
            scope.notifications.data.unshift(notify.data[0]);
            scope.notifications.id.unshift(notify.id[0]);
            scope.notViewedCount += 1;
        }
    }
    return {
        template: `<span id='notification_count' ng-if='notViewedCount>0'>{{notViewedCount}}</span>`,
        scope: true,
        link: function (scope, element, attrs) {
            SocketIoService.on('notification', function (message) {
                console.log(message);
                pushMessage(message, scope);
            });
            var memberId = localStorage.userId;
            SocketIoService.on('notification_' + memberId, function (message) {
                console.log(message);
                pushMessage(message, scope);
            });
        }
    };
}]);
