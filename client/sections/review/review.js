var review = angular.module('review', ['admin']);

review.controller('reviewCtrl', function ($scope, adminFunctionality) {

  // global variables, yuck
  $scope.cards;
  $scope.currentCard;
  $scope.currentIndex = 0;
  $scope.seenAllZeroes = false;
  $scope.seenAllWithinTime = false;

  // time based on bin
  $scope.binTimes = {
    '1': 5,
    '2': 25,
    '3': 120,
    '4': 600,
    '5': 3600,
    '6': 18000,
    '7': 86400,
    '8': 432000,
    '9': 2160000,
    '10': 10540800
  };

  // get cards from database
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
  };

  // only show cards that have elapsed enough time, based on bin
  $scope.timeToShow = function (card) {
    timeDifference = new Date(card['next']) - new Date();
    return timeDifference <= 0;
  };

  // calculate next time to show, based on bin
  $scope.calculateNext = function (card) {
    return new Date( new Date() + $scope.binTimes[card['bin']]);
  }

  // "Level Up" a card / update the card based on answer 
  $scope.updateCard = function (card, gotItRight) {
    // user got it right
    if (gotItRight) {
      card['bin']++;
      card['right']++;
    } else {
    // use got it wrong
      card['bin'] = 1;
      card['wrong']++; 
    }
    return $scope.calculateNext(card);
  };

  // play the game;
  $scope.findNextZero = function () {
    // 'iterate' through the deck until we find a zero bin card
    while ($scope.currentIndex < $scope.cards.length) {
      var currentCard = $scope.cards[$scope.currentIndex];
      if (currentCard['bin'] === 0) {
        $scope.currentCard = currentCard;
        return $scope.currentIndex++;
      }
      $scope.currentIndex++;
    }
    // start over
    $scope.currentIndex = 0;
    // upon reaching the end, we no longer explicitely look for zero bin cards
    return $scope.seenAllZeroes = true;
  };

  $scope.findNextWhateverCard = function () {
    // 'iterate' through the deck until we find a card within time bound
    while ($scope.currentIndex < $scope.cards.length) {
      var currentCard = $scope.cards[$scope.currentIndex];
      if ($scope.timeToShow($scope.currentCard)) {
        $scope.currentCard = currentCard;
        return $scope.currentIndex++;
      }
      $scope.currentIndex++;
    }
     // start over
     $scope.currentIndex = 0;
     // upon reaching the end, we will say we have seen all within time
     return $scope.seenAllWithinTime = true;   
  };

  // find next card  
  $scope.chooseNextCard = function() {
    if ($scope.seenAllZeroes === false) {
      $scope.findNextZero();
    } else if ($scope.seenAllZeroes === true && $scope.seenAllWithinTime === false) {
      $scope.findNextWhateverCard();
    } else if ($scope.seenAllZeroes === true && $scope.seenAllWithinTime === true) {
      console.log('all done!');
    }
  };

  // get the cards from database
  $scope.$on('$viewContentLoaded', function(){
    $scope.fetchCards();
  });

})
