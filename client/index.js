var pdadmin = angular.module('pdadmin', [
  'ngResource',
  'ui.router',
  'ui-notification',
  'lbServices'
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
      templateUrl: '../app/partials/home.html',
      title: 'Peddler Admin',
      abstract: true,
      controller: 'AuthCtrl'
    })
    .state('app.user', {
      url: '/user',
      title: 'Peddler Admin - User',
      templateUrl: '../app/partials/user.html',
      controller: 'UserCtrl'
    })
    .state('app.product', {
      url: '/product',
      title: 'Peddler Admin - Product',
      templateUrl: '../app/partials/product.html',
    })
    .state('app.login', {
      url: '/login',
      title: 'Peddler Admin - Login',
      templateUrl: '../app/partials/login.html',
    })

}]);

pdadmin.run(['$http', '$rootScope', '$state', function ($http, $rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    $rootScope.$state = $state; // dynamic page title
  });
}]);