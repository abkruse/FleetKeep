(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('ConfirmCtrl', ConfirmCtrl);

    ConfirmCtrl.$inject = ['ConfirmFactory', '$stateParams'];

    function ConfirmCtrl(ConfirmFactory, $stateParams) {
      let ctrl = this;
      ctrl.reportID = $stateParams.id;

      var cnvs = document.getElementById('sign-here');

      var signPad = new SignaturePad(cnvs, {
        dotSize: .3,
        minWidth: 1,
        maxWidth: 2,
        penColor: 'black'
      });

      ctrl.clearSign = function() {
        signPad.clear();
      }

      ctrl.user = ConfirmFactory.getUser();

      ctrl.reported = ConfirmFactory.getReport(ctrl.reportID).then( (data)=> {
        return data;
      });

      ctrl.signature = function() {
        var cnvs = document.getElementById('sign-here');
        var signPad = new SignaturePad(cnvs, {
          minWidth: 5,
          maxWidth: 10,
          penColor: 'black'
        });
      }
    }
})();
