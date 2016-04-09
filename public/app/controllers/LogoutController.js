angular.module('users')
    .controller('LogoutController', function($location, $timeout, $rootScope, AuthService) {

        AuthService.logout();
        $rootScope.$emit('user.action');
        $rootScope.$broadcast('user.action');

        $timeout(function() {
            $location.path('/login');
        }, 3000);
    });