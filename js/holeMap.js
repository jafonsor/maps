var myBingCredentials = "Amidgig8OUx17DagiOFVdMHvUnm4jAu-hKfNyBNcrNOOW2o2_qLGffUdKgrhGnPW";

function BingMap() {
  var mapOptions = {
    credentials: myBingCredentials
  }

  var map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
}
$(document).ready( function () {
  bingMap = new BingMap();
});