'use strict';

var currentIp = '172.16.65.3';
var inboxUrl = 'http://' + currentIp + ':6633/';
var socketUrl = 'ws://' + currentIp + ':3000';
var app = angular.module('myApp', ['ngRoute', 'myApp.register', 'myApp.home', 'myApp.header', 'myApp.movies', 'myApp.payment', 'myApp.notify', 'myApp.profile']).config(['$routeProvider', function($routeProvider) {
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
}).directive("bellNotification", ['UserNotificationService', '$filter', 'SocketIoService', function(UserNotificationService, $filter, SocketIoService) {

    return {
        template: `<span id='notification_count' ng-if='notViewedCount>0'>{{notViewedCount}}</span>`,
        scope: true,
        link: function(scope, element, attrs) {
            SocketIoService.on('notification', function(message) {
                scope.notViewedCount += 1;
                console.log(message);
            });
            var memberId = localStorage.userId;
            SocketIoService.on('notification_' + memberId, function(message) {
                scope.notViewedCount += 1;
                console.log(message);
            });
        }
    };
}]);
