var baseUrl = "http://10.0.2.2:8081";
var pathItems = "/api/v1/barley/items";
var pathUsers = "/api/v1/barley/users";
var pathBrands = "/api/v1/barley/brand";
var pathOrder = "/api/v1/barley/order";
var pathBanner = "/api/v1/barley/banner";
var BARLEYRQUEST = "BSV1";
var currentYear = 2021;

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
  loadCarousel();

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
		success: function (data) {        if (data.error == null) {
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
                <td> <center><img onclick="plusUnit('+ stack +')" style="width:13%; heigth:13%" src="img/pluss_1.png"></center> </td>\
                <td>  <center><input type="number" placeholder="0" style="width:60%; height: 15%; color: black; border: none; text-align: center;" id="units"></center></td>\
                <td> <center><img onclick="lessUnit()" style="width:13%; heigth:13%" src="img/less_1.png"></center> </td>\
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
    ons.notification.toast("cantidad no disponible para agregar. Max: " + stack, { timeout: 1500, animation: 'ascend' })
    $("#units_" + idItem).val(stack);
  } else if(units == 0){
    ons.notification.toast('La cantidad no puede ser 0', { timeout: 1500, animation: 'ascend' })
    $("#units_" + idItem).val(1);
  } else {
      var img = $('#img_'+ idItem).val();
      var dtl = $('#dtl_'+ idItem).val();

      myDB.transaction(function(transaction) {
        var executeQuery = "SELECT * FROM CART WHERE idItem=? and status=?";
        transaction.executeSql(executeQuery, [idItem, 0]
        , function(tx, result) {
          var len = result.rows.length;
          if(len > 0){  
            var newAmount = parseInt(units);
            var r = confirm("Deseas actualizar tu producto de: " + result.rows.item(0).amount + " a: " + newAmount);
            if (r == true) {
              updateAmountItem(idItem, newAmount);
            }
          } else{
            //SEARCH ALREADY ORDERS
            retrievePed(true);
            setTimeout(function(){ 
              if(getData("flagAlready") === "true"){
                ons.notification.toast("Aún cuentas con un pedido en curso...", { timeout: 1500, animation: 'ascend' })
                setTimeout(function(){ $('#wrapper').trigger('click'); }, 100);
              } else{
                instertIntoMemory(idItem, 4, units, img, price, dtl);
              }
            }, 400);
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
    var executeQuery = "INSERT INTO CART (idItem, idUser, amount, image, price, detail, status) VALUES (?,?,?,?,?,?,?)";
    transaction.executeSql(executeQuery, [idItem, idUser, units, img, price, details, 0]
    , function(tx, result) {
      cambiar_menu('carrito')
      saveData("amount_" + idItem, units);
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
  
  var init = '<td><ons-select id="choose-sel" onchange="searchByIdBrand()"><option value="1000">Todos los productos.. <i class="fa-thin fa-magnifying-glass"></i></option>' ;
  var tdsp="";
  var final = "</ons-select></td>";
    for(var i=0;i<data.length;i++){
      tdsp +='\
          <option value="'+ data[i].id +'">'+ data[i].brandName +'</option>\
       ';
    }

    var last = '</tr></table></center';

    final = start + init + tdsp + final + last;

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
          ons.notification.toast("No se encontraron productos disponibles para esta marca..", { timeout: 3000, animation: 'ascend' })
          loadItems();
        }
      }
    });
  }
  
}

function setDinamicCarousel(data){
  var dinamicCarousel = "";
  var tdsp="";
  var init = '<ons-carousel swipeable auto-scroll overscrollable id="carousel" style="height: 250px;">';
  var final = '</ons-carousel>';
    for(var i=0;i<data.length;i++){
      tdsp +='\
        <ons-carousel-item style="background-image:url('+ data[i].url +');      background-repeat: no-repeat;\
        background-size: cover;">\
        <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff; ">\
        </div>\
        </ons-carousel-item>\
       ';
    }
    dinamicCarousel = init + tdsp + final;
    setTimeout(function(){ $("#dinamicCarousel").html(dinamicCarousel); }, 200);
}

function loadCarousel(){
  webservice = baseUrl + pathBanner + "/allActive";
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
          setDinamicCarousel(data);
        }
   
			} else {
				alerta(JSON.stringify(data.error));
			}
		}
	});
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
    var tdsp2="";
    var inptItems = "";
    var middleListLength = data.length / 2;

    setTimeout(function(){ $("#dinamicItemsBrand").html(""); }, 100);

    for(var i=0;i<data.length;i++){
      var itemId =data[i].id;
      if(i <= (Math.round(middleListLength) - 1)){
        tdsp +='\
        <div style="heigth:30%;">\
        <ons-card id="item_'+ data[i].id +'"">\
        <table>\
          <tr>\
            <td>\
              <center>\
                <div><input type="text" id="img_'+ data[i].id +'" style="display: none;" value="'+ data[i].image +'"><input type="text" id="dtl_'+ data[i].id +'" style="display: none;" value="'+ data[i].details +'"><img id="" style="width:30%; heigth:50%;" src="'+ data[i].image +'"></div>\
                <span><strong></strong>'+ data[i].details +'</span><span class="list-item__subtitle"></span><br>\
                <small>'+ data[i].nameItem +'<span class="list-item__subtitle"></span></small><br><br>\
                <span><strong><strong> $ '+ data[i].price.toFixed(2) +'</strong><br><br>\
                <div style="height: 25px; width: auto;">\
                  <center><img onclick="plusUnit('+ data[i].stack +' ,' + data[i].id +')" style="width:13%; heigth:13%" src="img/pluss_1.png">';
                
                if(getData("amount_"+ data[i].id.toString())   != null){
                  $("#units_"+data[i].id).val(parseInt(getData("amount_"+ data[i].id)));
                  inptItems = '<input type="number" value="'+ parseInt(getData("amount_"+ data[i].id)) +'" placeholder="'+ parseInt(getData("amount_"+ data[i].id)) +'" style="width:20%; height: 15%; color: black; border: none; text-align: center;" id="units_'+ data[i].id +'">';
                } else{
                  inptItems = '<input type="number" placeholder="0" style="width:20%; height: 15%; color: black; border: none; text-align: center;" id="units_'+ data[i].id +'">';
                }
                
                tdsp = tdsp + inptItems + '<img onclick="lessUnit(' + data[i].id +')" style="width:13%; heigth:13%" src="img/less_1.png"></center>\
                </div>\
                <br>\
                <div style="height: 50px; width: auto;"><center><img onclick="addToCart('+ data[i].price.toFixed(2) + ' , '+ data[i].stack + ' , '+ data[i].id  +' )" style="width:18%; heigth:18%" src="img/confirm.png"></center></div> \
                <br>\
                </center>\
              </center>\
            </td>\
          </tr>\
        </table>';
    
  
  
        tdsp = tdsp + '</ons-card>';
      } else{
        tdsp2 +='\
        <div">\
        <ons-card id="item_'+ data[i].id +'" style="heigth:30%;">\
        <table>\
          <tr>\
            <td>\
              <center>\
                <div><input type="text" id="img_'+ data[i].id +'" style="display: none;" value="'+ data[i].image +'"><input type="text" id="dtl_'+ data[i].id +'" style="display: none;" value="'+ data[i].details +'"><img id="" style="width:30%; heigth:30%" src="'+ data[i].image +'"></div>\
                <span>'+ data[i].details +'</span><span class="list-item__subtitle"></span><br>\
                <small>'+ data[i].nameItem +'<span class="list-item__subtitle"></span></small><br><br>\
                <span><strong> $ '+ data[i].price.toFixed(2) +'</strong></span><br><br>\
                <div style="height: 25px; width: auto;">\
                  <center><img onclick="plusUnit('+ data[i].stack +' ,' + data[i].id +')" style="width:13%; heigth:13%" src="img/pluss_1.png">';
                
                if(getData("amount_"+ data[i].id.toString())   != null){
                  $("#units_"+data[i].id).val(parseInt(getData("amount_"+ data[i].id)));
                  inptItems = '<input type="number" value="'+ parseInt(getData("amount_"+ data[i].id)) +'" placeholder="'+ parseInt(getData("amount_"+ data[i].id)) +'" style="width:20%; height: 15%; color: black; border: none; text-align: center;" id="units_'+ data[i].id +'">';
                } else{
                  inptItems = '<input type="number" placeholder="0" style="width:20%; height: 15%; color: black; border: none; text-align: center;" id="units_'+ data[i].id +'">';
                }
                
                tdsp2 = tdsp2 + inptItems + '<img onclick="lessUnit(' + data[i].id +')" style="width:13%; heigth:13%" src="img/less_1.png"></center>\
                </div>\
                <br>\
                <div style="height: 50px; width: auto;"><center><img onclick="addToCart('+ data[i].price.toFixed(2) + ' , '+ data[i].stack + ' , '+ data[i].id  +' )" style="width:18%; heigth:18%" src="img/confirm.png"></center></div> \
                <br>\
                </center>\
              </center>\
            </td>\
          </tr>\
        </table>';
  
  
  
        tdsp2 = tdsp2 + '</ons-card></div>';       
      }
     
    }
    saveData("isFromClickMenu", 0);
    setTimeout(function(){ $("#dinamicItems").html(tdsp); }, 100);
    setTimeout(function(){ $("#dinamicItems2").html(tdsp2); }, 100);
    
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
      </ons-list-item>\
      </div>';
        
    
    setTimeout(function(){ $("#dinamicItems").html(tdsp); }, 100);
  }

}

function loadLogic(){
  loadBrands();
  loadItems();
  loadCarousel();
}

function goToCart(){
  cambiar_menu('carrito');
  loadItemsFromMemory();
}

function loadItemsFromMemory(){
    var itensInCart = "";
    var addressDelivery = "";
    var payMethod = "";
    var total = 0;
    var address = (getData("mainAddress") != null ) ? getData("mainAddress") : "Porfavor establece un punto de entrega";
  
    setTimeout(function(){ $("#dCart").html(itensInCart); }, 120);

    myDB.transaction(function(transaction) {
    var executeQuery = "SELECT * FROM CART WHERE idUser=? and status=?";
    transaction.executeSql(executeQuery, [4, 0]
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
          var priceItem = result.rows.item(index).price;
          var itemTotal = (result.rows.item(index).amount * priceItem).toFixed(2);
          itensInCart +=  '<ons-card>\
            <center><img src="'+ result.rows.item(index).image +'" alt="Onsen UI" style="width: 50%">\
            <div class="title">\
            <strong> ' + result.rows.item(index).detail +' </strong>\
            </div></center>\
            <div class="content">\
            <ons-list>\
            <ons-list-item>Precio unidad: $ ' + result.rows.item(index).price.toFixed(2) + '</ons-list-item>\
            <ons-list-item>Seleccionados: ' + result.rows.item(index).amount + '</ons-list-item>\
            </ons-list>\
            <ons-list-header><span><strong style="font-family: Arial; font-size:17px;"> $ '+ itemTotal  +'</strong></span><ons-button  style="float: right; position:relative;" id="trash_item" onclick="deleteItemFromMemory('+ result.rows.item(index).idItem +')"><div> <i class="fas fa-trash-alt"></i></div></ons-button></ons-list-header>\
            </div>\
            </ons-card>\
          ';
          total = parseFloat(total) + (parseFloat(itemTotal));
        }
        if(address.includes(",")){
          loadAddres = '<hr><strong><span id="address" style="font-style: italic; color: black;"><img src="img/loading.gif" width="5%" heigth="5%"></span> </strong><br>';
        } else{
          loadAddres = '<hr><strong><span id="address" style="font-style: italic; color: black;">' + address +'</span> </strong><br>';
        }

        addressDelivery += '<ons-card>\
        <h1>Entregar en: <i style="position: absolute; right: 0;" class="fas fa-pencil-alt" onclick="showMapDelivery()"></i></h1>\
        '+loadAddres+'\
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

  setTimeout(function(){ 
    $("#dCart").html(itensInCart); 
    if(address.includes(",")){
      var coords = address.split(",",2)
      var addresf = geocodificacion_inversa(coords[0], coords[1]);
    }}
  , 800);
  setTimeout(function(){ getPosition() }, 900);
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

      saveData("mainAddress", parseFloat(finalLat)+","+parseFloat(finalLng));
    } else {
      var coordsString = JSON.stringify(getData("newLocation")).split(",", 2);

      var latString = coordsString[0].toString();
      var lat = latString.split(":",2);

      var lngString = coordsString[1].toString();
      var lng = lngString.split(":",2);
      
      finalLat = lat[1].toString();
      finalLng = lng[1].toString();

      saveData("mainAddress", parseFloat(finalLat)+","+parseFloat(finalLng));

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
      } else {
        ons.notification.toast("Error al confirmar nueva ubicación", { timeout: 3000, animation: 'fall' })
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
  } else{
    ons.notification.toast("De favor, Selecciona una nueva ubicación!", { timeout: 3000, animation: 'fall' })
  }
 
}

function geocodificacion_inversa(lat, lng) {

  var resultado = "";
  const geocoder = new google.maps.Geocoder();
    const latlng = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        resultado = response.results[0].formatted_address;
        $("#address").html(resultado);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
    return resultado;
}

function showMapDelivery(){

  if (getData("hiddenMap") === "hide"){

    document.getElementById("mapDelivery").style.display = "none";
    document.getElementById("address").style.color = "Black";
    saveData("hiddenMap", "show");
  } else{
    document.getElementById("address").style.color = "Red";
    document.getElementById("mapDelivery").style.display = "block";
    saveData("hiddenMap", "hide");
  }
}

function retrieveRandomId(){
  var random = Math.floor((Math.random() * 100000000));
  while(random.toString < 8){
    random = Math.floor((Math.random() * 100000000));
  }
  return random;
}


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 alert(result);
 return result;
}

function lastPartRequest(length){
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result + currentYear;
}


function startOrder(total){
  var payMethod = "";
  var debit_radio = $("#debit_radio").is(':checked');
  var cash_radio = $("#cash_radio").is(':checked');
  var itensInCart = "";
  var payMethod = "";
  var orderRequest = "";
  var orderList = new Array();
  var deliveryAddress = getData("mainAddress");
  var randomId = retrieveRandomId();
  var letterPx = lastPartRequest(2);
  var idRequest = randomId + currentYear;

  if(debit_radio == true){
    payMethod = 1;
  } else if(cash_radio === true){
    payMethod = 2;
  } else{
    payMethod = 3;
  }

  myDB.transaction(function(transaction) {
    var executeQuery = "SELECT * FROM CART WHERE idUser=? and status=?";
    transaction.executeSql(executeQuery, [4, 0]
    , function(tx, result) {
      var len = result.rows.length;
      var idCart = "";
      if(len > 0){
        for (let index = 0; index < result.rows.length; index++) {
          orderList.push(result.rows.item(index));
          idCart = result.rows.item(index).idCart;
          updateInternalStatus(idCart);
          updateInternalIdRequest(idRequest,idCart);
          //alert(JSON.stringify(result.rows.item(index)));
        }
        orderRequest = {
          idRequest: idRequest,
          idUser: 4,
          payMethod: payMethod,
          total: parseFloat(total.toFixed(2)),
          deliveryLocation: deliveryAddress,
          orderList: orderList
        };

        if(orderRequest.deliveryLocation != null && orderRequest.deliveryLocation.includes(",") === true){
          sendOrder(orderRequest,idCart);
        } else{
          alert("Ingresa una direccion de entrega");
        }
        
      }
    },
    function(error){
      er = JSON.stringify(error);
      alerta(er);
    });
  });

  
}

function sendOrder(orderRequest, idCart){
  
  webservice = baseUrl + pathOrder + "/create";

	$.ajax({
		url: webservice,
		type: 'post',
		data: JSON.stringify(orderRequest),
		headers: {
			"Content-Type": 'application/json',
			"Content-Length": '1',
			"Host": '1'
		},
		dataType: 'json',
		success: function (data) {
			if (data.error == null) {
				//document.querySelector('#myNavigator').pushPage('detailService.html');
        document.querySelector('#myNavigator').popPage();
        setTimeout(function(){ $('#wrapper').trigger('click'); }, 500);
        setTimeout(function(){ ons.notification.toast('Gracias! tu pedido se ha enviado correctamente', { timeout: 3000, animation: 'ascend' }) }, 300);
			} else {
				alerta(JSON.stringify(data.error));
			}
		}
	});
}

function updateInternalStatus(idCart){
  myDB.transaction(function (transaction) {
    var executeQuery = "UPDATE CART SET status=? WHERE idCart=?";
    transaction.executeSql(executeQuery, [1, idCart]
    , function(tx, result) {
      var presistMainAddres = getData("mainAddress");
      cleanData();
      saveData("mainAddress",presistMainAddres);
    },
    function(error){
      console.log('Error occurred');
    });
  });
}

function deleteItemFromMemory(idItem){
  myDB.transaction(function(transaction) {
  var executeQuery = "DELETE FROM CART WHERE idItem=?";
    transaction.executeSql(executeQuery, [idItem],
      function(tx, result) {
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
  saveData("isFromClickMenu", 1);
  loadItems();
  loadBrands();
  loadCarousel();
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

function retrievePed(validate, isClickFromMenu){
  // lanza toast and prepare and load and show status... empty from cache and 
  if(isClickFromMenu == 1){
    saveData("isFromClickOrder", 1);
  }
  webservice = baseUrl + pathOrder + "/" + 4;

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
        saveData("isClickFromMenu", 0);
				//document.querySelector('#myNavigator').pushPage('detailService.html');
        if(data.response.length > 0){
          var tdsinfo = "";
          if(validate){
            saveData("flagAlready", "true");
            return true;
          } else{
            saveData("flagAlready", null);
          }

          setTimeout(function(){
            var msgDelivery = (data.response[0].status.toString() === "0") ? "Buscando repartidor..." : "Preparando entrega...";

            var idOrder = parseInt(data.response[0].idRequest);
            tdsinfo = '<ons-card>\
                <div class="title center"><center> Pedido en curso... </div>\
                <div class="content"><br>\
                <label>Status: <b> ' + msgDelivery + '</b></center><img src="img/loading.gif" width="5%" heigth="5%"></label>\
                <label>Fecha: <b>' + data.response[0].createdDate + '</b></center></label>\
                <label>Descripcion: <b>' + data.response[0].total.toFixed(2) + '</b></center></label>\
                <label>IDPEDIDO: <b>' + idOrder +'</b></center></label>\
                <br><button class="button--cta" style=" width:100%;" onclick="rollbackOrder(' + idOrder + ')"><i class="fa fa-cancel" aria-hidden="true"></i> Cancelar</button></center>\
                </div>\
              </ons-card>';
        
            $("#dinamicOrder").html(tdsinfo);
          },200);
        } else{
          setTimeout(function(){
            var tdsinfo = '<ons-card>\
                <div class="title center"><center>No se encontraron pedidos en curso!</div>\
                </div>\
              </ons-card>';
        
            $("#dinamicOrder").html(tdsinfo);
          },200);
        }
       
        
			} else {
				alerta(JSON.stringify(data.error));
			}
		},
    statusCode: {
      404: function(responseObject, textStatus, jqXHR) {
        setTimeout(function(){
          var tdsinfo = '<ons-card>\
              <div class="title center"><center> No se encontraron pedidos en curso!</div>\
              </div>\
            </ons-card>';
      
          $("#dinamicOrder").html(tdsinfo);
        },200);
        saveData("isClickFromMenu", null);
      },
      503: function(responseObject, textStatus, errorThrown) {
          // Service Unavailable (503) This code will be executed if the server returns a 503 response
      }           
    }
	});
  
}

function rollbackOrder(idRequest){
  var r = confirm("¿Realmente deseas cancelar este pedido?");
  if (r == true) {
    webservice = baseUrl + pathOrder + "/rollback/" + idRequest;

    $.ajax({
      url: webservice,
      type: 'post',
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
            retrievePed(false);
            updateInternalRollBack(idRequest);
            ons.notification.toast("Pedido cancelado exitosamente!", { timeout: 3000, animation: 'ascend' })
          },200);
          
        } else {
          alerta(JSON.stringify(data.error));
        }
      }
    });
  }

}


function updateInternalRollBack(idRequest){
  myDB.transaction(function (transaction) {
    var executeQuery = "UPDATE CART SET status=? WHERE idRequest=?";
    transaction.executeSql(executeQuery, [3, idRequest]
    , function(tx, result) {
      console.log("status rollbacked correctly");
    },
    function(error){
      console.log('Error occurred');
    });
  });
}

function updateInternalIdRequest(idRequest, idCart){
  myDB.transaction(function (transaction) {
    var executeQuery = "UPDATE CART SET idRequest=? WHERE idCart=?";
    transaction.executeSql(executeQuery, [idRequest, idCart]
    , function(tx, result) {
      console.log("status chaged correctly");
    },
    function(error){
      console.log('Error occurred');
    });
  });
}

function showRecord(){

  if(getData("eventRecord") === "show"){
    document.getElementById("dinamicHistory").style.display = "none";
    saveData("eventRecord", "none");
  } else{
    document.getElementById("dinamicHistory").style.display = "block";
    saveData("eventRecord", "show");

    webservice = baseUrl + pathOrder + "/history/" + 4 + "?record=true";
    var tdsinfo = "";
    var idOrder = "";
    $("#dinamicHistory").html(tdsinfo);
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
          if(data.response.length > 0){
          
            setTimeout(function(){
              for (let index = 0; index < data.response.length; index++) {

                tdsinfo += '<ons-card>\
                <div class="content"><br>\
                <label>Fecha de orden: <b>' + data.response[index].createdDate + '</b></center></label>\
                <label>Fecha de entrega: <b>' + data.response[index].deliveryDate + '</b></center></label>\
                <label>Descripcion: <b>' + data.response[index].total.toFixed(2) + '</b></center></label>\
                <label>IDPEDIDO: <b>' + data.response[index].idRequest + '</b></center></label>\
                </div>\
                </ons-card>';
                idOrder = "";
              
              }
            
              $("#dinamicHistory").html(tdsinfo);
            },200);
          } else{
            setTimeout(function(){
               tdsinfo = '<ons-card>\
                  <div class="title center"><center>Aún no has realizado pedidos</div>\
                  </div>\
                </ons-card>';
          
              $("#dinamicHistory").html(tdsinfo);
            },200);
          }
          
        } else {
          alerta(JSON.stringify(data.error));
        }
      },
      statusCode: {
        404: function(responseObject, textStatus, jqXHR) {
          tdsinfo = '<ons-card>\
                  <div class="title center"><center>Aún no has realizado pedidos</div>\
                  </div>\
                </ons-card>';
          
              $("#dinamicHistory").html(tdsinfo);
        },
        503: function(responseObject, textStatus, errorThrown) {
            // Service Unavailable (503)
            // This code will be executed if the server returns a 503 response
          alert("503")
        }           
      }
    });
  }
  
  
}