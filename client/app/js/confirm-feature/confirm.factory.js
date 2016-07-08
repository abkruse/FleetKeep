(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('ConfirmFactory', ConfirmFactory);

    ConfirmFactory.$inject = ['$http', '$window'];

    function ConfirmFactory ($http, $window) {
      // var url = 'http://localhost:3000/'
      var url = 'https://fleetkeep.herokuapp.com/';

      return {
        getUser: function() {
          var user = $window.localStorage.getItem('user');
          var id = parseInt(user);

          return $http.get(url + 'users/' + id).then( function(data) {
            return data.data[0];
          })
        },

        getReport: function(id) {
          return $http.get(url + 'report/' + id).then( function(data) {
            return data.data[0];
          });
        },

        getCompany: function(id) {
          return $http.get(url + 'users/company/' + id).then( function(data) {
            return data.data[0];
          })
        },

        confirm: function(signature, id) {
          return $http.post(url + 'report/confirm/' + id, { signature:signature }).then( function(data) {
            return data;
          });
        }
      }
    }
})();
