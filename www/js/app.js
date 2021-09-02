
var baseUrl = "http://10.0.2.2:8080";
var pathItems = "/api/v1/barley/items";

/*
var idPedidoOnline=0;
var id_repartidor="";
var nombre="";
var id_sucursal="";
var url_foto="";
var token="";
var watchID,latitud,longitud,navLat,navLon,navLat2,navLon2,registrandoPosicion,registrandoPosicion2,
posicionActual,posicionActuale,ultimaPosicionUsuario,ultimaPosicionUsuario2, mensaje;
var Dist_lat,Dist_lon,watchID2;
var inicio = "'inicio'";
var fin = "'fin'";
var watchID = null;
var cont=0;
var distanciaMts=8;//DISTANCIA DE TOLERANCIA PARA ENVIAR GPS
var ultimaDistancia=0;
var primeraDistancia=0;
var SA = new Array();
var pedToServer = new Array();
var arrPeds = new Array();
var pedidosRuta = new Array();
var Rute = new Array();
var flag_inicio_ruta=0;
var newJsonOrderArray = new Array();
var user; // 1 = repartidor
var accion; // 1 = no exedió el km. | 2 = exedió km MakeLog
var flagPedEnCurso;
var lat_suc;
var lng_suc;
var Token_dia;
var fecha_fin;
var cantidad_pedidos;
var pedPorEnviar;
var pedidosPend;
var time_delivery;

  //BATERÍA-MODELO
  function onBatteryStatus(info) {
    if (info.level<=20)
      baterylow();

    if (info.isPlugged) {
      $("#status").text(device.model+"  |  "+"Batería:"+info.level+"%" +"  |  "+"Cargando...");
    }else{
      $("#status").text(device.model+"  |   "+"Batería:"+info.level+"%");
    }
  }

  function baterylow() {
    alerta("Batería Baja");
    navigator.vibrate(2000);
  }

  function log(txt){
    cont++;
    $("#lista_log").prepend("<hr><span color='purple'>"+cont+".-"+txt+"</span></br>");
  }

  function log2(txt){
    $("#lista_log").prepend(txt+"</br>");
  }
*/
  //------------ |     GPS       ----------///

  var callbackFn = function(location) {
    cordova.plugins.backgroundMode.enable();
  };

  var failureFn = function(error) {
    log("<span style='color:red'>No se puedo obtener ubicación</span>");
    console.log('BackgroundGeolocation error');
  };

  var onSuccess = function (position) {
    if (!registrandoPosicion2) {
      registrandoPosicion2 = true;
      latitud = position.coords.latitude;
      longitud = position.coords.longitude;
      console.log("registrada en background"+ latitud +", "+ longitud);
      updatePositionBack(latitud,longitud);
    }else{
      latitud1 = latitud;
      longitud1 = longitud;


      latitud2 = position.coords.latitude;
      longitud2 = position.coords.longitude;
      ultimaDistancia=DistanciaGPS(latitud1,longitud1,latitud2,longitud2);
      console.log("Ultima distancia "+ultimaDistancia);
      //alert(ultimaDistancia);
      if(ultimaDistancia>primeraDistancia||ultimaDistancia>=8){
      // $("#imgStatus").attr("src","img/blue.png");
       primeraDistancia=ultimaDistancia;
       //console.log("Distancia: "+DistanciaGPS(latitud1,longitud1,latitud2,longitud2)+" mts");
      if(DistanciaGPS(latitud1,longitud1,latitud2,longitud2)>=distanciaMts)
        cincometros_back(latitud2,longitud2);

      }else{
        console.log("yellow");
       //$("#imgStatus").attr("src","img/yellow.png");
      }
    }
  }

  var onError = function (error){
    console.log('BackgroundGeolocation error');
    $("#imgStatus").attr("src","img/red.png");
  }

  function gps_back() {
         
      watchID = navigator.geolocation.watchPosition(onSuccess,onError,{
      enableHighAccuracy: true,
      timeout: 1500,
      maximumAge: 2500,
      desiredAccuracy: 0    
      });

      cordova.plugins.backgroundMode.enable();
      cordova.plugins.backgroundMode.disableWebViewOptimizations ();

      backgroundGeolocation.configure(callbackFn, failureFn, {
        notificationTitle: 'FillGas Repartidor',
        notificationText: 'No cerrar aplicación',
        desiredAccuracy: 0,
        distanceFilter: 8,
        stationaryRadius: 0,
        activityRecognitionInterval: 0,
        stopTimeout: 0,
        debug: false,  
      });

      backgroundGeoLocation.start();
  }


  function cincometros_back(latitud2,longitud2,tx){
    latitud = latitud2;
    longitud = longitud2;
    
    var rep = "1"; // id-rep

    myDB.transaction(function (transaction) {
    var executeQuery = "INSERT INTO GPS_REP (repartidor,latitud,longitud) VALUES (?,?,?))";
      transaction.executeSql(executeQuery, [rep,lat,lon]
      , function(tx, result) {
        $("#PedidosAtendidos").append('<ons-list-item>'+latitud+","+longitud+'</ons-list-item>');
      },
      function(error){
        console.log('Error occurred');
      });
    });

     /* webservice =  web+"ubicacion.php?jsoncallback=?";
      $.getJSON(webservice,{id_repartidor:id_repartidor,latitud:latitud ,longitud:longitud, id_pedido:id_pedido, token_ruta:token_ruta})
      .done(function(data){
        if(data.validacion){
          //showAdvise("FillGas Repartidor",data.mensaje,"alert");
        
          $("#PedidosAtendidos").append('<ons-list-item>'+latitud+","+longitud+'</ons-list-item>');
        }else{
          showAdvise("FillGas Repartidor",data.mensaje,"alert");
        }
      }) */

  }   


  function updatePositionBack(latitud,longitud) {
    console.log("FIRST ONE: "+ latitud +", "+ longitud);
  } 

/* PROCESOS LOGIN */
function login(){
        cambiar_menu("page_menu");
        loadItems();
  /*
  email = $("#rep_correo").val();
  pass = $("#rep_pass").val();

  webservice =  web+"login.php?jsoncallback=?";
  $.getJSON(webservice,{email:email, pass:pass })
  .done(function(data,err){
    if(data.validacion){

      saveData("user",email);
      saveData("pass",pass);
     // id_repartidor = data.id_repartidor;
      navigator.vibrate(100);
     
      //console.log(data.lng_suc);
      //getLocalStorage();
      showAdvise("FillGas Repartidor",data.mensaje,"alert");
      cambiar_menu("page_menu");
      //window.addEventListener("batterystatus", onBatteryStatus, false); 
    }else{
      showAdvise("FillGas Repartidor",data.mensaje,"alert");
      
    }
  }).fail(function(err){
    alert("Intentalo en un momento más");
  }) */
}

function trigger_autologin(){
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

  if (states[networkState] == states[Connection.WIFI]  || states[networkState] == states[Connection.CELL_4G]) {
    email = getData("user");
    pass = getData("pass");
    //alert(email+","+pass);

    webservice =  web+"login.php?jsoncallback=?";
    $.getJSON(webservice,{email:email, pass:pass })
      .done(function(data,err){
        if(data.validacion){
          //showAdvise("FillGas Repartidor",data.validacion,"alert");
          //id_repartidor = data.id_repartidor;
          cambiar_menu('page_menu');

        }else{
        showAdvise("FillGas Repartidor",data.mensaje,"alert");          
      }
      
    })
    .fail(function(err){
      alert("Estamos teniendo intermitencias, intentalo en un momento más");
    });
  }
}

function perfilInfo(){
  cambiar_menu('perfil');
  setTimeout(function(){
    var tdsinfo = '<ons-card>\
        <div class="title center"><center>Isaac Cerna</div>\
        <div class="content"><br>\
        <center><img id="img_rep" width="40%" height="40%" src="img/perfil.png" style="border-radius:10px;"></center><br><br><br>\
        <label>E-mail: <b> isaac.cerna@mail.com </b></center></label><br><br>\
        <br><button class="button--cta" style=" width:100%;" onclick="cerrarSesion();"><i class="fa fa-check" aria-hidden="true"></i> Cerrar Sesión</button></center>\
        </div>\
      </ons-card>';

    $("#lst_info").html(tdsinfo);
  },200);
  /* webservice =  web+"profile.php?jsoncallback=?";
  console.log(id_repartidor);
  $.getJSON(webservice,{id_repartidor:id_repartidor})
  .done(function(datos){
    if(datos.validacion){
      
    }else{
      alert(datos.mensaje);
    }
  });  
  */
}

function nuevoInventario(){
  $("#ConstruirInventario").show();
  $("#BtnCancelCreate").show();
  $("#BtnCreateNewInv").hide();
}

function CancelMakeInv(){
  $("#ConstruirInventario").hide();
  $("#BtnCreateNewInv").show();
  $("#BtnCancelCreate").hide();
}

function plusUnit(maxUnit){
  var units = $("#units").val();

  if (units == null  || units == '0' || units == undefined || units == '' ) { units = 0 };
  var newUnit = parseInt(units) + 1;
  if(newUnit <= maxUnit){ $("#units").val(newUnit) };
}


function showDialog(){
  document
  .getElementById('dialog-1')
  .show();
}

function hideDialog(){
  $("#units").val(0);
  document
  .getElementById('dialog-1')
  .hide();
}

function lessUnit(){
  var units = $("#units").val();
  if (units > 1 ){
    var newUnit = parseInt(units) - 1;
    $("#units").val(newUnit);
  }
}

function addToCart(){
  close();
  cambiar_menu('carrito')
}

function loadItems(){

  webservice = baseUrl + pathItems + "/all";

	$.ajax({
		url: webservice,
		type: 'get',
		data: null,
		headers: {
			"Content-Type": 'application/json',
			"Content-Length": '1',
			"Host": '1'
		},
		dataType: 'json',
		success: function (data) {
			if (data.error == null) {
				//document.querySelector('#myNavigator').pushPage('detailService.html');
       setItems(data)
			} else {
				alert(JSON.stringify(data.error));
			}
		}
	});

  function setItems(data){

    var tdsp="";
    for(var i=0;i<data.length;i++){

      tdsp +='<tr>\
                <td>>\
                  <ons-card id="item_'+ data[i].response.idItem +'">\
                    <div class="left">\
                      <center><img class="list-item__thumbnail" src="img/'+ data[i].response.image +'.jpg"></center>\
                    </div>\
                    <div class="center">\
                      <small><span class="list-item__title"><strong><span>Producto: </span></strong>'+ data[i].response.nameItem +'</span><span class="list-item__subtitle"></span></small>\
                      <small><span class="list-item__title"><strong><span>Detalle:: </span></strong>'+ data[i].response.details +'</span><span class="list-item__subtitle"></span></small>\
                      <small><span class="list-item__title"><strong><span>Precio unidad: </span></strong>'+ data[i].response.price +'</span><span class="list-item__subtitle"></span></small>\
                    </div>\
                    <div class="right">\
                      <center><ons-button onclick="showDialog('+ data[i].response.price +"," + data[i].response.statatus + ')"><div> <i class="fas fa-beer"></i></div></ons-button></center>\
                    </div>\
                  </ons-card>\
                </td>\
              </tr>';

    }

    setTimeout(function(){ $("#dinamicItems").html(tdsp); }, 1000);
    
  }


}



  