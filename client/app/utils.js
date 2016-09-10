/**
 * Confirm Controller
 * @param  {[type]}
 * @return {[type]}
 */
pdadmin.controller('ConfirmCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.confirm = function() {
    $uibModalInstance.close('yes');
  };
}])