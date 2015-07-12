'use strict';

angular.module('kindleUploadApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.sendBook = function() {
      $http.post('/api/books', {bookUrl: $scope.bookUrl}).success(function() {
        console.log('Book uploaded');
        $scope.bookUrl = '';
      });
    };
  });
