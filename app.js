'use strict';
var app = angular.module('myApp', ['ngRoute', 'myApp.movies','myApp.register', 'myApp.home', 'myApp.header', 'myApp.payment', 'myApp.profile','myApp.notify']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
