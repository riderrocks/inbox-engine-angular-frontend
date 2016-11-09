'use strict';
var inboxUrl = 'http://192.168.10.10:6633/';
var app = angular.module('myApp', ['ngRoute', 'myApp.movies', 'myApp.register', 'myApp.home', 'myApp.header', 'myApp.payment', 'myApp.profile', 'myApp.notify']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]).constant('CONFIG', {
    INBOX: {
        baseUrl: inboxUrl
    },
    IS: {
        baseUrl: inboxUrl,
        bookMovieApiUrl: inboxUrl+'is/api/book-movie'
    }
});
