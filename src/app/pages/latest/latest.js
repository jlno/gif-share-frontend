(function() {
  'use strict';
  angular
    .module('app')
    .controller('LatestCtrl', [
      '$http',
      'toaster',
      'API_IMAGE_URL',
      LatestCtrl
    ]);

  function LatestCtrl($http, toaster, API_IMAGE_URL) {
    var vm = this;

    vm.dataSource = [];

    vm.onInit = function() {
      $http
        .get(API_IMAGE_URL)
        .then(function(response) {
          createColumns(response.data);
        })
        .catch(function() {
          toaster.pop('error', 'Erro', 'Falha ao carregar imagens.');
        });
    };

    function createColumns(data) {
      while (data.length > 0) {
        vm.dataSource.push(data.splice(0, 1));
      }
    }
  }
})();
