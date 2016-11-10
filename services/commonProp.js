var CommonProp = app.service('CommonProp', ['$location','$window', '$firebaseAuth', function($location,$window, $firebaseAuth) {
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
}]);