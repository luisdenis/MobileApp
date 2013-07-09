var connectionPresent = false;
var startingup = true;

function checkConnection() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
    
    if ( (states[networkState] == 'No network connection') | (typeof(states[networkState]) == "undefined") | (states[networkState] == "undefined")) {
    	alert('No se ha detectado una conexi\u00f3n de datos disponible. Por favor verifique su conexi\u00f3n e intente de nuevo. La aplicaci\u00f3n se cerrara.');
    	exitAppWithout();
    }
    
    if (states[networkState] == 'WiFi connection' ) {
    	if (allowWIFI){
    		
    		if (debug){
    			alert('Modo WI-FI activo por debug.');
    		}
    		
    		startup();
    		
    		connectionPresent = true;
    		
    	} else {
    		alert('Se requiere el uso de la red celular. Si esta en una red WI-FI por favor apaguela e intente de nuevo. La aplicaci\u00f3n se cerrara.');
    		exitAppWithout();
    	}
    } else {
    	startup();
    }
    
}

/*
function onOnline() { //si se detecta la presencia de conexion se inicia el proceso de pull
	if (!startingup) {
		//showAlert('ON onOnline!!');
		setTimeout("initPullService()", 3000);
	}
}

function onOffline() { //si NO se detecta la presencia de conexion se detiene el proceso de pull
	showAlert('No se ha detectado una conexi\u00f3n disponible. Verifique su conexi\u00f3n.');
	clearTimeout(timmerA);
}
*/