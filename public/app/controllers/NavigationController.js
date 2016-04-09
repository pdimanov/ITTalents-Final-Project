angular.module('users')
    .controller('NavigationController', function($scope, $rootScope, AuthService) {

        $scope.$on('user.action', function() {
            $scope.isLogged = AuthService.isAuth();
        });

    });