angular.module('users')
    .factory('StorageService', function($window, $cookies) {
        var key = 'user_token';
        /*return  {
            getToken: function() {
                return $window.localStorage.getItem(key);
            },
            setToken: function(token) {
                $window.localStorage.setItem(key, token);
            },
            removeToken: function() {
                $window.localStorage.removeItem(key);
            }
        }*/
        return  {
            getCookie: function() {
                return $cookies.get(key);
            },
            setCookie: function(user) {
                var time = new Date();
                time.setMinutes(time.getMinutes() + 120);
                $cookies.put(key, user.api_token, {
                    'expires': time
                });
            },
            removeCookie: function() {
                $cookies.remove(key);
            }
        }
    });