'use strict';
angular.module('myApp.notify', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/notify', {
        templateUrl: 'views/notify.html',
        controller: 'NotifyCtrl'
    });
}]).controller('NotifyCtrl', ['$scope', '$firebase', '$location', 'UserNotificationService', 'CommonProp', function($scope, $firebase, $location, UserNotificationService, CommonProp) {

    var notifications = UserNotificationService.getAllNotifications();
    notifications.then(function(notification) {
        $scope.notifications = notification;
    });

  	

}]);
