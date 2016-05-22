var review = angular.module('review', ['admin']);

review.controller('reviewCtrl', function ($scope, adminFunctionality) {

  $scope.cards;

  $scope.fetchCards = function() {
    adminFunctionality.fetchCards()
    .then(function (cards) {
      return $scope.cards = cards;
    })
  }

  $scope.$on('$viewContentLoaded', function(){
    $scope.fetchCards();
  });

})
