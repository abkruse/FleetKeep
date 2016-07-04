(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('ReviewCtrl', ReviewCtrl);

    ReviewCtrl.$inject = ['ReviewFactory', '$stateParams', '$state'];

    function ReviewCtrl(ReviewFactory, $stateParams, $state) {
      let ctrl = this;
      let damageId = $stateParams.id;

      ctrl.user = ReviewFactory.getUser();

      ctrl.report = ReviewFactory.getDamage(damageId);

      ctrl.updateStatus = function() {
        let damRep = this.report.$$state.value;

        ReviewFactory.updateStatus(ctrl.user, damageId, damRep).then( (data)=> {
          $state.go('dash');
        });
      }

      ctrl.markFixed = function() {
        let damRep = this.report.$$state.value;

        ReviewFactory.markFixed(ctrl.user, damageId, damRep).then( (data)=> {
          $state.go('dash');
        })
      }
    }
})();
