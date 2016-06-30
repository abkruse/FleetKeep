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
          var canvas = document.getElementById('canvas');
          var context = canvas.getContext('2d');
          var imgObj = new Image();

          imgObj.onload = function() {
            context.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height, 0, 0, canvas.width, canvas.height);
          }
          imgObj.src = img;
        }).catch( (err)=> {
          console.log(err);
        });
      }

      ctrl.markDamage = function(e, truck_id) {
        console.log(e.offsetX);
        console.log(e.offsetY);
        console.log(truck_id);
      }
    }

})();
