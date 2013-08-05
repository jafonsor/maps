var myBingCredentials = "Amidgig8OUx17DagiOFVdMHvUnm4jAu-hKfNyBNcrNOOW2o2_qLGffUdKgrhGnPW";
var holeMap; // global var were the map object will be stored. this var is initialized whene document is ready.

function BingMap(map_div, latitude, longitude, zoom, mapTypeId) {
  if(typeof(zoom)==='undefined') zoom = 17;
  if(typeof(mapTypeId)==='undefined') {
  	mapTypeId = Microsoft.Maps.MapTypeId.birdseye;
  }

  this.map_div = map_div;
  this.zoom = zoom;
  this.mapTypeId = mapTypeId;

  var mapOptions = {
    credentials: myBingCredentials,
    center: new Microsoft.Maps.Location(latitude, longitude),
    mapTypeId: this.mapTypeId,
    zoom: this.zoom,
    showScalebar: false
  }

  this.map = new Microsoft.Maps.Map(this.map_div, mapOptions);
}

BingMap.prototype.setCenter = function(latitude,longitude) {
  this.map.setView({center: new Microsoft.Maps.Location(latitude, longitude)})
};

$(document).ready( function () {
  holeMap = new BingMap(document.getElementById("mapDiv"),47.592, -122.332);
});