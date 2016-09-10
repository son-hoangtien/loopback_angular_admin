var pdadmin = angular.module('pdadmin', [
  'ngResource',
  'ui.router',
  'ui-notification',
  'lbServices',
  'ui.bootstrap'
]);

pdadmin.config(['LoopBackResourceProvider', function(LoopBackResourceProvider) {
  // Use a custom auth header instead of the default 'Authorization'
  LoopBackResourceProvider.setAuthHeader('X-Access-Token');
  // Change the URL where to access the LoopBack REST API server
  LoopBackResourceProvider.setUrlBase('http://0.0.0.0:3000/api');

}]);

pdadmin.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');

  // Set up the states
  $stateProvider
    .state('app', {
      url: '/',
      templateUrl: '../app/partials/home.html',
      title: 'Peddler Admin',
      controller: 'AuthCtrl'
    })
    .state('app.user', {
      url: 'user',
      title: 'Peddler Admin - User',
      templateUrl: '../app/partials/user.html',
      authenticate: true,
      controller: 'UserCtrl'
    })
    .state('app.product', {
      url: 'product',
      title: 'Peddler Admin - Product',
      authenticate: true,
      templateUrl: '../app/partials/product.html',
      controller: 'ProductCtrl'
    })
    .state('app.login', {
      url: 'login',
      title: 'Peddler Admin - Login',
      templateUrl: '../app/partials/login.html'
    })
    .state('app.logout', {
      url: 'logout',
      title: 'Peddler Admin - LogOut'
    })

}]);

pdadmin.run(['$http', '$rootScope', '$state', 'User', function ($http, $rootScope, $state, User) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    $rootScope.$state = $state; // dynamic page title
    if (toState.authenticate && !User.isAuthenticated()){
      $state.transitionTo('app.login');
      event.preventDefault();
    }
  });
}]);