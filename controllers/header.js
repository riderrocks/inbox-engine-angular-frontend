'use strict';
angular.module('myApp.header', ['ngRoute']).controller('NavbarCtrl', ['$scope', '$location','$filter', 'CommonProp', 'UserNotificationService', function($scope, $location,$filter, CommonProp, UserNotificationService) {
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
        $scope.updateNotViewedCount();
    });

    // $scope.updateNotViewedCount = function() {
    // 	$scope.notViewedCount = $filter('filter')($scope.notifications.data, {
    //         viewed: false
    //     }).length;
    // }
}]);
