(function() {
  'use strict';

  angular
    .module('fleetkeep', ['ui.router'])
    .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl as ctrl',
        })
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl as ctrl',
        })
        .state('report', {
          url: '/report',
          templateUrl: 'views/report.html',
          controller: 'ReportCtrl as ctrl'
        })
        .state('dash', {
          url: '/dash',
          templateUrl: 'views/dash.html',
          controller: 'DashCtrl as ctrl'
        });
        $locationProvider.html5Mode(true);
    }
})();
