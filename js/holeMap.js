var myBingCredentials = "Amidgig8OUx17DagiOFVdMHvUnm4jAu-hKfNyBNcrNOOW2o2_qLGffUdKgrhGnPW";
var holeMap; // global var were the map object will be stored. this var is initialized whene document is ready.
var createPin;

/**
 * A map of an hole of a golf corse.
 * golfCorse  -  string with the golf corse name.
 * holeNumber  -  integer with the holeNumber
 */
function HoleMap(golfCorse, holeNumber) {
  this.golfCorse = golfCorse;
  this.holeNumber = holeNumber;
}

function getGolfCorse() {
  return this.golfCorse;
}

function getHoleNumber() {
  return this.holeNumber;
}


/**
 * Not completed. Waiting to compare with Google Maps implementation.
 * Wraps a Microsoft.Maps.Map.
 * map_div  -  the html div where the map should appear.
 * latitude  -  latitude coordenates of the center.
 * longitude -  longitude coordenates of the center.
 */
function BingMap(golfCorse, holeNumber, map_div, latitude, longitude, zoom, mapTypeId) {
  HoleMap.call(this, golfCorse, holeNumber)

  if(typeof(zoom)==='undefined') zoom = 10;
  if(typeof(mapTypeId)==='undefined') {
  	mapTypeId = Microsoft.Maps.MapTypeId.birdseye;
  }


  this.map_div = map_div;
  this.zoom = zoom;
  this.mapTypeId = mapTypeId;
  this.placeholders = {};

  var mapOptions = {
    credentials: myBingCredentials,
    center: new Microsoft.Maps.Location(latitude, longitude),
    mapTypeId: this.mapTypeId,
    zoom: this.zoom,
    showScalebar: false
  }

  this.map = new Microsoft.Maps.Map(this.map_div, mapOptions);
}

BingMap.prototype = Object.create( HoleMap.prototype );
BingMap.prototype.constructor = HoleMap;


BingMap.prototype.setCenter = function(latitude,longitude) {
  this.map.setView({center: new Microsoft.Maps.Location(latitude, longitude)})
};

BingMap.prototype.getCenter = function() {
  return this.map.getCenter();
}

BingMap.prototype.setZoom = function(newZoom) {
  this.map.setView({zoom: newZoom});
}

BingMap.prototype.getZoom = function() {
  return this.map.getZoom();
}

BingMap.prototype.pushEntitie = function(entitie) {
  this.map.entities.push(entitie);
}

BingMap.prototype.addPlaceholder = function(placeholder) {
  console.log("label type: " + typeof(placeholder.getLabel()) + ", placeholder type: " + typeof(placeholder)
              + ", placeholders type: " + typeof(this.placeholders));
  this.placeholders[ placeholder.getLabel() ] = placeholder;
  this.pushEntitie(placeholder);
}


/**
 * Class that inherits from Microsof.Maps.Pushpin. The constuctor adds an event for loading the location and label
 * of the placeholder to the server.
 * location  -  location of the placeholder on the map. it should a Microsoft.Maps.Location.
 * label  -  string with the name of the placeholder. a HoleMap can't have tow Placeholder's with the same name.
 */
function Placeholder(location,label) {
  this.label = label;
  Microsoft.Maps.Pushpin.call( this, location, { text: label, draggable: true });
  Microsoft.Maps.Events.addHandler(this, 'mouseup', this.saveLocationOnServer);
}

Placeholder.prototype = Object.create( Microsoft.Maps.Pushpin.prototype );
Placeholder.prototype.constructor = Placeholder;

/**
 * Function called when the placeholder is droped. It should update the server.
 */
Placeholder.prototype.saveLocationOnServer = function(e) {
  console.log("saving location on server: " + e.targetType);
}


Placeholder.prototype.getLabel = function() {
  return this.label;
}

/**
 * Placeholder that only moves along a distance from another placeholder.
 */
function DistancePlaceholder(location,label,centerPlaceholder,distance) {
  Placeholder.call(location,label);
}

DistancePlaceholder.prototype = Object.create( Placeholder.prototype );
DistancePlaceholder.prototype.constructor = DistancePlaceholder;

$(document).ready( function () {
  holeMap = new BingMap('bela vista', 1, document.getElementById("mapDiv"), 38.725731, -9.150210);
});