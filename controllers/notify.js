'use strict';
angular.module('myApp.notify', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/notify', {
        templateUrl: 'views/notify.html',
        // controller: 'NotifyCtrl'
    });
}]).controller('NotifyCtrl', ['$scope', '$http', '$filter', '$firebase', '$location', 'UserNotificationService', 'CommonProp','CONFIG', function($scope, $http, $filter, $firebase, $location, UserNotificationService, CommonProp, CONFIG) {
    UserNotificationService.getAllNotifications().then(function(notification) {
        $scope.notifications = notification;
    });
    $scope.baseUrl = CONFIG.INBOX.baseUrl;
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
        console.log(data);

        apiName = 'get';

        data.viewedAnnouncements = idsToMark;

        $scope.ajaxCall(data, apiName, null);
    }

    $scope.ajaxCall = function(data, apiName, notification) {
        $http({
            method: 'POST',
            url: $scope.baseUrl+"inbox/" + apiName,
            data: data
        }).then(function successCallback() {
            if (notification) {
                notification.viewed = true;
            } else {
                angular.forEach($scope.notifications.data, function(notification, key) {
                    notification.viewed = true;
                });
            }
        });
    }
}]);
