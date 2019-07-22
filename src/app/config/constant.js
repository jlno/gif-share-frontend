(function() {
  'use strict';

  angular
    .module('app')
    .constant('API_IMAGE_URL', 'http://localhost:8081/image/')
    .constant('API_VIDEO_URL', 'http://localhost:8081/video/converter/');
})();
