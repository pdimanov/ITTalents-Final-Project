angular.module('users')
    .factory('StorageService', function($window) {
        var key = 'user_token';
        return  {
            getToken: function() {
                return $window.localStorage.getItem(key);
            },
            setToken: function(token) {
                $window.localStorage.setItem(key, token);
            },
            removeToken: function() {
                $window.localStorage.removeItem(key);
            }
        }
    });