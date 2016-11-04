'use strict';
angular.module('myApp.payment', ['ngRoute', 'ui.bootstrap']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/payment/:id', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentPostCtrl'
    });
}]).controller('PaymentPostCtrl', ['$scope', '$firebase', '$routeParams', '$location', 'CommonProp', 'MovieService', function($scope, $firebase, $routeParams, $location, CommonProp, MovieService) {
    if (!CommonProp.getUser()) {
        $location.path('/home');
    }

    var param = $routeParams.id;
    $scope.isPaymentMade = false;
    $scope.movie = MovieService.getMovieDetails(param);

    $scope.bookMovie = function(movie) {
        $scope.isPaymentMade = true;
        MovieService.bookMovie(movie);
        $location.path('/notify');
    }
}]);
