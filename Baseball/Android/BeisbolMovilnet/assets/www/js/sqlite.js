function createDB(){
	return window.openDatabase("BaseBallMovilnet", "1.0", "BESDB", 200000);	
}

function checkSelectTeam() {
	
	//SE CREA LA TABLA SETTINGS EN CASO DE QUE NO EXISTA
	msnaDB.transaction(
		function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS TEAM (id unique, team)');
		},
		//ERROR AL CREAR LA TABLA
		function (err) {
//			alert("Error al crear la tabla SETTINGS: "+err.code + " - " + err.message);
		},
		//EXITO AL CREAR LA TABLA
		function () {
			msnaDB.transaction(
				function(tx) {
					tx.executeSql('SELECT * FROM TEAM', [], 
						function(tx, results) {

							if (results != null && results.rows.length > 0) {
//								id = results.rows.item(0).id;
								team = results.rows.item(0).team;								
								indexStackActivity =0;
								stackActivity[indexStackActivity] = "home";
								indexArraySlug++;
								arraySlug[indexArraySlug] = currentSlug;
								navigator.splashscreen.hide();
								bb.pushScreen('home.html', 'home');
								
							} else {
								
//								tx.executeSql('INSERT INTO TEAM VALUES (1,1,1,180000)');
//								currentTactileNoti = 1;
//								currentSoundNoti = 1;
//								updateTimer = 180000;
//								
//								if (debug){
//									updateTimer = 60000; //1 minuto, si esta en modo debug
//								}
								indexStackActivity =0;
								stackActivity[indexStackActivity] = "initTeam";
//								indexArraySlug++;
//								arraySlug[indexArraySlug] = currentSlug;
								navigator.splashscreen.hide();
								bb.pushScreen('initTeam.html', 'initTeam');
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


function submit(str){
	//SE CREA LA TABLA SETTINGS EN CASO DE QUE NO EXISTA
	msnaDB.transaction(
		function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS TEAM (id unique, team)');
		},
		//ERROR AL CREAR LA TABLA
		function (err) {
//			alert("Error al crear la tabla SETTINGS: "+err.code + " - " + err.message);
		},
		//EXITO AL CREAR LA TABLA
		function () {
			msnaDB.transaction(
				function(tx) {
					tx.executeSql('DELETE FROM TEAM WHERE id = 1');
					tx.executeSql('INSERT INTO TEAM VALUES (1,"'+str+'")');
					team = str;
					indexStackActivity =0;
					stackActivity[indexStackActivity] = "home";
					indexArraySlug++;
					arraySlug[indexArraySlug] = currentSlug;
//					navigator.splashscreen.hide();
					bb.pushScreen('home.html', 'home');
					
				},
				//ERROR 
				function(err) {
					alert("Error processing SQL create: " + err.code + " - " + err.message);
				}
			);
		}
	); // FIN CREAR TABLA SETTINGS
}


