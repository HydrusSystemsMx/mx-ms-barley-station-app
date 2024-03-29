var web = "https://www.farmamigoexpress.com/isaac/test/FillApp/ws/";

function removePanel(page){
    var navigate = document.querySelector("#navigator");
    if(page == null || page == "") navigate.popPage();
    else navigate.removePage(page);
}

function showAdvise(title, msg, type, fn){

    var content = {title: title, message: msg, modifier: styleApp};
    switch (type) {
        case 'alert':
            if(showAlert) return null;
            showAlert = 1;

            content.buttonLabels = ["Aceptar"];
            ons.notification.alert(content).then(function(){
                "use strict";
                showAlert = 0;
            });
            break;

        case 'prompt':
            if(showAlert) return null;
            showAlert = 1;

            content.buttonLabels = ["Cancelar", "Aceptar"];
            ons.notification.prompt(content).then(function (data) {
                showAlert = 0;
                fn(data);
            });
            break;

        case 'confirm':
            if(showAlert) return null;
            showAlert = 1;

            content.buttonLabels = ["No", "Si"];
            ons.notification.confirm(content).then(function (data) {
                showAlert = 0;
                fn(data);
            });
            break;

        case 'toast':
            content.timeout = 2000;
            content.animation = "lift";
            ons.notification.toast(content);
            break;
    }
}

var DistanciaGPS = function(lat1,lon1,lat2,lon2){
    var R = 6371000;
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return parseFloat(d.toFixed(1));
} 

function cerrarSesion(){ //COMPARA SI NO HAY PEDIDOS EN RUTA O PEND DE ENVIAR ANTES DE HACER PŔOCESO
  navigator.app.exitApp();
  cleanData();
}

    
function alerta(msg){
  $("#text-msg").text(msg);
  document.getElementById("alert-pop").show();    
}

function alertpivote(){
    document.getElementById("alert-pivote").show();   
}

function cambiar_menu(pagina){          
  document.querySelector('#myNavigator').pushPage(pagina+'.html', {data: {title: pagina}});
}

var hideDialog = function () {
  document.getElementById('alert-pop').hide();
};

var hideDialogVoydeRegreso = function () {
  document.getElementById('alert-pivote').hide();
};

function addItem(html,seccion,tipo){
  var list = document.querySelector("#"+seccion);
  var newItem = document.createElement(tipo);
  newItem.innerHTML=html;
 // console.log(list);
  list.appendChild(newItem);
}

function DateActual(){ //GET FECHA ACTUAL DEL TELEFONO
    var fecha =  new Date();
    var year = fecha.getFullYear();
    var mes = fecha.getMonth();
    var dia = fecha.getDate();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    var mes_actual = mes+1;

    if(mes_actual<10){mes_actual='0'+mes_actual}
    if(dia<10){dia='0'+dia}
    if(hora<10){hora='0'+hora}
    if(minutos<10){minutos='0'+minutos}
    if(segundos<10){segundos='0'+segundos}

    var fecha = (year+"-"+mes_actual+"-"+dia+" "+hora+"-"+minutos+"-"+segundos);
    var fecha_hora = fecha.toString();
    return fecha_hora;
}


var DistanciaGPS = function(lat1,lon1,lat2,lon2){
    var R = 6371000;
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return parseFloat(d.toFixed(1));
} 

var rad = function(x) {
    return x*Math.PI/180;
}

