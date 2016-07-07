(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('LoginFactory', LoginFactory);

    LoginFactory.$inject = ['$http', '$window'];

    function LoginFactory($http, $window) {
      // var url = 'http://localhost:3000/users/'
      var url = 'https://fleetkeep.herokuapp.com/users/';

      return {
        createCurrentUser: function(user, token) {
          $window.localStorage.setItem('user', user);
          $window.localStorage.setItem('token', token);
        },

        login: function(user) {
          return $http.post(url + 'login',  user).then( function(data) {
            return data;
          })
        },

        addUser: function(user) {
          return $http.post(url + 'signup', user).then( function(data) {
            return data;
          });
        }
      }
    }
})();
