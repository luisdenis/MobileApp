function exitApp(){
	var answer = confirm("Desea salir de la aplicaci\u00f3n?");
	if (answer){
		navigator.app.exitApp();
	}
}

function exitAppWithout(){
	navigator.app.exitApp();
}

function getCurrentTime() {
	currentTime = new Date();
	
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();

	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	
	if (minutes < 10){
		minutes = "0" + minutes;
	}
	
	var seconds = currentTime.getSeconds();
	
	time = day+"-"+month+"-"+year+" "+hours+":"+minutes+":"+seconds;
	
	return time;
}


function getAppVersion(){
	closeModal();
	showAlert(appName+" para "+clientId+". Version de la Aplicacion: "+escape(clientVersion));
}



function alertDismissed() {
	// do something
}

function showAlert(alertBody) {
	
	if (!webmode){
		navigator.notification.alert(
			 alertBody,  // message
			 alertDismissed,         // callback
			 appName,            // title
			 'Aceptar'                  // buttonName
			 );
	
	} else {
		alert(alertBody);
	}
	
}

function formatFecha(fecha,evento){
//	alert(fecha);
//	Ayer - 01:20 pm - En vivo 
	
	var today = new Date(); 
	var month= fecha.substring(5, 7);
	var day=  fecha.substring(8, 10);
	var hour = fecha.substring(11, 13);
	var min = fecha.substring(14, 16);
	var stringBuilder = "";
	
	var fechaFormat12 = "";
	
	fechaFormat12 = format12Hour(hour,min);
	var todayMonth = today.getMonth()+1;
	var todayDay = today.getDate();
	
	if(todayMonth<10){todayMonth='0'+todayMonth}
	

	if(todayMonth == month ){
		if(todayDay == day ){
			stringBuilder = "Hoy - "+fechaFormat12+" - "+evento;
			return stringBuilder;
		}
		
	}
	today.setDate(today.getDate()-1);
	todayMonth = today.getMonth()+1
	todayDay = today.getDate();
	if(todayMonth<10){todayMonth='0'+todayMonth}
	if(todayMonth == month ){
		if(todayDay == day ){
			stringBuilder = "Ayer - "+fechaFormat12+" - "+evento;
			return stringBuilder;
		}
		
	}
	
	stringBuilder = day+"-"+month+" "+fechaFormat12+" - "+evento;
	return stringBuilder;
	
	
}


function format12Hour(curHour,curMin){

	var curAMPM = " am"
	var curTime = ""
	if (curHour >= 12){
	curHour -= 12
	curAMPM = " pm"
	}
	if (curHour == 0) curHour = 12
	curTime = curHour + ":"
	+curMin + " "
	+ curAMPM 
	return curTime;
	
}

/// Share options

function sharerecom(){
	window.plugins.share.show({
	    subject: 'Descarga Venezuela Ol\u00edmpica de Movilnet',
	    text: 'Estoy usando la App. Venezuela Ol\u00edmpica de Movilnet ¡Cobertura en vivo, noticias, calendario, y m\u00e1s! Desc\u00e1rgala t\u00fa tambi\u00e9n en Neo navegaci\u00f3n'},
	    function() {}, // Success function
	    function() {alert('Disculpa. Ocurrio un error al enviar la informacion.')} // Failure function
	);
}

function checkForAppStatusAtStartup(){
	try {
		var urlS = wapURL+"smartphonecheck.php?clientId="+escape(clientId)+
		"&clientVersion="+escape(clientVersion)+"&model="+escape(device.name)+"&osVersion="+escape(device.version);
		
		if (debugAppStartUp){
			alert(urlS);
			console.log('-=-=-=-=-=-=-=-=-=-='+urlS);
		}
		
		$.ajax({url: urlS, dataType: 'json',  async: false, success: function(result){
			
			if (debugAppStartUp){
				alert("app: "+result);
				console.log('-=-=-=-=-=-=-=-=-=-= app: '+result);
			}
			
			if (result==null){
				//alert("No se pudo chequear si existe una actualizacion. Por favor intenta mas tarde.");
			} else if (result=="02"){
				//alert("Tienes la version mas reciente de la aplicacion. Gracias.");
			} else if (result=="01"){
				thereIsNewVersion();
			}
			
		}});	
	}catch(e){
		alert("-- Error CATCH checkForAppStatusAtStartup data= "+e.toString());
	}
}


function thereIsNewVersion(){
	var answer = confirm("Existe una nueva versi\u00f3n de la aplicaci\u00f3n. Recomendamos actualizar. Desea ir a la pagina de descarga?");
	if (answer){
		var urlU = wapURL+"descargassmart.php";
		window.plugins.childBrowser.openExternal(urlU);
	}
}


function cleanText(textTo){
	var textToReturn = "";
	
	textToReturn = textTo.replace(/á/g,"a");
	textToReturn = textToReturn.replace(/é/g,"e");
	textToReturn = textToReturn.replace(/í/g,"i");
	textToReturn = textToReturn.replace(/ó/g,"o");
	textToReturn = textToReturn.replace(/ú/g,"u");
	textToReturn = textToReturn.replace(/ñ/g,"n");
	
	return textToReturn;
}