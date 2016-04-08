angular.module('users')
    .controller('LogoutController', function($scope, $rootScope, $location, AuthService) {

        AuthService.logout();
        $rootScope.$emit('user.logged');
        $rootScope.$broadcast('user.logged');

        //$location.path('login');


    });