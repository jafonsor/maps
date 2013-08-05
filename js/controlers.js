
// depends on holeMap.js.
function CoordInputController($scope) {
  $scope.map.zoom = holeMap.getZoom();
  $scope.update = function() {
    holeMap.setCenter(parseFloat($scope.map.latitude), parseFloat($scope.map.longitude));
  };
}

function MenuController($scope) {
  $scope.placeCenterPlaceHolder = function() {
  	holeMap.addPlaceholder( new Placeholder(holeMap.getCenter(), 'center') );
  };
}