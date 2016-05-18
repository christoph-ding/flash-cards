var app = angular.module('app', ['admin', 'ui.router']);

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
      templateUrl: '../sections/review/review.html'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: '../sections/admin/admin.html',
      controller: 'adminCtrl'
    })
})
