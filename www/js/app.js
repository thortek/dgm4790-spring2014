// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCookies', 'starter.services', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  //Define access from routingConfig.js
  var access = routingConfig.accessLevels;

  $stateProvider
    // setup a login state
    .state('anon', {
      abstract: true,
      template: "<nav-view/>",
      data : {
        access: access.anon
      }
    })

    .state('anon.login', {
      url: "/login/",
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('anon.register', {
      url: '/register/',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    });

    $stateProvider
      .state('user', {
        abstract: true,
        template: '<nav-view/>'
      })
      .state('user.home', {
        url: '/',
        templateUrl: 'templates/dean-home.html',
        controller:'userCtrl'
      })
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login/');

  // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
  $urlRouterProvider.rule(function($injector, $location) {
        if($location.protocol() === 'file')
            return;

        var path = $location.path()
        // Note: misnomer. This returns a query object, not a search string
            , search = $location.search()
            , params
            ;

        // check to see if the path already ends in '/'
        if (path[path.length - 1] === '/') {
            return;
        }

        // If there was no search string / query params, return with a `/`
        if (Object.keys(search).length === 0) {
            return path + '/';
        }

        // Otherwise build the search string and return a `/?` prefix
        params = [];
        angular.forEach(search, function(v, k){
            params.push(k + '=' + v);
        });
        return path + '/?' + params.join('&');
    });

});

//Run this off the bat to determine state and act accordingly
// .run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {

//     $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
//         if (!Auth.authorize(toState.data.access)) {
//             $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
//             event.preventDefault();
            
//             if(fromState.url === '^') {
//                 if(Auth.isLoggedIn())
//                     $state.go('user.home');
//                 else {
//                     $rootScope.error = null;
//                     $state.go('anon.login');
//                 }
//             }
//         }
//     });

// }])


