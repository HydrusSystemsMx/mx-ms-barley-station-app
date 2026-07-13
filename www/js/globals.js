const web = "https://www.farmamigoexpress.com/isaac/test/FillApp/ws/";

// Función para remover panel o página
function removePanel(page){
    var navigate = document.querySelector("#navigator");
    if(page == null || page == "") navigate.popPage();
    else navigate.removePage(page);
}

// Función para mostrar diferentes tipos de avisos
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

// Función para calcular distancia GPS
var DistanciaGPS = function(lat1,lon1,lat2,lon2){
    var R = 6371000;
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return parseFloat(d.toFixed(1));
} 

// Función para mostrar alerta personalizada
function alerta(msg){
  $("#text-msg").text(msg);
  document.getElementById("alert-pop").show();    
}

// Función para mostrar pivote
function alertpivote(){
    document.getElementById("alert-pivote").show();   
}

function cambiar_menu(pagina) {
    mostrarModal();

    const nav = document.querySelector('#myNavigator');

    // Función de cierre segura
    const cerrarModalSeguro = () => {
        ocultarModal();
        nav.removeEventListener('postpush', cerrarModalSeguro);
    };

    // 1. Escuchamos el evento
    nav.addEventListener('postpush', cerrarModalSeguro);

    // 2. Timeout de seguridad: Si en 3 segundos no cargó, lo cerramos forzosamente
    // Esto evita que se quede "trabado" si algo falla en la transición
    setTimeout(() => {
        if (document.getElementById('modal-cargando').visible) {
            console.warn("El modal se cerró por timeout de seguridad");
            ocultarModal();
            nav.removeEventListener('postpush', cerrarModalSeguro);
        }
    }, 3000);

    // 3. Ejecutamos la navegación
    nav.pushPage(pagina + '.html', {
        data: { title: pagina }
    });
}

// Funciones para ocultar diálogos
var hideDialog = function () {
  document.getElementById('alert-pop').hide();
};

var hideDialogVoydeRegreso = function () {
  document.getElementById('alert-pivote').hide();
};

// Función para agregar item en una sección específica
function addItem(html,seccion,tipo){
  var list = document.querySelector("#"+seccion);
  var newItem = document.createElement(tipo);
  newItem.innerHTML=html;
  list.appendChild(newItem);
}

// Función para obtener fecha y hora actual
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

// Función de distancia GPS duplicada, pero sin modificar
var DistanciaGPS = function(lat1,lon1,lat2,lon2){
    var R = 6371000;
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return parseFloat(d.toFixed(1));
} 

// Función auxiliar para convertir a radianes
var rad = function(x) {
    return x*Math.PI/180;
}

const input = document.getElementById('pac-input');

// Bloquea el evento de pegar completamente
input.addEventListener('paste', (e) => {
    e.preventDefault();
    console.log("Acción de pegar bloqueada");
});

// Opcional: Si quieres limpiar el texto después de que peguen algo:
input.addEventListener('input', (e) => {
    // Si meten emojis o caracteres raros, los borra al instante
    const cleanValue = e.target.value.replace(/[^\w\s,.-]/gi, '');
    if (e.target.value !== cleanValue) {
        e.target.value = cleanValue;
    }
});

document.querySelectorAll('.modern-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector('.modern-dial').hideItems();
    });
  });

  const speedDial = document.querySelector('.modern-dial');
let lastScrollTop = 0;

document.getElementById('btn-toggle-menu').addEventListener('click', function() {
    const menu = document.getElementById('extra-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

function toggleExtraMenu() {
    const menu = document.getElementById('extra-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Obtén la referencia a tu barra
const dock = document.querySelector('.modern-dock');
const pageContent = document.querySelector('#Tab1 .page__content'); // O el contenedor donde haces scroll



pageContent.addEventListener('scroll', () => {
    let lastScrollTop = 0;
    let currentScroll = pageContent.scrollTop;

    // Si el scroll es mayor al anterior, el usuario está bajando
    if (currentScroll > lastScrollTop && currentScroll > 50) {
        dock.classList.add('dock-hidden');
    } else {
        // El usuario está subiendo
        dock.classList.remove('dock-hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

document.addEventListener('scroll', function (event) {
    // Si el evento viene de un scroll en la página
    if (event.target.id === 'Tab1') {
        // ... misma lógica del if/else anterior ...
    }
}, true);

function mostrarModal() {
    const modal = document.getElementById('modal-cargando');
    if (modal) {
        modal.show();
    } else {
        console.error("El modal con ID 'modal-cargando' no se encontró en el HTML.");
    }
}

// Para ocultarlo
function ocultarModal() {
    const modal = document.getElementById('modal-cargando');
    if (modal) {
        modal.hide();
    }
}
