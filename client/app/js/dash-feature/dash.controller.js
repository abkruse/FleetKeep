(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['DashFactory', '$state', '$window'];

    function DashCtrl(DashFactory, $state, $window) {
      let ctrl = this;

      ctrl.user = DashFactory.getUser();

      ctrl.logout = function() {
        $window.localStorage.clear();
        $state.go('home');
      }

      DashFactory.getLatestDamages().then( (reports)=> {
        console.log(reports);
        ctrl.reports = reports;
      }).catch((err) => {
        console.log(err);
      });

      //drivers can see last 5 trips
      //drivers can see help video on inspection
      //print forms?

      //supervisors have analytics!
      //can see all recently reported damage, filtered by date in a table
      //can open reports and edit them
      //can set status of report

    }
 })();
