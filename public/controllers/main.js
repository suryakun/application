'use strict';
/**
* myApp Module
*
* Description
*/
var app = angular.module('myApp', ['ngRoute','ngTouch','authModule']);

app.config(['$routeProvider','$locationProvider','$httpProvider',
	function($routeProvider,$locationProvider,$httpProvider) {		
		$routeProvider			
			.when('/dashboard',{
				controller :'mainController',
				templateUrl:'/partials/dashboard.html',
			})
			.when('/training-schedule', {
				controller :'trainingScheduleController',
				templateUrl:'/partials/trainingSchedule.html'
			})
			.when('/training-history',{
				controller :'trainingHistoryController',
				templateUrl:'/partials/trainingHistory.html'
			})
			.when('/your-team',{
				controller :'yourTeamController',
				templateUrl:'/partials/yourTeam.html'
			})
			.when('/your-profile', {
				controller : 'yourProfileController',
				templateUrl:'/partials/yourProfile.html'
			})
			.when('/your-messages', {
				controller :'messagesController',
				templateUrl:'/partials/messages.html'
			})
			.when('/register', {
				controller :'registerController',
				templateUrl:'/partials/register.html'
			})
			.when('/setting-account', {
				controller: 'accountSettingController',
				templateUrl: '/partials/setPassword.html'
			})
			.otherwise({
				redirectTo:'/dashboard'
			});	
	$locationProvider.html5Mode(true);
}]);

app.controller('mainController', ['$scope', 'USER_ROLES', function($scope,role){
	$scope.test = role.player;	
}]);

// app.controller('mainController', ['$scope', function($scope){
// 	$scope.test = 'Test';	
// }]);

app.controller('trainingScheduleController', ['$scope', function($scope){
	
}]);

app.controller('trainingHistoryController', ['$scope', function($scope){
	
}]);

app.controller('yourTeamController', ['$scope', function($scope){
	
}]);

app.controller('yourProfileController', ['$scope', function($scope){
	
}]);

app.controller('messagesController', ['$scope', function($scope){
	
}]);

app.controller('accountSettingController', ['$scope', function($scope){
	
}])

app.controller('registerController', ['$scope','$rootScope', '$http', function($scope,$rootScope,$http){
	var showCounter = true;
	var showForm = false;
	var users = [];

	$scope.team = { team_name: undefined, team_organization: undefined, team_regional: undefined, test: undefined};
	$scope.cities = ['bandung','jakarta','bogor','surabaya'];

	$scope.createInstanceRegister = function(){
		$scope.members = [];		
		for (var i = 0; i < $scope.counter; i++) {
			$scope.members.push(i);
		};
		console.log($scope.members);
		$scope.showForm = true;
		$scope.showCounter = false;		
		$scope.name = [];
		$scope.email = [];
	};

	$scope.checkValidation = function(element){
		if (element.$valid) {
			console.log("error");
		};
	};

	$scope.registerMyTeam = function(){
		for (var j = 0; j < $scope.counter; j++) {
			users.push({name: $scope.name[j], email: $scope.email[j] } );
		};
		console.log($scope.team);
		console.log(users);
		$http.post('/users/save_team', {team: $scope.team, members: users})
			.success(function(data,status){
				console.log('sent');
			})
			.error(function(data,status){
				console.log('error');
			});		
	};
	
}]);

app.controller('users', ['$scope','$location','$window', 'UserService', 'AuthenticationService', function($scope,$location,$window,UserService,AuthenticationService){	
	$scope.login = function(username,password){
		if (username !== undefined && password !== undefined) {
			UserService.login(username,password).success(function(data){
				AuthenticationService.isLogged = true;
				$window.sessionStorage.token = data.token;
				$location.path('/');
			}).error(function(status,data){
				AuthenticationService.isLogged = false;
				console.log(status);
				console.log(data);
			});
		};
	}

	$scope.logout = function(){
		AuthenticationService.isLogged = false;
		delete $window.sessionStorage.token;
		$location.path('/login');
	}

}]);

app.controller('topMenu', ['$scope', function($scope){
	$scope.invitationCount = 4;
	$scope.invitationNotif = ['Training1','Training2','Training4','Training5','Training6'];
	$scope.messageCount = 10;
	$scope.messages = [{avatar:'/images/ui-zac.jpg', from:'Zac Snider',time:'Just now', content:'Hi mate, how is everything?'},
						{avatar:'/images/ui-zac.jpg', from:'Zac Snider',time:'Just now', content:'Hi mate, how is everything?'},
						{avatar:'/images/ui-zac.jpg', from:'Zac Snider',time:'Just now', content:'Hi mate, how is everything?'},
						{avatar:'/images/ui-zac.jpg', from:'Zac Snider',time:'Just now', content:'Hi mate, how is everything?'},
						{avatar:'/images/ui-zac.jpg', from:'Zac Snider',time:'Just now', content:'Hi mate, how is everything?'}];
}]);

app.controller('sideBar', ['$scope', function($scope){
	$scope.avatar = '/images/ui-zac.jpg';
	$scope.username = 'Surya Surakhman';
}]);

app.directive('inputForm', function(){
	return {
		scope: {
			label: '@',
			alert: '@',
			help: '@',			
			formname: '=',
			model: '=',
			name: '='			
		},
		restrict: 'E',
		templateUrl: '/directives/formRegister.html'
	}
});

app.directive('autocompletePlace', ['$scope','$http', function($scope,$http){
	// Runs during compile
	return {
		scope: {
			label: '@',
			alert: '@',
			help: '@',			
			formname: '=',
			model: '=',
			name: '='
		}, // {} = isolate, true = child, false/undefined = no change
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '',
		// replace: true,
		transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			scope.$watch('model',function(scope){
				var cities = $http
			});
		}
	};
}]);