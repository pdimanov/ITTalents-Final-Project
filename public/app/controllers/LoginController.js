angular.module('users')
    .controller('LoginController', function($cookies, $scope, $rootScope, $http, $location, UserService, AuthService) {

        $scope.user = {};

        $scope.login = function(user) {
            UserService.login(user).then(function(response) {
                console.log(response);
                AuthService.login(response.data);
                $location.path('/home');

                $rootScope.$emit('user.logged');
                $rootScope.$broadcast('user.logged');

            }, function(response) {
                console.log('fail\n', response);
                $scope.serverErrors = response.data;
            });
        }
    });