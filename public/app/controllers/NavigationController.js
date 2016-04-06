angular.module('users')
    .controller('NavigationController', function($scope, $window, $rootScope) {

        $scope.menuLogged = true;
       /* $scope.navigation = {
            login: function() {
                $window.location.href = '/login';
            },
            register: function() {
                $window.location.href = '/register';
            },
            home: function() {
                $window.location.href = '/home';
            },
            about: function() {
                $window.location.href = '/about';
            },
            shop: function() {
                $window.location.href = '/shop';
            },
            leaderboards: function() {
                $window.location.href = '/leaderboards';
            },
            profile: function() {
                $window.location.href = '/profile';
            },
            logout: function() {
                $window.location.href = '/logout';
            }
        }*/
    });