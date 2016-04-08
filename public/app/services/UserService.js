angular.module('users')
    .factory('UserService', function($rootScope, $http) {
        return {
            login: function(user) {
                return $http({
                    method: 'POST',
                    url: 'api/user/login',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest'
                    },
                    data: JSON.stringify(user)
                });
            },
            logout: function() {

            },
            register: function(user) {
                return $http({
                    method: 'POST',
                    url: 'api/user/register',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest'
                    },
                    data: JSON.stringify(user)
                });
            }
        }
    });