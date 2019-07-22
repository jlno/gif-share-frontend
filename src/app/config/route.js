(function() {
  'use strict';

  angular.module('app').config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.hashPrefix('');
      $routeProvider
        .when('/', { redirectTo: '/home' })
        .when('/home', {
          templateUrl: 'app/pages/home/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        })
        .when('/file/:filename', {
          templateUrl: 'app/pages/file/file.html',
          controller: 'FileCtrl',
          controllerAs: 'vm'
        })
        .when('/latest', {
          templateUrl: 'app/pages/latest/latest.html',
          controller: 'LatestCtrl',
          controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/home' });
    }
  ]);
})();
