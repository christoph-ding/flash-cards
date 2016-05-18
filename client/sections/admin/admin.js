var admin = angular.module('admin', [])

admin.controller('adminCtrl', function ($scope, $http, adminFunctionality) {
  $scope.addCard = function() {
    return adminFunctionality.addCard();
  }
})

admin.factory('adminFunctionality', function($http) {
  return {
    addCard: function() {
      console.log('heya');
    }
  }
})

