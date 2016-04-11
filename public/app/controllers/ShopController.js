angular.module('users')
    .controller('ShopController', function($scope, UserService) {

        $scope.shop = {};

        $scope.shopTypeAll = function() {
            UserService.shop().then(function(response) {
                console.log(response);
                $scope.shop = response.data.message.items;
                $scope.heroGold = response.data.message.heroGold;
            });
        };

        $scope.shopType = function(type) {
            UserService.shopType(type).then(function(response) {
                //console.log(response);
                $scope.shop = response.data.message.items;
                $scope.heroGold = response.data.message.heroGold;
            });
        };

        $scope.buyItem = function(item) {
            UserService.buyItem(item).then(function(response) {
                //console.log(response);
                $scope.info = (response.data.message) ? response.data.message : response.data.error;
            });
        }
    });