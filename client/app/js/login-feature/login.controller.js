(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'LoginFactory', '$window'];

    function LoginCtrl($state, LoginFactory, $window) {
      var ctrl = this;

      ctrl.login = function(user) {
        LoginFactory.login(user).then( function(data) {
          var user = data.data.user.id;
          var token = data.data.token;

          LoginFactory.createCurrentUser(user, token);

          $state.go('dash');
        }).catch( function(err) {
          console.log(err);
        });
      }
      ctrl.addUser = function(user) {
        LoginFactory.addUser(user).then( function(data) {
          var user = data.data.user.id
          var token = data.data.token

          LoginFactory.createCurrentUser(user, token);

          $state.go('dash')
        }).catch( function(err) {
          console.log(err);
        });
      }
    }
})();
