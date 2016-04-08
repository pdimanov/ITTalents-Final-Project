angular.module('users')
    .controller('LogoutController', function($scope, $rootScope, $location, AuthService) {

        $scope.delayView = AuthService.isLogged();


        if (!AuthService.isLogged()) return $location.path('login');

        AuthService.logout();
        $rootScope.$emit('user.loggedOut');
        $rootScope.$broadcast('user.loggedOut');

        //$location.path('login');


    });