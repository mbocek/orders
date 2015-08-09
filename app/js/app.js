'use strict';

var app = angular.module('app', [ 'ngRoute', 'ngSanitize', 'pascalprecht.translate', 'app.controllers', 'app.services', 'app.directives']);

angular.module('app.controllers', [ ]);
angular.module('app.services', ['ngResource']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
        .when('/', { templateUrl : 'view/default.html' })
        .when('/signin', { templateUrl : 'view/signin.html', controller: 'UserController' })
        .when('/signup', { templateUrl : 'view/signup.html', controller: 'UserController' })
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
                if ($location.path() != '/signin') {
                	$location.path('/signin'); //.search('returnTo', $location.path());
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