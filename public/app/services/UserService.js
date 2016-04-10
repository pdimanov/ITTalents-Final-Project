angular.module('users')
    .factory('UserService', function($rootScope, $http, Upload, StorageService) {
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
                    data: user
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
                    data: user
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
            profile: function() {
                return $http({
                    method: 'GET',
                    url: 'api/user',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': StorageService.getCookie()
                    }
                });
            },
            upload: function(file) {
                return Upload.upload({
                    url: 'api/user/avatar',
                    data: {image: file},
                    headers: {
                        'Accept' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': StorageService.getCookie()
                    }
                });
            },
            createHero: function(hero) {
                return $http({
                    method: 'POST',
                    url: 'api/hero',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': StorageService.getCookie()
                    },
                    data: hero
                });
            },
            deleteHero: function() {
                return $http({
                    method: 'DELETE',
                    url: 'api/hero',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': StorageService.getCookie()
                    }
                });
            },
            buyItem: function(item, token) {
                return $http({
                    method: 'POST',
                    url: 'api/hero/buy',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': token
                    },
                    data: item
                });
            }
        }
    });