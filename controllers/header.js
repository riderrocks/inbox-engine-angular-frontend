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
    $scope.SoftDelete = function(array, index) {
            array.splice(index, 1);
        }
        // adding code from Notify.js 16 Nov 2016

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
            console.log("viewed");
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
    }
}]);
