/*jslint browser: true*/
/*global angular*/
'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('HomeCtrl', ['$scope', '$location', function($scope, $location) {       
        $scope.signupToday = function() {
            $location.path('/signup');  
            if(!$scope.$$phase) $scope.$apply(); 
        }
    }])

    .controller('SingleObjectiveCtrl', ['$scope', '$rootScope', '$routeParams', '$location', function($scope, $rootScope, $routeParams, $location) {
        $scope.user = Parse.User.current();
        var exercises = [ 
            {objective:"Go run in place for 1 min! 20 points",points:20},  
            {objective:"Go do 12 jumping jacks! 15 points",points:15}
        ];
        
        var foods = [ 
            {objective:"Eat edamame from Whole Foods! 5 points",points:5},  
            {objective:"Get a Chicken Salad from applebees! 20 points",points:20}
        ];
        
        if($routeParams.objectiveId == "excercise-more") {
            var ex = Math.floor(Math.random() * exercises.length + 1) - 1;
            var curEx = exercises[ex];
            $scope.objectiveName = "Excercise!";
            $scope.objective = curEx.objective;
            $scope.points = curEx.points;
        }
        else if($routeParams.objectiveId == "eat-healthy") {
            var ex = Math.floor(Math.random() * exercises.length + 1) - 1;
            var curFood = foods[ex];
            $scope.objective = curFood.objective;
            $scope.points = curFood.points;
        }
        
        $scope.completeTask = function() {
            var points = parseInt(Parse.User.current().get("points"));
            points += $scope.points;
            Parse.User.current().set("points", points);
            Parse.User.current().save(null, {
              success: function(user) {
                $location.path("/objectives");
                if(!$scope.$$phase) $scope.$apply();
              }
            });
        }
    }])

    .controller('ObjectivesCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $location) {
        $scope.user = Parse.User.current();
        
    }])

    .controller('MainCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $location) {
        $scope.user = Parse.User.current();
        
    }])

    .controller('StoreCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $location) {
        $scope.user = Parse.User.current();
        
    }])

    .controller('AcctCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
        
        $scope.createAccount = function() {
            $scope.err = null;
            if( assertValidLoginAttempt() ) {
                // create parse account
                var user = new Parse.User();
                user.set("username", $scope.username);
                user.set("password", $scope.pass);
                user.set("points", 0);
                
                user.signUp(null, {
                  success: function(user) {
                    $location.path('/main');
                    if(!$scope.$$phase) $scope.$apply(); 
                  },
                  error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    $scope.err = "Error: " + error.message;
                  }
                });
            }
        };
        
        
        $scope.login = function(cb) {
            $scope.err = null;
            if( assertValidLoginAttempt() ) {
                Parse.User.logIn($scope.username, $scope.pass, {
                  success: function(user) {
                    // Do stuff after successful login.
                    $rootScope.user = user;
                    $location.path('/main');
                    if(!$scope.$$phase) $scope.$apply(); 
                  },
                  error: function(user, error) {
                    // The login failed. Check error to see why.
                    $scope.err = "Error: " + error.message;
                  }
                });
             }
        };
        
        function assertValidLoginAttempt(isSigningUp) {
            if( !$scope.username ) {
                $scope.err = 'Please enter an email address';
            }
            else if( !$scope.pass ) {
                $scope.err = 'Please enter a password';
            }
            return !$scope.err;
        }
    }])