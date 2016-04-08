angular.module('users')
    .factory('AuthService', function($location, StorageService) {
        //var identity;

        return {
            isAuth: function() {
                return !!StorageService.getCookie();
            },
            login: function(user) {
                //identity = user;
                StorageService.setCookie(user);
            },
            logout: function() {
                //identity = undefined;
                StorageService.removeCookie();
            },
            register: function(user) {
                return UserService.register(user);
            }
        }
    });