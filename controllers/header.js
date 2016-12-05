'use strict';
angular.module('myApp.header', ['ngRoute']).controller('NavbarCtrl', ['$scope', '$http', '$filter', '$firebase', '$location', '$window', 'UserNotificationService', 'CommonProp', 'CONFIG', function ($scope, $http, $filter, $firebase, $location, $window, UserNotificationService, CommonProp, CONFIG) {

    $scope.isRouteActive = function (route) {
        var curRoute = $location.path();
        return curRoute.match(route);
    }
    $scope.logout = function () {
        CommonProp.logoutUser();
    }

    var notifications = UserNotificationService.getAllNotifications();
    var userId = CommonProp.getUserId();
    var method = '';
    var apiName = '';
    $scope.baseUrl = CONFIG.INBOX.baseUrl;
    $scope.IsVisible = false;

    notifications.then(function (notification) {
        $scope.notifications = notification;
        $scope.updateNotViewedCount();
    });

    $scope.updateNotViewedCount = function () {
        $scope.notViewedCount = $filter('filter')($scope.notifications.data, {
            viewed: false
        }).length;
    }

    $scope.ShowHide = function () {
        if ($scope.IsVisible == false) {
            var notifications = UserNotificationService.getAllNotifications();
            notifications.then(function (notification) {
                $scope.notifications = notification;
                $scope.updateNotViewedCount();
                $scope.IsVisible = $scope.IsVisible ? false : true;
            });
        } else {
            $scope.IsVisible = $scope.IsVisible ? false : true;
        }
    }

    $scope.SoftDelete = function (array, index, notification) {
        array.splice(index, 1);
        method = 'PUT';
        apiName = 'softDelete';
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

    $scope.markNotificationAsViewed = function (notification, shouldGoToLinkLocation) {
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
        if (shouldGoToLinkLocation) {
            window.open(notification.callToAction, '_blank');
        }
    }

    $scope.markAllNotificationAsViewed = function () {

        var notificationsToMark = $filter('filter')($scope.notifications.data, {
            isNotification: false
        });

        var idsToMark = [];

        angular.forEach(notificationsToMark, function (notification, key) {
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

    $scope.ajaxCall = function (method, apiName, data, notification) {
        $http({
            method: method,
            url: $scope.baseUrl + "inbox/" + apiName,
            data: data
        }).then(function successCallback() {
            if (notification) {
                notification.viewed = true;
            } else {
                angular.forEach($scope.notifications.data, function (notification, key) {
                    notification.viewed = true;
                });
            }
        });
        $window.location.reload();
    }
    UserNotificationService.subscribeForBrowserNotification();
}]);
