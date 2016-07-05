(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('DashFactory', DashFactory);

    DashFactory.$inject = ['$http', '$window'];

    function DashFactory($http, $window) {
      var url = 'http://localhost:3000/';

      return {
        getUser: function() {
          let user = $window.localStorage.getItem('user');
          return user;
        },

        getLatestDamages: function() {
          return $http.get(url + 'dash/damages').then( (data)=> {
            let toView = [];
            let damages = data.data;
            damages.forEach(function(damage) {
              if(damage.status != 'Fixed' && damage.status != 'Out of Service') {
                toView.push(damage);
              }
            })
            return toView;
          });
        },

        getPie: function() {
          return $http.get(url + 'dash/damages').then( (data) => {
            const known = data.data;
            const returned = { 'Pending': 0, 'Reviewed':0, 'Out of Service': 0};
            let statuses = [];
            let j = 0;

            for (var i = 0; i < known.length; i++) {
              returned[known[i].status] += 1;
            }

            for (var key in returned) {
              if (Object.prototype.hasOwnProperty.call(returned, key)) {
                var val = returned[key];
                statuses.push({'name': Object.keys(returned)[j], 'y': val});
                j++;
              }
            }
            return statuses;
          });
        },

        getLines: function() {
          return $http.get(url + 'dash/damages').then( (data) => {
            const known = data.data;
            const returned = [{'name': 'Reviewed', data: []}, {'name': 'Pending', data: []}, {'name': 'Out of Service', data: []}];


            console.log(known);
          });
        },

        getBars: function() {
          //bar chart of last drivers of a truck before damage is reported
        }
      }
    }
})();
