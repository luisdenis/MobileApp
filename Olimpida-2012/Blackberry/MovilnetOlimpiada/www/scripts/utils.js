function exitApp(){
	var answer = confirm("Desea salir de la aplicaci\u00f3n?");
	if (answer){
		blackberry.app.exit();
	}
}

function getParam( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}


function fromsource(from){
	sourceText = '';
	if (from == 1){
		sourceText = 'Web';
	} else if (from == 2){
		sourceText = 'Telefono';
	} else if (from == 3){
		sourceText = 'SMS';
	} else if (from == 4){
		sourceText = 'Facebook';
	} else if (from == 5){
		sourceText = 'BlackBerry';
	} else if (from == 6){
		sourceText = 'Msg Telcel 1.0';
	} else if (from == 7){
		sourceText = 'Android';
	} else if (from == 8){
		sourceText = 'Msg Telcel 1.0';
	} else if (from == 9){
		sourceText = 'iPhone/iPad';
	}
	
	return sourceText;
}

function firstWord(name){
	if (typeof(name)!='undefined'){
		var end=name.indexOf(' ');
		if (end>0){ return name.substring(0,end);}
		else{return name;}
	}return '';
}

function ago(time){
	if (time=="0") return "1 segundo";
    var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
    now=new Date();
    cur_tm=(now.getTime()/1000)+(now.getTimezoneOffset()*60);
    var t= new Date(cur_tm);
    tm = date.getTime()/1000;
    var diff = cur_tm-tm;
    
    pds = ['segundo','minuto','hora','dia','semana','mes','a&ntilde;o','decada'];
    lngh = [1,60,3600,86400,604800,2630880,31570560,315705600];
    for(v = (lngh.length)-1; (v >= 0)&&((no = diff/lngh[v])<=1); v--);
    if(v < 0) v = 0;
    _tm = cur_tm-(diff%lngh[v]);
    no = Math.floor(no);
    if(no != 1){
    	var last = pds[v].substring(pds[v].length - 1);
    	if(last == "a" || last == "e" || last == "i" || last == "o" || last == "u")
    		pds[v] +='s';
    	else
    		pds[v] +='es';
    }
    if(no < 0) no = "algunos";
    
    x= no+" "+pds[v];
    return x;
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

/// Share options

function sharerecom(){
	//blackberry.message.sms.send("Estoy usando la App. Venezuela Ol\u00edmpica de Movilnet ¡Cobertura en vivo, noticias, calendario, y m\u00e1s! Desc\u00e1rgala t\u00fa tambi\u00e9n en Neo navegaci\u00f3n", "0851565101");
	
	blackberry.message.sms.send("Estoy usando la App. Venezuela", "0851565101");
}

function shareFB(){
	window.plugins.childBrowser.showWebPage("http://www.facebook.com/sharer.php?u=contenidos.movilnet.com.ve&t=MovilnetOlimpiada", { showLocationBar: true });
}


function shareTwitter(shareText){
	window.plugins.childBrowser.showWebPage("https://twitter.com/intent/tweet?text=Venezuela Olimpica: "+shareText+". Mas informacion en http://contenidos.movilnet.com.ve", { showLocationBar: true });
}

function twitterVzla(){
	window.plugins.childBrowser.showWebPage("http://twitter.com/veolimpica", { showLocationBar: true });
}


function checkForAppStatusAtStartup(){
	try {
		var urlS = wapURL+"smartphonecheck.php?clientId="+escape(clientId)+
		"&clientVersion="+escape(clientVersion)+"&model="+escape(device.name)+"&osVersion="+escape(device.version);
		
		$.ajax({url: urlS, dataType: 'json',  async: true, success: function(result){
			
			if (debugAppStartUp){
				alert("app: "+result);
			}
			
			alert("app: "+result);
			
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