var app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/signin');

  $stateProvider
    // Sign in
    .state('signin', {
      url: '/signin',
      template: 'sign in'
    })
    .state('quiz', {
      url: '/quiz',
      template: 'quiz'
    })
    .state('admin', {
      url: '/admin',
      template: 'admin'
    })
})
