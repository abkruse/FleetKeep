(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('ConfirmCtrl', ConfirmCtrl);

    ConfirmCtrl.$inject = ['ConfirmFactory', '$stateParams', '$state'];

    function ConfirmCtrl(ConfirmFactory, $stateParams, $state) {
      var ctrl = this;
      ctrl.reportID = $stateParams.id;

      ctrl.logout = function() {
        $window.localStorage.clear();
        $state.go('home');
      }

      ConfirmFactory.getUser().then( function(data) {
        ctrl.getCompany(data.company_id);
        ctrl.user = data;
      });

      ctrl.getCompany = function(id) {
        ConfirmFactory.getCompany(id).then( function(data) {
          ctrl.company = data;
        }).catch( function(err) {
          console.log(err);
        });
      }

      ConfirmFactory.getReport(ctrl.reportID).then( function(data) {
        ctrl.reported = data;
      });

      var cnvs = document.getElementById('sign-here');

      var signPad = new SignaturePad(cnvs, {
        backgroundColor: 'rgb(255,255,255)',
        dotSize: .3,
        minWidth: 1,
        maxWidth: 2,
        penColor: 'black'
      });

      ctrl.clearSign = function() {
        signPad.clear();
      }

      ctrl.signature = function() {
        var cnvs = document.getElementById('sign-here');
        var signPad = new SignaturePad(cnvs, {
          minWidth: 5,
          maxWidth: 10,
          penColor: 'black'
        });
      }

      ctrl.confirm = function() {
        var signature = signPad.toDataURL('image/jpeg');

        ConfirmFactory.confirm(signature, ctrl.reportID).then(function (data) {
          $state.go('driver');
        });
      }

      ctrl.print = function() {
        var toPrint = document.getElementById('confirm-body');
        html2canvas(toPrint, {
          onrendered: function(canvas) {
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF();
            doc.addImage(img, 'JPEG', 20, 20);
            doc.autoPrint();
            window.open(doc.output('bloburl'), '_blank');
          }
        })
      }
    }
})();
