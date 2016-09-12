describe('UserCtrl', function() {
  var scope, $controller, ctrl, $scope;

  beforeEach(angular.mock.module('pdadmin'));

  beforeEach(inject(function(_$controller_, $rootScope) {
    // init
    $controller = _$controller_;
    scope = $rootScope.$new();
    ctrl = $controller('UserCtrl', { $scope: scope });
    $scope = scope;

    // fake data and spy
    var users = [
      {username: "user1", email: "user1@peddler.com", id: "57d5132f37a92e3f813800dd"},
      {username: "user2", email: "user2@peddler.com", id: "57d5132f37a92e3f813800dd"}
    ];

    // Spy and force the return value when $scope.init() is called
    spyOn($scope, 'init').and.callFake(function() {});
    spyOn($scope, 'openModal').and.callFake(function() {});

  }));

  // Verify our controller exists
  it('should be defined', function() {
    expect(ctrl).toBeDefined();
  });

  it('should start with users, searchParams, limit and total populated', function() {
    var _searchParams = {
      by: '',
      page: 1,
      term: '',
      sort: 'ASC'
    };
    expect($scope.users).toEqual([]);
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