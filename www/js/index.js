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
    transaction.executeSql('CREATE TABLE IF NOT EXISTS CART (idCart integer primary key, idItem INT(5), iduser integer(5), amount integer(5), image varchar(200), price double(10), detail varchar(350) )', [],
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
  var options = {
    enableHighAccuracy: true,
    maximumAge: 3600000
  }
  var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

  function onSuccess(position) {

    var mapOptions = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: true
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    //map.setZoom(14); // Si quiero cambiar despues el nivel de zoom
    //map.setCenter(local.getPosition());: // Si quiero cambiar después el centro del mapa
    var myLatLng;
    var marker;
    
    saveData("lat", position.coords.latitude)
    saveData("lng", position.coords.longitude)

    myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude }
    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!',
      draggable: true
    });

    var input = document.getElementById('address');

    var searchBox = new google.maps.places.SearchBox(input); // <- like this

    var geocoder = new google.maps.Geocoder();

    autocomplete = new google.maps.places.AutocompleteService();

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds());
      var bounds = map.getBounds();
      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();

    });

    markerEvent.addListener("dragend", function (e) {
      "use strict";
      getAddress(this.getPosition());
    });

  };

  function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  }
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

