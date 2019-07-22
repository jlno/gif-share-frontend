(function() {
  'use strict';
  angular
    .module('app')
    .controller('FileCtrl', [
      '$scope',
      '$routeParams',
      '$http',
      'toaster',
      'API_IMAGE_URL',
      FileCtrl
    ]);

  function FileCtrl($scope, $routeParams, $http, toaster, API_IMAGE_URL) {
    var vm = this;

    vm.imagePassword;
    vm.imageUrl;
    vm.isExpired;
    vm.isPrivate;

    vm.onInit = function() {
      if ($routeParams.filename) {
        $http
          .get(API_IMAGE_URL + $routeParams.filename)
          .then(function(response) {
            var currentDate = new Date();
            var expirationAt = new Date(response.data.expirationAt);

            vm.imageUrl = response.data.url;

            if (response.data.private) {
              vm.isPrivate = true;
            } else if (currentDate > expirationAt) {
              vm.isExpired = true;
            }
          })
          .catch(function() {
            toaster.pop('error', 'Erro', 'Falha ao carregar a imagem.');
          });
      }
    };

    vm.loadPrivateImage = function() {
      if (!isValidPassword()) {
        return;
      }
      fetch(vm.imageUrl, { headers: { password: vm.imagePassword } })
        .then(function(response) {
          if (response.status == 401) {
            toaster.pop('error', 'Erro', 'Senha incorreta.');
          } else if (response.status == 410) {
            vm.isExpired = true;
          } else {
            return response.blob();
          }
        })
        .then(function(blob) {
          if (blob) {
            vm.imageUrl = URL.createObjectURL(blob);
            vm.isPrivate = false;
          }
          $scope.$apply();
        });
    };

    function isValidPassword() {
      toaster.clear();

      if (!vm.imagePassword) {
        toaster.pop('warning', 'Aviso', 'Campo senha obrigatório.');
        return false;
      }
      return true;
    }
  }
})();
