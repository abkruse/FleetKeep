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

      ctrl.pieConfig = {
        options: {
            chart: {
                type: 'pie'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            data: [{
              name: 'Pending',
              y:10
            }, {
              name: 'Reviewed',
              y:35
            }, {
              name: 'Out of Service',
              y:3
            }]
        }],
        title: {
            text: 'Fleet Status'
        },

        loading: false
    }
      //supervisors have analytics!
      //can open reports and edit them
    }
 })();
