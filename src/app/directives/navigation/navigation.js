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
          vm.goToHome();
          break;
        case '/latest':
          vm.goToLatest();
          break;
      }
    };

    vm.goToHome = function() {
      vm.onHome = true;
      vm.onLatest = false;
    };

    vm.goToLatest = function() {
      vm.onHome = false;
      vm.onLatest = true;
    };
  }
})();
