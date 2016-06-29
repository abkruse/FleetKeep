(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['DashFactory', '$state', '$window'];

    function DashCtrl(DashFactory, $state, $window) {
      let ctrl = this;

      ctrl.logout = function() {
        $window.localStorage.clear();
        $state.go('home');
      }
    }
 })();
