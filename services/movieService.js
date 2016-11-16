var MovieService = app.service('MovieService', ['UserNotificationService', function(UserNotificationService) {
    this.getMoviesForBooking = function() {
        var movie = {};
        var movies = [];
        movie.title = 'Rangitaranga';
        movie.imgurl = 'http://172.16.65.3:8009/WebNotifications/Bookmyshow/uploads/ET00030170.jpg';
        movie.id = 'ET00030170';
        movie.language = 'Hindi';
        movie.genre = 'Action';
        movie.venue = 'Inox Garuda Mall';
        movie.date = '28-10-2016';
        movie.showtime = '10.30am';
        movie.price = '250';
        movie.booknow = '#/payment/' + movie.id;
        movie.language = 'Kannada';
        movie.genres = ['Adventure','Music','Mystery'];
        movie.location = 'INOX: Garuda Mall, Magrath Road';
        movies.push(movie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030171';
        newMovie.title = 'The Conjuring';
        newMovie.imgurl = 'http://172.16.65.3:8009/WebNotifications/Bookmyshow/uploads/ET00035685.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'English';
        newMovie.genres = ['Horror','Mystery','Thriller'];
        newMovie.location = 'Innovative Multiplex, Marathahalli';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030172';
        newMovie.title = 'Thithi';
        newMovie.imgurl = 'http://172.16.65.3:8009/WebNotifications/Bookmyshow/uploads/ET00041598.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'Kannada';
        newMovie.genres = ['Drama'];
        newMovie.location = 'PVR: Orion, Bengaluru';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030173';
        newMovie.title = 'Pink';
        newMovie.imgurl = 'http://172.16.65.3:8009/WebNotifications/Bookmyshow/uploads/ET00039895.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'Hindi';
        newMovie.genres = ['Drama','Thriller'];
        newMovie.location = 'INOX Lido: Off MG Road, Ulsoor ';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030174';
        newMovie.title = 'Ki & Ka';
        newMovie.imgurl = 'http://172.16.65.3:8009/WebNotifications/Bookmyshow/uploads/ET00035932.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'Hindi';
        newMovie.genres = ['Comedy','Romance'];
        newMovie.location = 'PVR: Forum, Bengaluru';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030175';
        newMovie.title = 'Rustom';
        newMovie.imgurl = 'http://172.16.65.3:8009/WebNotifications/Bookmyshow/uploads/ET00035722.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'Hindi';
        newMovie.genres = ['Crime','Drama','Thriller'];
        newMovie.location = 'Cinepolis: Bannerghatta Road';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030176';
        newMovie.title = 'Chakravryuha';
        newMovie.imgurl = 'http://172.16.65.3:8009/WebNotifications/Bookmyshow/uploads/ET00017703.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'Kannada';
        newMovie.genres = ['Action','Comedy','Thriller'];
        newMovie.location = 'Gopalan Cinemas: Sirsi Circle';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030177';
        newMovie.title = '10 Cloverfield Lane';
        newMovie.imgurl = 'http://172.16.65.3:8009/WebNotifications/Bookmyshow/uploads/ET00039119.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'English';
        newMovie.genres = ['Drama','Horror','Mystery'];
        newMovie.location = 'Urvashi Digital 4k Cinema: Lalbagh';
        movies.push(newMovie);
        newMovie = angular.copy(movie);
        newMovie.id = 'ET00030178';
        newMovie.title = 'Central Intelligence';
        newMovie.imgurl = 'http://172.16.65.3:8009/WebNotifications/Bookmyshow/uploads/ET00036163.jpg';
        newMovie.booknow = '#/payment/' + newMovie.id;
        newMovie.language = 'English';
        newMovie.genres = ['Action','Comedy','Crime'];
        newMovie.location = 'Q Cinemas: Whitefield, Bengaluru';
        movies.push(newMovie);
        return movies;
    };
    this.getMovieDetails = function(movieId) {
        movies = this.getMoviesForBooking();
        var movie = {};
        angular.forEach(movies, function(value, key) {
            if (value && value.id == movieId) {
                movie = value;
            }
        }, movie, movieId);
        return movie;
    };
    this.bookMovie = function(movie) {
        UserNotificationService.notifyBookMovie(movie);
    }
}]);

// var MovieService = app.service('MovieService', ['UserNotificationService',function (UserNotificationService) {
//     this.getMoviesForBooking = function () {
// 	    var movie = {};
// 	    var movies = [];
// 	    movie.title = 'Rangitaranga';
// 	    movie.imgurl = 'http://172.16.66.81/Bookmyshow/uploads/ET00030170.jpg';
// 	    movie.id = 'ET00030170';
// 	    movie.language = 'Hindi';
// 	    movie.genre = 'Action';
// 	    movie.venue = 'Inox Garuda Mall';
// 	    movie.date = '28-10-2016';
// 	    movie.showtime = '10.30am';
// 	    movie.price = '250';
// 	    movie.booknow = '#/payment/'+movie.id;
// 	    movie.Booking_lngId = Math.floor(1000 + Math.random() * 9000);
// 	    movie.Trans_strSeatInfo = 'PREMIER A6,A7';
// 	    movie.Session_dtmRealShow = '05-12-2016 17:20';
// 	    movie.Venue_strCode = 'INOX GARUDA';
// 	    movies.push(movie);
// 	    newMovie = angular.copy(movie);
// 	    newMovie.id = 'ET00030171';
// 	    newMovie.title = 'The Conjuring';
// 	    newMovie.imgurl = 'http://172.16.66.81/Bookmyshow/uploads/ET00035685.jpg';
// 	    newMovie.Booking_lngId = Math.floor(1000 + Math.random() * 9000);
// 	    newMovie.Trans_strSeatInfo = 'EXEC G1,G2';
// 	    newMovie.Session_dtmRealShow = '08-12-2016 18:45';
// 	    newMovie.Venue_strCode = 'INOX LIDO';
// 	    newMovie.booknow = '#/payment/'+newMovie.id;
// 	    movies.push(newMovie);
// 	    return movies;
// 	};
// 	this.getMovieDetails = function(movieId){
// 		movies = this.getMoviesForBooking();
// 		var movie = {};
// 		angular.forEach(movies, function(value, key) {			
// 		  if(value && value.id == movieId){
// 		  	movie = value;
// 		  }
// 		}, movie, movieId);
// 		return movie;
// 	};
// 	this.bookMovie = function(movie){
// 		UserNotificationService.notifyBookMovie(movie);
// 	}
// }]);
