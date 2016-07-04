(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('ReviewFactory', ReviewFactory);

    ReviewFactory.$inject = ['$http', '$window'];

    function ReviewFactory($http, $window) {
      const url = 'http://localhost:3000/';

      return{
        getUser: function() {
          let user = $window.localStorage.getItem('user');
          return user;
        },

        getDamage: function(id) {
          return $http.get(url + 'report/damages/' + id).then( (data)=> {
            console.log(data.data);
            return data.data;
          })
        },

        updateStatus: function(user, id, damRep) {
          const now = new Date();
          damRep.status = 'Reviewed';
          damRep.sup_Id = parseInt(user);
          damRep.review_time = now;

          console.log(damRep);

          return $http.put(url + 'report/damages/' + id + '/update', damRep).then( (data)=> {
            console.log(data.data);
            return data;
          });
        }
      }

    }

})();
