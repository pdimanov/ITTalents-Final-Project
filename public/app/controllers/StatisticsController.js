angular.module('users')
    .controller('StatisticsController', function($http, $scope, AuthService) {

        $scope.delayView = AuthService.isLogged();

        if (!AuthService.isLogged()) return $location.path('login');

    });