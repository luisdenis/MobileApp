
function exitApp(){
	var answer = confirm("Desea salir de la aplicaci\u00f3n?");
	if (answer){
		navigator.app.exitApp();
	}
}


function formatFecha(fecha,evento){

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


function formatDate(date){
	
	var hoy = new Date();
	
	var stringBuilder;
	var diames=date.getDate();
	var diasemana=date.getDay();
	var mes=date.getMonth();
	var ano=date.getFullYear();
	
	if(hoy.getMonth() == mes){
		if(hoy.getDate() == diames){
			stringBuilder = "HOY";
			return stringBuilder;
		}else if((hoy.getDate()-1) == diames){
			stringBuilder = "AYER";
			return stringBuilder;
		}
		
	}
	stringBuilder = textosemana[diasemana].toUpperCase() + ", " + diames + " DE " + textomes[mes+1].toUpperCase();
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

function format12(curHour,curMin){
	var curTime = ""
	if (curHour >= 12){
		curHour -= 12
	}
	if (curHour == 0) curHour = 12;
	curTime = curHour + ":" +curMin;
	return curTime;
	
}

function shareTwitter(str){
//	var stringBuilder="Beisbol venezuela para mas informacion http://beisbol2012.com.ve"
	str = str+" http://beisbol.movilnet.com.ve";
	location.href="https://twitter.com/intent/tweet?text= "+str+"";
//	javascript:jQuery.fancybox.close();
}

function facebookWallPost(title,body,imagen,link) {
	var params = {
	    method: 'feed',
	    name: ' Unidos por la pasión de béisbol de Movilnet',
	    link: ''+unescape(link),
	    picture: ''+unescape(imagen),
	    caption: ''+unescape(title),
	    description: ''+unescape(body)
	  };
//	console.log(params);
//	console.log(imagen);
    FB.ui(params, function(obj) { console.log(obj);});
}


function shareSMS(strSMS){
//	javascript:jQuery.fancybox.close();
	window.plugins.share.show({
	    subject: 'Minuto a minuto Beisbol Movilnet',
	    sms: 'true',
	    text: ''+unescape(strSMS)},
	    function() {}, // Success function
	    function() {alert('Disculpa. Ocurrio un error al enviar la informacion.')} // Failure function
	);
}

function share(strSMS){
//	javascript:jQuery.fancybox.close();
	window.plugins.share.show({
	    subject: 'Minuto a minuto Beisbol Movilnet',
	    sms: 'false',
	    text: ''+unescape(strSMS)},
	    function() {}, // Success function
	    function() {alert('Disculpa. Ocurrio un error al enviar la informacion.')} // Failure function
	);
}



function shareApp(){
////	javascript:jQuery.fancybox.close();
//	window.plugins.share.show({
//	    subject: 'Descarga la app Beisbol de Movilnet',
//	    sms: 'false',
//	    text: 'Estoy usando la Aplicaci\u00f3n Beisbol de Movilnet con ¡Cobertura en vivo, noticias, calendario, y m\u00e1s! Desc\u00e1rgala t\u00fa tambi\u00e9n en Neo navegaci\u00f3n'},
//	    function() {}, // Success function
//	    function() {alert('Disculpa. Ocurrio un error al enviar la informacion.')} // Failure function
//	);

	if(screen.width >= 480 || screen.height >= 480){
		res = 'hires';
	} else {
		res = 'lowres';
	}
	
	$.fancybox(
			'<div class="redSocial1-'+res+'" onclick="share(\'Sigue minuto a minuto con tus amigos cada juego de la liga venezolana de béisbol. Descarga la aplicación http://wap.movidamovil.com/beisbol/\')" > <img  src="images/sms.png" />&nbsp;SMS&nbsp;&nbsp;</div><hr/>'+
			'<div class="redSocial1-'+res+'" onclick="sendRequestBoth();" > <img  src="images/facebook.png" />&nbsp;Facebook&nbsp;&nbsp;</div><hr/>'+
			'<div class="redSocial1-'+res+'" onclick="shareTwitter(\'Sigue minuto a minuto con tus amigos cada juego de la liga venezolana de beisbol. Descarga la aplicacion en \');" > <img  src="images/twitter.png" />&nbsp;Twitter&nbsp;&nbsp;</div><hr/>',
			{
		    'modal'             : false,
		    'width'             : "100%",
		    'overlayOpacity'    : 0.5,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'onClosed'		: function() {
				
			},
			'onComplete':    function(){
//				setTimeout("animation()",1000);
				}
			}
		);
	
	
//	sendRequestBoth();
	
}


function soundEvent(){
	if(flagSoundEvent){ 
		flagSoundEvent = false;
		document.getElementById('idSoundEvent').src = "images/sonido_no.png";
	} else{ 
		flagSoundEvent = true; 
		document.getElementById('idSoundEvent').src = "images/sonido_si.png";
	} 
	
}

function showAlert(alertBody) {
		alert(alertBody);
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

function checkForAppStatusAtStartup(){
	try {
		var urlS = wapURL+"smartphonecheck.php?clientId="+escape(clientId)+
		"&clientVersion="+escape(clientVersion)+"&model="+escape(device.name)+
		"&osVersion="+escape(device.version);
		if (debugAppStartUp){
			alert(urlS);
			console.log('-=-=-=-=-=-=-=-=-=-='+urlS);
		}
		$.ajax({url: urlS, dataType: 'json',  async: false, cache: false, success: function(result){
			if (debugAppStartUp){
				alert("app: "+result);
				console.log('-=-=-=-=-=-=-=-=-=-= app: '+result);
			}
			if (result[0]==null){
				//alert("No se pudo chequear si existe una actualizacion. Por favor intenta mas tarde.");
			} else if (result [0]=="02"){
				//alert("Tienes la version mas reciente de la aplicacion. Gracias.");
			} else if (result[0]=="01"){
				thereIsNewVersion();
			}
			if (result[1]=="regular"){
				//alert("No se pudo chequear si existe una actualizacion. Por favor intenta mas tarde.");
				roundRegular = "rondaregular";
			} else if (result [1]=="robin"){
				//alert("Tienes la version mas reciente de la aplicacion. Gracias.");
				roundRegular = "roundrobin";
			} else if (result[1]=="final"){
				roundRegular = "final";
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


