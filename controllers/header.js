'use strict';
angular.module('myApp.header', ['ngRoute']).controller('NavbarCtrl', ['$scope', '$location','$filter', 'CommonProp', 'UserNotificationService', function($scope, $location,$filter, CommonProp, UserNotificationService) {
    $scope.isRouteActive = function(route) {
        var curRoute = $location.path();
        return curRoute.match(route);
    }
    $scope.logout = function() {
        CommonProp.logoutUser();
    }


<<<<<<< HEAD
    // $scope.updateNotViewedCount = function() {
    // 	$scope.notViewedCount = $filter('filter')($scope.notifications.data, {
    //         viewed: false
    //     }).length;
    // }
=======
>>>>>>> e17347e1a02c1a1df6a48912d90edd44f0efe407
}]);
