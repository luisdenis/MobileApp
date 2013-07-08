function menuKeyDown(){
	nextActivity('','mainMenu');
}

function goBack(){
	
	if (indexStackActivity == 0){
		exitApp();
	}else{
		javascript:jQuery.fancybox.close();
		backActivity();
	}
}


function startup() {
	
	if ((typeof Cordova == 'undefined') || (typeof cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
	  if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included pg-plugin-fb-connect.js correctly');
	  if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
	
	if (!webmode){
		document.addEventListener("menubutton", menuKeyDown, true);
		document.addEventListener("backbutton", goBack, true);
		msnaDB = createDB();
		checkForAppStatusAtStartup();//verifica si existe una aplicacion nueva..
		checkNotificationsSetttings(); //verifica y setea la configuracion de notificaciones sonoras y tactiles
		checkNewsNotifications(); //verifica y setea fechas de las noticias
		checkSelectTeam();
	}

	  try {
//	  alert('Device is ready! Make sure you set your app_id below this alert.');
	  FB.init({ appId: "139182082891672", nativeInterface: CDV.FB, useCachedDialogs: false });
//	  document.getElementById('data').innerHTML = "";
	  } catch (e) {
	  alert(e);
	  }
		
	
 
// checkForAppStatusAtStartup();
	
}


function init() {
	// Wait for PhoneGap to load
	if (typeof(netscape) != "undefined"){
		startup();
	}else{
		document.addEventListener("deviceready", startup, false);
	}
}

function nextActivity(slug,nameActivity){
	indexStackActivity++;
	stackActivity[indexStackActivity] = nameActivity;
	currentSlug = slug;
	indexArraySlug++;
	arraySlug[indexArraySlug] = currentSlug;
	bb.pushScreen(nameActivity+'.html', nameActivity);
}


function backActivity(){
	var nameActivity;
	indexStackActivity--;
	nameActivity = stackActivity[indexStackActivity];
	indexArraySlug--;
	currentSlug = arraySlug[indexArraySlug];
	bb.pushScreen(nameActivity+'.html', nameActivity);
}



