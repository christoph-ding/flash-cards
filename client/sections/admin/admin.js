var admin = angular.module('admin', []);

admin.controller('adminCtrl', function ($scope, $http, adminFunctionality) {

  $scope.front;
  $scope.back;
  $scope.cards;

  $scope.addCard = function(card) {
    // validation if we can add the card;
    if ($scope.front && $scope.back) {

      var newCard = {};
      newCard.front = $scope.front;
      newCard.back = $scope.back;
      newCard.bin = 0;
      newCard.next = new Date();
      newCard.right = 0;
      newCard.wrong = 0;

      console.log('card is: ', newCard);

      return adminFunctionality.addCard(newCard);
    }
  }

  $scope.fetchCards = function() {
    adminFunctionality.fetchCards()
    .then(function (cards) {
      return $scope.cards = cards;
    })
  }
})

admin.factory('adminFunctionality', function ($http) {
    var addCard = function(card) {
      return $http({
        method: 'POST',
        url: '/admin/save',
        data: card
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

