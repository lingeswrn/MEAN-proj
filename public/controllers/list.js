var app = angular.module("myApp",[]);

app.controller('appCtrl',function($scope,$http){
	
	$scope.refresh = function(){
		$http.get('/contactlist').success(function(response){
			$scope.contactlist = response;
			$scope.contact = "";
		});
	}	
	$scope.addcontact = function(){
		$http.post('/contactlist',$scope.contact).success(function(response){
			console.log(response);
			$scope.refresh();
		});		
	}
	$scope.remove = function(id){
		$http.delete('/contactlist/'+ id).success(function(response){
			console.log(id);
			$scope.refresh();
		});	
	}
	$scope.edit = function(id){
		$http.get('/contactlist/'+ id).success(function(response){
			$scope.contact = response;
		});	
	}
	$scope.update = function(id){
		$http.put('/contactlist/'+ $scope.contact._id, $scope.contact).success(function(response){
			$scope.contact = response;
			$scope.refresh();
		});	
	}
	
	$scope.refresh();
});