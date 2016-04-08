var app = angular.module('users', ['ngRoute', 'ngCookies', 'satellizer']);

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
            controller: 'HomeController',
            authenticated: true
        })
        .when('/shop' , {
            templateUrl: 'app/views/shop.html',
            controller: 'ShopController',
            authenticated: true
        })
        .when('/statistics' , {
            templateUrl: 'app/views/statistics.html',
            controller: 'StatisticsController',
            authenticated: true
        })
        .when('/profile' , {
            templateUrl: 'app/views/profile.html',
            controller: 'ProfileController',
            authenticated: true
        })
        .when('/logout' , {
            templateUrl: 'app/views/logout.html',
            controller: 'LogoutController',
            authenticated: true
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

app.run(function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        $rootScope.$emit('user.logged');
        $rootScope.$broadcast('user.logged');
        if (next.$$route && next.$$route.authenticated && !AuthService.isAuth()) {
            $location.path('/login');

        }
    });
});