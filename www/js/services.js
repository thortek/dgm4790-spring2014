angular.module('starter.services', ['ngResource'])
    /**
     * A simple example service that returns some data.
     */
    

    .factory('loginService', function() {

    })

    .factory('Auth', function($http, $cookieStore){

        var accessLevels = routingConfig.accessLevels
            , userRoles = routingConfig.userRoles
            , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

        $cookieStore.remove('user');

        function changeUser(user) {
            _.extend(currentUser, user);
        };

        return {
            authorize: function(accessLevel, role) {
                if(role === undefined)
                    role = currentUser.role;

                return accessLevel.bitMask & role.bitMask;
            },
            isLoggedIn: function(user) {
                if(user === undefined)
                    user = currentUser;
                return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
            },
            register: function(user, success, error) {
                $http.post('/register', user).success(function(res) {
                    changeUser(res);
                    success();
                }).error(error);
            },
            login: function(user, success, error) {
                $http.post('/login', user).success(function(user){
                    changeUser(user);
                    success(user);
                }).error(error);
            },
            logout: function(success, error) {
                $http.post('/logout').success(function(){
                    changeUser({
                        username: '',
                        role: userRoles.public
                    });
                    success();
                }).error(error);
            },
            accessLevels: accessLevels,
            userRoles: userRoles,
            user: currentUser
        };
    })

    .factory('Users', function($http) {
        return {
            getAll: function(success, error) {
                $http.get('/users').success(success).error(error);
            }
        };
    })
    .factory('tempDataService', function($http,$q){
        return{
            GetData: function(){
                //We want to return a promised object.
                //The reason for this is, we don't know WHEN it will return, but we know it will evenetually.
                //Read more here: http://docs.angularjs.org/api/ng/service/$q

                //First lets create our defered object.        
                var tempDataDeferred = $q.defer();

                $http.get('data/tempData.json').success(function(data) {
                    tempDataDeferred.resolve(data);
                });

                return tempDataDeferred.promise;
            }
        }
    })
    .factory('eventService', function($resource) {
        // Resource that points directly to all events
        return {
            getEvents : function() {
                return $resource('http://uvutest.learningcomponents.com/api/events', {});
            },
            addEvent :  function() {
                return $resource('http://uvutest.learningcomponents.com/api/addevent');
            }

        };
    });
