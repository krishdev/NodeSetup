var mainModule = angular.module('mainModule', ['ngSanitize', 'ngRoute', 'ui.bootstrap']);
mainModule.config(['$routeProvider',
    function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/partials/home.tpl.html',
				controller: 'homeCtrl',
				controllerAs: 'hCtrl'
            })
            .otherwise({
				redirectTo: '/'
			});
    }
]);