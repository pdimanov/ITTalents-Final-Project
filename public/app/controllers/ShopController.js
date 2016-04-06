angular.module('users')
    .controller('ShopController', function($http, $scope) {
        $http.get('shop.json')
            .then(function(response) {
                $scope.shop = response.data;
            });

        $scope.toggleModal = function() {

        }
    });