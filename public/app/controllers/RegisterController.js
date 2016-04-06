angular.module('users')
    .controller('RegisterController', function($scope, $window) {
        $scope.user = {};
        $scope.equalPasswords = checkPasswordMatch($scope.user);
        $scope.checkPasswordMatch = checkPasswordMatch;

        function checkPasswordMatch(user) {
            return (user.password && user.repeatPassword && (user.password == user.repeatPassword));
        }

        $scope.register = function(user) {

            delete user.repeatPassword;
            $window.location.href = '#/login';
        }
    });