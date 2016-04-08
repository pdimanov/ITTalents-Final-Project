angular.module('users')
    .factory('AuthService', function($location, StorageService) {
        var identity;

        return {
            isLogged: function() {
                return !!identity;
            },
            login: function(user) {
                identity = user;
                StorageService.setToken(identity.api_token);
            },
            logout: function() {
                identity = undefined;
                StorageService.removeToken();
            },
            register: function(user) {
                return UserService.register(user);
            }
        }
    });