(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['DashFactory', '$state', '$window'];

    function DashCtrl(DashFactory, $state, $window) {
      var ctrl = this;
      var modal = document.getElementById('driverModal');

      ctrl.user = DashFactory.getUser();

      ctrl.logout = function() {
        $window.localStorage.clear();
        $state.go('home');
      }

      ctrl.help = function() {
        modal.style.display = "block";
      }

      $window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
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
            text: 'Damage Report Statuses'
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
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '*Vehicles were reported damaged after used by these drivers',
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
          data: [],
          name: 'Drivers'
        }],
        title: {
          text: 'Drivers Responsible for Damage'
        },
        loading: false
      }
    }
 })();
