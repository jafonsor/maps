
// depends on holeMap.js.
function CoordInputControler($scope) {
  $scope.update = function(map) {
    holeMap.setCenter(parseFloat($scope.map.latitude), parseFloat($scope.map.longitude));
  };
}