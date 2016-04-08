angular.module('users')
    .controller('ShopController', function($http, $scope, $location, AuthService) {

        $scope.delayView = AuthService.isLogged();

        if (!AuthService.isLogged()) return $location.path('login');

        $http.get('shop.json')
            .then(function(response) {
                $scope.shop = response.data;
            });

        $scope.toggleModal = function() {

        }
    });