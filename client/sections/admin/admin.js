var admin = angular.module('admin', [])

admin.controller('adminCtrl', function ($http, adminFunctionality) {
  $scope.addCard = adminFunctionality.addCard();
})

admin.service('adminFunctionality', function ($http) {
  this.addCard = function () {
    // return $http.post('/newCard');
    return console.log("adding card...");
  }
})


