angular.module('users')
    .controller('LoginController', function($scope, $rootScope, $http, $location, UserService, AuthService) {

        $scope.delayView = AuthService.isLogged();

        if (AuthService.isLogged()) return $location.path('home');

        $scope.user = {};

        $scope.login = function(user) {
            UserService.login(user).then(function(response) {
                AuthService.login(response.data);
                $location.path('/home');

                $rootScope.$emit('user.loggedIn');
                $rootScope.$broadcast('user.loggedIn');

            }, function(response) {
                $scope.serverErrors = response.data;
            });
        }
    });