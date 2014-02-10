"use strict";

angular.module('myApp.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
         templateUrl: 'partials/home.html',
         controller: 'HomeCtrl'
      });

      $routeProvider.when('/game', {
         templateUrl: 'partials/game.html',
         controller: 'GameCtrl'
      });

      $routeProvider.when('/objectives', {
         templateUrl: 'partials/objectives.html',
         controller: 'ObjectivesCtrl'
      });

      $routeProvider.when('/objectives/:objectiveId', {
         templateUrl: 'partials/singleObjective.html',
         controller: 'SingleObjectiveCtrl'
      });

      $routeProvider.when('/main', {
         templateUrl: 'partials/main.html',
         controller: 'MainCtrl'
      });

      $routeProvider.when('/store', {
         templateUrl: 'partials/store.html',
         controller: 'StoreCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'AcctCtrl'
      });

      $routeProvider.when('/signup', {
         templateUrl: 'partials/signup.html',
         controller: 'AcctCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/home'});
   }]);