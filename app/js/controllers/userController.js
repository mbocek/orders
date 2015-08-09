var controllers = angular.module('app.controllers');

/**
 * Signin controller.
 */
controllers.controller('UserController', [ '$rootScope', '$scope', '$location', 'User', '$translate',
    function($rootScope, $scope, $location, User, $translate) {

        $scope.signin = function(viewLocation) {
            if ($scope.user == null) {
                $scope.errorMessage = $translate.instant('SIGNIN_LOGIN_ERROR_MESSAGE');
            } else {
                console.log("Login user (username: %s) with password (password: %s)", $scope.user.username, $scope.user.password);
                $scope.isSaving = true;
                User.authenticate({username: $scope.user.username, password: $scope.user.password}, function(data, status) {
                    console.log("User auth success! data: %o, status: %o", data, status);
                    // get user profile info
                    User.get({username: $scope.user.username}, function(data, status) {
                        console.log("User get success! data: %o, status: %o", data, status);
                        $rootScope.loggedUser = data;

                        //$window.location.href = $rootScope.appBaseUrl+"webapp#/tasks";
                    }, function(data, status) {
                        console.log("Auth error! data: %o, status: %o", data, status);
                        $scope.user = {};
                        $scope.isSaving = false;
                    });
                }, function(data, status) {
                    console.log("User auth error! data: %o, status: %o", data, status);
                    $scope.isSaving = false;
                });
            }
        }
    }
]);