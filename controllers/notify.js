'use strict';
angular.module('myApp.notify', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/notify', {
        templateUrl: 'views/notify.html',
        // controller: 'NotifyCtrl'
    });
}]).controller('NotifyCtrl', ['$scope', '$http', '$filter', '$firebase', '$location', 'UserNotificationService', 'CommonProp', function($scope, $http, $filter, $firebase, $location, UserNotificationService, CommonProp) {

    var notifications = UserNotificationService.getAllNotifications();

    notifications.then(function(notification) {
        $scope.notifications = notification;
        $scope.updateNotViewedCount();
    });

    $scope.updateNotViewedCount = function() {
        $scope.notViewedCount = $filter('filter')($scope.notifications.data, {
            viewed: false
        }).length;
    }

    var userId = CommonProp.getUserId();
    var apiName = '';

    $scope.markNotificationAsViewed = function(notification) {
        var data = {
            'appCode': 'WEBIN',
            'memberId': userId,
            'regionCode': 'MUM'
        };

        if (notification.isNotification) {
            data._id = notification.id;
            data.flag = 'N';
            apiName = 'viewed';
        } else {
            data.viewedAnnouncements = notification.id;
            apiName = 'get';
        }

        $scope.ajaxCall(data, apiName, notification);
    }

    $scope.markAllNotificationAsViewed = function() {
        var notificationsToMark = $filter('filter')($scope.notifications.data, {
            isNotification: false
        });

        var idsToMark = [];

        angular.forEach(notificationsToMark, function(notification, key) {
            idsToMark.push(notification.id);
        }, idsToMark);

        var data = {
            'appCode': 'WEBIN',
            'memberId': userId,
            'regionCode': 'MUM'
        };

        apiName = 'get';

        data.viewedAnnouncements = idsToMark;

        $scope.ajaxCall(data, apiName, null);
    }

    $scope.ajaxCall = function(data, apiName, notification) {
        $http({
            method: 'POST',
            url: "http://172.16.65.3/inbox/" + apiName,
            data: data
        }).then(function successCallback() {
            if (notification) {
                notification.viewed = true;
            } else {
                angular.forEach($scope.notifications.data, function(notification, key) {
                    notification.viewed = true;
                });
            }
            $scope.updateNotViewedCount();
        });
    }
}]);
