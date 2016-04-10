angular.module('users')
    .controller('ProfileController', function($scope, StorageService, UserService) {

        UserService.profile(StorageService.getCookie()).then(function(response) {
            $scope.user = response.data.data;
        });

        $scope.createHero = function(hero) {
            console.log(hero);
            UserService.createHero(hero).then(function(response) {
                $scope.user = response.data.data;
                $scope.form.$setPristine();
                $scope.create = {};
            });
        };

        $scope.deleteHero = function() {
            UserService.deleteHero().then(function() {
                UserService.profile().then(function(response) {
                    $scope.user = response.data.data;
                });
            });
        };

        $scope.upload = function (file) {
            console.log(file);
            UserService.upload(file).then(function (response) {
                $scope.user.avatar = response.data.message + '?lastmod=' + new Date().getTime();
                delete $scope.error;
                delete $scope.file;
            }, function (response) {
                $scope.error = response.statusText;
            });
        };
    });