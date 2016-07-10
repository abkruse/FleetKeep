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
          return $http.get(url + 'report/damages/' + id + '/review').then( function(data) {
            return data;
          })
        },

        updateStatus: function(user, id, review) {
          var now = new Date();
          review.sup_Id = parseInt(user);
          review.review_time = now;

          return $http.put(url + 'report/damages/' + id + '/update', review).then( function(data) {
            return data;
          });
        }
      }

    }

})();
