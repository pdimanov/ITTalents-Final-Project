angular.module('users')
    .controller('LogoutController', function($location, $timeout, $rootScope, AuthService) {

        AuthService.logout();
        $rootScope.$emit('user.logged');
        $rootScope.$broadcast('user.logged');

        $timeout(function() {
            $location.path('/login');
        }, 3000);
    });