angular.module('users')
    .controller('RegisterController', function($scope, $window, $http) {
        $scope.user = {};
        $scope.equalPasswords = checkPasswordMatch($scope.user);
        $scope.checkPasswordMatch = checkPasswordMatch;

        function checkPasswordMatch(user) {
            return (user.password && user.password_confirmation && (user.password == user.password_confirmation));
        }

        $scope.register = function(user) {
            var test = JSON.stringify(user);
            console.log(test);
            $http({
                method: 'POST',
                url: 'user/register/',
                headers: {
                    'Accept' : 'Application/Json',
                    'Content-Type' : 'Application/Json',
                    'X-Requested-With' : 'XmlHttpRequest'
                },
                data: test
                }
            ).then(function(response) {
                console.log('success\n', response);
            }, function(response) {
                console.log('fail\n', response);
            });
        }
    });