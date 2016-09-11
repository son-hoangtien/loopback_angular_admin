/**
 * [description]
 * @param  {[type]} $scope        [description]
 * @param  {[type]} Notification  [description]
 * @param  {[type]} User          [description]
 * @param  {[type]} $rootScope    [description]
 * @param  {[type]} $state        [description]
 * @param  {[type]} $window       [description]
 * @return {[type]}               [description]
 */
pdadmin.controller('AuthCtrl', ['$scope', 'Notification', 'User', '$rootScope', '$state', '$window', function($scope, Notification, User, $rootScope, $state, $window) {
  $rootScope.is_authenticated = User.isAuthenticated();
  $rootScope.username = '' || $window.localStorage.username;
  $scope.user = {
    email: '',
    password: ''
  }
  $scope.logout = function() {
    User.logout(function(data){
      $rootScope.is_authenticated = false;
      Notification.success('Logout Successfully!')
      $state.go('app.login');
    });
  };
  $scope.login = function() {
    User.login($scope.user, function(data){
      $rootScope.is_authenticated = true;
      $rootScope.username = data.user.username;
      $window.localStorage.username = data.user.username;
      Notification.success('Welcome ' + $rootScope.username + ' to Peddler Admin!');
      $state.go('app');
    },
    function(err) {
    });
  };
}]);
