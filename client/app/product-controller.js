/**
 * [description] Product Controller
 * @param  {[type]} $scope       [description]
 * @param  {[type]} Notification [description]
 * @param  {[type]} Product      [description]
 * @param  {Array}  $uibModal    [description]
 * @return {[type]}              [description]
 */
pdadmin.controller('ProductCtrl', ['$scope', 'Notification', 'Product', '$uibModal', function($scope, Notification, Product, $uibModal) {
  $scope.products = [];
  $scope.search = {
    by: '',
    page: 1,
    term: '',
    sort: ''
  }
  $scope.limit = 2;
  $scope.total = 0;
  $scope.init = function () {
    // get total products
    Product.count(function(total) {
      $scope.total = total.count;
    })
    //get products
    $scope.search();
  }
  $scope.openModal = function() {
    var modalProduct = $uibModal.open({
      templateUrl: '../app/partials/product-modal.html',
      controller: 'NewProductCtrl'
    });
    modalProduct.result.then(function (newProduct) {
      // handle newProduct there
      $scope.init();
    });
  };
  $scope.deleteProduct = function (index, product) {
    var confirmModal = $uibModal.open({
      templateUrl: '../app/partials/confirm.html',
      controller: 'ConfirmCtrl'
    });
    confirmModal.result.then(function (cfr) {
      if (cfr === 'yes') {
        Product.delete(product, function(data) {
          $scope.products.splice(index, 1);
        })
      }
    });
  };
  $scope.editProduct = function (index, product) {
    var modalProduct = $uibModal.open({
      templateUrl: '../app/partials/product-modal.html',
      controller: 'EditProductCtrl',
      resolve: {
        product: product
      }
    });
    modalProduct.result.then(function (product) {
      $scope.products[index] = product;
      Notification.success('Edit successfully!');
    });
  };
  $scope.search = function () {
    var search_filter;
    // init data
    $scope.search.sort = $scope.search.sort || 'ASC';
    if (!$scope.search.by) {
      search_filter = {
        by: 'name',
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
    if (search_filter.by === 'name') {
      where = {
        name: searchTerm
      }
    }
    if (search_filter.by === 'price') {
      where = {
        price: searchTerm
      }
    }
    if (search_filter.by === 'status') {
      where = {
        status: searchTerm
      }
    }
    if (search_filter.by === 'madein') {
      where = {
        madein: searchTerm
      }
    }
    var filter = {
      where: where,
      limit: $scope.limit,
      order: 'name ' + $scope.search.sort,
    }
    if ($scope.search.page && $scope.search.page > 1) {
      filter.skip = ($scope.search.page-1) * $scope.limit
    }
    Product.find({
      filter: filter
    }, function (data) {
      $scope.products = data;
    });
  };
  $scope.init();
}]);

/**
 * [description] New Product Controller
 * @param  {[type]} $scope            [description]
 * @param  {[type]} $uibModalInstance [description]
 * @param  {[type]} Product           [description]
 * @param  {Object} Notification)     [description]
 * @return {[type]}                   [description]
 */
pdadmin.controller('NewProductCtrl', ['$scope', '$uibModalInstance', 'Product', 'Notification', function($scope, $uibModalInstance, Product, Notification) {
  $scope.product = {
    name: '',
    price: '',
    description: '',
    madein: '',
    status: ''
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.newProduct = function () {
    Product.create($scope.product, function(product) {
      Notification.success('Created!');
      $uibModalInstance.close(product);
    },
    function (err) {
      Notification.error('Something wrong!')
    })
  };
}]);

/**
 * [description] Edit Product Controller
 * @param  {[type]} $scope            [description]
 * @param  {[type]} $uibModalInstance [description]
 * @param  {[type]} Product           [description]
 * @param  {[type]} product           [description]
 * @return {[type]}                   [description]
 */
pdadmin.controller('EditProductCtrl', ['$scope', '$uibModalInstance', 'Product', 'product', function ($scope, $uibModalInstance, Product, product) {
  $scope.isEdit = true;
  $scope.product = angular.copy(product);
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.editProduct = function () {
    $scope.product.$save();
    $uibModalInstance.close($scope.product);
  };
}])
