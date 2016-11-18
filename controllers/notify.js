'use strict';
angular.module('myApp.notify', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/notify', {
        templateUrl: 'views/notify.html',
        // controller: 'NotifyCtrl'
    });
}]).controller('NotifyCtrl', ['$scope', '$http', '$filter', '$firebase', '$location', '$window', 'UserNotificationService', 'CommonProp', 'CONFIG', function($scope, $http, $filter, $firebase, $location, $window, UserNotificationService, CommonProp, CONFIG) {
    
    UserNotificationService.getAllNotifications().then(function(notification) {
        $scope.notifications = notification;
    });

    $scope.baseUrl = CONFIG.INBOX.baseUrl;
    var userId = CommonProp.getUserId();
    var apiName = '';
    var method = '';

    $scope.SoftDelete = function(array, index, notification) {
        array.splice(index, 1);
        apiName = 'softDelete';
        method = 'PUT';
        var data = {};
        data.userId = CommonProp.getUserId();

        if (notification.isNotification) {
            data = {
                _id: notification.id,
                isNotification: notification.isNotification
            };
        } else {
            data = {
                masterId: notification.id,
                isNotification: notification.isNotification,
                memberId: data.userId
            };
        }
        $scope.ajaxCall(method, apiName, data, null);
    }

    $scope.markNotificationAsViewed = function(notification) {
        method = 'POST';
        if (!notification.viewed) {
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
            $scope.ajaxCall(method, apiName, data, notification);
        }
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

        method = 'POST';
        apiName = 'get';

        data.viewedAnnouncements = idsToMark;

        $scope.ajaxCall(method, apiName, data, null);
    }

    $scope.ajaxCall = function(method, apiName, data, notification) {
        $http({
            method: method,
            url: $scope.baseUrl + "inbox/" + apiName,
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
        $window.location.reload();
    }
}]);
