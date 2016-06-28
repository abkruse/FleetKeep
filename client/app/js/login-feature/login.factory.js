(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('LoginFactory', LoginFactory);

    LoginFactory.$inject = ['$http', '$window'];

    function LoginFactory($http, $window) {
      var url = 'http://localhost:3000';

      return {
        createCurrentUser: function(user, token) {
          $window.localStorage.setItem('user', user);
          $window.localStorage.setItem('token', token);
        },

        login: function(user) {
          return $http.post('/login',  user).then( (data) => {
            const user = data.data.data.data.id;
            const token = data.data.data.token
            createCurrentUser(user, token);
          })
        },

        addUser: function(user) {
          console.log(user);
          return $http.post(url + 'users/signup', user).then( (data) => {
            console.log(data);
            // const user = data.data.data.data.id
            // const token = data.data.data.token;
            // createCurrentUser(user, token);
          })
        }
      }
    }
})();
