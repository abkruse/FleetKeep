(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('ReviewCtrl', ReviewCtrl);

    ReviewCtrl.$inject = ['ReviewFactory', '$stateParams', '$state'];

    function ReviewCtrl(ReviewFactory, $stateParams, $state) {
      var ctrl = this;
      var damageId = $stateParams.id;

      ctrl.user = ReviewFactory.getUser();

      ctrl.logout = function() {
        $window.localStorage.clear();
        $state.go('home');
      }

      ReviewFactory.getDamage(damageId).then( function(data) {
        ctrl.report = data[0];
      });

      ctrl.updateStatus = function(review) {
        ReviewFactory.updateStatus(ctrl.user, damageId, review).then( function(data) {
          $state.go('dash');
        });
      }
    }
})();
