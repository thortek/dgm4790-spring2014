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

.controller('deanCtrl', function($scope, eventService, tempDataService, $stateParams) {
        $scope.myClass = "grey"; //not sure what this is doing...

        var events = eventService.getEvents(); //Create events from eventService service

        events.get(function(response) { //call the get method of our $resource returned from eventService.getEvents();

            $scope.events = response.rows; //Add all the events to the scope.

            for (var i=0; i<response.rows.length; i++) { //loop through and find the cliicked on event (event-details view)
                var doc = response.rows[i].value;

                if (doc.eventName === $stateParams.eventName) {
                   $scope.theEvent =  doc;
                }
            }
        }, function(error) {
            console.log(error); // show the error
        });
}).controller('addEventCtrl', ['$scope', '$resource', 'eventService', function($scope, $resource, eventService){

  $scope.event = {}; //initiate the empty object that will house data being sent to cloudant.

  //Department object to reference? what is this a reference for? ie. what does shade have to do with departments? can you add it to the departments array below?
  /*$scope.departments = [
    {name:'black', shade:'dark'},
    {name:'white', shade:'light'},
    {name:'red', shade:'dark'},
    {name:'blue', shade:'dark'},
    {name:'yellow', shade:'light'}
  ];*/

    //temp model of departments for add-event.html
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

  //Add Event Function
  $scope.submitEvent = function() {
    console.log($scope.event);                //Log the details about to be sent to the server
    var newEvent = eventService.addEvent();   //Create a $resource that points to our API endpoint
    newEvent.save([], $scope.event);          //POST the data in $scope.event to the Cloudant Server
  };

}]);

function forceOrder($scope) {
      $scope.event = 'value.startDate';
}