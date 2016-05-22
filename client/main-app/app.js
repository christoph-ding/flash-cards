var app = angular.module('app', ['admin', 'review','ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/signin');

  $stateProvider
    // Sign in
    .state('signin', {
      url: '/signin',
      templateUrl: '../sections/sign-in/signin.html'
    })
    .state('review', {
      url: '/review',
      templateUrl: '../sections/review/review.html',
      controller: 'reviewCtrl'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: '../sections/admin/admin.html',
      controller: 'adminCtrl'
    })
})
