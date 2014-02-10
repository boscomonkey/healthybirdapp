
angular.module('myApp.service.login', [])

   .factory('loginService', ['$rootScope', '$timeout',
      function($rootScope, profileCreator, $timeout) {
         var auth = null;
         return {
            init: function() {
               
            },

            /**
             * @param {string} email
             * @param {string} pass
             * @param {Function} [callback]
             * @returns {*}
             */
             
            facebookLogin: function(callback) {
                assertAuth();
                auth.$login('facebook', {
                  rememberMe: true,
                  scope: 'email,user_likes'
                }).then(function(user) {
                     if( callback ) {
                        //todo-bug https://github.com/firebase/angularFire/issues/199
                        $timeout(function() {
                           callback(null, user);
                        });
                     }
                  }, callback);
            }, 
             
            twitterLogin: function(callback) {
                assertAuth();
                auth.$login('twitter', {
                  rememberMe: true
                }).then(function(user) {
                     if( callback ) {
                        //todo-bug https://github.com/firebase/angularFire/issues/199
                        $timeout(function() {
                           callback(null, user);
                        });
                     }
                  }, callback);
            }, 
             
            login: function(email, pass, callback) {
               assertAuth();
               auth.$login('password', {
                  email: email,
                  password: pass,
                  rememberMe: true
               }).then(function(user) {
                     if( callback ) {
                        //todo-bug https://github.com/firebase/angularFire/issues/199
                        $timeout(function() {
                           callback(null, user);
                        });
                     }
                  }, callback);
            },

            logout: function() {
               assertAuth();
               auth.$logout();
            },

            changePassword: function(opts) {
               assertAuth();
               var cb = opts.callback || function() {};
               if( !opts.oldpass || !opts.newpass ) {
                  $timeout(function(){ cb('Please enter a password'); });
               }
               else if( opts.newpass !== opts.confirm ) {
                  $timeout(function() { cb('Passwords do not match'); });
               }
               else {
                  auth.$changePassword(opts.email, opts.oldpass, opts.newpass).then(function() { cb && cb(null) }, cb);
               }
            },

            createAccount: function(email, pass, name, callback) {
                console.log("auth assert");
               assertAuth();
                console.log("auth create user");
               auth.$createUser(email, pass).then(function(user) { 
                   console.log("call callback");
                   callback && callback(null, user) 
               }, callback);
            },

            createProfile: profileCreator
         };

         function assertAuth() {
            if( auth === null ) { throw new Error('Must call loginService.init() before using its methods'); }
         }
      }])
