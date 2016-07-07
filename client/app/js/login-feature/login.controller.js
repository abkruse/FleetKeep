(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'LoginFactory', '$window'];

    function LoginCtrl($state, LoginFactory, $window) {
      var ctrl = this;

      ctrl.login = function(user) {
        LoginFactory.login(user).then( function() {
          $state.go('dash');
        }).catch( function(err) {
          console.log(err);
        });
      }
      ctrl.addUser = function(user) {
        LoginFactory.addUser(user).then( function() {
          $state.go('dash')
        }).catch( function(err) {
          console.log(err);
        });
      }
    }
})();
