(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('DashFactory', DashFactory);

    DashFactory.$inject = ['$http'];

    function DashFactory($http) {
      var url = 'http://localhost:3000/';

      return {
      
      }
    }
})();
