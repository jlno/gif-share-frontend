(function() {
  'use strict';
  angular
    .module('app')
    .controller('PublicCtrl', [
      '$http',
      'toaster',
      'API_IMAGE_URL',
      PublicCtrl
    ]);

  function PublicCtrl($http, toaster, API_IMAGE_URL) {
    var vm = this;

    vm.dataSource = [];

    vm.onInit = function() {
      $http
        .get(API_IMAGE_URL + '/public')
        .then(function(response) {
          vm.dataSource = response.data;
        })
        .catch(function() {
          toaster.pop('error', 'Erro', 'Falha ao carregar imagens.');
        });
    };
  }
})();
