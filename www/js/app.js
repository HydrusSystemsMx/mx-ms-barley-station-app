var baseUrl = "http://10.0.2.2:8081";
var pathItems = "/api/v1/barley/items";
var pathUsers = "/api/v1/barley/users";
var pathBrands = "/api/v1/barley/brand";
var pathOrder = "/api/v1/barley/order";
var pathBanner = "/api/v1/barley/banner";
var BARLEYRQUEST = "BSV1";
var currentYear = 2025;

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

// BATERÍA-MODELO
function onBatteryStatus(info) {
    if (info.level<=20)
        baterylow();

    if (info.isPlugged) {
        $("#status").text(device.model+"  |  "+"Batería:"+info.level+"%" +"  |  "+"Cargando...");
    } else {
        $("#status").text(device.model+"  |   "+"Batería:"+info.level+"%");
    }
}

function baterylow() {
    alerta("Batería Baja");
    navigator.vibrate(2000);
}

function log(txt) {
    cont++;
    $("#lista_log").prepend("<hr><span color='purple'>"+cont+".-"+txt+"</span></br>");
}

function log2(txt) {
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
    } else {
        latitud1 = latitud;
        longitud1 = longitud;

        latitud2 = position.coords.latitude;
        longitud2 = position.coords.longitude;
        ultimaDistancia=DistanciaGPS(latitud1,longitud1,latitud2,longitud2);
        console.log("Ultima distancia "+ultimaDistancia);
        if(ultimaDistancia>primeraDistancia||ultimaDistancia>=8){
            primeraDistancia=ultimaDistancia;
            if(DistanciaGPS(latitud1,longitud1,latitud2,longitud2)>=distanciaMts)
                cincometros_back(latitud2,longitud2);
        } else {
            console.log("yellow");
        }
    }
};

var onError = function (error){
    console.log('BackgroundGeolocation error');
    $("#imgStatus").attr("src","img/red.png");
};

function gps_back() {
    watchID = navigator.geolocation.watchPosition(onSuccess, onError,{
        enableHighAccuracy: true,
        timeout: 1500,
        maximumAge: 2500,
        desiredAccuracy: 0    
    });

    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.disableWebViewOptimizations();

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

327527612

function updatePositionBack(latitud,longitud) {
    console.log("FIRST ONE: "+ latitud +", "+ longitud);
}

/* PROCESOS LOGIN */
function login() {
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
            //showAdvise("FillGas Repartidor",data.mensaje,"alerta");
            //id_repartidor = data.id_repartidor;
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

function trigger_autologin() {
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
        webservice =  web+"login.php?jsoncallback=?";
        $.getJSON(webservice,{email:email, pass:pass })
        .done(function(data,err){
            if(data.validacion){
                //showAdvise("FillGas Repartidor",data.mensaje,"alerta");
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

function perfilInfo() {
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
                }, 200);
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
    });  */
}

function nuevoInventario() {
    $("#ConstruirInventario").show();
    $("#BtnCancelCreate").show();
    $("#BtnCreateNewInv").hide();
}

function CancelMakeInv() {
    $("#ConstruirInventario").hide();
    $("#BtnCreateNewInv").show();
    $("#BtnCancelCreate").hide();
}

function plusUnit(maxUnit, idItem) {
    var units = $("#units_" + idItem).val();

    if (units == null || units == '0' || units == undefined || units == '') { units = 0; }
    var newUnit = parseInt(units) + 1;
    if (newUnit <= maxUnit) { $("#units_" + idItem).val(newUnit); }
}

function showDialog(idItem, price, stack) {
    var dialog = '<ons-dialog id="dialog-1">\
  <ons-card > \
      <center>\
        <table class="bs-table">\
          <tr>\
            <td><strong> Precio: </strong></td>\
            <td><span style="color:#F84C09;">$  ' + price.toFixed(2) + ' </span></td>\
          </tr>\
          <tr>\
          <td><strong> Disponibles: </strong></td>\
          <td><span style="color:#F84C09;">  ' + stack + ' </span></td>\
          </tr>\
        </table>\
        <table class="bs-table">\
            <tr>\
                <td></td>\
                <td><button style="visibility: hidden;">space</button></td>\
                <td></td>\
            </tr>\
            <tr>\
                <td> <center><img onclick="plusUnit(' + stack + ' , ' + idItem + ')" style="width:13%; height:13%" src="img/pluss_1.png"></center> </td>\
                <td>  <center><input type="number" placeholder="0" style="width:60%; height: 15%; color: black; border: none; text-align: center;" id="units"></center></td>\
                <td> <center><img onclick="lessUnit(' + idItem + ')" style="width:13%; height:13%" src="img/less_1.png"></center> </td>\
            </tr>\
            <tr>\
                <td></td>\
                <td><button style="visibility: hidden;">space</button></td>\
                <td></td>\
            </tr>\
        </table>\
        <br>\
        <ons-button onclick="addToCart(' + price.toFixed(2) + ', ' + stack + ', ' + idItem + ')" style="background-color:teal; width: 100%;">AGREGAR</ons-button>\
        <ons-button id="close-btn-dialog"  onclick="closeDialog()" style="background-color:red; "><div style="width: 100%;"> <i class="fas fa-window-close" ></i></div></ons-button>\
      </center>\
  </ons-card>\
</ons-dialog>';

    $("#dinamicDialog").html(dialog);
    document.getElementById('dialog-1').show();
}

function closeDialog() {
    close();
}

function hideDialog() {
    $("#units").val(0);
    document.getElementById('dialog-1').hide();
}

function lessUnit(idItem) {
    var units = $("#units_" + idItem).val();
    if (units > 1) {
        var newUnit = parseInt(units) - 1;
        $("#units_" + idItem).val(newUnit);
    }
}

function addToCart(price, stack, idItem) {
    var cartElement = "";
    var units = $("#units_" + idItem).val();
    setTimeout(function() { $("#dCart").html(cartElement); }, 90);

    if (units > stack) {
        ons.notification.toast("cantidad no disponible para agregar. Max: " + stack, { timeout: 1500, animation: 'ascend' });
        $("#units_" + idItem).val(stack);
    } else if (units == 0) {
        ons.notification.toast('La cantidad no puede ser 0', { timeout: 1500, animation: 'ascend' });
        $("#units_" + idItem).val(1);
    } else {
        var img = $('#img_' + idItem).val();
        var dtl = $('#dtl_' + idItem).val();

        myDB.transaction(function(transaction) {
            var executeQuery = "SELECT * FROM CART WHERE idItem=? and status=?";
            transaction.executeSql(executeQuery, [idItem, 0],
                function(tx, result) {
                    var len = result.rows.length;
                    if (len > 0) {
                        var newAmount = parseInt(units);
                        var r = confirm("Deseas actualizar tu producto de: " + result.rows.item(0).amount + " a: " + newAmount);
                        if (r == true) {
                            updateAmountItem(idItem, newAmount);
                        }
                    } else {
                        //SEARCH ALREADY ORDERS
                        retrievePed(true);
                        setTimeout(function() {
                            if (getData("flagAlready") === "true") {
                                ons.notification.toast("Aún cuentas con un pedido en curso...", { timeout: 1500, animation: 'ascend' });
                                setTimeout(function() { $('#wrapper').trigger('click'); }, 100);
                            } else {
                                instertIntoMemory(idItem, 4, units, img, price, dtl);
                            }
                        }, 400);
                    }
                },
                function(error) {
                    er = JSON.stringify(error);
                    alerta(er);
                });
        });
    }
}

function updateAmountItem(idItem, amount) {
    myDB.transaction(function(transaction) {
        var executeQuery = "UPDATE CART SET amount=? WHERE idItem=?";
        transaction.executeSql(executeQuery, [amount, idItem],
            function(tx, result) {
                saveData("amount_" + idItem, amount);
                cambiar_menu('carrito');
                loadItemsFromMemory();
            },
            function(error) {
                console.log('Error occurred');
            });
    });
}

function instertIntoMemory(idItem, idUser, units, img, price, details) {
    myDB.transaction(function(transaction) {
        var executeQuery = "INSERT INTO CART (idItem, idUser, amount, image, price, detail, status) VALUES (?,?,?,?,?,?,?)";
        transaction.executeSql(executeQuery, [idItem, idUser, units, img, price, details, 0],
            function(tx, result) {
                cambiar_menu('carrito');
                saveData("amount_" + idItem, units);
                loadItemsFromMemory();
            },
            function(error) {
                er = JSON.stringify(error);
                alerta('Error occurred');
            });
    });
}

function loadBrands() {
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
        success: function(data) {
            if (data.error == null) {
                if (data != null || data != undefined) {
                    setBrands(data);
                }
            } else {
                alerta(JSON.stringify(data.error));
            }
        }
    });
}

function setBrands(data) {
    var start = '<center><table><tr>';
    var init = '<td><ons-select id="choose-sel" onchange="searchByIdBrand()"><option value="1000">Todos los productos.. <i class="fa-thin fa-magnifying-glass"></i></option>';
    var tdsp = "";
    var final = "</ons-select></td>";
    for (var i = 0; i < data.length; i++) {
        tdsp += '<option value="' + data[i].id + '">' + data[i].brandName + '</option>';
    }
    var last = '</tr></table></center>';

    var finalHtml = start + init + tdsp + final + last;
    setTimeout(function() { $("#dinamicBrands").html(finalHtml); }, 100);
}

function searchByIdBrand() {
    var idBrand = $("#choose-sel").val();
    if (idBrand == 1000) {
        loadItems();
    } else {
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
            success: function(data) {
                if (data.length > 0) {
                    setItemsBrand(data);
                } else {
                    ons.notification.toast("No se encontraron productos disponibles para esta marca..", { timeout: 3000, animation: 'ascend' });
                    loadItems();
                }
            }
        });
    }
}

function setDinamicCarousel(data) {
    var dinamicCarousel = "";
    var tdsp = "";
    var init = '<ons-carousel swipeable auto-scroll overscrollable id="carousel" style="height: 250px;">';
    var final = '</ons-carousel>';
    for (var i = 0; i < data.length; i++) {
        tdsp += '<ons-carousel-item style="background-image:url(' + data[i].url + '); background-repeat: no-repeat; background-size: cover;">\
        <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">\
        </div></ons-carousel-item>';
    }
    dinamicCarousel = init + tdsp + final;
    setTimeout(function() { $("#dinamicCarousel").html(dinamicCarousel); }, 200);
}

function loadCarousel() {
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
        success: function(data) {
            if (data.error == null) {
                if (data != null || data != undefined) {
                    setDinamicCarousel(data);
                }
            } else {
                alerta(JSON.stringify(data.error));
            }
        }
    });
}

function loadItems() {
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
        success: function(data) {
            if (data.error == null) {
                if (data != null || data != undefined) {
                    setItems(data);
                }
            } else {
                alerta(JSON.stringify(data.error));
            }
        }
    });

    function setItems(data) {
        var tdsp = "";
        var tdsp2 = "";
        var inptItems = "";
        var middleListLength = data.length / 2;

        setTimeout(function() { $("#dinamicItemsBrand").html(""); }, 100);

        for (var i = 0; i < data.length; i++) {
            var itemId = data[i].id;
            if (i <= (Math.round(middleListLength) - 1)) {
                tdsp += '<div style="heigth:30%;">\
                <ons-card id="item_' + data[i].id + '">\
                <table>\
                  <tr>\
                    <td>\
                      <center>\
                        <div><input type="text" id="img_' + data[i].id + '" style="display: none;" value="' + data[i].image + '"><input type="text" id="dtl_' + data[i].id + '" style="display: none;" value="' + data[i].details + '"><img id="" style="width:30%; height:50%;" src="' + data[i].image + '"></div>\
                        <span><strong></strong>' + data[i].details + '</span><span class="list-item__subtitle"></span><br>\
                        <small>' + data[i].nameItem + '<span class="list-item__subtitle"></span></small><br><br>\
                        <span><strong><strong> $ ' + data[i].price.toFixed(2) + '</strong><br><br>\
                        <div style="height: 25px; width: auto;">\
                          <center><img onclick="plusUnit(' + data[i].stack + ' ,' + data[i].id + ')" style="width:13%; height:13%" src="img/pluss_1.png">';
                if (getData("amount_" + data[i].id.toString()) != null) {
                    $("#units_" + data[i].id).val(parseInt(getData("amount_" + data[i].id)));
                    inptItems = '<input type="number" value="' + parseInt(getData("amount_" + data[i].id)) + '" placeholder="' + parseInt(getData("amount_" + data[i].id)) + '" style="width:20%; height: 15%; color: black; border: none; text-align: center;" id="units_' + data[i].id + '">';
                } else {
                    inptItems = '<input type="number" placeholder="0" style="width:20%; height: 15%; color: black; border: none; text-align: center;" id="units_' + data[i].id + '">';
                }
                tdsp += inptItems + '<img onclick="lessUnit(' + data[i].id + ')" style="width:13%; height:13%" src="img/less_1.png"></center>\
                </div>\
                <br>\
                <div style="height: 50px; width: auto;"><center><ons-button onclick=" onclick="addToCart(' + data[i].price.toFixed(2) + ' , ' + data[i].stack + ' , ' + data[i].id + ')" style="background-color:teal; width: 100%;">AGREGAR</ons-button></center></div> \
                <br>\
                </center>\
              </center>\
            </td>\
          </tr>\
        </table>';
                tdsp += '</ons-card>';
            } else {
                tdsp2 += '<div">\
                <ons-card id="item_' + data[i].id + '" style="heigth:30%;">\
                <table>\
                  <tr>\
                    <td>\
                      <center>\
                        <div><input type="text" id="img_' + data[i].id + '" style="display: none;" value="' + data[i].image + '"><input type="text" id="dtl_' + data[i].id + '" style="display: none;" value="' + data[i].details + '"><img id="" style="width:30%; height:30%" src="' + data[i].image + '"></div>\
                        <span>' + data[i].details + '</span><span class="list-item__subtitle"></span><br>\
                        <small>' + data[i].nameItem + '<span class="list-item__subtitle"></span></small><br><br>\
                        <span><strong> $ ' + data[i].price.toFixed(2) + '</strong></span><br><br>\
                        <div style="height: 25px; width: auto;">\
                          <center><img onclick="plusUnit(' + data[i].stack + ' ,' + data[i].id + ')" style="width:13%; height:13%" src="img/pluss_1.png">';
                if (getData("amount_" + data[i].id.toString()) != null) {
                    $("#units_" + data[i].id).val(parseInt(getData("amount_" + data[i].id)));
                    inptItems = '<input type="number" value="' + parseInt(getData("amount_" + data[i].id)) + '" placeholder="' + parseInt(getData("amount_" + data[i].id)) + '" style="width:20%; height: 15%; color: black; border: none; text-align: center;" id="units_' + data[i].id + '">';
                } else {
                    inptItems = '<input type="number" placeholder="0" style="width:20%; height: 15%; color: black; border: none; text-align: center;" id="units_' + data[i].id + '">';
                }
                tdsp2 += inptItems + '<img onclick="lessUnit(' + data[i].id + ')" style="width:13%; height:13%" src="img/less_1.png"></center>\
                </div>\
                <br>\
                <div style="height: 50px; width: auto;"><center><img onclick="addToCart(' + data[i].price.toFixed(2) + ' , ' + data[i].stack + ' , ' + data[i].id + ')" style="width:18%; height:18%" src="img/confirm.png"></center></div> \
                <br>\
                </center>\
              </center>\
            </td>\
          </tr>\
        </table>';
                tdsp2 += '</ons-card></div>';
            }
        }
        saveData("isFromClickMenu", 0);
        setTimeout(function () { $("#dinamicItems").html(tdsp); }, 100);
        setTimeout(function () { $("#dinamicItems2").html(tdsp2); }, 100);
    }

    function noItemsFound() {
        var tdsp = '<ons-list-item id="item_not_found">\
        <center>\
        <table>\
        <tr>\
        <td></td>\
        <td><center><img style="width:30%; height:30%" src="img/beer.png"></center></td>\
        <td></td>\
        </tr>\
        </table>\
        <span><strong></strong>No se encontraron resultados</span><span class="list-item__subtitle"></span><br>\
        </ons-list-item>';

        setTimeout(function () { $("#dinamicItems").html(tdsp); }, 100);
    }
}

// Resto de funciones continuan igual...