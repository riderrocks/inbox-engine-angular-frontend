'use strict';
var inboxUrl = 'http://172.16.66.81:6633/';
var app = angular.module('myApp', ['ngRoute', 'myApp.register', 'myApp.home', 'myApp.header', 'myApp.movies', 'myApp.payment', 'myApp.notify', 'myApp.profile']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]).constant('CONFIG', {
    INBOX: {
        baseUrl: inboxUrl
    },
    IS: {
        baseUrl: inboxUrl,
        bookMovieApiUrl: inboxUrl + 'is/api/book-movie'
    }
}).directive("bellNotification", ['UserNotificationService', '$filter', function(UserNotificationService, $filter) {
    return {
        template: `<span id='notification_count' ng-if='notViewedCount>0'>{{notViewedCount}}</span>`,
        link: function(scope, element, attrs) {

            var notifications = UserNotificationService.getAllNotifications();

            notifications.then(function(notification) {
                scope.notifications = notification;
                scope.notViewedCount = UserNotificationService.updateNotViewedCount(scope.notifications);
            });
            
        }
    };
}]);
