(function() {
  'use strict';

  angular
    .module('app.navigation', [])
    .controller('NavigationCtrl', ['$location', NavigationCtrl])
    .directive('navigation', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/directives/navigation/navigation.html',
        controllerAs: 'vm',
        controller: 'NavigationCtrl'
      };
    });

  function NavigationCtrl($location) {
    var vm = this;

    vm.onInit = function() {
      switch ($location.path()) {
        case '/home':
          vm.activateHomeLink();
          break;
        case '/public':
          vm.activatePublicLink();
          break;
      }
    };

    vm.activateHomeLink = function() {
      vm.onHome = true;
      vm.onLatest = false;
    };

    vm.activatePublicLink = function() {
      vm.onHome = false;
      vm.onLatest = true;
    };
  }
})();
