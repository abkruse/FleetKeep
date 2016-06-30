(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('ReportFactory', ReportFactory);

    ReportFactory.$inject = ['$http', '$window'];

    function ReportFactory($http, $window) {
      const url = 'http://localhost:3000/';

      return {
        getUser: function() {
          let user = $window.localStorage.getItem('user');
          return user;
        },

        getVehicles: function() {
          return $http.get(url + 'report/vehicles/all').then( (data) => {
            return data.data;
          });
        }
      }
    }

})();
