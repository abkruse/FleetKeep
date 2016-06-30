(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('ReportCtrl', ReportCtrl);

    ReportCtrl.$inject= ['ReportFactory'];

    function ReportCtrl(ReportFactory) {
      let ctrl = this;

      ctrl.user = ReportFactory.getUser();

      ReportFactory.getVehicles().then( (data) => {
        ctrl.allVehicles = data;
      })

    }

})();
