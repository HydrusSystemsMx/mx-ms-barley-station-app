var baseUrl = "https://freebee-caramel-stimulant.ngrok-free.dev";
var pathItems = "/api/v1/barley/items";
var pathUsers = "/api/v1/barley/users";
var pathBrands = "/api/v1/barley/brand";
var pathOrder = "/api/v1/barley/order";
var pathBanner = "/api/v1/barley/banner";
var BARLEYRQUEST = "BSV1";
var googleWebClientId = "278432192171-14b4vq8klalpkao1940ra70fk32qd1rs.apps.googleusercontent.com";
var currentYear = 2026;

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
  //------------ |     GLOBAL       ----------///
  window.showImageModal = function(imageUrl) {
    let scale = 1;
    let posX = 0;
    let posY = 0;
    const bbvaBlue = "#004481";

    const modal = document.createElement('ons-modal');
    modal.style.zIndex = "9999";
    
    modal.innerHTML = `
        <div style="width: 100vw; height: 100vh; position: relative; background: rgba(0,0,0,0.9); overflow: hidden;">
            
            <!-- Botón X: Siempre presente -->
            <div onclick="this.closest('ons-modal').hide()" 
                 style="position: fixed; top: 20px; right: 20px; width: 40px; height: 40px; 
                 background: ${bbvaBlue}; color: white; border-radius: 50%; display: flex; 
                 align-items: center; justify-content: center; cursor: pointer; z-index: 10000; font-size: 20px;">
                &times;
            </div>

            <!-- Contenedor del área arrastrable -->
            <div id="drag-container" style="position: absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                <img id="zoom-img" src="${imageUrl}" 
                     style="max-width: 80%; transition: transform 0.1s; cursor: grab; position: relative; left: 0px; top: 0px;">
            </div>

            <!-- Botones -->
            <div style="position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; gap: 15px; background: white; padding: 10px; border-radius: 30px; z-index: 9999;">
                <button id="btn-zoom-out" style="width: 50px; height: 50px; border-radius: 50%; border: none; background: ${bbvaBlue}; color: white; font-size: 24px;">−</button>
                <button id="btn-zoom-in" style="width: 50px; height: 50px; border-radius: 50%; border: none; background: ${bbvaBlue}; color: white; font-size: 24px;">+</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.show();

    const img = modal.querySelector('#zoom-img');
    const container = modal.querySelector('#drag-container');

    const updateTransform = () => {
        img.style.transform = `scale(${scale}) translate(${posX / scale}px, ${posY / scale}px)`;
    };

    modal.querySelector('#btn-zoom-in').onclick = () => { scale += 0.2; updateTransform(); };
    modal.querySelector('#btn-zoom-out').onclick = () => { if (scale > 0.4) scale -= 0.2; updateTransform(); };

    // Lógica de arrastre libre
    let isDown = false;
    let startX, startY;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        img.style.cursor = 'grabbing';
        startX = e.pageX - posX;
        startY = e.pageY - posY;
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        img.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        posX = e.pageX - startX;
        posY = e.pageY - startY;
        updateTransform();
    });
    
    modal.addEventListener('posthide', () => modal.remove());
};

  //------------ |     DATE       ----------///
  const fechaHora = (ts) => {
    const d = new Date(Number(ts));
    
    // Fuerza el ajuste de México (CST: UTC-6)
    // Esto asegura que, sin importar el país, la hora sea la de México
    const mexicoOffset = -6; 
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * mexicoOffset));

    return nd.toLocaleString('es-MX', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false
    }).replace(',', '');
  };
  //------------ |     GPS       ----------///

  $.ajaxSetup({
    headers: {
        "ngrok-skip-browser-warning": "69420"
    }
  });

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
function loginGuest(){
  alerta("login gest")
  const guestRequest = {
    name: "Guest_" + Math.floor(Math.random() * 9000),
    profileImage: "img/perfil.png", // <--- ESTO ES LO QUE DEBES PONER
    mail: ""
  };

  createBarlayUser(guestRequest);

  
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

  webservice = baseUrl + pathUsers + "/" + getData("idUser");
	$.ajax({
		url: webservice,
		type: 'get',
		data: null,
		headers: {
			"Content-Type": 'application/json'
		},
		dataType: 'json',
		success: function (data) {       
        console.log(JSON.stringify(data));
        setTimeout(function(){
          const val = (v) => (v && v !== "null" && v !== "undefined" && v !== "") ? v : "No registrado";

          var tdsinfo = `
          <div class="profile-card">
              <div class="profile-main">
                  <img src="${data.profileImage || 'https://ui-avatars.com/api/?name=' + data.name}" class="avatar">
                  <h2 class="user-name">¡Hola, ${val(data.name).split(' ')[0]}!</h2>
              </div>
          
              <div class="profile-details">
                  <div class="row">
                      <span class="label">Nombre </span>
                      <span class="value">${val(data.name)}</span>
                  </div>
                  <div class="row">
                      <span class="label">Teléfono</span>
                      <span class="value">${val(data.phone)}</span>
                  </div>
                  <div class="row">
                      <span class="label">Correo</span>
                      <span class="value">${val(data.mail)}</span>
                  </div>
                  <div class="row">
                      <span class="label">Dirección</span>
                      <span class="value">${val(data.address)}</span>
                  </div>
              </div>
          
              <button class="btn-logout" onclick="cerrarSesion();">
                  <i class="fa fa-power-off" style="margin-right: 8px;"></i> Cerrar Sesión
              </button>
          </div>`;
          
          $("#lst_info").html(tdsinfo);
      },200);
		},
    error: function (xhr, status, error) {
        // Aquí solo entrará si el código es 4xx o 5xx
        alerta("Error en el servidor: " + status);
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
  var dialog = `
  <ons-dialog id="dialog-1">
    <ons-card>
      <center>
        <table class="bs-table">
          <tr>
            <td><strong>Precio:</strong></td>
            <td><span style="color:#F84C09;">$ ${price.toFixed(2)}</span></td>
          </tr>
          <tr>
            <td><strong>Disponibles:</strong></td>
            <td><span style="color:#F84C09;">${stack}</span></td>
          </tr>
        </table>
        
        <table class="bs-table" style="margin-top:10px;">
          <tr>
            <td></td>
            <td><button style="visibility: hidden;">space</button></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <center>
                <img onclick="plusUnit(${stack})" style="width:13%; height:13%; cursor:pointer;" src="img/pluss_1.png" alt="+"/>
              </center>
            </td>
            <td>
              <center>
                <input 
                  type="number" 
                  placeholder="1" 
                  style="width:60%; height:25px; color:black;border: none; background-color: transparent; outline: none; font-weight: bold;" 
                  id="units"
                  value="${getData('amount_' + idItem) != null ? parseInt(getData('amount_' + idItem)) : 1}"
                />
              </center>
            </td>
            <td>
              <center>
                <img onclick="lessUnit()" style="width:13%; height:13%; cursor:pointer;" src="img/less_1.png" alt="-" />
              </center>
            </td>
          </tr>
          <tr>
            <td></td>
            <td><button style="visibility: hidden;">space</button></td>
            <td></td>
          </tr>
        </table>
        
        <br/>
  <button class="modern-button" onclick="addToCart(${data[i].price.toFixed(2)}, ${data[i].stack}, ${data[i].id})">Confirmar</button>
        
        <ons-button 
          id="close-btn-dialog" 
          onclick="closeDialog()" 
          style="background-color:red; margin-top:10px;">
          <div style="width:100%; text-align:center;">
            <i class="fas fa-window-close"></i>
          </div>
        </ons-button>
      </center>
    </ons-card>
  </ons-dialog>`;

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

// 1. Recibimos imageUrl como nuevo parámetro
function addToCart(price, stack, idItem, imageUrl, details) {

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
      // 2. Usamos directamente imageUrl que recibimos del botón
      // var img = $('#img_'+ idItem).val(); // Ya no dependemos de este input oculto
      var img = imageUrl; 
      var dtl = details;

      myDB.transaction(function(transaction) {
        var executeQuery = "SELECT * FROM CART WHERE idItem=? and status=?";
        transaction.executeSql(executeQuery, [idItem, 0]
        , function(tx, result) {
          var len = result.rows.length;
          if(len > 0){  
            var newAmount = parseInt(units);
            showCustomConfirm(
              "¿Deseas actualizar tu producto de: " + result.rows.item(0).amount + " a: " + newAmount + "?",
              function(r) {
                if (r) {
                  updateAmountItem(idItem, newAmount);
                }
              }
            );
          } else{
            //SEARCH ALREADY ORDERS
            retrievePed(true);
            setTimeout(function(){ 
              if(getData("flagAlready") === "true"){
                ons.notification.toast("Aún cuentas con un pedido en curso...", { timeout: 1500, animation: 'ascend' })
                setTimeout(function(){ $('#wrapper').trigger('click'); }, 100);
              } else{
                // 3. Pasamos la variable 'img' que contiene la URL recibida
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
    // Aseguramos que los parámetros coincidan con los 7 campos de la tabla
    var executeQuery = "INSERT INTO CART (idItem, idUser, amount, image, price, detail, status) VALUES (?,?,?,?,?,?,?)";
    
    // img e details vienen ahora directamente desde addToCart()
    transaction.executeSql(executeQuery, [idItem, idUser, units, img, price, details, 0], 
    function(tx, result) {
      // Éxito: navegamos y actualizamos memoria
      cambiar_menu('carrito');
      saveData("amount_" + idItem, units);
      
      // Asegúrate de que esta función recargue la vista correctamente
      if (typeof loadItemsFromMemory === 'function') {
        loadItemsFromMemory();
      }
    },
    function(error){
      // Error: mostramos el error específico para depuración
      console.error("Error SQL:", error);
      alerta('Error al guardar el producto en el carrito');
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
  
  var init = '<td><ons-select id="choose-sel" onchange="searchByIdBrand()"><option value="1000">Todos... <i class="fa-thin fa-magnifying-glass"></i></option>' ;
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
        "Content-Type": 'application/json'
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
			"Content-Type": 'application/json'
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
			"Content-Type": 'application/json'
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
}


  function setItems(data) {
      let tdsp = "";
      let tdsp2 = "";
      const middleListLength = data.length / 2;
  
      // Limpiamos contenedor de marcas
      setTimeout(function() { $("#dinamicItemsBrand").html(""); }, 100);
  
      for (var i = 0; i < data.length; i++) {
          const item = data[i];
          const amount = getData("amount_" + item.id) || 1;
  
          const cardHTML = `
          <ons-card class="card-modern" id="item_${item.id}">
              <div style="display: flex; justify-content: flex-end; width: 100%; margin-bottom: 5px;">
                  <div onclick="showImageModal('${item.image}')" style="cursor: pointer; padding: 5px;">
                      <ons-icon icon="md-search" size="24px" style="color: #4CAF50;"></ons-icon>
                  </div>
              </div>
              <img class="img-product" src="${item.image}">
              <div style="width: 100%; text-align: center;">
                  <h3 style="margin: 5px 0; font-size: 1.1em;">${item.nameItem}</h3>
                  <p style="color: #666; font-size: 0.85em; margin: 0;">${item.details}</p>
                  <p style="font-size: 1.2em; font-weight: bold; margin: 10px 0;">$ ${item.price.toFixed(2)}</p>
              </div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin: 10px 0;">
                  <button class="btn-qty" style="background-color:#f44336;" onclick="lessUnit(${item.id})">−</button>
                  <input type="number" value="${amount}" id="units_${item.id}" style="width: 40px; text-align:center; border: 1px solid #ddd; border-radius: 8px;">
                  <button class="btn-qty" style="background-color:#4CAF50;" onclick="plusUnit(${item.stack}, ${item.id})">+</button>
              </div>
              <button class="modern-button" onclick="addToCart(${item.price.toFixed(2)}, ${item.stack}, ${item.id}, '${item.image}', '${item.nameItem} ${item.details}')">
                  Confirmar
              </button>
          </ons-card>`;
  
          if (i <= (Math.round(middleListLength) - 1)) {
              tdsp += cardHTML;
          } else {
              tdsp2 += cardHTML;
          }
      }
  
      // Renderizado al DOM (Ahora sí está dentro de la función)
      setTimeout(function() { 
          $("#dinamicItems").html(tdsp); 
          $("#dinamicItems2").html(tdsp2); 
      }, 100);
  } // <--- ESTA ES LA ÚNICA LLAVE QUE CIERRA LA FUNCIÓN setItems

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
            <ons-list-item>Precio: $ ' + result.rows.item(index).price.toFixed(2) + '</ons-list-item>\
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

        addressDelivery += `
        <ons-card class="delivery-card">
        <!-- Cabecera con 3 botones rápidos -->
        <div class="delivery-header">
        <span class="delivery-label">Entregar en:</span>
        <div class="actions-wrapper">
          <!-- Botón para abrir el mapa -->
          <button class="action-btn" onclick="showMapDelivery()">
            <i class="fas fa-map-marker-alt"></i> Cambiar
          </button>
      
          <!-- Botón Confirmar (Oculto inicialmente) -->
          <button id="confirm-btn-header" class="action-btn confirm-action" 
                  onclick="confirmNewAddress()" style="display: none;">
            <i class="fas fa-check"></i> Confirmar
          </button>
        </div>
      </div>
        
        <div id="address-display" class="address-text">${loadAddres}</div>
      
        <!-- Contenedor del mapa -->
        <div id="mapDelivery" class="map-container" style="display: none;">
          <div id="pac-container" class="search-box-wrapper">
            <i class="fas fa-search search-icon"></i>
            <input id="pac-input" type="search" placeholder="Escribe la dirección..." autocomplete="off" />
          </div>
          <div id="map" class="map-view"></div>
          <div id="infowindow-content" class="info-card">
            <div id="place-name" style="font-weight: 600;"></div>
            <div id="place-address" style="font-size: 0.85rem; color: #666;"></div>
          </div>
        </div>
      </ons-card>
        `;

        payMethod += '<ons-card><center><h1>Método de pago </h1></center><br>\
        <div style="margin-bottom:10px;">\
          <label class="radio-button radio-button--material">\
            <input type="radio" class="radio-button__input radio-button--material__input" id="debit_radio" name="r" checked="checked">\
            <div class="radio-button__checkmark radio-button--material__checkmark"></div>\
            Tarjeta de Credito/Debito\
          </label>\
        </div>\
        <div style="margin-bottom:10px;">\
          <label class="radio-button radio-button--material">\
            <input type="radio" class="radio-button__input radio-button--material__input" id="cash_radio" name="r" >\
            <div class="radio-button__checkmark radio-button--material__checkmark"></div>\
            Pago en Efectivo\
          </label>\
        </div>\
        <div style="margin-bottom:10px;">\
          <label class="radio-button radio-button--material">\
            <input type="radio" class="radio-button__input radio-button--material__input" id="transfer_radio" name="r">\
            <div class="radio-button__checkmark radio-button--material__checkmark"></div>\
            Transferencia Bancaria\
          </label>\
        </div></ons-card>';

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

    const btnConfirm = document.getElementById('confirm-btn-header');
    btnConfirm.style.display = 'none'; 
    
    // 3. Cerrar el mapa
    document.getElementById('mapDelivery').style.display = 'none';
    
    console.log("¡Confirmado y botón ocultado!");

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

function showMapDelivery() {
  const mapContainer = document.getElementById('mapDelivery');
  
  // Verificamos si está oculto o visible
  if (mapContainer.style.display === 'none' || mapContainer.style.display === '') {
      mapContainer.style.display = 'block';
      
      // --- TRUCO IMPORTANTE ---
      // Si usas Google Maps, el mapa necesita "saber" que ahora es visible
      // para renderizarse correctamente. Si el objeto 'map' ya existe, le notificamos el cambio:
      if (typeof map !== 'undefined') {
          google.maps.event.trigger(map, 'resize');
          // Opcional: Centrarlo de nuevo en la posición actual
          map.setCenter(map.getCenter()); 
      }
  } else {
      mapContainer.style.display = 'none';
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
			"Content-Type": 'application/json'
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
			"Content-Type": 'application/json'
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
            var msgDelivery = (data.response[0].status.toString() === "0") ? "Asignando pedido..." : "En camino...";

            var idOrder = parseInt(data.response[0].idRequest);
            tdsinfo = '<ons-card>\
                <div class="title center"><center> Pedido en curso... </div>\
                <div class="content"><br>\
                <label>Status: <b> ' + msgDelivery + '</b></center><img src="img/loading.gif" width="5%" heigth="5%"></label><br>\
                <label>Fecha: <b>' + fechaHora(data.response[0].createdDate) + '</b></center></label><br>\
                <label>Descripcion: <b>' + data.response[0].total.toFixed(2) + '</b></center></label><br>\
                <label>IDPEDIDO: <b>' + idOrder +'</b></center></label><br>\
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
          var tdsinfo = '';
      
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
        "Content-Type": 'application/json'
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
        "Content-Type": 'application/json'
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
                  <div class="title center"><center>No se encontraron pedidos</div>\
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

function loginWithGoogle() {
  window.plugins.googleplus.login({
      'webClientId': googleWebClientId,
      'offline': true,
      'forceWebLogin': false
  }, function (obj) {
    const userRequest = {
      name: (obj.givenName || "") + " " + (obj.familyName || ""),
      profileImage: obj.imageUrl || "",
      mail: obj.email || "",
    };
    createBarlayUser(userRequest);
  }, function (err) {
      alerta("Error de login: " + err);
  });
}

function createBarlayUser(userRequest){
   // Create user
    var webservice = baseUrl + pathUsers + "/create";
    $.ajax({
        url: webservice,
        type: 'post',
        data: JSON.stringify(userRequest),
        headers: { "Content-Type": 'application/json' },
        dataType: 'text',
        success: function (data) {
          var response;
          try {
              response = JSON.parse(data);
          } catch (e) {
              alerta("Error al procesar JSON");
              return;
          }
      
          setTimeout(function () {
              try {
                  // Guardado
                  saveData("idUser", response.idUser);
                  saveData("user", JSON.stringify(response));
                  location.reload();
                  cambiar_menu("page_menu");
      
                  // Ejecución blindada: si una falla, la siguiente continúa
                  try { loadItems(); } catch(e) { console.error("Error en loadItems:", e); }
                  try { loadBrands(); } catch(e) { console.error("Error en loadBrands:", e); }
                  try { loadCarousel(); } catch(e) { console.error("Error en loadCarousel:", e); }
      
              } catch (err) {
                  alerta("Error crítico en el flujo: " + err.message);
              }
          }, 200);
      },
        error: function (xhr, status, error) {
            alerta("Error en el servidor: " + status);
        }
    });
}