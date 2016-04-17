angular.module('users')
    .controller('RegisterController', function($scope, $rootScope, $http, $location, UserService, AuthService) {


        $scope.user = {};

        $scope.equalPasswords = checkPasswordMatch($scope.user);
        $scope.checkPasswordMatch = checkPasswordMatch;

        function checkPasswordMatch(user) {
            return (user.password && user.password_confirmation && (user.password == user.password_confirmation));
        }

        $scope.register = function(user) {
            UserService.register(user).then(function(response) {
                //$location.path('/login');

                AuthService.login(response.data);
                $location.path('/home');

                $rootScope.$emit('user.action');
                $rootScope.$broadcast('user.action');
            }, function(response) {
                $scope.serverErrors = response.data;
            });
        }
    });