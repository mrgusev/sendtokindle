'use strict';

angular
  .module('kindleUploadApp')
  .directive('loader', function() {
    return {
      restrict: 'E',
      templateUrl: 'components/loader/loader.html',
      scope: {
        isLoading: '='
      }
    };
  });
