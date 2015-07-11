'use strict';

angular.module('kindleUploadApp')
  .controller('SettingsCtrl', function($scope, User, Auth) {
    $scope.errors = {};
    $scope.user = angular.copy(Auth.getCurrentUser());

    $scope.updateUser = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        User
          .update({
            name: $scope.user.name,
            kindleEmail: $scope.user.kindleEmail
          }).$promise
          .then(function() {
            $scope.message = 'Profile was updated successfully.'
          })
          .catch(function() {
            form.kindleEmail.$setValidity('mongoose', false);
            $scope.errors.other = 'Invalid name or email';
            $scope.message = '';
          });
      }
    };
  });
