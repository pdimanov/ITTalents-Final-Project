angular.module('users')
    .controller('ProfileController', function($scope, StorageService, UserService, Upload) {

        $scope.user = {
            avatar: 'assets/images/placeholder.png'
        };

        $scope.create = {};

        UserService.profile(StorageService.getCookie()).then(function(response) {
            $scope.user = response.data;
            console.log(response);
        });

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
        };

        $scope.submit = function() {
            console.log($scope.file);

            if ($scope.file) {
                $scope.upload($scope.file);
            }
        };

        // upload on file select or drop
        $scope.upload = function (file) {
            var token = StorageService.getCookie();
            Upload.upload({
                url: 'api/user/avatar',
                data: {file: file},
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'X-Requested-With' : 'XmlHttpRequest',
                    'X-Api-Token': token
                }
            }).then(function (response) {
                console.log('Success ' + response.config.data.file.name + ' uploaded. Response: ' + response.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
    });