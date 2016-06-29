(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'LoginFactory', '$window'];

    function LoginCtrl($state, LoginFactory, $window) {
      var ctrl = this;

      ctrl.login = function(user) {
        LoginFactory.login(user).then( () => {
          $state.go('dash');
        }).catch( (err) => {
          console.log(err);
        });
      }
      ctrl.addUser = function(user) {
        LoginFactory.addUser(user).then( () => {
          $state.go('dash')
        }).catch( (err) => {
          console.log(err);
        });
      }
    }
})();
