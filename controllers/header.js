'use strict';
angular.module('myApp.header', ['ngRoute']).controller('NavbarCtrl', ['$scope', '$http', '$filter', '$firebase', '$location', '$window', 'UserNotificationService', 'CommonProp', 'CONFIG', function($scope, $http, $filter, $firebase, $location, $window, UserNotificationService, CommonProp, CONFIG) {

    $scope.isRouteActive = function(route) {
        var curRoute = $location.path();
        return curRoute.match(route);
    }
    $scope.logout = function() {
        CommonProp.logoutUser();
    }

    var notifications = UserNotificationService.getAllNotifications();
    var method = '';

    notifications.then(function(notification) {
        $scope.notifications = notification;
        console.log($scope.notifications.data);
        $scope.updateNotViewedCount();
    });


    $scope.updateNotViewedCount = function() {
            $scope.notViewedCount = $filter('filter')($scope.notifications.data, {
                viewed: false

            }).length;
        }
        // to show and hide notification div
    $scope.IsVisible = false;

    $scope.ShowHide = function() {
        $scope.IsVisible = $scope.IsVisible ? false : true;
    }
    $scope.redirect = function() {
        $location.path('/notify');
    }
    $scope.SoftDelete = function(array, index, notification) {
            console.log(notification.id + notification.isNotification);
            array.splice(index, 1);
            apiName = 'softDelete';
            method = 'PUT';
            $scope.ajaxCall( method, apiName, {_id:notification.id, isNotification : notification.isNotification }, null);
    }
        // adding code from Notify.js 16 Nov 2016

    UserNotificationService.getAllNotifications().then(function(notification) {
        $scope.notifications = notification;
    });
    $scope.baseUrl = CONFIG.INBOX.baseUrl;
    var userId = CommonProp.getUserId();
    var apiName = '';
    $scope.markNotificationAsViewed = function(notification) {
        method = 'POST';
        if (!notification.viewed) {
            var data = {
                'appCode': 'WEBIN',
                'memberId': userId,
                'regionCode': 'MUM'
            };

            if (notification.isNotification) {
                console.log("viewed");
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
        console.log(data);
        console.log('DELETE notifications');
        $http({
            method: method,
            url: $scope.baseUrl + "inbox/" + apiName,
            data: data
        }).then(function successCallback() {
            console.log('done check in db');
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
