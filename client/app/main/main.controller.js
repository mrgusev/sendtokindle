'use strict';

angular.module('kindleUploadApp')
  .controller('MainCtrl', function($scope, $timeout, $http, Auth, User) {
    $scope.isLoading = false;


   Auth.getCurrentUser().$promise.then(function(user){
     $scope.user = user;
     if (!$scope.user.isAccountSetup) {
        $('#demoModal').openModal({
          complete: confirmAccountSetup
        });
      }
    });

    function confirmAccountSetup() {
      User.update({
        isAccountSetup: true
      });
    }

    $scope.sendBook = function(form) {
      if (form.$valid) {
        $scope.isLoading = true;
        $http.post('/api/books', { bookUrl: $scope.bookUrl })
          .success(function() {
            Materialize.toast('Book sent successfully!', 2000);
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
