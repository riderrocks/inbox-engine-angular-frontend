var IsService = app.service('IsService', ['CONFIG', '$http', function (CONFIG, $http) {
    this.bookMovie = function (movie, user) {
        return $http({
            method: 'POST',
            url: CONFIG.IS.bookMovieApiUrl,
            data: {movie: movie, user: user}
        });
    }
}]);