angular.module('users')
    .controller('ProfileController', function($scope, StorageService, UserService) {

        $scope.user = {
            avatar: 'assets/images/placeholder.png'
        };

        $scope.create = {};

        UserService.profile(StorageService.getCookie()).then(function(response) {
            $scope.user = response.data;
            console.log(response);
        });

        $scope.upload = function(avatar) {
            UserService.upload(avatar, StorageService.getCookie()).then(function(response) {
                console.log('success\n', response);
            });
        };

        $scope.createHero = function(hero) {
            console.log(hero);
            UserService.createHero(JSON.stringify(hero), StorageService.getCookie()).then(function(response) {
                console.log('success\n', response);
                $scope.user = response.data;
                $scope.form.$setPristine();
                $scope.create = {};
            });
        };

        $scope.deleteHero = function() {
            UserService.deleteHero(StorageService.getCookie()).then(function() {
                UserService.profile(StorageService.getCookie()).then(function(response) {
                    $scope.user = response.data;
                    console.log(response);
                });
            });
        }
    });