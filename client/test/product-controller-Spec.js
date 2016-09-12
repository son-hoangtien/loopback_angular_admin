describe('ProductCtrl', function() {
  var scope, $controller, ctrl, $scope;

  beforeEach(angular.mock.module('pdadmin'));

  beforeEach(inject(function(_$controller_, $rootScope) {
    // init
    $controller = _$controller_;
    scope = $rootScope.$new();
    ctrl = $controller('ProductCtrl', { $scope: scope });
    $scope = scope;

    // fake data and spy
    var products = [
      {
        "name":"product 1",
        "price":"100",
        "description":"product 1",
        "madein":"vietnam",
        "status":"in stock",
        "id":"57d3d6d0a824ca28ca212d6e"
      },
      {
        "name":"product 2",
        "price":"200",
        "description":"product 2",
        "madein":"usa",
        "status":"out stock",
        "id":"57d3d6d0a824ca28ca212d6e"
      }
    ];

    // Spy and force the return value when $scope.init() is called
    spyOn($scope, 'init').and.callFake(function() {});
    spyOn($scope, 'openModal').and.callFake(function() {});

  }));

  // Verify our controller exists
  it('should be defined', function() {
    expect(ctrl).toBeDefined();
  });

  it('should start with products, searchParams, limit and total populated', function() {
    var _searchParams = {
      by: '',
      page: 1,
      term: '',
      sort: 'ASC'
    };
    expect($scope.products).toEqual([]);
    expect($scope.searchParams).toEqual(_searchParams);
    expect($scope.limit).toEqual(10);
    expect($scope.total).toEqual(0);
  });

  it('should call init function succesfully', function() {
    $scope.init();
    expect($scope.init).toHaveBeenCalled();
  });

  it('should call openModal function succesfully', function() {
    $scope.openModal();
    expect($scope.openModal).toHaveBeenCalled();
  });

});