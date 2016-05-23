var review = angular.module('review', ['admin']);

review.controller('reviewCtrl', function ($scope, adminFunctionality) {

  $scope.cards;
  $scope.currentCard;
  $scope.currentIndex = 0;
  $scope.seenAllZeroes = false;
  $scope.seenAllWithinTime = false;

  $scope.fetchCards = function() {
    adminFunctionality.fetchCards()
    .then(function (cards) {
      return $scope.cards = cards;
    })
    .then(function () {
      // sort the deck by bin
      $scope.cards.sort(function (a,b) {
        return b.bin - a.bin;
      });
      return;
    })
  }

  // helper functions
  $scope.goThroughDeck = function (callback) {
    for (var i = 0; i < $scope.cards.length; i++) {
      var currentCard = $scope.cards[i];
      callback(currentCard);
    }
  }

  // only show cards that have elapsed enough time, based on bin
  $scope.timeToShow = function (card) {
    timeDifference = new Date(card['next']) - new Date();
    return timeDifference <= 0;
  }

  // play the game;
  $scope.findNextZero = function () {
    // 'iterate' through the deck until we find a zero bin card
    while ($scope.currentIndex < $scope.cards.length) {
      if (currentCard['bin'] === 0) {
        $scope.currentCard = currentCard;
        return $scope.currentIndex++;
      }
      $scope.currentIndex++;
    }
    // upon reaching the end, we no longer explicitely look for zero bin cards
    return $scope.seenAllZeroes = true;
  }

  $scope.chooseWhateverCard = function () {
    // 'iterate' through the deck until we find a zero bin card
    while ($scope.currentIndex < $scope.cards.length) {
      // show cards that are within the time frame

      
    }
  }



  // find next card  
  $scope.chooseNextCard = function() {
    // 'iterate' through the deck until we find the appropriate card
    while ($scope.currentIndex < $scope.cards.length) {
      var currentCard = $scope.cards[$scope.currentIndex];
      // first, we use zero bin cards
      if ($scope.seenAllZeroes === false) {
        if (currentCard['bin'] === 0) {
          // we choose the next card, then stop looking
          $scope.currentCard = currentCard;
          return $scope.currentIndex++;
        }
      } else {
      // now that we have used all zero bin cards ...
      // show cards that are within the time frame
        if (timeToShow(currentCard)) {
          $scope.currentCard = currentCard;
          return $scope.currentIndex++;
        }
      }
      $scope.currentIndex++;
    }
    // after iterating through the list
    if ($scope.seenAllZeroes === false) {
      // so we don't have the 'choose zeros first' rule anymore
      $scope.seenAllZeroes = true;
    } else {

    }
    return;
  }

  // // review controller
  // $scope.reviewTime = function() {
  //   console.log('inside game');

    // 1. sort the deck by bin
    // $scope.cards.sort(function (a,b) {
    //   return b.bin - a.bin;
    // });

  //   // 2. review all the zero bin cards
  //   $scope.goThroughDeck(function (card) {
  //     if (card['bin'] === 0 && $scope.checkTime(card)) {
  //       // show the card
  //       $scope.reviewCard(card);
  //     }
  //   });
  // }

  // get the cards from database
  $scope.$on('$viewContentLoaded', function(){
    $scope.fetchCards();
  });

})
