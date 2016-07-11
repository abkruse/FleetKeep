(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('ReviewCtrl', ReviewCtrl);

    ReviewCtrl.$inject = ['ReviewFactory', '$stateParams', '$state'];

    function ReviewCtrl(ReviewFactory, $stateParams, $state) {
      var ctrl = this;
      var damageId = $stateParams.id;

      ctrl.user = ReviewFactory.getUser();

      ctrl.logout = function() {
        $window.localStorage.clear();
        $state.go('home');
      }

      ReviewFactory.getDamage(damageId).then( function(data) {
        ctrl.report = data[0];

        ctrl.drawTruck(ctrl.report.body);
      });

      ctrl.drawTruck = function(body) {
        var img = 'images/' + body + '.jpg';
        var cnvs = document.getElementById('rev-canvas');
        var ctx = cnvs.getContext('2d');
        var imgObj = new Image();

        imgObj.onload = function() {
          ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height, 0, 0, cnvs.width, cnvs.height);
          ctrl.drawDamage();
        }
        imgObj.src = img;
      }

      ctrl.drawDamage = function() {
        var cnvs = document.getElementById('rev-canvas');
        var ctx = cnvs.getContext('2d');
        var centerX = ctrl.report.x_coor;
        var centerY = ctrl.report.y_coor;
        var radius = 20;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#FFA500';
        ctx.stroke();
      }

      ctrl.updateStatus = function(review) {
        ReviewFactory.updateStatus(ctrl.user, damageId, review).then( function(data) {
          $state.go('dash');
        });
      }
    }
})();
