'use strict';

var app = angular.module('app', [ 'ngRoute', 'ngSanitize', 'pascalprecht.translate', 'app.controllers' ]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/login', { templateUrl : 'templates/user/login.html', controller : 'UserController' })
	.otherwise({redirectTo : '/'});
}])
.factory('authHttpResponseInterceptor',['$q','$location', '$log',function($q, $location, $log){
    return {
        response: function(response){
            if (response.status === 401) {
            	$log.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
            	$log.log("Response Error 401",rejection, $location.path());
                if ($location.path() != '/login') {
                	$location.path('/login'); //.search('returnTo', $location.path());
                }
            }
            return $q.reject(rejection);
        }
    };
}])
.config(['$httpProvider', function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}])
.config(['$translateProvider', function ($translateProvider) {
  $translateProvider
    .translations('en', translationsEN)
    .preferredLanguage('en')
    .useSanitizeValueStrategy('sanitize');
}]);