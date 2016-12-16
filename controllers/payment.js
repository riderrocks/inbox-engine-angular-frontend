'use strict';
angular.module('myApp.payment', ['ngRoute', 'ui.bootstrap']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/payment/:id', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentPostCtrl'
    });

}]).controller('PaymentPostCtrl', ['$scope', '$window', '$firebase', '$routeParams', '$location', 'CommonProp', 'MovieService', 'IsService', function($scope, $window, $firebase, $routeParams, $location, CommonProp, MovieService, IsService) {
    if (!CommonProp.getUser()) {
        $location.path('/home');
    }

    var param = $routeParams.id;
    $scope.isPaymentMade = false;
    $scope.movie = MovieService.getMovieDetails(param);

    $scope.bookMovie = function(movie) {

        if (movie.quantity < 0 || movie.quantity == 0 || movie.quantity == null) {
            swal("Oops!", "Quantity cannot be zero or null", "error");
        } else if (movie.quantity > 0) {
            $scope.isPaymentMade = true;
            var user = {};
            user.userId = CommonProp.getUserId();
            user.userEmail = CommonProp.getUser();
            IsService.bookMovie(movie, user).then(function successCallback(response) {
                $window.location.reload();
                $location.path('/movies');
            }, function errorCallback(response) {

            });
        }
    }
}]);
