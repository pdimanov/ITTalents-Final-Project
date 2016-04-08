angular.module('users')
    .controller('NavigationController', function($scope, AuthService) {

        $scope.$on('user.logged', function() {
            $scope.isLogged = AuthService.isAuth();
        });

    });