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
            // let toView = [];
            // let damages = data.data;
            // damages.forEach(function(damage) {
            //   if(damage.status != 'Fixed') {
            //     toView.push(damage);
            //   }
            // })
            return data.data;
          });
        }
      }
    }
})();
