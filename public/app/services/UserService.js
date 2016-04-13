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
            shop: function() {
                return $http({
                    method: 'GET',
                    url: 'api/shop',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': StorageService.getCookie()
                    }
                });
            },
            shopType: function(type) {
                return $http({
                    method: 'GET',
                    url: 'api/shop/?slot-type=' + type,
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': StorageService.getCookie()
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
            buyItem: function(item) {
                return $http({
                    method: 'POST',
                    url: 'api/hero/buy',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': StorageService.getCookie()
                    },
                    data: item
                });
            },
            searchName: function(name) {
                return $http({
                    method: 'GET',
                    url: 'api/hero?search=' + name,
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': StorageService.getCookie()
                    }
                });
            },
            searchStats: function(stats) {
                return $http({
                    method: 'GET',
                    url: 'api/statistics?quantity=' + stats.quantity + '&direction='+ stats.direction +'&column=' + stats.column,
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest',
                        'X-Api-Token': StorageService.getCookie()
                    }
                });
            },
            loginFB: function(data) {
                return $http({
                    method: 'POST',
                    url: 'api/user/facebook/register',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'X-Requested-With' : 'XmlHttpRequest'
                    },
                    data: data
                });
            }
        }
    });