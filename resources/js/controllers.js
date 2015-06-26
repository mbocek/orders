var controllers = angular.module('app.controllers', [ ]);

/**
 * Header controller.
 */
controllers.controller('HeaderController', [ '$rootScope', '$scope', '$location', 
    function($rootScope, $scope, $location) {
        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        }
    }
])
