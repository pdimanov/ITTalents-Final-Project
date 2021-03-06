var app = angular.module('users', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngFileUpload']);

app.config(function($routeProvider, $locationProvider) {

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
});

app.run(function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        $rootScope.$emit('user.action');
        $rootScope.$broadcast('user.action');
        console.log(current);
        if (next.$$route && next.$$route.authenticated && !AuthService.isAuth()) {
            $location.path('/login');
        }

        if (next.$$route && (next.$$route.templateUrl != 'app/views/about.html') && !(next.$$route.authenticated) && AuthService.isAuth()) {
            $location.path('/home');
        }

        if (current && current.$$route && current.$$route.originalPath == '/home') {
            //game.destroy();
        }
    });
});