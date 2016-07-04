(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('ReviewCtrl', ReviewCtrl);

    ReviewCtrl.$inject = ['ReviewFactory', '$stateParams'];

    function ReviewCtrl(ReviewFactory, $stateParams) {
      let ctrl = this;
      let damageId = $stateParams.id;

      ctrl.user = ReviewFactory.getUser();

      ctrl.report = ReviewFactory.getDamage(damageId);

      ctrl.updateStatus = function() {
        let damRep = this.report.$$state.value;

        ReviewFactory.updateStatus(ctrl.user, damageId, damRep).then( (data)=> {
          console.log(data);
        })
      }
    }
})();
