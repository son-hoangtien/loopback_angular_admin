/*User Controller*/

pdadmin.controller('UserCtrl', ['$scope', 'Notification', 'User', function($scope, Notification, User) {
  $scope.is_authenticated =  User.isAuthenticated();

  if (!$scope.is_authenticated)
    User.login({
      email: 'user1@peddler.com',
      password: '123456'
    });

  $scope.users = User.find({
    filter: { limit: 10 }
  });

}]);