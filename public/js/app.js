'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp',
      ['myApp.config', 'myApp.routes', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']
   )

   .run(['$rootScope', function($rootScope) {
        Parse.initialize("Bc8tvGVjvftLcoFIQSOFYOXDF0UmBMqn30odXc73", "uKZ8VXyjv8XroseUHY3zdtqhcYUUP9qT9nQXPGqb");
       
   }]);
