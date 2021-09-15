
var baseUrl = "http://10.0.2.2:8080";
var pathItems = "/api/v1/barley/items";
var pathUsers = "/api/v1/barley/users";
var pathBrands = "/api/v1/barley/brand";

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
      //alerta(ultimaDistancia);
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



     /* webservice =  web+"ubicacion.php?jsoncallback=?";
      $.getJSON(webservice,{id_repartidor:id_repartidor,latitud:latitud ,longitud:longitud, id_pedido:id_pedido, token_ruta:token_ruta})
      .done(function(data){
        if(data.validacion){
          //showAdvise("FillGas Repartidor",data.mensaje,"alerta");
        
          $("#PedidosAtendidos").append('<ons-list-item>'+latitud+","+longitud+'</ons-list-item>');
        }else{
          showAdvise("FillGas Repartidor",data.mensaje,"alerta");
        }
      }) */

  


  function updatePositionBack(latitud,longitud) {
    console.log("FIRST ONE: "+ latitud +", "+ longitud);
  } 

/* PROCESOS LOGIN */
function login(){
  cambiar_menu("page_menu");
  loadItems();
  loadBrands();

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
      showAdvise("FillGas Repartidor",data.mensaje,"alerta");
      cambiar_menu("page_menu");
      //window.addEventListener("batterystatus", onBatteryStatus, false); 
    }else{
      showAdvise("FillGas Repartidor",data.mensaje,"alerta");
      
    }
  }).fail(function(err){
    alerta("Intentalo en un momento más");
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
    //alerta(email+","+pass);

    webservice =  web+"login.php?jsoncallback=?";
    $.getJSON(webservice,{email:email, pass:pass })
      .done(function(data,err){
        if(data.validacion){
          //showAdvise("FillGas Repartidor",data.validacion,"alerta");
          //id_repartidor = data.id_repartidor;
          cambiar_menu('page_menu');

        }else{
        showAdvise("FillGas Repartidor",data.mensaje,"alerta");          
      }
      
    })
    .fail(function(err){
      alerta("Estamos teniendo intermitencias, intentalo en un momento más");
    });
  }
}

function perfilInfo(){
  cambiar_menu('perfil');

  webservice = baseUrl + pathUsers + "/4";

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

        setTimeout(function(){
          var tdsinfo = '<ons-card>\
              <div class="title center"><center> ¡Hola!  <strong style="color: #F84C09"> ' + data.response.nickname + '</strong> </div>\
              <div class="content"><br>\
              <center><img id="img_rep" width="40%" height="40%" src="img/perfil.png" style="border-radius:10px;"></center><br><br><br>\
              <label>Nombre: <b> ' + data.response.name + ' </b></center></label>\
              <label>Número: <b> ' + data.response.phone + ' </b></center></label>\
              <label>Correo: <b> ' + data.response.mail + ' </b></center></label>\
              <label>Dirección: <b> ' + data.response.address + ' </b></center></label><br><br>\
              <br><button class="button--cta" style=" width:100%;" onclick="cerrarSesion();"><i class="fa fa-check" aria-hidden="true"></i> Cerrar Sesión</button></center>\
              </div>\
            </ons-card>';

          $("#lst_info").html(tdsinfo);
      },200);
			} else {
				alerta(JSON.stringify(data.error));
			}
		}
	});

  /* webservice =  web+"profile.php?jsoncallback=?";
  console.log(id_repartidor);
  $.getJSON(webservice,{id_repartidor:id_repartidor})
  .done(function(datos){
    if(datos.validacion){
      
    }else{
      alerta(datos.mensaje);
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

function plusUnit(maxUnit, idItem){
  var units = $("#units_" + idItem).val();

  if (units == null  || units == '0' || units == undefined || units == '' ) { units = 0 };
  var newUnit = parseInt(units) + 1;
  if(newUnit <= maxUnit){ $("#units_" + idItem).val(newUnit) };
}


function showDialog(idItem, price, stack){
  var dialog = '<ons-dialog id="dialog-1">\
  <ons-card > \
      <center>\
        <table class="bs-table">\
          <tr>\
            <td><strong> Precio: </strong></td>\
            <td><span style="color:#F84C09;">$  ' + price.toFixed(2) +' </span></td>\
          </tr>\
          <tr>\
          <td><strong> Disponibles: </strong></td>\
          <td><span style="color:#F84C09;">  ' + stack +' </span></td>\
          </tr>\
        </table>\
        <table class="bs-table">\
            <tr>\
                <td></td>\
                <td><button style="visibility: hidden;">space</button></td>\
                <td></td>\
            </tr>\
            <tr>\
                <td> <center><ons-button onclick="plusUnit('+ stack +')" style="background-color: black;"><div> <i class="fas fa-plus"></i></div></ons-button></center> </td>\
                <td>  <center><input type="number" placeholder="0" style="width:60%; height: 15%; color: black;" id="units"></center></td>\
                <td> <center><ons-button onclick="lessUnit()" style="background-color: black;"><div> <i class="fas fa-minus"></i></div></ons-button></center> </td>\
            </tr>\
            <tr>\
                <td></td>\
                <td><button style="visibility: hidden;">space</button></td>\
                <td></td>\
            </tr>\
        </table>\
        <br>\
        <ons-button onclick="addToCart(' + price.toFixed(2) + ', '+ stack + ', ' + idItem +')" style="background-color:teal; width: 100%;">AGREGAR</ons-button>\
        <ons-button id="close-btn-dialog"  onclick="closeDialog()" style="background-color:red; "><div style="width: 100%;"> <i class="fas fa-window-close" ></i></div></ons-button>\
      </center>\
  </ons-card>\
</ons-dialog>';

$("#dinamicDialog").html(dialog);

document
.getElementById('dialog-1')
.show();

}

function closeDialog(){
  close();
}

function hideDialog(){
  $("#units").val(0);
  document
  .getElementById('dialog-1')
  .hide();
}

function lessUnit(idItem){
  var units = $("#units_" + idItem).val();
  if (units > 1 ){
    var newUnit = parseInt(units) - 1;
    $("#units_" + idItem).val(newUnit);
  }
}

function addToCart(price, stack, idItem){

  var cartElement = "";
  var units = $("#units_" + idItem).val();
  setTimeout(function(){ $("#dCart").html(cartElement); }, 90);

  if(units > stack ){
    alerta("cantidad no disponible para agregar. Max: " + stack);
    $("#units_" + idItem).val(stack);
  } else if(units == 0){
    alerta("La cantidad no puede ser 0")
    $("#units_" + idItem).val(1);
  } else {
      var img = $('#img_'+ idItem).val();
      var dtl = $('#dtl_'+ idItem).val();

      myDB.transaction(function(transaction) {
        var executeQuery = "SELECT * FROM CART WHERE idItem=?";
        transaction.executeSql(executeQuery, [idItem]
        , function(tx, result) {
          var len = result.rows.length;
          if(len > 0){  
            var newAmount = parseInt(units);
            var r = confirm("Deseas actualizar tu producto de: " + result.rows.item(0).amount + " a: " + newAmount);
            if (r == true) {
              updateAmountItem(idItem, newAmount);
            }
          } else{
            instertIntoMemory(idItem, 4, units, img, price, dtl);
          }
        },  
        function(error){
          er = JSON.stringify(error);
          alerta(er);
        });
      });    
  }
}

function updateAmountItem(idItem, amount){
  myDB.transaction(function (transaction) {
    var executeQuery = "UPDATE CART SET amount=? WHERE idItem=?";
    transaction.executeSql(executeQuery, [amount,idItem]
    , function(tx, result) {
      saveData("amount_"+ idItem, amount);
      cambiar_menu('carrito');
      loadItemsFromMemory();
    },
    function(error){
      console.log('Error occurred');
    });
  });

}

function instertIntoMemory(idItem, idUser, units, img, price, details){
  myDB.transaction(function (transaction) {
    var executeQuery = "INSERT INTO CART (idItem, idUser, amount, image, price, detail) VALUES (?,?,?,?,?,?)";
    transaction.executeSql(executeQuery, [idItem, idUser, units, img, price, details]
    , function(tx, result) {
      cambiar_menu('carrito')
      saveData("amount_" + idItem, units);
      saveData("item_in_cart_" + idItem , "item_in_cart_");
      loadItemsFromMemory();
    },
    function(error){
      er = JSON.stringify(error);
      alerta('Error occurred');
    });
  });
}

function loadBrands(){

  webservice = baseUrl + pathBrands + "/all";
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
        if(data != null || data != undefined){
          setBrands(data);
        }
   
			} else {
				alerta(JSON.stringify(data.error));
			}
		}
	});
}

function setBrands(data){
  var start = '<center><table><tr>';
  
  var init = '<td><ons-select id="choose-sel" onchange="editSelects(event)">';
  var tdsp="";
  var final = "";
    for(var i=0;i<data.length;i++){
      tdsp +='\
          <option value="'+ data[i].response.idBrand +'">'+ data[i].response.brandName +'</option>\
       ';
    }

    var last = '<td><ons-button onclick="searchByIdBrand()"><div><i class="fas fa-search"></i></div></ons-button></td></tr></table></center';

    final = start + init + tdsp + '<option value="1000">Buscar todas..</option></ons-select></td>' + final + last;

    setTimeout(function(){ $("#dinamicBrands").html(final); }, 100);
}

function searchByIdBrand(){
  
  var idBrand = $("#choose-sel").val();
  if (idBrand == 1000){
    loadItems();
  } else{
  webservice = baseUrl + pathItems + "/search/?idBrand=" + idBrand;

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
        if (data.length > 0 ) {
          //document.querySelector('#myNavigator').pushPage('detailService.html');
            setItemsBrand(data);
        } else {
          alerta("No se encontraron productos disponibles para esta marca..");
          loadItems();
        }
      }
    });
  }
  
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
        if(data != null || data != undefined){
          setItems(data);
        }
   
			} else {
				alerta(JSON.stringify(data.error));
			}
		}
	});


  function setItems(data){

    var tdsp="";
    var inptItems = "";

    for(var i=0;i<data.length;i++){
      var itemId =data[i].response.idItem;
      tdsp +='\
      <ons-list-item id="item_'+ data[i].response.idItem +'">\
      <center>\
      <table>\
        <tr>\
          <td><input type="text" id="img_'+ data[i].response.idItem +'" style="display: none;" value="'+ data[i].response.image +'"></td>\
          <td><center><img id="" style="width:30%; heigth:30%" src="'+ data[i].response.image +'"></center></td>\
          <td><input type="text" id="dtl_'+ data[i].response.idItem +'" style="display: none;" value="'+ data[i].response.details +'"></td>\
        </tr>\
      </table>\
      <span><strong></strong>'+ data[i].response.details +'</span><span class="list-item__subtitle"></span><br>\
      <small>'+ data[i].response.nameItem +'<span class="list-item__subtitle"></span></small><br><br>\
      <span><strong><strong> $ '+ data[i].response.price.toFixed(2) +'</strong><br><br>\
      <div style="height: 25px; width: auto;">\
        <center><ons-button onclick="plusUnit('+ data[i].stack +' ,' + data[i].response.idItem +')" style="background-color: black;"><div> <i class="fas fa-plus"></i></div></ons-button>';
      
      if(getData("amount_"+ data[i].response.idItem.toString())   != null){
        $("#units_"+data[i].response.idItem).val(parseInt(getData("amount_"+ data[i].response.idItem)));
        inptItems = '<input type="number" value="'+ parseInt(getData("amount_"+ data[i].response.idItem)) +'" placeholder="'+ parseInt(getData("amount_"+ data[i].response.idItem)) +'" style="width:20%; height: 15%; color: black;" id="units_'+ data[i].response.idItem +'">';
      } else{
        inptItems = '<input type="number" placeholder="0" style="width:20%; height: 15%; color: black;" id="units_'+ data[i].response.idItem +'">';
      }
      
      tdsp = tdsp + inptItems + '<ons-button onclick="lessUnit(' + data[i].response.idItem +')" style="background-color: black;"><div> <i class="fas fa-minus"></i></div></ons-button></center>\
      </div>\
      <br>\
      <div style="height: 50px; width: auto;"><center><ons-button onclick="addToCart('+ data[i].response.price.toFixed(2) + ' , '+ data[i].stack + ' , '+ data[i].response.idItem  +' )" style="background-color:teal; width: 60%;">AGREGAR</ons-button></center></div> \
      <br>\
      </center>\
      <td><div id="imgCart_'+ data[i].response.idItem +'"></div></td>';

      if(getData("item_in_cart_"+ data[i].response.idItem)   != null){
        tdsp = tdsp + '<img id="item_in_cart" style="width:10%; " src="img/item_in_cart.png">';
      }

      tdsp = tdsp + '</ons-list-item>';
    }
    setTimeout(function(){ $("#dinamicItems").html(tdsp); }, 100);
    
  }

  function noItemsFound(){
    var tdsp="";

    tdsp +='\
      <ons-list-item id="item_not_found">\
      <center>\
        <table>\
          <tr>\
            <td></td>\
            <td><center><img style="width:30%; heigth:30%" src="img/beer.png"></center></td>\
            <td></td>\
          </tr>\
        </table>\
        <span><strong></strong>No se encontraron resultados</span><span class="list-item__subtitle"></span><br>\
      </ons-list-item>';
        
    
    setTimeout(function(){ $("#dinamicItems").html(tdsp); }, 100);
  }

}

function loadLogic(){
  loadBrands();
  loadItems();
}

function goToCart(){
  cambiar_menu('carrito');
  saveData("newLocation", null);
  saveData("mainDummmyAddress", "Circuito Doña mina #1038, Fracc. Bosques del Peñar, Pachuca de Soto, Hgo.");
  loadItemsFromMemory();
}

function loadItemsFromMemory(){
    var itensInCart = "";
    var addressDelivery = "";
    var payMethod = "";
    var total = 0;
    setTimeout(function(){ $("#dCart").html(itensInCart); }, 100);

    myDB.transaction(function(transaction) {
    var executeQuery = "SELECT * FROM CART WHERE idUser=?";
    transaction.executeSql(executeQuery, [4]
    , function(tx, result) {
      var len = result.rows.length;
      if(len < 1){
        itensInCart += '<ons-card>\
          <center><strong>No cuentas con productos tu carrito!</strong>\
          <br>\
          <br>\
          <img src="img/empty_cart.png" width="100px"><br>\
          </center>\
          </ons-card>';
      } else{
        for (let index = 0; index < result.rows.length; index++) {
          console.log(result.rows.item(index));
          var priceItem = result.rows.item(index).price;
          var itemTotal = (result.rows.item(index).amount * priceItem).toFixed(2);
          itensInCart +=  '<ons-card>\
            <center><img src="'+ result.rows.item(index).image +'" alt="Onsen UI" style="width: 50%">\
            <div class="title">\
            <strong> ' + result.rows.item(index).detail +' </strong>\
            </div></center>\
            <div class="content">\
            <ons-list>\
            <ons-list-item>Precio unidad: $ ' + result.rows.item(index).price + '</ons-list-item>\
            <ons-list-item>Seleccionados: ' + result.rows.item(index).amount + '</ons-list-item>\
            </ons-list>\
            <ons-list-header><span><strong style="font-family: Arial; font-size:17px;"> $ '+ itemTotal  +'</strong></span><ons-button  style="float: right; position:relative;" id="trash_item" onclick="deleteItemFromMemory('+ result.rows.item(index).idItem +')"><div> <i class="fas fa-trash-alt"></i></div></ons-button></ons-list-header>\
            </div>\
            </ons-card>\
          ';
          total = parseFloat(total) + (parseFloat(itemTotal));
        }
        addressDelivery += '<ons-card>\
        <h1>Entregar en: <i style="position: absolute; right: 0;" class="fas fa-pencil-alt" onclick="showMapDelivery()"></i></h1>\
        <hr><strong><span id="address" style="font-style: italic; color: black;">' + getData("mainDummmyAddress")+'</span> </strong><br>\
        <div id="mapDelivery" style="display: none;">\
          <div style="display:none;">\
            <div id="title">Autocomplete search</div>\
            <div id="type-selector" class="pac-controls">\
              <input\
              type="radio"\
              name="type"\
              id="changetype-all"\
              checked="checked"\
              />\
              <label for="changetype-all">All</label>\
              \
              <input type="radio" name="type" id="changetype-establishment" />\
              <label for="changetype-establishment">Establishments</label>\
              \
              <input type="radio" name="type" id="changetype-address" />\
              <label for="changetype-address">Addresses</label>\
              \
              <input type="radio" name="type" id="changetype-geocode" />\
              <label for="changetype-geocode">Geocodes</label>\
            </div>\
            <br />\
            <div id="strict-bounds-selector" class="pac-controls">\
              <input type="checkbox" id="use-location-bias" value="" checked />\
              <label for="use-location-bias">Bias to map viewport</label>\
              \
              <input type="checkbox" id="use-strict-bounds" value="" />\
              <label for="use-strict-bounds">Strict bounds</label>\
            </div>\
          </div>\
          <div id="map"></div>\
          <div id="pac-container">\
          <input id="pac-input" type="text" placeholder="O ingresa una nueva dirección de entrega.." style="width:100%;"/>\
          </div>\
          <div id="infowindow-content">\
            <span id="place-name" class="title"></span><br />\
            <span id="place-address"></span>\
          </div>\
          <div><center><ons-button onclick="confirmNewAddress()">Confirmar</ons-button></center></div>\
        </div>\
        </ons-card>';

      payMethod += '<ons-card><center><h1>Método de pago </h1></center><br>\
        <label class="radio-button radio-button--material">\
        <input type="radio" class="radio-button__input radio-button--material__input" id="debit_radio" name="r" checked="checked">\
        <div class="radio-button__checkmark radio-button--material__checkmark"></div>\
        Tarjeta de Credito/Debito\
        </label>\
        <label class="radio-button radio-button--material">\
        <input type="radio" class="radio-button__input radio-button--material__input" id="cash_radio" name="r" >\
        <div class="radio-button__checkmark radio-button--material__checkmark"></div>\
        Pago en Efectivo\
        </label>\
        <label class="radio-button radio-button--material">\
        <input type="radio" class="radio-button__input radio-button--material__input" id="transfer_radio" name="r">\
        <div class="radio-button__checkmark radio-button--material__checkmark"></div>\
        Transferencia Bancaria\
        </label></ons-card>';

        itensInCart += addressDelivery + payMethod + '<ons-list-header style="background-color: white;"><center><ons-button onclick="startOrder('+ total.toFixed(2) +')" style="width:100%;"><strong style="font-family: Arial; font-size: 20px;"> PAGAR $ '+ total.toFixed(2) +'  MXN</strong></center></ons-button></ons-list-header>';
      }
    },
    function(error){
      er = JSON.stringify(error);
      alerta(er);
    });
  });    

  setTimeout(function(){ $("#dCart").html(itensInCart); }, 700);
  setTimeout(function(){ getPosition() }, 800);
}

function confirmNewAddress(){
  if(getData("newLocation") != null){
  
    var finalLat = "";
    var finalLng = "";

    if(getData("isFromMarker") == 1){
      var coordsString = JSON.stringify(getData("newLocation")).split(",", 3);

      var latString = coordsString[0].toString();
      var lat = latString.split(":",2);
  
      var lngString = coordsString[1].toString();
      var lng = lngString.split(":",2);
  
      var lat1 = lat[1].toString();
      var lng1 = lng[1].toString();
      
      finalLat = lat1.split(",",2);
      finalLng = lng1.split(",",2);
  
    } else {
      var coordsString = JSON.stringify(getData("newLocation")).split(",", 2);

      var latString = coordsString[0].toString();
      var lat = latString.split(":",2);

      var lngString = coordsString[1].toString();
      var lng = lngString.split(":",2);
      
      finalLat = lat[1].toString();
      finalLng = lng[1].toString();

    }
    
    const latlng = {
      lat: parseFloat(finalLat),
      lng: parseFloat(finalLng),
    };
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ location: latlng  })
    .then((response) => {
      if (response.results[0]) {
        $("#address").text(response.results[0].formatted_address.toString());
        document.getElementById("mapDelivery").style.display = "none";
        document.getElementById("address").style.color = "Black";
        saveData("hiddenMap", "hide");
        saveData("mainDummmyAddress", null);
        saveData("mainDummmyAddress", response.results[0].formatted_address.toString());
      } else {
        alerta("Error al confirmar nueva ubicación");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
  } else{
    alerta("Selecciona una nueva ubicación!");
  }
 
}

function showMapDelivery(){

  if (getData("hiddenMap") === "hide"){

    $("#address").text(getData("mainDummmyAddress"));

    document.getElementById("mapDelivery").style.display = "none";
    document.getElementById("address").style.color = "Black";
    saveData("hiddenMap", "show");
  } else{
    document.getElementById("address").style.color = "Red";
    document.getElementById("mapDelivery").style.display = "block";
    saveData("hiddenMap", "hide");
  }
}

function startOrder(total){
  var payMethod = "";
  var debit_radio = $("#debit_radio").is(':checked');
  var cash_radio = $("#cash_radio").is(':checked');

  if(debit_radio == true){
    payMethod = 1;
  } else if(cash_radio === true){
    payMethod = 2;
  } else{
    payMethod = 3;
  }
  alert(total.toFixed(2) + ", " + payMethod);
}

function deleteItemFromMemory(idItem){
  myDB.transaction(function(transaction) {
  var executeQuery = "DELETE FROM CART WHERE idItem=?";
    transaction.executeSql(executeQuery, [idItem],
      function(tx, result) {
        saveData("item_in_cart_" + idItem, null)
        saveData("amount_" + idItem, null);
        loadItemsFromMemory();
        console.log('Table deleted successfully.');
      },
      function(error){
        er = JSON.stringify(error);
        console.error('Error occurred while droping the table.'+er);
      }
    );
  });  
}

function itemInMemory(idItem){
  var inMemory = false;
  myDB.transaction(function(transaction) {
    var executeQuery = "SELECT * FROM CART WHERE idItem=?";
    transaction.executeSql(executeQuery, [idItem]
    , function(tx, result) {
      var len = result.rows.length;
      if(len > 0){
        inMemory = true;
      }
    },
    function(error){
      er = JSON.stringify(error);
      alerta(er);
    });
  });    

  return inMemory;
}

function refreshMenu(){
  loadItems();
  loadBrands();
}

function processString(myString){
  alert(myString)
  var s1 = myString.replace("{");
  var s2 = s1.replace(":");
  var s3 = s2.replace("}");
  var s4 = s3.replace(/\+"/g);
  //var s5 = s4.replace("undefined"lat"undefined");
  alert(s5);
  return s5;
}

