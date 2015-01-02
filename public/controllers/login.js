/**
*  Module: Login
*
* Description: Login User
*/
var app = angular.module('loginModule', ['ngRoute','ngTouch']);

app.controller('loginController', ['$scope','$rootScope','$http', function($scope,$rootScope,$http){
	
	$scope.loginProcess = function(){
		$http.post('/login', {username: $scope.username, password: $scope.password}).
			success(function(data,status){
				console.log(data);
				$scope.data = data;
				$scope.status = status;
			}).
			error(function(data,status){
				$scope.data = data || 'Request Failed';
				$scope.status = status;
			});
	};	
}]);

