angular.module('users')
    .controller('ProfileController', function($http, $scope) {
        $http.get('user.json')
            .then(function(response) {
                $scope.user = response.data;
            });
    });