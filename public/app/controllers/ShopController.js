angular.module('users')
    .controller('ShopController', function($http, $scope, $location, UserService, AuthService, StorageService) {

        $scope.delayView = AuthService.isLogged();

        if (!AuthService.isLogged()) return $location.path('login');

        $scope.shop = {};
        UserService.shop(StorageService.getToken()).then(function(response) {
            $scope.shop = response.data.message;
        });

        $scope.shopType = function(type) {
            UserService.shopType(type, StorageService.getToken()).then(function(response) {
                console.log(response);
                delete $scope.shop;
                $scope.shop = response.data.items;
                console.log($scope.shop);
                //$scope.$apply();
            });
        };
    });