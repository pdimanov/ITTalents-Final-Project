angular.module('users')
    .controller('HomeController', function($scope, $location, AuthService) {

        $scope.delayView = AuthService.isLogged();

        if (!AuthService.isLogged()) return $location.path('login');

    });