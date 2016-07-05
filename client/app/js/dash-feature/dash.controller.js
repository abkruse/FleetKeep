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

      // ctrl.lineConfig = {
      //   options: {
      //     chart: {
      //       type: 'line',
      //       events: {
      //         load: function(event) {
      //           console.log(this);
      //         }
      //       }
      //     }
      //   },
      //   tooltip: {
      //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      //   },
      //   yAxis: {
      //     title: {
      //       text: 'Trucks'
      //     },
      //     plotLines: [{
      //       value: 0,
      //       width: 1,
      //       color: '#808080'
      //     }]
      //   },
      //   xAxis: {
      //     categories: []
      //   },
      //   plotOptions: {
      //
      //   },
      //   data: {
      //     complete: function(options) {
      //       DashFactory.getLines().then( (data) => {
      //         data.forEach(function(data) {
      //           ctrl.lineConfig.series[0].data.push(data);
      //         })
      //       })
      //     }()
      //   },
      //   series: {
      //
      //   },
      //   title: {
      //     text: 'Fleet Health Past 30 Days'
      //   }
      // }

      ctrl.pieConfig = {
        options: {
            chart: {
                type: 'pie',
                events: {
                  load: function(event) {
                    console.log('Pie done');
                  }
                }
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

        data: {
          complete: function(options) {
            DashFactory.getPie().then( (data) => {
              data.forEach(function(data) {
                ctrl.pieConfig.series[0].data.push(data);
              })
            })
          }()
        },

        series: [{
          type: 'pie',
          name: 'Trucks',
          data: []
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
