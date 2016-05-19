var admin = angular.module('admin', [])

admin.controller('adminCtrl', function ($scope, $http, adminFunctionality) {

  $scope.front;
  $scope.back;

  $scope.addCard = function() {
    console.log('front is: ', $scope.front, ' back is: ', $scope.back);
    if ($scope.front && $scope.back) {
      return adminFunctionality.addCard();
    }
  }
})

admin.factory('adminFunctionality', function($http) {
  return {
    addCard: function() {
      return $http({
        method: 'POST',
        url: '/admin/save'
      }).then(function (res) {
        console.log('got back from the server: ', res);
      })
    }
  }
})

