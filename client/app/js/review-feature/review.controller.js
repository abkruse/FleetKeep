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

      ctrl.logout = function() {
        $window.localStorage.clear();
        $state.go('home');
      }

      ctrl.report = ReviewFactory.getDamage(damageId);

      ctrl.updateStatus = function(review) {
        // let damRep = this.report.$$state.value;

        ReviewFactory.updateStatus(ctrl.user, damageId, review).then( (data)=> {
          $state.go('dash');
        });
      }

      // ctrl.markFixed = function() {
      //   let damRep = this.report.$$state.value;
      //
      //   ReviewFactory.markFixed(ctrl.user, damageId, damRep).then( (data)=> {
      //     $state.go('dash');
      //   })
      // }
      //
      // ctrl.toShop = function() {
      //   let damRep = this.report.$$state.value;
      //
      //   ReviewFactory.toShop(ctrl.user, damageId, damRep).then( (data)=> {
      //     $state.go('dash');
      //   })
      // }
    }
})();
