'use strict';

var directives = angular.module('app.directives', []);

directives.directive('autoFillSync', function($timeout) {
	return {
		restrict: "A",
		require : 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			setInterval(function() {
				if (!(element.val()=='' && ngModel.$pristine)) {
					scope.$apply(function() {
						ngModel.$setViewValue(element.val());
					});
				}
			}, 300);
		}
	};
});