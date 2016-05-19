var admin = angular.module('admin', [])

admin.controller('adminCtrl', function ($scope, $http, adminFunctionality) {

  $scope.front;
  $scope.back;
  $scope.cards;

  $scope.addCard = function() {
    console.log('front is: ', $scope.front, ' back is: ', $scope.back);
    if ($scope.front && $scope.back) {
      return adminFunctionality.addCard();
    }
  }

  $scope.fetchCards = function() {
    adminFunctionality.fetchCards()
    .then(function (cards) {
      return $scope.cards = cards;
    })
  }
})

admin.factory('adminFunctionality', function($http) {
    var addCard = function() {
      return $http({
        method: 'POST',
        url: '/admin/save'
      }).then(function (res) {
        console.log('got back from the server: ', res);
      })
    }
    var fetchCards = function() {
      return $http({
        method: 'GET',
        url: '/admin/fetch'
      }).then(function (res) {
        return res.data;
      })
    }
    return {
      addCard: addCard,
      fetchCards: fetchCards
    }  
})

