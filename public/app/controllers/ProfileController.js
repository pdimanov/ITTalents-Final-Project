angular.module('users')
    .controller('ProfileController', function($http, $scope, $location, AuthService) {


        $http.get('user.json')
            .then(function(response) {
                $scope.user = response.data;
            });
    });