var showHide = app.service('showHide', ['$scope', function($scope) {
    this.status = function() {
        $scope.click = false;
        return $scope.click;
    }
}]);
