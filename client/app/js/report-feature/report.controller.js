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

      ctrl.begin = function(truck_id) {
        ctrl.truckID = truck_id;

        ReportFactory.getTruckImage(truck_id).then( (data)=> {
          const body = data.data.body;
          return body;
        }).then( (body) => {
          let img ='images/' + body + '.jpg';
          ctrl.vehicleImg = img;
        }).catch( (err)=> {
          console.log(err);
        });
      }

      // ctrl.draw = function() {
      //   CanvasFactory.getCanvas( (data) => {
      //     data.src = ctrl.vehicleImg;
      //   })
      // }

      // ctrl.getDamage = function(ctrl.truckID) {
      //   console.log(truckId);
      // }
    }

})();
