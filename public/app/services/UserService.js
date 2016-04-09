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
            },
            shop: function(token) {
                return $http({
                    method: 'GET',
                    url: 'api/shop',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': token
                    }
                });
            },
            shopType: function(type, token) {
                return $http({
                    method: 'GET',
                    url: 'api/shop/' + type,
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': token
                    }
                });
            },
            profile: function(token) {
                return $http({
                    method: 'GET',
                    url: 'api/user',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': token
                    }
                });
            },
            upload: function(avatar, token) {
                return $http({
                    method: 'POST',
                    url: 'api/user/upload',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': token
                    },
                    data: avatar
                });
            },
            createHero: function(hero, token) {
                return $http({
                    method: 'POST',
                    url: 'api/hero',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': token
                    },
                    data: hero
                });
            },
            deleteHero: function(token) {
                return $http({
                    method: 'DELETE',
                    url: 'api/hero',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': token
                    }
                });
            }
        }
    });