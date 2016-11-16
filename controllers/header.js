'use strict';
angular.module('myApp.header', ['ngRoute']).controller('NavbarCtrl', ['$scope', '$location','$filter', 'CommonProp', 'UserNotificationService', function($scope, $location,$filter, CommonProp, UserNotificationService) {
    $scope.isRouteActive = function(route) {
        var curRoute = $location.path();
        return curRoute.match(route);
    }
    $scope.logout = function() {
        CommonProp.logoutUser();
    }


}]);
