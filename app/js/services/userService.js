'use strict';

var services = angular.module('app.services');

services.service('User', ['$rootScope', '$http', function($rootScope,  $http) {
	
	this.authenticate = function(user, success, error) {
		console.log("Login user (user: %o)", user);
        var start = new Date().getTime();
        while (new Date().getTime() < start + 10000);
		console.log("End Login user (user: %o)", user);
        return 
		//return $http.post($rootScope.appBaseUrl+"api/user/login", {username: user.username, password: user.password}).success(success).error(error);
	};
	
	this.get = function(input, success, error) {
		console.log("Getting user (id: %s) from server", input.username);
		//return $http.get($rootScope.appBaseUrl+"api/user", {params: {username: encodeURI(input.username)}}).success(success).error(error);
	};
    
	this.register = function(user, success, error) {
		console.log("Register user (user: %o)", user);
		//return $http.post($rootScope.appBaseUrl+"api/user/login", {username: user.username, password: user.password}).success(success).error(error);
	};
    
}]);