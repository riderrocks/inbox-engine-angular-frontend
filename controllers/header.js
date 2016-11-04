'use strict';
angular.module('myApp.header', ['ngRoute']).controller('NavbarCtrl', ['$scope', '$location', 'CommonProp', 'UserNotificationService', function($scope, $location, CommonProp, UserNotificationService) {
    $scope.isRouteActive = function(route) {
        var curRoute = $location.path();
        return curRoute.match(route);
    }
    $scope.logout = function() {
        CommonProp.logoutUser();
    }

    var notifications = UserNotificationService.getAllNotifications();
    notifications.then(function(notification) {
        $scope.notifications = notification;
    });
}]);
