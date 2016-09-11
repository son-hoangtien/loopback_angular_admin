/**
 * [description] User Controller
 * @param  {[type]} $scope       [description]
 * @param  {[type]} Notification [description]
 * @param  {[type]} User         [description]
 * @param  {Array}  $uibModal)   [description]
 * @return {[type]}              [description]
 */
pdadmin.controller('UserCtrl', ['$scope', 'Notification', 'User', '$uibModal', function($scope, Notification, User, $uibModal) {
  $scope.users = [];
  $scope.search = {
    by: '',
    page: 1,
    term: '',
    sort: ''
  }
  $scope.limit = 2;
  $scope.total = 0;
  $scope.init = function () {
    // get total users
    User.count(function(total) {
      $scope.total = total.count;
    })
    //get users
    $scope.search();
  }
  $scope.openModal = function() {
    var modalUser = $uibModal.open({
      templateUrl: '../app/partials/user-modal.html',
      controller: 'NewUserCtrl'
    });
    modalUser.result.then(function (newUser) {
      // handle newUser there
      $scope.init();
    });
  };
  $scope.deleteUser = function (index, user) {
    var confirmModal = $uibModal.open({
      templateUrl: '../app/partials/confirm.html',
      controller: 'ConfirmCtrl'
    });
    confirmModal.result.then(function (cfr) {
      if (cfr === 'yes') {
        User.delete(user, function(data) {
          $scope.users.splice(index, 1);
        })
      }
    });
  };
  $scope.editUser = function (index, user) {
    var modalUser = $uibModal.open({
      templateUrl: '../app/partials/user-modal.html',
      controller: 'EditUserCtrl',
      resolve: {
        user: user
      }
    });
    modalUser.result.then(function (user) {
      $scope.users[index] = user;
      Notification.success('Edit successfully!');
    });
  };
  $scope.search = function () {
    var search_filter;
    // init data
    $scope.search.sort = $scope.search.sort || 'ASC';
    if (!$scope.search.by) {
      search_filter = {
        by: 'username',
        page: 1,
        term: ''
      };
    } else {
      search_filter = angular.copy($scope.search);
    }
    var searchTerm = {
      like: search_filter.term
    };
    var where = {};
    if (search_filter.by === 'username') {
      where = {
        username: searchTerm
      }
    }
    if (search_filter.by === 'email') {
      where = {
        email: searchTerm
      }
    }
    var filter = {
      where: where,
      limit: $scope.limit,
      order: search_filter.by + ' ' + $scope.search.sort,
    }
    if ($scope.search.page && $scope.search.page > 1) {
      filter.skip = ($scope.search.page-1) * $scope.limit
    }
    User.find({
      filter: filter
    }, function (data) {
      $scope.users = data;
    });
  };
  $scope.init();
}]);

/**
 * [description] New User Controller
 * @param  {[type]} $scope            [description]
 * @param  {[type]} $uibModalInstance [description]
 * @param  {[type]} User              [description]
 * @param  {Object} Notification      [description]
 * @return {[type]}                   [description]
 */
pdadmin.controller('NewUserCtrl', ['$scope', '$uibModalInstance', 'User', 'Notification', function($scope, $uibModalInstance, User, Notification) {
  $scope.user = {
    username: '',
    email: '',
    password: ''
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.newUser = function () {
    User.create($scope.user, function(user) {
      Notification.success('Created!');
      $uibModalInstance.close(user);
    },
    function (err) {
      Notification.error(err.data.error.message)
    })
  };
}]);

/**
 * [description] Edit User Controller
 * @param  {[type]} $scope            [description]
 * @param  {[type]} $uibModalInstance [description]
 * @param  {[type]} User              [description]
 * @param  {[type]} user              [description]
 * @return {[type]}                   [description]
 */
pdadmin.controller('EditUserCtrl', ['$scope', '$uibModalInstance', 'User', 'user', function ($scope, $uibModalInstance, User, user) {
  $scope.isEdit = true;
  $scope.user = angular.copy(user);
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.editUser = function () {
    $scope.user.$save();
    $uibModalInstance.close($scope.user);
  };
}])
