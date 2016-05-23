var review = angular.module('review', ['admin']);

review.controller('reviewCtrl', function ($scope, adminFunctionality) {

  // global variables, yuck
  $scope.cards;
  $scope.currentIndex = 0;
  $scope.currentCard;
  $scope.seenAllZeroes = false;
  $scope.seenAllWithinTime = false;
  $scope.hideAnswer = true;
  $scope.stillReviewing = false;

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
      $scope.currentCard = $scope.cards[$scope.currentIndex];
      return $scope.chooseNextCard();
    })
  };

  $scope.showBack = function () {
    return $scope.hideAnswer = false;
  }

  // only show cards that have elapsed enough time, based on bin
  $scope.timeToShow = function () {
    timeDifference = new Date($scope.currentCard['next']) - new Date();
    return timeDifference <= 0;
  };

  // calculate next time to show, based on bin
  $scope.calculateNext = function () {
    return $scope.currentCard['next'] = new Date( new Date() + $scope.binTimes[$scope.currentCard['bin']]);
  }

  // "Level Up" a card / update the card based on answer 
  $scope.updateCard = function (gotItRight) {
    // user got it right
    if (gotItRight) {
      $scope.currentCard['bin']++;
      $scope.currentCard['right']++;
    } else {
    // use got it wrong
      $scope.currentCard['bin'] = 1;
      $scope.currentCard['wrong']++; 
    }
    $scope.calculateNext();
    $scope.chooseNextCard();
  };

  // play the game;
  $scope.findNextZero = function () {
    // 'iterate' through the deck until we find a zero bin card
    console.log('currentIndex is: ', $scope.currentIndex)
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
    $scope.hideAnswer = true;
    console.log($scope.currentCard);
    if ($scope.seenAllZeroes === false) {
      $scope.findNextZero();
    } else if ($scope.seenAllZeroes === true && $scope.seenAllWithinTime === false) {
      $scope.findNextWhateverCard();
    } else if ($scope.seenAllZeroes === true && $scope.seenAllWithinTime === true) {
      $scope.stillReviewing = true;
    }
  };

  // get the cards from database
  $scope.$on('$viewContentLoaded', function(){
    $scope.fetchCards();
  });

})
