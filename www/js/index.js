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
        creaBDSQLite();

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

