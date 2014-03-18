angular.module('starter.controllers', [])



// Login Controller
.controller('loginCtrl', function($scope, loginService, $http) {

  // "Login" is a service returning mock data (services.js)
  console.log('LoginCtrl fired');

  $scope.creds = {
    name: "itterettedyingstillympon",
    password: "pk8OePP26fjqE2VBTiRk5H7F"
  };

  $scope.authenticate = function() {

    $http({
      url: 'https://deanradar.cloudant.com/_session',
      method: 'POST',
      data: $scope.creds,
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Cache-Control':'no-cache'
      },
      withCredentials: true
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
  console.log('Regster fired');
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
