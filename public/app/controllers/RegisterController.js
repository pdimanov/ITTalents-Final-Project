angular.module('users')
    .controller('RegisterController', function($scope, $http, $location, UserService, AuthService) {


        $scope.user = {};

        $scope.equalPasswords = checkPasswordMatch($scope.user);
        $scope.checkPasswordMatch = checkPasswordMatch;

        function checkPasswordMatch(user) {
            return (user.password && user.password_confirmation && (user.password == user.password_confirmation));
        }

        $scope.register = function(user) {
            UserService.register(user).then(function() {
                $location.path('/login');
            }, function(response) {
                $scope.serverErrors = response.data;
            });
        }
    });