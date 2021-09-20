var styleApp="light";
var showAlert = 0;
//temporal
var maxUnits =  5;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);        
    },  

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        createInternalBd();
        getPosition();
        alert("okas");
        login();
        cordova.plugins.backgroundMode.onactivate = function () {

        };

    },
    receivedEvent: function(id) {

    }
};
app.initialize();
    

//---------------------|  PROCESOS SQL LITE  | ------------------------//

function cerrarSesion(){
  navigator.app.exitApp();
}

function networkInfo() {
   var networkState = navigator.connection.type;
   var states = {};
   states[Connection.UNKNOWN]  = 'Unknown connection';
   states[Connection.ETHERNET] = 'Ethernet connection';
   states[Connection.WIFI]     = 'WiFi connection';
   states[Connection.CELL_2G]  = 'Cell 2G connection';
   states[Connection.CELL_3G]  = 'Cell 3G connection';
   states[Connection.CELL_4G]  = 'Cell 4G connection';
   states[Connection.CELL]     = 'Cell generic connection';
   states[Connection.NONE]     = 'No network connection';
   alert('Connection type: ' + states[networkState]);
}

function createInternalBd(){
  myDB = window.sqlitePlugin.openDatabase({name: "BarleyStation.db", location: 'default'});
  myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS CART (idCart integer primary key AUTOINCREMENT, idRequest varchar(200), idItem INT(5), iduser integer(5), amount integer(5), image varchar(200), price double(10), detail varchar(350), status integer(5))', [],
    function(tx, result) {
     console.log("Table created successfully");
    },
    function(error) {
    //console.log("Error occurred while creating the table.");
    });
  });
}


function TruncatePrueba(){
  myDB.transaction(function(transaction) {
  var executeQuery = "DELETE FROM CART";
    transaction.executeSql(executeQuery, [],
      function(tx, result) {
        alert("truncate success");
        console.log('Table deleted successfully.');
      },
      function(error){
        er = JSON.stringify(error);
        console.error('Error occurred while droping the table.'+er);
      }
    );
  });  
}

function getPosition() {
  const myLatLng = { lat: 20.11697, lng: -98.73329 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20.11697, lng: -98.73329 },
    zoom: 16,
  });
  const card = document.getElementById("pac-card");
  const input = document.getElementById("pac-input");
  const biasInputElement = document.getElementById("use-location-bias");
  const strictBoundsInputElement = document.getElementById("use-strict-bounds");
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["establishment"],
  };

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");

  infowindow.setContent(infowindowContent);

  const marker = new google.maps.Marker({
    position:  { lat: 20.11697, lng: -98.73329 },
    map,
    anchorPoint: new google.maps.Point(0, -29),
    draggable: true
  });

  google.maps.event.addListener(marker, 'dragend', function(ev){
    saveData("newLocation", marker.getPosition());
    saveData("isFromMarker", 1);

    persistChange();

  });
  
  autocomplete.addListener("place_changed", () => {
 
    infowindow.close();
    marker.setVisible(false);

    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    saveData("newLocation", marker.getPosition());
    saveData("isFromMarker", 0);

    persistChange();
    
    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent =
      place.formatted_address;
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    const radioButton = document.getElementById(id);

    radioButton.addEventListener("click", () => {
      autocomplete.setTypes(types);
      input.value = "";
    });
  }

  setupClickListener("changetype-all", []);
  setupClickListener("changetype-address", ["address"]);
  setupClickListener("changetype-establishment", ["establishment"]);
  setupClickListener("changetype-geocode", ["geocode"]);
  biasInputElement.addEventListener("change", () => {
    if (biasInputElement.checked) {
      autocomplete.bindTo("bounds", map);
    } else {
      // User wants to turn off location bias, so three things need to happen:
      // 1. Unbind from map
      // 2. Reset the bounds to whole world
      // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
      autocomplete.unbind("bounds");
      autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
      strictBoundsInputElement.checked = biasInputElement.checked;
    }

    input.value = "";
  });
  strictBoundsInputElement.addEventListener("change", () => {
    autocomplete.setOptions({
      strictBounds: strictBoundsInputElement.checked,
    });
    if (strictBoundsInputElement.checked) {
      biasInputElement.checked = strictBoundsInputElement.checked;
      autocomplete.bindTo("bounds", map);
    }

    input.value = "";
  });
}


function getAddress(location) {
  //save position
  place.location.coordinates = new Array(location.lng(), location.lat());

  "use strict";
  geocoder.geocode({ latLng: location }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      place.address = results[0].formatted_address;
      $("#direcUbi").text(results[0].formatted_address);
      //place.name = $scope.searchData;
      saveData("place", place);
      saveData("direccionConfirm", results[0].formatted_address);
      saveData("lngCoords", location.lng());
    }
  });
}


function persistChange(){
  var coordsString = JSON.stringify(getData("newLocation")).split(",", 3);

  var latString = coordsString[0].toString();
  var lat = latString.split(":",2);

  var lngString = coordsString[1].toString();
  var lng = lngString.split(":",2);

  var lat1 = lat[1].toString();
  var lng1 = lng[1].toString();
  
  finalLat = lat1.split(",",2);
  finalLng = lng1.split(",",2);
  const latlng = {
    lat: parseFloat(finalLat),
    lng: parseFloat(finalLng),
  };
  const geocoder = new google.maps.Geocoder();
  
  geocoder.geocode({ location: latlng  })
  .then((response) => {
    if (response.results[0]) {
      $("#address").text(response.results[0].formatted_address.toString());
      document.getElementById("address").style.color = "Green";
    } else {
      alerta("Error al confirmar nueva ubicación");
    }
  })
  .catch((e) => window.alert("Geocoder failed due to: " + e));
}
