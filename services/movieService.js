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
	    movies.push(movie);
	    newMovie = angular.copy(movie);
	    newMovie.id = 'ET00030171';
	    newMovie.title = 'The Conjuring';
	    newMovie.imgurl = 'http://172.16.66.81/Bookmyshow/uploads/ET00035685.jpg';
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