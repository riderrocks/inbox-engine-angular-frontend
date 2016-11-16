'use strict';
var inboxUrl = 'http://172.16.66.54:6633/';
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
});
