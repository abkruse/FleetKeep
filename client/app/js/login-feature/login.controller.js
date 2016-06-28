(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'LoginFactory'];

    function LoginCtrl($state, LoginFactory) {
      var ctrl = this;

      ctrl.login = function(user) {
        LoginFactory.login(user).then( () => {
          $state.go('home');
        }).catch( (err) => {
          console.log(err);
        });
      }
      ctrl.addUser = function(user) {
        LoginFactory.addUser(user).then( () => {
          $state.go('home')
        }).catch( (err) => {
          console.log(err);
        })
      }
    }
})();
