angular.module('users')
    .controller('NavigationController', function($scope, AuthService) {

        $scope.isLogged = AuthService.isLogged();

        $scope.$on('user.loggedIn', function() {
            $scope.isLogged = AuthService.isLogged();
        });

        $scope.$on('user.loggedOut', function() {
            $scope.isLogged = AuthService.isLogged();
        });

    });