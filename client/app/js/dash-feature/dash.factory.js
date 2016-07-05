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
              if(damage.status != 'Fixed') {
                toView.push(damage);
              }
            })
            return data.data;
          });
        },

        getStatuses: function(reports) {
          return $http.get(url + 'dash/damages').then( (data) => {
            const known = data.data;
            const returned = [];

            for(var i = 0; i < known.length; i++) {
              for (var j = 0; j < returned.length; j++) {
                console.log(i);
                if(known[i].status === returned[j].name) {
                  returned[j].y ++;
                  i++;
                }
                break;
              }
              console.log('pushing! ' + known[i].status);
              returned.push({'name':known[i].status, 'y':1});
            }
            console.log(returned);
            return returned;
          })
        }
      }
    }
})();
