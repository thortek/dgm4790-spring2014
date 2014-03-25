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

    .controller('deanCtrl', function($scope, Events, tempDataService, $stateParams) {
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
    }).controller('addEventCtrl', ['$scope', '$resource', function($scope, $resource){
        $scope.event = {};

        //temp model for add-event
        $scope.departments = [
            {name:"Automotive Technology", abrv:"AT"},
            {name:"Culinary Arts", abrv:"CA"},
            {name:"Computer Science", abrv:"CS"},
            {name:"Construction Technology", abrv:"CT"},
            {name:"Digital Media", abrv:"DGM"},
            {name:"Engineering Graphics Technicians", abrv:"EG"},
            {name:"Engineering Technology", abrv:"ET"},
            {name:"Information Systems & Technology", abrv:"IS&T"},
            {name:"Technology management", abrv:"TM"}
        ];
        $scope.submitEvent = function() {
            console.log($scope.event);
            var newEvent = $resource('http://uvutest.learningcomponents.com/api/addevent');
            newEvent.save([], $scope.event);
        };


    }]);

function forceOrder($scope) {
    $scope.event = 'value.startDate';
}