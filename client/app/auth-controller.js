/*Auth Controller*/

pdadmin.controller('AuthCtrl', ['$scope', 'Notification', 'User', '$rootScope', '$state',function($scope, Notification, User, $rootScope, $state) {

  $rootScope.is_authenticated = User.isAuthenticated();

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
      Notification.success('Welcome to Peddler Admin!')
      $state.go('app');
    },
    function(err) {
    });
  };

}]);