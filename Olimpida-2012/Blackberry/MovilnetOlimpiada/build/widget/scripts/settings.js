var vibrate = 0;
var sound = 0;

function loadSettingsPage(){
	if ( vibrate == 1 ){
		$('#useVibrate').attr('checked', true);
	} else {
		$('#useVibrate').attr('checked', false);
	}

	if ( sound == 1 ){
		$('#useSound').attr('checked', true);
	} else {
		$('#useSound').attr('checked', false);
	}
}


function getSettings(){
	

	if (currentTactileNoti == 1){
//		alert("getSettings currentTactileNoti entre");
		$('#useVibrate').attr('checked', true);
		vibrate = 1;
	} else {
		$('#useVibrate').attr('checked', false);
		vibrate = 0;
	}
	
	if (currentSoundNoti == 1){
//		alert("getSettings currentSoundNoti entre");
		$('#useSound').attr('checked', true);
		sound = 1;
	} else {
		$('#useSound').attr('checked', false);
		sound = 0;
	}
}


function restartApp(){
	if(confirm("Se borraran todos los datos de la aplicacion. Desea continuar?")){
		msnaDB.transaction(
			function (tx) {	
//				tx.executeSql('DROP TABLE USER');
				tx.executeSql('DROP TABLE SETTINGS');
			},
			function (err) {
//				alert("Error processing SQL create: "+err.code + " - " + err.message);
			},
			function () {
//				alert("Los datos han sido borrados.\nLa aplicacion se cerrara");
				navigator.app.exitApp();
			}
		);
	}
}

function checkNotificationsSetttings(){
	 
	if(flagBD) {
	//SE CREA LA TABLA SETTINGS EN CASO DE QUE NO EXISTA
		msnaDB.transaction(
			function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS SETTINGS (id unique, tactileNoti, soundNoti, updateTimer)');
			},
			//ERROR AL CREAR LA TABLA
			function (err) {
//				alert("Error al crear la tabla SETTINGS: "+err.code + " - " + err.message);
			},
			//EXITO AL CREAR LA TABLA
			function () {
				msnaDB.transaction(
					function(tx) {
						tx.executeSql('SELECT * FROM SETTINGS', [], 
							function(tx, results) {
							
								if (results != null && results.rows.length > 0) {
									currentTactileNoti = results.rows.item(0).tactileNoti;
									currentSoundNoti = results.rows.item(0).soundNoti;
									updateTimer = results.rows.item(0).updateTimer;
									//alert("checkNotificationsSetttings - SELECT CON RESULTADOS! TactileNoti: "+currentTactileNoti+" SoundNoti: "+currentSoundNoti);	
//									startAudio('/android_asset/www/sounds/town.mid');
									
								} else {
									tx.executeSql('INSERT INTO SETTINGS VALUES (1,1,1,300000)');
									currentTactileNoti = 1;
									currentSoundNoti = 1;
									updateTimer = 300000;
									if (debug){
										updateTimer = 60000; //1 minuto, si esta en modo debug
									}
									//Inserto valores. Quiere decir que es primera vez que la corre o hizo un restablecer
									//Se muestra ventana de bienvenida
									//showWelcomeWindow(1);
									
//									startAudio('/android_asset/www/sounds/town.mid');
									
								}
								
							}, 
							//ERROR
							function(err) {
								alert("Error en la consulta: " + err.code + " - " + err.message);
							}
						);
					},
					//ERROR 
					function(err) {
						alert("Error processing SQL create: " + err.code + " - " + err.message);
					}
				);
			}
		); // FIN CREAR TABLA SETTINGS
	}else{
		if (typeof(M2AS)!="undefined" && typeof(M2AS.memory)!="undefined"){
					if (M2AS.memory.containsKey("currentTactileNoti")){
							currentTactileNoti=M2AS.memory.get("currentTactileNoti");
						}else{
						currentTactileNoti = 1;
						M2AS.memory.put("currentTactileNoti","1");
						}
						
					if (M2AS.memory.containsKey("currentSoundNoti")){
							currentSoundNoti=M2AS.memory.get("currentSoundNoti");
						}else{
						currentSoundNoti = 1;
						M2AS.memory.put("currentSoundNoti","1");
						}
					if (M2AS.memory.containsKey("updateTimer")){
							currentSoundNoti=M2AS.memory.get("updateTimer");
						}else{
						currentSoundNoti = 1;
						M2AS.memory.put("updateTimer","300000");
						}
					
		}
	}

}




function updateNotifications(){
		var tactileNoti = 0;
		var soundNoti = 0;
		
		if ($('#useVibrate').is(':checked') ){
			tactileNoti = 1;
		}

		if ( $('#useSound').is(':checked') ){
			soundNoti = 1;
		}
		var i = document.getElementById("select_updateTimer").value;
	if(flagBD) {
		msnaDB.transaction(
			function (tx) {
				tx.executeSql('UPDATE SETTINGS SET tactileNoti='+tactileNoti+', soundNoti='+soundNoti+', updateTimer ='+i+' WHERE id=1');
			},
			function (err) {
	//			alert("Error processing SQL insert: "+err.code + " - " + err.message);
			},
			function () {
				//showAlert("Los cambios han sido guardados.");
				currentTactileNoti = tactileNoti;
				currentSoundNoti = soundNoti;
				updateTimer = i;
				bb.pushScreen('mainMenu.html','mainMenu');
	//			setUserNameSetting(userName)
			}
		);
	}else{	
		if (typeof(M2AS)!="undefined" && typeof(M2AS.memory)!="undefined"){
					M2AS.memory.put("currentTactileNoti",""+tactileNoti);
					M2AS.memory.put("currentSoundNoti",""+soundNoti);
					M2AS.memory.put("updateTimer",""+i);
					currentTactileNoti = tactileNoti;
					currentSoundNoti = soundNoti;
					updateTimer = i;
					bb.pushScreen('mainMenu.html','mainMenu');
		}
		
	
	}
}


//funcion creada para casos de debug
function dropNotificationsSetttings(exit){
		msnaDB.transaction(
			function (tx) {	
				tx.executeSql('DROP TABLE SETTINGS');
			},
			function (err) {
//				alert("Error processing SQL create: "+err.code + " - " + err.message);
			},
			function () {
//				alert("Los datos han sido borrados.");
				if (exit==true){
					navigator.app.exitApp();
				}
			}
		);
}


function saveNotificationsInformation(){

	if ($('#useVibrate').is(':checked') ){
		vibrate = 1;
	} else {
		vibrate = 0;
	}

	if ( $('#useSound').is(':checked') ){
		sound = 1;
	} else {
		sound = 0;
	}
}