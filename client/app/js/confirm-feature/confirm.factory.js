(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('ConfirmFactory', ConfirmFactory);

    ConfirmFactory.$inject = ['$http', '$window'];

    function ConfirmFactory ($http, $window) {
      const url = 'http://localhost:3000/'
      // const url = 'https://fleetkeep.herokuapp.com/';

      return {
        getUser: function() {
          let user = $window.localStorage.getItem('user');
          return user;
        },

        getReport: function(id) {
          return $http.get(url + 'report/' + id).then( (data) => {
            console.log(data.data[0]);
            return data.data[0];
          });
        }
      }
    }
})();
