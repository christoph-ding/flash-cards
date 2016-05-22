var review = angular.module('review', ['admin']);

review.controller('reviewCtrl', function ($scope, adminFunctionality) {

  $scope.cards;
  $scope.currentCard;

  $scope.fetchCards = function() {
    adminFunctionality.fetchCards()
    .then(function (cards) {
      return $scope.cards = cards;
    })
    .then(function () {
      return $scope.reviewTime();
    })
  }

  // helper functions
  $scope.goThroughDeck = function (callback) {
    for (var i = 0; i < $scope.cards.length; i++) {
      var currentCard = $scope.cards[i];
      callback(currentCard);
    }
  }

  $scope.reviewCard = function (card) {
    // change card
    $scope.currentCard = card;

  }


  // only show cards that have elapsed enough time, based on bin
  $scope.checkTime = function (card) {
    timeDifference = new Date(card['next']) - new Date();
    return timeDifference <= 0;
  }

  // review controller
  $scope.reviewTime = function() {
    console.log('inside game');

    // 1. sort the deck by bin
    $scope.cards.sort(function (a,b) {
      return b.bin - a.bin;
    })
    console.log('sorted deck is: ', $scope.cards);
    // 2. review all the zero bin cards

    $scope.goThroughDeck(function (card) {
      console.log($scope.checkTime(card));            
      if (card['bin'] === 0 && $scope.checkTime(card)) {
        // show the card
      }
    });
  }


  // get the cards from database
  $scope.$on('$viewContentLoaded', function(){
    $scope.fetchCards();
  });

})
