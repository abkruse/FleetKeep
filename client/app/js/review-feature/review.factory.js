(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('ReviewFactory', ReviewFactory);

    ReviewFactory.$inject = ['$http', '$window'];

    function ReviewFactory($http, $window) {
      var url = 'https://fleetkeep.herokuapp.com/';
      // var url = 'http://localhost:3000/';

      return{
        getUser: function() {
          var user = $window.localStorage.getItem('user');
          return user;
        },

        getDamage: function(id) {
          console.log(id);
          return $http.get(url + 'damages/' + id + '/review').then( function(data) {
            return data.data;
          })
        },

        updateStatus: function(user, id, review) {
          let now = new Date();
          review.sup_Id = parseInt(user);
          review.review_time = now;

          return $http.put(url + 'report/damages/' + id + '/update', review).then( function(data) {
            return data;
          });
        }
      }

    }

})();
