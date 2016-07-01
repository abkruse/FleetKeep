(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('ReportCtrl', ReportCtrl);

    ReportCtrl.$inject= ['ReportFactory', '$state'];

    function ReportCtrl(ReportFactory, $state) {
      let ctrl = this;

      ctrl.user = ReportFactory.getUser();
      ctrl.damages = [];

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

      ctrl.markDamage = function(e) {
        ctrl.x_coor = e.offsetX;
        ctrl.y_coor = e.offsetY;
      }

      ctrl.damageReport = function(damage) {
        damage.truck_id = ctrl.truckID;
        damage.driver_id = parseInt(ctrl.user);
        damage.x_coor = ctrl.x_coor;
        damage.y_coor = ctrl.y_coor;

        ctrl.updateDamages(angular.copy(damage));
      }

      ctrl.updateDamages = function(damage) {
        ctrl.damages.push(damage);
      }

      ctrl.submitReport = function(report) {
        if(ctrl.damages.length === 0) {
          report.damage_bool = false;
        } else {
          report.damage_bool = true;
        }

        ReportFactory.submitReport(report, ctrl.user, ctrl.damages).then( (data) => {
          $state.go('dash');
        }).catch((err)=> {
          console.log(err);
        })
      }
    }

})();
