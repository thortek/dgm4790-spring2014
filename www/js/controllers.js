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

.controller('deanCtrl', function($scope, $timeout, eventService, tempDataService, $stateParams, $ionicActionSheet, $state) {
 $scope.onRefresh = function() {

            $timeout(function() {
            $state.go('dean.events', [''], {reload:true});
            $scope.$broadcast('scroll.refreshComplete');
            }, 1500);
}

    var events = eventService.getEvents(); //Create events from eventService service

    events.get(function(response) { //call the get method of our $resource returned from eventService.getEvents();

        $scope.events = response.rows; //Add all the events to the scope.

        for (var i=0; i<response.rows.length; i++) { //loop through and find the cliicked on event (event-details view)
            var doc = response.rows[i].value;

            if (doc.eventName === $stateParams.eventName) {
               $scope.theEvent =  doc;
               console.log(doc);
            }
        }
    }, function(error) {
        console.log(error); // show the error
    });

    $scope.deleteEvent = function(deleteEvent) {

         // Show the action sheet
         $ionicActionSheet.show({
           destructiveText: 'Delete',
           titleText: 'Are you sure you want to delete this event?',
           cancelText: 'Cancel',
           buttonClicked: function(index) {
             console.log(index);
             return true;
           },
           destructiveButtonClicked: function() {
              var id =  deleteEvent._id;
              var rev =  deleteEvent._rev;


              console.log(id);
              console.log(rev);


              var removeEvent = eventService.deleteEvent(id, rev);


              removeEvent.delete()
              $state.go('dean.events', [''], {reload:true});

              return true;

           }
         });
    };
}).controller('addEventCtrl', ['$scope', '$resource', 'eventService', function($scope, $resource, eventService){

  $scope.event = {}; //initiate the empty object that will house data being sent to cloudant.

    //temp model of departments for add-event.html
    $scope.departments = [
        {name:"Automotive Technology", abrv:"AT", pic:"atSprite.png", picabrv:"at"},
        {name:"Computer Science", abrv:"CS", pic:"csSprite.png", picabrv:"cs"},
        {name:"Construction Technology", abrv:"CT", pic:"ctSprite.png", picabrv:"ct"},
        {name:"Culinary Arts", abrv:"CA", pic:"caSprite.png", picabrv:"ca"},
        {name:"Digital Media", abrv:"DGM", pic:"dgmSprite.png", picabrv:"dgm"},
        {name:"Engineering Graphics & Design", abrv:"EG&D", pic:"egdSprite.png", picabrv:"egd"},
        {name:"Engineering Technology", abrv:"ET", pic:"etSprite.png", picabrv:"et"},
        {name:"Information Systems & Technology", abrv:"IS&T", pic:"istSprite.png", picabrv:"ist"},
        {name:"Technology Management", abrv:"TM", pic:"tmSprite.png", picabrv:"tm"}
    ];

  //Add Event Function
  $scope.submitEvent = function() {

    //Add the depticon icon based on which department was given example: at-green.png
    if ("department" in $scope.event)
    {
      switch ($scope.event.department) 
      {
        case "Automotive Technology":
          $scope.event.depticon = 'at-green.png';
          break;
        case "Computer Science":
          $scope.event.depticon = 'cs-green.png';
          break;
        case "Construction Technology":
          $scope.event.depticon = 'ct-green.png';
          break;
        case "Culinary Arts":
          $scope.event.depticon = 'ca-green.png';
          break;
        case "Digital Media":
          $scope.event.depticon = 'dgm-green.png';
          break;
        case "Engineering Graphics & Design":
          $scope.event.depticon = 'egd-green.png';
          break;
        case "Engineering Technology":
          $scope.event.depticon = 'et-green.png';
          break;
        case "Information Systems & Technology":
          $scope.event.depticon = 'ist-green.png';
          break;
        case "Technology Management":
          $scope.event.depticon = 'tm-green.png';
          break;
      }
    }


    console.log($scope.event);                //Log the details about to be sent to the server
    var newEvent = eventService.addEvent();   //Create a $resource that points to our API endpoint
    newEvent.save([], $scope.event);          //POST the data in $scope.event to the Cloudant Server
  };

  var deptClicked = false;
  var selectedDept = -1;

  //Hide other department icons after selecting one
  $scope.hideUnselected = function(current) {
    deptClicked = true;
    selectedDept = current;
    $scope.showCancel = true;
  }

  //Add classes to selected and unselected department icons after selecting one
  $scope.getClass = function(current) {
    if(deptClicked) {
      if(current == selectedDept){
        return "selectedDept";
      }else{
        return "unselectedDept";
      }
    }
  }

  //Remove classes and show all icons again
  $scope.deptReset = function() {
    deptClicked = false;
    $scope.showCancel = false;
  }

}])

.controller('forceOrder', function ($scope, eventStartDateService) {
      $scope.event = eventStartDateService.startDateEvent;
      $scope.resetSearch = function(){$scope.search = "";} //clear search bar
});
