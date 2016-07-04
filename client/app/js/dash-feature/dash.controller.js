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
        reports.forEach(function(report) {
          if(report.status === null) {
            report.status = 'Pending';
          }
        });
        ctrl.reports = reports;
      }).catch((err) => {
        console.log(err);
      });

      ctrl.viewReports = function(id) {
        console.log(id);
      }
      //drivers can see last 5 trips
      //drivers can see help video on inspection
      //print forms?

      //supervisors have analytics!
      //can see all recently reported damage, filtered by date in a table
      //can open reports and edit them
      //can set status of report
    }
 })();
