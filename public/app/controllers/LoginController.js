angular.module('users')
    .controller('LoginController', function($scope, $window, $auth) {

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };

        $scope.user = {};

        $scope.login = function(user) {
            $window.location.href = '#/home';
        };
    });