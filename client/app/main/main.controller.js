'use strict';

angular.module('kindleUploadApp')
  .controller('MainCtrl', function($scope, $timeout, $http) {
    $scope.isLoading = false;

    $scope.sendBook = function(form) {
      if (form.$valid) {
        $scope.isLoading = true;
        $http.post('/api/books', { bookUrl: $scope.bookUrl })
          .success(function() {
            Materialize.toast('Book send successfully!', 2000);
            $scope.bookUrl = '';
            $scope.isLoading = false;
          })
          .error(function(err) {
            Materialize.toast('Some error occurred :( Check the logs.', 4000);
            console.log(err);
            $scope.bookUrl = '';
            $scope.isLoading = false;
          });
      }
    };
  });
