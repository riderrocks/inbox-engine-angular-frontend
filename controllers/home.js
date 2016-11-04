'use strict';
angular.module('myApp.home', ['ngRoute', 'firebase']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    });
}]).controller('HomeCtrl', ['$scope', '$location', 'CommonProp', '$firebaseAuth', function($scope, $location, CommonProp, $firebaseAuth) {
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
            CommonProp.setUserId(user.uid);
            CommonProp.setUser(user.password.email);
            $location.path('/movies');
        }, function(error) {
            login.loading = false;
            swal("Oops!", "Authentication failure", "error");
        });
    }
}]).service('CommonProp', ['$location','$window', '$firebaseAuth', function($location,$window, $firebaseAuth) {
    var user = '';
    var id = '';
    var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);
    return {
        getUser: function() {
            if (user == '') {
                user = localStorage.getItem('userEmail');
            }
            return user;
        },
        getUserId: function() {
            if (id == '') {
                id = localStorage.getItem('userId');
            }
            return id;
        },
        setUser: function(value) {
            localStorage.setItem("userEmail", value);
            user = value;
        },
        setUserId: function(value) {
            localStorage.setItem("userId", value);
            id = value;
        },
        logoutUser: function() {
            loginObj.$unauth();
            user = '';
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            $location.path('/home');
            $window.location.reload();
        }
    };
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
