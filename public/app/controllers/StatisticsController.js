angular.module('users')
    .controller('StatisticsController', function($scope, UserService) {

        $scope.stats = {
            column: '',
            quantity: '',
            direction: ''
        };

        $scope.searchName = function() {
            UserService.searchName($scope.heroName).then(function(response) {
                $scope.data = response.data.message;
                console.log(response);
            });
        };

        $scope.searchStats = function() {
            console.log($scope.stats);
            UserService.searchStats($scope.stats).then(function(response) {
                $scope.data = response.data.message;
                console.log(response);
            });
        };
    });