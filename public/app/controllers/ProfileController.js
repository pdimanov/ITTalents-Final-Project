angular.module('users')
    .controller('ProfileController', function($http, $scope, $location, AuthService) {

        $scope.delayView = AuthService.isLogged();

        if (!AuthService.isLogged()) return $location.path('login');


        $http.get('user.json')
            .then(function(response) {
                $scope.user = response.data;
            });
    });