angular.module('users')
    .controller('LoginController', function($cookies, $scope, $rootScope, $http, $location, UserService, AuthService) {

        $scope.user = {};

        $scope.login = function(user) {
            UserService.login(user).then(function(response) {
                console.log(response);
                AuthService.login(response.data);
                $location.path('/home');

                $rootScope.$emit('user.action');
                $rootScope.$broadcast('user.action');

            }, function(response) {
                console.log('fail\n', response);
                $scope.serverErrors = response.data.error;
            });
        };

        $scope.FBLogin = function() {
            FB.login(function(response) {
                if (response.status === 'connected') {
                    console.log(response);
                    FB.api('/me?fields=name,picture,email', function(response) {
                        console.log(response);
                        var data = {
                            'username': response.name,
                            'email': response.email,
                            'facebook_id': response.id,
                            'picture': response.picture.data.url
                        };
                        UserService.loginFB(data).then(function(response) {
                            console.log(response);
                            AuthService.login(response.data);
                            $location.path('/home');

                            $rootScope.$emit('user.action');
                            $rootScope.$broadcast('user.action');
                        }, function(response) {
                            console.log('fail\n', response);
                            $scope.serverErrors = response.data.error;
                        });

                    });
                } else if (response.status === 'not_authorized') {
                    // The person is logged into Facebook, but not your app.
                } else {
                    // The person is not logged into Facebook, so we're not sure if
                    // they are logged into this app or not.
                }
            }, {scope: 'email', return_scopes: true});
        }
    });