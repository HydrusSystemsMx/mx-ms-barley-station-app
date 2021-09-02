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
        trigger_autologin();
        gps_back();
        creaBDSQLite();

        function setItemss(tdsp){
          alert(tdsp)
          var $div = $('dinamicItems');
          alert($div.html());
          $("#dinamicItems").innerHTML(tdsp); 
        }


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

function creaBDSQLite(){
  myDB = window.sqlitePlugin.openDatabase({name: "FillAppRep.db", location: 'default'});
  cordova.plugins.backgroundMode.enable();
  cordova.plugins.backgroundMode.setDefaults({ silent: true });
  myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS GPS_REP (id integer primary key, repartidor INT(5), latitud VARCHAR(80), longitud VARCHAR(80) )', [],
    function(tx, result) {
   // console.log("Table created successfully");
    },
    function(error) {
    //console.log("Error occurred while creating the table.");
    });
  });
}