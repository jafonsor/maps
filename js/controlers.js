
// depends on holeMap.js.
function CoordInputController($scope) {
  if( typeof(holeMap) === 'undefined') {
  	$scope.zoom = 10;
  } else {
    $scope.zoom = holeMap.getZoom();
  }
  $scope.update = function() {
    holeMap.setCenter(parseFloat($scope.map.latitude), parseFloat($scope.map.longitude));
    holeMap.setZoom(parseInt($scope.map.zoom));
  };
}

function MenuController($scope) {
  $scope.placeCenterPlaceholder = function() {
  	holeMap.addPlaceholder( new Placeholder(holeMap.getCenter(), 'center') );
  };

  $scope.placeDistancePlaceholder = function() {
  	if( typeof(holeMap.getPlaceholder('center')) === 'undefined' ) {
  	  alert("you must place the center placeholder first");
  	} else {
      holeMap.addPlaceholder( 
      	new DistancePlaceholder(
      		     holeMap.getCenter(), 
      		     'distance', 
      		     holeMap.getPlaceholder('center'),
      		     300));
    }
  };
}