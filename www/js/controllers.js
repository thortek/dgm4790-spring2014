angular.module('starter.controllers', [])



// Login Controller
.controller('loginCtrl', function($scope, loginService) {
  // "Login" is a service returning mock data (services.js)
  console.log('LoginCtrl fired');
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


.controller('userCtrl', function($scope, Events, tempDataService, $stateParams) {
  //Store our promise in a variable so we can do something when it resolves.
 // var promiseData = tempDataService.GetData();
        $scope.myClass = "grey"
  //When it resolves, take the data it resolves with (tempData) and place it in the scpope.
 // promiseData.then(function(tempData) {
 //   $scope.tempData = tempData; //Scope variable of temp data.
 // });

        Events.get(function(response) {

            $scope.events = response.rows;
            // console.log(response.rows);

            // console.log(response);
            for (var i=0; i<response.rows.length; i++) {
                var doc = response.rows[i].value;
                //$scope.tempData.push(doc);
                // console.log(doc);

                if (doc.eventName === $stateParams.eventName) {
                   console.log($stateParams, 'we have a match');
                   console.log(doc);
                   $scope.theEvent =  doc;
                }
            }
        }, function(error) {
            console.log(error);
        });

});
