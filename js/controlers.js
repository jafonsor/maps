
// depends on holeMap.js.
function CoordInputControler($scope) {
  $scope.update = function(map) {
    holeMap.setCenter($scope.map.latitude, $scope.map.longitude);
  };
}