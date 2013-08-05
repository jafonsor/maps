
// depends on holeMap.js.
function CoordInputController($scope) {
  $scope.update = function() {
    holeMap.setCenter(parseFloat($scope.map.latitude), parseFloat($scope.map.longitude));
  };
}

function MenuController($scope) {
  $scope.placeCenterPlaceHolder = function() {
  	holeMap.placeCenterPlaceHolder();
  };
}