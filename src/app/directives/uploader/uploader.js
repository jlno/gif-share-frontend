(function() {
  'use strict';

  angular
    .module('app.uploader', [])
    .controller('UploaderCtrl', ['$scope', UploaderCtrl])
    .directive('uploader', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/directives/uploader/uploader.html',
        scope: {
          data: '=',
          ngDisabled: '='
        },
        controllerAs: 'vm',
        controller: 'UploaderCtrl'
      };
    });

  function UploaderCtrl($scope) {
    var vm = this;

    vm.file;
    vm.slider = {
      minValue: 0,
      maxValue: 15,
      options: {
        floor: 0,
        ceil: 0,
        step: 1,
        minRange: 0,
        maxRange: 15,
        pushRange: true
      }
    };

    vm.onInit = function() {
      $scope.$watch('data', function(value) {
        if (value.data) {
          vm.file = value;
        }
      });

      $scope.$watch('vm.slider.minValue', function(value) {
        var video = document.getElementById('video');
        video.currentTime = value;

        if (vm.file) {
          vm.file.start = vm.slider.minValue;
          vm.file.end = vm.slider.maxValue;
        }
      });

      $scope.$watch('vm.slider.maxValue', function(value) {
        if (vm.file) {
          vm.file.start = vm.slider.minValue;
          vm.file.end = vm.slider.maxValue;
        }
      });

      $('.image-upload-wrap').bind('dragover', function() {
        $('.image-upload-wrap').addClass('image-dropping');
      });

      $('.image-upload-wrap').bind('dragleave', function() {
        $('.image-upload-wrap').removeClass('image-dropping');
      });
    };

    vm.openDialog = function() {
      $('.file-upload-input').trigger('click');
    };

    vm.readURL = function(input) {
      if (input.files && input.files[0]) {
        var file = input.files[0];
        var _isImage = isImage(file.type);
        var _isVideo = isVideo(file.type);

        if (_isImage) {
          var reader = new FileReader();

          reader.onloadend = function() {
            vm.file = {
              url: URL.createObjectURL(file),
              data: reader.result,
              isImage: _isImage,
              isVideo: _isVideo
            };
            $scope.data = vm.file;
            $scope.$apply();
          };
          reader.readAsDataURL(file);
        } else if (_isVideo) {
          vm.file = {
            url: URL.createObjectURL(file),
            data: file,
            isImage: _isImage,
            isVideo: _isVideo,
            start: 0,
            end: 15
          };
          $scope.data = vm.file;
          $scope.$apply();
        }
      }
    };

    vm.watchVideo = function() {
      var video = document.getElementById('video');

      video.addEventListener('loadedmetadata', function() {
        var duration = Math.round(video.duration);

        vm.slider.options.ceil = duration;
        vm.slider.minValue = 0;

        if (duration < 15) {
          vm.slider.maxValue = duration;
        } else {
          vm.slider.maxValue = 15;
        }
        $scope.$apply();
        video.play();
      });

      video.addEventListener('ended', function() {
        video.play();
      });

      video.addEventListener('play', function() {
        var $this = this;

        (function loop() {
          if (!$this.paused && !$this.ended) {
            if ($this.currentTime >= vm.slider.maxValue) {
              $this.currentTime = vm.slider.minValue;
            }
            setTimeout(loop, 1000 / 30);
          }
        })();
      });
    };
  }

  function isImage(type) {
    return type === 'image/gif';
  }

  function isVideo(type) {
    return type === 'video/mp4';
  }
})();
