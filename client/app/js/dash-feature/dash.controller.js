(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['DashFactory', '$state', '$window'];

    function DashCtrl(DashFactory, $state, $window) {
      var ctrl = this;

      ctrl.user = DashFactory.getUser();

      ctrl.logout = function() {
        $window.localStorage.clear();
        $state.go('home');
      }

      DashFactory.getLatestDamages().then( function(reports) {
        var working = [];
        var all = [];
        var out = [];

        reports.forEach(function(report) {
          if(report.status === null) {
            report.status = 'Pending';
            all.push(report);
            working.push(report)
          } else if (report.status != 'Fixed' && report.status != 'Out of Service') {
            all.push(report);
            working.push(report);
          } else if (report.status === 'Out of Service') {
            out.push(report);
            all.push(report);
          } else {
            all.push(report);
          }
        });
        ctrl.out = out;
        ctrl.all = all;
        ctrl.reports = working;
      }).catch( function(err) {
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
            DashFactory.getPie().then( function(data) {
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

      ctrl.barConfig = {
        options: {
          chart: {
            type: 'bar',
            events: {
              load: function(event) {
                console.log('bar');
              }
            }
          }
        },
        xAxis: {
          categories: ['Newyork', 'Brady', 'Willis', 'Jones'],
          title: {
            text: 'Driver IDs'
          },
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Damages reported after use',
            align: 'high'
          },
          label: {
            overflow: 'justify'
          }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        data: {
          complete: function(options) {
            DashFactory.getBars().then( function(data) {
              data.forEach(function(data) {
                ctrl.barConfig.series[0].data.push(data);
              })
            })
          }()
        },
        series: [{
          data: []
        }],
        title: {
          text: 'Drivers Responsible for Damage'
        },
        loading: false
      }
    }
 })();
