(function() {
  'use strict';
  angular
    .module('app')
    .controller('HomeCtrl', [
      '$scope',
      '$http',
      '$location',
      'toaster',
      'API_IMAGE_URL',
      'API_VIDEO_URL',
      HomeCtrl
    ]);

  function HomeCtrl(
    $scope,
    $http,
    $location,
    toaster,
    API_IMAGE_URL,
    API_VIDEO_URL
  ) {
    var vm = this;

    vm.form = {
      base64: undefined,
      private: false,
      password: undefined,
      expirationAt: undefined
    };

    vm.file = {
      isImage: false,
      isVideo: false,
      data: undefined,
      start: undefined,
      end: undefined
    };

    vm.isLoading = false;
    vm.currentDate = moment(new Date())
      .add(1, 'days')
      .format('DD/MM/YYYY');

    vm.onInit = function() {
      $('#form-toggle').bootstrapToggle({
        on: 'Privado',
        off: 'Público',
        onstyle: 'info'
      });
      $('#form-toggle').change(function() {
        vm.form.private = $(this).prop('checked');
        $scope.$apply();
      });
    };

    vm.onSubmitImage = function() {
      if (!isValidForm()) {
        return;
      }
      vm.isLoading = true;
      vm.form.base64 = vm.file.data;

      $http
        .post(API_IMAGE_URL, vm.form)
        .then(function(response) {
          vm.isLoading = false;
          showImage(response.data.fileName);
        })
        .catch(function() {
          vm.isLoading = false;
          toaster.pop('error', 'Erro', 'Falha ao realizar o upload.');
        });
    };

    vm.onSubmitVideo = function() {
      var fd = new FormData();
      fd.append('video', vm.file.data);
      fd.append('start', vm.file.start);
      fd.append('end', vm.file.end);

      vm.isLoading = true;

      $http
        .post(API_VIDEO_URL, fd, {
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined }
        })
        .then(function(response) {
          vm.file.data = response.data;
          vm.file.url = response.data;
          vm.file.isImage = true;
          vm.file.isVideo = false;
          vm.isLoading = false;
        })
        .catch(function(error) {
          vm.isLoading = false;
          if (error.status == 413) {
            toaster.pop('error', 'Erro', 'Selecione um arquivo de até 100mb.');
          } else {
            toaster.pop('error', 'Erro', 'Falha ao converter vídeo.');
          }
        });
    };

    function isValidForm() {
      toaster.clear();

      if (!vm.form.expirationAt) {
        toaster.pop('warning', 'Aviso', 'Informe uma data de expiração.');
        return false;
      }
      if (!vm.form.password && vm.form.private) {
        toaster.pop('warning', 'Aviso', 'Informe uma senha.');
        return false;
      }
      return true;
    }

    function showImage(name) {
      $location.path('/file/' + name);
    }
  }
})();
