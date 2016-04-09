angular.module('users')
    .controller('ShopController', function($http, $scope, $location, UserService, AuthService, StorageService) {

        $scope.shop = {};
        UserService.shop(StorageService.getCookie()).then(function(response) {
            $scope.shop = response.data.message;
        });

        $scope.shopType = function(type) {
            UserService.shopType(type, StorageService.getCookie()).then(function(response) {
                console.log(response);
                delete $scope.shop;
                $scope.shop = response.data.items;
                console.log($scope.shop);
            });
        };

        $scope.buyItem = function(item) {
            UserService.buyItem(item, StorageService.getCookie()).then(function(response) {
                console.log(response);
                $scope.info = 'Successfully bought.';
            }, function() {
                $scope.info = 'You can\'t buy this item.'
            });
        }
    });