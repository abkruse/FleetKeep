(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('ConfirmFactory', ConfirmFactory);

    ConfirmFactory.$inject = ['$http', '$window'];

    function ConfirmFactory ($http, $window) {
      // const url = 'http://localhost:3000/'
      const url = 'https://fleetkeep.herokuapp.com/';

      return {
        getUser: function() {
          const user = $window.localStorage.getItem('user');
          const id = parseInt(user);

          return $http.get(url + 'users/' + id).then( (data) => {
            return data.data[0];
          })
        },

        getReport: function(id) {
          return $http.get(url + 'report/' + id).then( (data) => {
            return data.data[0];
          });
        },

        getCompany: function(id) {
          return $http.get(url + 'users/company/' + id).then( (data) => {
            return data.data[0];
          })
        }
      }
    }
})();
