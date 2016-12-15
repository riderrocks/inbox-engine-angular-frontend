var MovieService = app.service('MovieService', ['UserNotificationService', function (UserNotificationService) {
    this.getMoviesForBooking = function () {
        var movie = {};
        var movies = [];
        movie.id = 'ET00030170';
        movie.title = 'Rangitaranga';
        movie.imgUrl = 'https://172.16.65.3/WebNotifications/Bookmyshow/uploads/ET00030170.jpg';
        movie.venue = 'Inox Garuda Mall';
        movie.dateShowTime = new Date().toUTCString().slice(0, 22);
        movie.price = '120';
        movie.booknow = '#/payment/' + movie.id;
        movie.language = 'Kannada';
        movie.genres = ['Adventure', 'Music', 'Mystery'];
        movie.location = 'INOX: Garuda Mall, Magrath Road';
        movie.seatInfo = 'PREMIER';
        movie.screen = 'SCREEN 1';
        movie.callToAction = 'https://in.bookmyshow.com/bengaluru/movies/mukunda-murari/ET00048024';
        movies.push(movie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030171';
        newMovie.title = 'The Conjuring';
        newMovie.imgUrl = 'https://172.16.65.3/WebNotifications/Bookmyshow/uploads/ET00035685.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'English';
        newMovie.genres = ['Horror', 'Mystery', 'Thriller'];
        newMovie.location = 'Innovative Multiplex, Marathahalli';
        newMovie.price = '200';
        newMovie.seatInfo = 'DIAMOND';
        newMovie.screen = 'AUDI 1';
        newMovie.dateShowTime = new Date().toUTCString().slice(0, 22);
        newMovie.callToAction = 'https://in.bookmyshow.com/bengaluru/movies/the-conjuring/ET00014420';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030172';
        newMovie.title = 'Thithi';
        newMovie.imgUrl = 'https://172.16.65.3/WebNotifications/Bookmyshow/uploads/ET00041598.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'Kannada';
        newMovie.genres = ['Drama'];
        newMovie.location = 'PVR: Orion, Bengaluru';
        newMovie.price = '120';
        newMovie.seatInfo = 'PREMIER';
        newMovie.screen = 'SCREEN 5';
        newMovie.dateShowTime = new Date().toUTCString().slice(0, 22);
        newMovie.callToAction = 'https://in.bookmyshow.com/bengaluru/movies/thithi/ET00041598';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030173';
        newMovie.title = 'Pink';
        newMovie.imgUrl = 'https://172.16.65.3/WebNotifications/Bookmyshow/uploads/ET00039895.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'Hindi';
        newMovie.genres = ['Drama', 'Thriller'];
        newMovie.location = 'INOX Lido: Off MG Road, Ulsoor ';
        newMovie.price = '180';
        newMovie.seatInfo = 'EXECUTIV';
        newMovie.screen = 'AUDI 2';
        newMovie.dateShowTime = new Date().toUTCString().slice(0, 22);
        newMovie.callToAction = 'https://in.bookmyshow.com/bengaluru/movies/pink/ET00039892';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030174';
        newMovie.title = 'Ki & Ka';
        newMovie.imgUrl = 'https://172.16.65.3/WebNotifications/Bookmyshow/uploads/ET00035932.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'Hindi';
        newMovie.genres = ['Comedy', 'Romance'];
        newMovie.location = 'PVR: Forum, Bengaluru';
        newMovie.price = '180';
        newMovie.seatInfo = 'EXECUTIV';
        newMovie.screen = 'SCREEN 7';
        newMovie.dateShowTime = new Date().toUTCString().slice(0, 22);
        newMovie.callToAction = 'https://in.bookmyshow.com/bengaluru/movies/ki-ka/ET00035932';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030175';
        newMovie.title = 'Rustom';
        newMovie.imgUrl = 'https://172.16.65.3/WebNotifications/Bookmyshow/uploads/ET00035722.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'Hindi';
        newMovie.genres = ['Crime', 'Drama', 'Thriller'];
        newMovie.location = 'Cinepolis: Bannerghatta Road';
        newMovie.price = '180';
        newMovie.seatInfo = 'EXECUTIV';
        newMovie.screen = 'AUDI 6';
        newMovie.dateShowTime = new Date().toUTCString().slice(0, 22);
        newMovie.callToAction = '';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030176';
        newMovie.title = 'Chakravryuha';
        newMovie.imgUrl = 'https://in.bmscdn.com/iedb/movies/images/website/poster/large/ET00017703.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'Kannada';
        newMovie.genres = ['Action', 'Comedy', 'Thriller'];
        newMovie.location = 'Gopalan Cinemas: Sirsi Circle';
        newMovie.price = '120';
        newMovie.seatInfo = 'PREMIER';
        newMovie.screen = 'SCREEN 3';
        newMovie.dateShowTime = new Date().toUTCString().slice(0, 22);
        newMovie.callToAction = 'https://in.bookmyshow.com/bengaluru/movies/chakravyuha/ET00017703';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030177';
        newMovie.title = '10 Cloverfield Lane';
        newMovie.imgUrl = 'https://172.16.65.3/WebNotifications/Bookmyshow/uploads/ET00039119.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'English';
        newMovie.genres = ['Drama', 'Horror', 'Mystery'];
        newMovie.location = 'Urvashi Digital 4k Cinema: Lalbagh';
        newMovie.price = '200';
        newMovie.seatInfo = 'DIAMOND';
        newMovie.screen = 'AUDI 2';
        newMovie.dateShowTime = new Date().toUTCString().slice(0, 22);
        newMovie.callToAction = 'https://in.bookmyshow.com/bengaluru/movies/10-cloverfield-lane/ET00039119';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030178';
        newMovie.title = 'Central Intelligence';
        newMovie.imgUrl = 'https://172.16.65.3/WebNotifications/Bookmyshow/uploads/ET00036163.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'English';
        newMovie.genres = ['Action', 'Comedy', 'Crime'];
        newMovie.location = 'Q Cinemas: Whitefield, Bengaluru';
        newMovie.price = '200';
        newMovie.seatInfo = 'DIAMOND';
        newMovie.screen = 'AUDI 4';
        newMovie.dateShowTime = new Date().toUTCString().slice(0, 22);
        newMovie.callToAction = 'https://in.bookmyshow.com/bengaluru/movies/central-intelligence/ET00036163';
        movies.push(newMovie);
        return movies;
    };
    this.getMovieDetails = function (movieId) {
        movies = this.getMoviesForBooking();
        var movie = {};
        angular.forEach(movies, function (value, key) {
            if (value && value.id == movieId) {
                movie = value;
            }
        }, movie, movieId);
        return movie;
    };
    this.bookMovie = function (movie) {
        UserNotificationService.notifyBookMovie(movie);
    }
}]);
