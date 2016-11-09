var MovieService = app.service('MovieService', ['UserNotificationService',function (UserNotificationService) {
    this.getMoviesForBooking = function () {
	    var movie = {};
	    var movies = [];
	    movie.title = 'Rangitaranga';
	    movie.imgurl = 'http://172.16.66.81/Bookmyshow/uploads/ET00030170.jpg';
	    movie.id = 'ET00030170';
	    movie.language = 'Hindi';
	    movie.genre = 'Action';
	    movie.venue = 'Inox Garuda Mall';
	    movie.date = '28-10-2016';
	    movie.showtime = '10.30am';
	    movie.price = '250';
	    movie.booknow = '#/payment/'+movie.id;
	    movie.Booking_lngId = Math.floor(1000 + Math.random() * 9000);
	    movie.Trans_strSeatInfo = 'PREMIER A6,A7';
	    movie.Session_dtmRealShow = '05-12-2016 17:20';
	    movie.Venue_strCode = 'INOX GARUDA';
	    movies.push(movie);
	    newMovie = angular.copy(movie);
	    newMovie.id = 'ET00030171';
	    newMovie.title = 'The Conjuring';
	    newMovie.imgurl = 'http://172.16.66.81/Bookmyshow/uploads/ET00035685.jpg';
	    newMovie.Booking_lngId = Math.floor(1000 + Math.random() * 9000);
	    newMovie.Trans_strSeatInfo = 'EXEC G1,G2';
	    newMovie.Session_dtmRealShow = '08-12-2016 18:45';
	    newMovie.Venue_strCode = 'INOX LIDO';
	    newMovie.booknow = '#/payment/'+newMovie.id;
	    movies.push(newMovie);
	    return movies;
	};
	this.getMovieDetails = function(movieId){
		movies = this.getMoviesForBooking();
		var movie = {};
		angular.forEach(movies, function(value, key) {			
		  if(value && value.id == movieId){
		  	movie = value;
		  }
		}, movie, movieId);
		return movie;
	};
	this.bookMovie = function(movie){
		UserNotificationService.notifyBookMovie(movie);
	}
}]);