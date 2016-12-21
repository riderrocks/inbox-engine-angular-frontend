'use strict';
angular.module('myApp.home', ['ngRoute', 'firebase']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    });
}]).controller('HomeCtrl', ['$scope',  '$window', '$location', 'CommonProp', '$firebaseAuth', 'UserNotificationService', function($scope, $window, $location, CommonProp, $firebaseAuth, UserNotificationService) {
    var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);
    loginObj.$onAuth(function(authData) {
        if (authData) {
            CommonProp.setUser(authData.password.email);
            $location.path('/movies');
        }
    });
    $scope.user = {};
    var login = {};
    $scope.login = login;
    $scope.SignIn = function(event) {
        login.loading = true;
        event.preventDefault();
        var username = $scope.user.email;
        var password = $scope.user.password;
        loginObj.$authWithPassword({
            email: username,
            password: password
        }).then(function(user) {
            //CommonProp.setUserId(user.uid);
            UserNotificationService.fetchMemberIdFromEmailId($scope.user.email).then(function(response) {
                CommonProp.setUserId(response.memberId);
                CommonProp.setUser(user.password.email);
                $window.location.reload();
                $location.path('/movies');
            });
        }, function(error) {
            login.loading = false;
            swal("Oops!", "Authentication failure", "error");
        });
    };
    UserNotificationService.subscribeForBrowserNotification();
}]).directive('laddaLoading', [function() {
    return {
        link: function(scope, element, attrs) {
            var Ladda = window.Ladda;
            var ladda = Ladda.create(element[0]);
            scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                if (newVal) {
                    ladda.start();
                } else {
                    ladda.stop();
                }
            });
        }
    };
}]);
