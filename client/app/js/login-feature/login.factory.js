(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('LoginFactory', LoginFactory);

    LoginFactory.$inject = ['$http', '$window'];

    function LoginFactory($http, $window) {
      var url = 'http://localhost:3000/users/';

      return {
        createCurrentUser: function(user, token) {
          $window.localStorage.setItem('user', user);
          $window.localStorage.setItem('token', token);
        },

        login: function(user) {
          return $http.post(url + 'login',  user).then( (data) => {
            const user = data.data.user.id
            const token = data.data.token
            this.createCurrentUser(user, token);
          })
        },

        addUser: function(user) {
          return $http.post(url + 'signup', user).then( (data) => {
            const user = data.data.user.id
            const token = data.data.token
            this.createCurrentUser(user, token);
          })
        }
      }
    }
})();
