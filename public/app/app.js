var app = angular.module('users', ['ngRoute', 'satellizer']);

app.config(function($routeProvider, $authProvider, $locationProvider) {

    $routeProvider
        .when('/login' , {
            templateUrl: 'app/views/login.html',
            controller: 'LoginController'
        })
        .when('/register' , {
            templateUrl: 'app/views/register.html',
            controller: 'RegisterController'
        })
        .when('/about' , {
            templateUrl: 'app/views/about.html'
            /*controller: 'AboutController'*/
        })
        .when('/home' , {
            templateUrl: 'app/views/home.html',
            controller: 'HomeController'
        })
        .when('/shop' , {
            templateUrl: 'app/views/shop.html',
            controller: 'ShopController'
        })
        .when('/statistics' , {
            templateUrl: 'app/views/statistics.html',
            controller: 'StatisticsController'
        })
        .when('/profile' , {
            templateUrl: 'app/views/profile.html',
            controller: 'ProfileController'
        })
        .when('/logout' , {
            templateUrl: 'app/views/logout.html',
            controller: 'LogoutController'
        })
        .otherwise({
            redirectTo: '/login'
        });

    $locationProvider.html5Mode(true);

    $authProvider
        .facebook({
            clientId: 'Facebook App ID',
            responseType: 'token'
        });
});