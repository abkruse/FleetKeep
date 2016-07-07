(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('DashFactory', DashFactory);

    DashFactory.$inject = ['$http', '$window'];

    function DashFactory($http, $window) {
      var url = 'https://fleetkeep.herokuapp.com/';

      return {
        getUser: function() {
          var user = $window.localStorage.getItem('user');
          return user;
        },

        getLatestDamages: function() {
          return $http.get(url + 'dash/damages').then( function(data) {
            return data.data;
          });
        },

        getPie: function() {
          return $http.get(url + 'dash/damages').then( function(data) {
            var known = data.data;
            var returned = { 'Pending': 0, 'Reviewed':0, 'Out of Service': 0};
            var statuses = [];
            var j = 0;

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

        // getLines: function() {
        //   return $http.get(url + 'dash/damages').then( (data) => {
        //     const known = data.data;
        //     const returned = [{'name': 'Reviewed', data: []}, {'name': 'Pending', data: []}, {'name': 'Out of Service', data: []}];
        //
        //
        //     console.log(known);
        //   });
        // },

        getBars: function() {
          return $http.get(url + 'dash/damages').then( function(data) {
            var reported = data.data;
            var driverTally = { '1':0, '2':0, '3':0, '4':0 };
            var n = 0;
            var returned = [];
            var requests = [];

            reported.forEach(function(reports) {

              requests.push($http.get(url + 'dash/vehicles/' + reports.truck_id).then( function(data) {
                var truckReports = data.data;
                var diffs = []

                for(var k = 0; k < Object.keys(truckReports).length; k++) {

                  var _MS_PER_DAY = 1000 * 60 * 60 * 24;
                  var a = new Date(reports.created_at);
                  var b = new Date(truckReports[k].created_at);

                  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

                  var maths = Math.floor((utc2 - utc1));
                  diffs.push(maths);
                }
                var sorted = diffs.sort();
                sorted.reverse();

                var num = diffs.indexOf(sorted[0]);
                var driver = truckReports[num].driver_id;

                driverTally[driver] += 1;
              }));
            });

            return Promise.all(requests).then( function() {
              returned = Object.keys(driverTally).map(key => {
                return driverTally[key];
              });
              return returned;
            })
          });
        }
      }
    }
})();
