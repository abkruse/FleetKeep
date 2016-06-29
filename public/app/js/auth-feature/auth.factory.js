(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor.$inject = ['$window', '$location', '$q'];

    function AuthInterceptor($window, $location, $q) {
      return {
        request: function(config) {
          config.headers['X-Requested-With'] = 'XMLHttpRequest';
          var token = $window.localStorage.getItem('token');
          if(token) {
            config.headers.Authorization = 'Bearer ' + token;
          }
          return $q.resolve(config);
        },
        responseError: function(err) {
          if(err.data === 'invalid token' || err.data === 'invalid signature' || err.data === 'jwt malformed') {
            $location.path('/logout');
            return $q.reject(err);
          }
          if(err.status === 401) {
            $location.path('/members');
            return $q.reject(err);
          }
          return $q.reject(err);
        }
      }
    }

})();
