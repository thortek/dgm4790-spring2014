angular.module('starter.controllers', [])



// Login Controller
.controller('loginCtrl', function($scope, loginService, $http, $cookies, $timeout) {

  // "Login" is a service returning mock data (services.js)
  console.log('LoginCtrl fired');

  $scope.creds = {
    name: "deanradar",
    password: "dgm4790!THOR"
  };

  $scope.postCookie = function() {

    $http({
      url: 'https://deanradar.cloudant.com/_session',
      method: 'POST',
      data: "name=deanradar&password=dgm4790!THOR",
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      withCredentials: true
    }).then( function(response){
      $timeout(function(){
        console.log(response);
        console.log($cookies);
      }); 

    });

    console.log($scope.creds);
  }

  $scope.deleteCookie = function() {

    $http({
      url: 'https://deanradar.cloudant.com/_session',
      method: 'DELETE',
      data: "",
      headers: {
        'Accept': '*/*'
      }
    });

    console.log($scope.creds);
  }

  $scope.getCookie = function() {

    $http({
      url: 'https://deanradar.cloudant.com/_session',
      method: 'GET',
      headers: {
        'Accept': '*/*'
      }
    });

    console.log($scope.creds);
  }

  $scope.getTest = function() {
    $http({
      url: 'https://deanradar.cloudant.com/_all_dbs',
      method: 'GET',
      data: '',
      withCredentials: true,
      params: $scope.creds
    })
  }
})

// Login Controller
.controller('registerCtrl', function($scope, loginService, tempDataService) {
  // "Login" is a service returning mock data (services.js)
  $scope.userDetails = {
    fname:'',
    lname:'',
    email:'',
    password:''
  };


})


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
})

// A simple controller that fetches a temporaryData from a service
.controller('tempDataCtrl', function($scope, tempDataService) {
    // "GetData" is a service returning mock data (services.js)
    $scope.tempData = tempDataService.GetData();
	$scope.myClass = "grey"
})

.controller('userCtrl', function($scope, tempDataService) {
  //Store our promise in a variable so we can do something when it resolves.
  var promiseData = tempDataService.GetData();

  //When it resolves, take the data it resolves with (tempData) and place it in the scpope.
  promiseData.then(function(tempData) {
    $scope.tempData = tempData; //Scope variable of temp data.
  });

});
