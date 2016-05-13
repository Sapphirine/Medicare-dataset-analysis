var app = angular.module('mainApp', ['ngRoute']);
  

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
	.when('/spending', {
        templateUrl	:	'html/spend.html',
        controller	:	'spendCtrl'
	})
    .when('/reco', {
        templateUrl	:	'html/reco.html',
        controller	:	'recoCtrl'
	})
    .when('/trend', {
        templateUrl	:	'html/trend.html',
        controller	:	'trendCtrl'
	})
    .otherwise({ redirectTo: '/spending' });
	// use the HTML5 History API
    $locationProvider.html5Mode(true);
});


app.controller('homeCtrl', function ($scope,$http,$location) {
	console.log('Home control is under control ');
});