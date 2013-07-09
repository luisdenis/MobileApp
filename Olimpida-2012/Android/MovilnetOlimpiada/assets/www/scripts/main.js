function menuKeyDown(){
	nextActivity('','mainMenu');
}

function goBack(){
	
	if (indexStackActivity == 0){
		exitApp();
	}else{
		backActivity();
	}
}

//var startup = function() {
function startup() {
	
		if (!webmode){
			document.addEventListener("menubutton", menuKeyDown, true);
			document.addEventListener("backbutton", goBack, true);
		 	msnaDB = createDB();
		}
	
	 $('#desktopContent').html("");
	 if (!webmode){
	 	checkNotificationsSetttings(); //verifica y setea la configuracion de notificaciones sonoras y tactiles
	 	checkNewsNotifications(); //verifica y setea fechas de las noticias
	 }
	 
	 indexStackActivity =0;
	 stackActivity[indexStackActivity] = "narrative";
	 indexArraySlug++;
	 arraySlug[indexArraySlug] = currentSlug;
	 bb.pushScreen('narrative.html', 'narrative');
	 
	 checkForAppStatusAtStartup();
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


function init() {
	// Wait for PhoneGap to load
	if (typeof(netscape) != "undefined"){
		checkConnection();
	}else{
		document.addEventListener("deviceready", checkConnection, false);
	}
}

