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

      ctrl.logout = function() {
        $window.localStorage.clear();
        $state.go('home');
      }

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
          var cnvs = document.getElementById('canvas');
          var ctx = cnvs.getContext('2d');
          var imgObj = new Image();

          imgObj.onload = function() {
            ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height, 0, 0, cnvs.width, cnvs.height);

          }
          imgObj.src = img;
        }).then( ()=> {
          this.getDamage(truck_id);
        }).catch( (err)=> {
          console.log(err);
        });
      }

      ctrl.getDamage = function(call) {
        ReportFactory.getTruckDamage(call).then( (data)=> {
          let marks = data;

          ctrl.prevDam = marks;
          this.addDamageMarks(marks);
        }).catch( (err) => {
          console.log(err);
        })
      }

      ctrl.addDamageMarks = function(marks) {
        var cnvs = document.getElementById('canvas');
        var ctx = cnvs.getContext('2d');

        for(var k = 0; k < marks.length; k++) {
          var centerX = marks[k].x_coor;
          var centerY = marks[k].y_coor;
          var radius = 20;

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
          ctx.lineWidth = 5;
          ctx.strokeStyle = '#FFA500';
          ctx.stroke();
        }
      }

      ctrl.markDamage = function(e) {
        ctrl.x_coor = e.offsetX;
        ctrl.y_coor = e.offsetY;

        var cnvs = document.getElementById('canvas');
        var ctx = cnvs.getContext('2d');

        var centerX = e.offsetX;
        var centerY = e.offsetY;
        var radius = 20;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#FFA500';
        ctx.stroke();
      }

      ctrl.damageReport = function(damage) {
        damage.truck_id = ctrl.truckID;
        damage.driver_id = parseInt(ctrl.user);
        damage.x_coor = ctrl.x_coor;
        damage.y_coor = ctrl.y_coor;
        damage.status = 'Pending';

        ctrl.updateDamages(angular.copy(damage));
        var desc = document.getElementById('desc');
        desc.value = '';
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
        });
      }
    }

})();
