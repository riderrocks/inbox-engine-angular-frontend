'use strict';
angular.module('myApp.movies', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl'
    });
}]).controller('MoviesCtrl', ['$scope', '$firebase', '$location', 'CommonProp', 'MovieService','SocketIoService', function($scope, $firebase, $location, CommonProp, MovieService, SocketIoService) {
    
    $scope.movies = MovieService.getMoviesForBooking();
    $scope.username = CommonProp.getUser();

    if (!$scope.username) {
        $location.path('/home');
    }
    
    $scope.logout = function() {
        CommonProp.logoutUser();
    }

    SocketIoService.on('alert', function (data) {
        console.log(data);
    });


}]);
