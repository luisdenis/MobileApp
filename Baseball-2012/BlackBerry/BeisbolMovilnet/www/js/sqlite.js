function createDB(){
	if (window.openDatabase) {
        //Will either return the existing database or null and call our creation callback onDBCreate
        msnaDB = window.openDatabase('BeisbolMovilnet', '1.0', 'Movilnet Olimpiada', 5242880);
    } else {
        alert("This device does not have HTML5 Database support");
    }
	return msnaDB;	
}


function checkSelectTeam() {
	if(flagBD) {
	//SE CREA LA TABLA TEAM EN CASO DE QUE NO EXISTA
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
								//navigator.splashscreen.hide();
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
								//indexStackActivity =0;
								//stackActivity[indexStackActivity] = "initTeam";
								indexStackActivity =0;
								stackActivity[indexStackActivity] = "initTeam";
								indexArraySlug++;
								arraySlug[indexArraySlug] = currentSlug;
								//navigator.splashscreen.hide();
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
	}else{
		if (typeof(M2AS)!="undefined" && typeof(M2AS.memory)!="undefined"){
					if (M2AS.memory.containsKey("team")){
							team=M2AS.memory.get("team");
							indexArraySlug++;
							arraySlug[indexArraySlug] = currentSlug;
							//navigator.splashscreen.hide();
							indexStackActivity =0;
							stackActivity[indexStackActivity] = "home";
							bb.pushScreen('home.html', 'home');
						}else{
							indexStackActivity =0;
							stackActivity[indexStackActivity] = "initTeam";
							indexArraySlug++;
							arraySlug[indexArraySlug] = currentSlug;
							//navigator.splashscreen.hide();
							bb.pushScreen('initTeam.html', 'initTeam');
						}
		}
	}
	
	
}


function submit(str){
	if(flagBD) {
		//SE CREA LA TABLA TEAM EN CASO DE QUE NO EXISTA
		msnaDB.transaction(
			function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS TEAM (id unique, team)');
			},
			//ERROR AL CREAR LA TABLA
			function (err) {
	//			alert("Error al crear la tabla TEAM: "+err.code + " - " + err.message);
			},
			//EXITO AL CREAR LA TABLA
			function () {
				msnaDB.transaction(
					function(tx) {
						tx.executeSql('DELETE FROM TEAM WHERE id = 1');
						tx.executeSql('INSERT INTO TEAM VALUES (1,"'+str+'")');
						team = str;
						//indexStackActivity =0;
						//stackActivity[indexStackActivity] = "home";
						indexArraySlug++;
						arraySlug[indexArraySlug] = currentSlug;
						indexStackActivity =0;
						stackActivity[indexStackActivity] = "home";
	//					navigator.splashscreen.hide();
						bb.pushScreen('home.html', 'home');
						
					},
					//ERROR 
					function(err) {
						alert("Error processing SQL create: " + err.code + " - " + err.message);
					}
				);
			}
		); // FIN CREAR TABLA TEAM
	}else{
		if (typeof(M2AS)!="undefined" && typeof(M2AS.memory)!="undefined"){
					M2AS.memory.put("team",""+str);
					team = str;
					indexArraySlug++;
					arraySlug[indexArraySlug] = currentSlug;
	//				navigator.splashscreen.hide();
					indexStackActivity =0;
					stackActivity[indexStackActivity] = "home";
					bb.pushScreen('home.html', 'home');		
		}
	
	}
}