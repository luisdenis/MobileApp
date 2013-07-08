
function exitApp(){
	var answer = confirm("Desea salir de la aplicaci\u00f3n?");
	if (answer){
		blackberry.app.exit();
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

function sharerecom(){
	//blackberry.message.sms.send("Estoy usando la App. Venezuela Ol\u00edmpica de Movilnet ¡Cobertura en vivo, noticias, calendario, y m\u00e1s! Desc\u00e1rgala t\u00fa tambi\u00e9n en Neo navegaci\u00f3n", "0851565101");
	
	blackberry.message.sms.send("Estoy usando la App. Venezuela", "0851565101");
}

function shareFB(){
	window.plugins.childBrowser.showWebPage("http://www.facebook.com/sharer.php?u=contenidos.movilnet.com.ve&t=MovilnetOlimpiada", { showLocationBar: true });
}


function shareTwitter(str){
//	var stringBuilder="Beisbol venezuela para mas informacion http://beisbol2012.com.ve"
	str = "https://twitter.com/intent/tweet?text="+str+"&url=http://beisbol.movilnet.com.ve";
	
	window.plugins.childBrowser.showWebPage(str, { showLocationBar: true });
	//location.href="https://twitter.com/intent/tweet?text= "+str+"";
//	javascript:jQuery.fancybox.close();
}

function facebookWallPost(title,body,imagen,link) {
    var strUrl = "Unidos por la pasi\u00f3n de b\u00e9isbol de Movilnet";
	
	window.plugins.childBrowser.showWebPage("https://www.facebook.com/dialog/feed?app_id=139182082891672&picture="+imagen+"&caption="+unescape(title)+"&name="+strUrl+"&description="+unescape(body)+"&link="+link+"&redirect_uri=http://wap.movidamovil.com/beisbol/exito.php", { showLocationBar: true });
	
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
			'<div class="redSocial-'+res+'" onclick="shareSMS(\'Estoy usando la Aplicaci\u00f3n Beisbol de Movilnet con ¡Cobertura en vivo, noticias, calendario, y m\u00e1s! Desc\u00e1rgala t\u00fa tambi\u00e9n en Neo navegaci\u00f3n http://beisbol2012.blve.com/\')" > <img  src="images/sms.png" />&nbsp;Sms&nbsp;&nbsp;</div><hr/>'+
			'<div class="redSocial-'+res+'" onclick="sendRequestBoth();" > <img  src="images/facebook.png" />&nbsp;Facebook&nbsp;&nbsp;</div><hr/>'+
			'<div class="redSocial-'+res+'" onclick="shareTwitter(\'Estoy usando la Aplicacion Beisbol de Movilnet con cobertura en vivo, noticias, calendario, y mas Descargala en\');" > <img  src="images/twitter.png" />&nbsp;Twitter&nbsp;&nbsp;</div><hr/>',
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
	var idsonido = document.getElementById('idSoundEvent');
	
	if(flagSoundEvent){ 
		flagSoundEvent = false;
		idsonido.setAttribute("onmouseover","this.src='images/sonido_no_select.png'");
		idsonido.setAttribute("onmouseout","this.src='images/sonido_no.png'");
		idsonido.src = "images/sonido_no_select.png";
	} else{ 
		flagSoundEvent = true; 
		idsonido.setAttribute("onmouseover","this.src='images/sonido_si_select.png'");
		idsonido.setAttribute("onmouseout","this.src='images/sonido_si.png'");
		idsonido.src = "images/sonido_si_select.png";
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
			console.log('-=-=-=-=-=-=-=-=-=-= app: '+result);
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
		window.plugins.childBrowser.openExternal(urlU, { showLocationBar: true });		
	}
}

