var myBingCredentials = "Amidgig8OUx17DagiOFVdMHvUnm4jAu-hKfNyBNcrNOOW2o2_qLGffUdKgrhGnPW";
var holeMap; // global var were the map object will be stored. this var is initialized whene document is ready.
var createPin;

function BingMap(map_div, latitude, longitude, placeHolders, zoom, mapTypeId) {
  if(typeof(placeHolders)==='undefined') placeHolders = {};
  if(typeof(zoom)==='undefined') zoom = 10;
  if(typeof(mapTypeId)==='undefined') {
  	mapTypeId = Microsoft.Maps.MapTypeId.birdseye;
  }


  this.map_div = map_div;
  this.zoom = zoom;
  this.mapTypeId = mapTypeId;
  this.placeholders = placeHolders;

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

BingMap.prototype.getCenter = function() {
  return this.map.getCenter();
}

BingMap.prototype.pushEntitie = function(entitie) {
  this.map.entities.push(entitie);
}

BingMap.prototype.placeCenterPlaceHolder = function() {
  if(typeof(this.placeholders["center"])==='undefined') {
    var centerPushpin = new Placeholder(this,'center');
    this.placeholders["center"] = centerPushpin;
  } else {
    alert("center placeholder has already been placed");
  }
}



function Placeholder(map,label) {
  this.map = map;
  Microsoft.Maps.Pushpin.call( this, map.getCenter(), { text: label, draggable: true });
  map.pushEntitie(this);
  Microsoft.Maps.Events.addHandler(this, 'mouseup', this.saveLocationOnServer);
}

Placeholder.prototype = Object.create( Microsoft.Maps.Pushpin.prototype );
Placeholder.prototype.constructor = Placeholder;

Placeholder.prototype.saveLocationOnServer = function(e) {
  console.log("saving location on server");
}

Placeholder.prototype.getMap = function() {
  this.map;
}



function DistancePlaceholder(centerPlaceholder,label) {
  Placeholder.call(centerPlaceholder.getMap(),label);
}

DistancePlaceholder.prototype = Object.create( Placeholder.prototype );
DistancePlaceholder.prototype.constructor = DistancePlaceholder;

$(document).ready( function () {
  holeMap = new BingMap(document.getElementById("mapDiv"), 38.725731, -9.150210);
});