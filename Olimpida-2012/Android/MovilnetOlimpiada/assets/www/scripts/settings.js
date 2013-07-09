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
	   
	
	var combo = document.getElementById("select_updateTimer");
	var cantidad = combo.length;
	for (i = 0; i < cantidad; i++) {
	     if (combo[i].value == updateTimer) {
	        combo[i].selected = true;
	     }   
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

								} else {
									tx.executeSql('INSERT INTO SETTINGS VALUES (1,1,1,180000)');
									currentTactileNoti = 1;
									currentSoundNoti = 1;
									updateTimer = 180000;
									
									if (debug){
										updateTimer = 60000; //1 minuto, si esta en modo debug
									}
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

}

function updateNotificationsSetttings(){
	userName = document.getElementById("userNameSetting").value;
	checkUserNameSetting();
}

function checkUserNameSetting(){
	var unlength = userName.length;
	if(unlength == 0 ){
		updateNotifications();
	}else if (unlength < 3) {
		showAlert("Su sobrenombre debe tener al menos 3 caracteres.");
	} else {
		setUserNameSetting(userName);	
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
	msnaDB.transaction(
		function (tx) {
			tx.executeSql('UPDATE SETTINGS SET tactileNoti='+tactileNoti+', soundNoti='+soundNoti+', updateTimer ='+i+' WHERE id=1');
		},
		function (err) {
//			alert("Error processing SQL insert: "+err.code + " - " + err.message);
		},
		function () {
			//alert("updateNotificationsSetttings - UPDATE! TactileNoti: "+tactileNoti+" SoundNoti: "+soundNoti);
			showAlert("Los cambios han sido guardados.");
			currentTactileNoti = tactileNoti;
			currentSoundNoti = soundNoti;
			updateTimer = i;
			goBack();
//			setUserNameSetting(userName)
		}
	);
	
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