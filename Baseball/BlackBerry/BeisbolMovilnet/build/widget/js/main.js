
function startup() {
		var roots = blackberry.io.dir.getRootDirs();
		if(roots.length == 1) flagBD = false;
		
		if (!webmode && flagBD){
		 	msnaDB = createDB();
		}
		
		if( typeof msnaDB != 'undefined'){
			flagBD = true;
		}else flagBD = false;
		
		 if (!webmode) {
			//checkNotificationsSetttings(); //verifica y setea la configuracion de notificaciones sonoras y tactiles
			checkForAppStatusAtStartup();//verifica si existe una aplicacion nueva..
			checkNotificationsSetttings(); //verifica y setea la configuracion de notificaciones sonoras y tactiles
			checkNewsNotifications(); //verifica y setea fechas de las noticias
			checkSelectTeam();// Verifica si existe un equipo seleccionado.
		 }
		 
		 
		// bb.pushScreen('home.html', 'home');
		 M2AS.indicator.register("images/notification32.png");
}

   // invoked when application is resumed (brought to foregroud)
        function doResume() {
            console.log('doResume()');
					M2AS.indicator.set(0);
					blackberry.app.setHomeScreenIcon("local:///images/icono_BB64.png"); 
					isFlagForeground = true;
        }
      
        // invoked when application is paused (sent to background)
        function doPause() {
            console.log('doPause()');
						M2AS.indicator.set(0);
						blackberry.app.setHomeScreenIcon("local:///images/icono_BB64.png"); 
						isFlagForeground = false;
        }

        // invoked when application is online
        function doOnline() {
            console.log('Event: online\n' + 'Network Type: ' + navigator.network.connection.type + '\n');
            //setNetworkType();
        }

        // invoked when application is offline
        function doOffline() {
            console.log('Event: offline\n' + 'Network Type: ' + navigator.network.connection.type + '\n');
            //setNetworkType();
        }


function init() {
	// Wait for PhoneGap to load
	console.log('init()');
	if (typeof(netscape) != "undefined"){
		startup();
	}else{
		document.addEventListener("deviceready", startup, true); 
		document.addEventListener("resume", doResume, false);
		document.addEventListener("pause", doPause, false);
		document.addEventListener("online", doOnline, false);
		document.addEventListener("offline", doOffline, false);
	}
		
}

function unload() {
	console.log('unload()'); 
}

function fail(error) {
	navigator.notification.alert(error, null, "Error");
}

function nextActivity(slug,nameActivity){
	currentSlug = slug;
	indexArraySlug++;
	arraySlug[indexArraySlug] = currentSlug;
	indexStackActivity++;
	stackActivity[indexStackActivity] = nameActivity;
	bb.pushScreen(nameActivity+'.html', nameActivity);
}


