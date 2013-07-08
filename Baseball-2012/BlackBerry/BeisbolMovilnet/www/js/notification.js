function checkNewsNotifications(){
	if(flagBD){
	//SE CREA LA TABLA SETTINGS EN CASO DE QUE NO EXISTA
		msnaDB.transaction(
			function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS NEWS (id unique, lastBreakNews, lastEmphasizeNews)');
			},
			//ERROR AL CREAR LA TABLA
			function (err) {
//				alert("Error al crear la tabla NEWS: "+err.code + " - " + err.message);
			},
			//EXITO AL CREAR LA TABLA
			function () {
				msnaDB.transaction(
					function(tx) {
						tx.executeSql('SELECT * FROM NEWS', [], 
							function(tx, results) {

								if (results != null && results.rows.length > 0) {
									currentLastBreakNews = results.rows.item(0).lastBreakNews;
									currentLastEmphasizeNews = results.rows.item(0).lastEmphasizeNews;
									
								} else {
									tx.executeSql('INSERT INTO NEWS VALUES (1,"2012-07-27 00:00:00","2012-07-27 00:00:00")');
									currentLastBreakNews = '2012-07-27 00:00:00';
									currentLastEmphasizeNews = '2012-07-27 00:00:00';
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
					if (M2AS.memory.containsKey("lastBreakNews")){
							currentLastBreakNews=M2AS.memory.get("lastBreakNews");
						}else{
						currentLastBreakNews = '2012-07-27 00:00:00';
						M2AS.memory.put("lastBreakNews","2012-07-27 00:00:00");
						}
						
					if (M2AS.memory.containsKey("lastEmphasizeNews")){
							currentLastEmphasizeNews=M2AS.memory.get("lastEmphasizeNews");
						}else{
						currentLastEmphasizeNews = "2012-07-27 00:00:00";
						M2AS.memory.put("lastEmphasizeNews","2012-07-27 00:00:00");
						}
					
		}
	
	}
}


function updateNewsNotificationsBreakNews(lastBreakNews){
	if(flagBD){
		msnaDB.transaction(
			function (tx) {
				tx.executeSql('UPDATE NEWS SET lastBreakNews="'+lastBreakNews+'" WHERE id=1');
			},
			function (err) {
				//alert("Error processing SQL insert: "+err.code + " - " + err.message);
			},
			function () {
				//alert("updateNewsNotificationsBreakNews - UPDATE!");
				//showAlert("Valores guardados. updateNewsNotificationsBreakNews");
				
				
			}
		);
	}else{
		if (typeof(M2AS)!="undefined" && typeof(M2AS.memory)!="undefined"){
					currentLastBreakNews = lastBreakNews;
					M2AS.memory.put("lastBreakNews",""+lastBreakNews);
			}
	
	}
	
	
}


function updateNewsNotificationsLastEmphasizeNews(lastEmphasizeNews){
	if(flagBD){
	msnaDB.transaction(
		function (tx) {
			tx.executeSql('UPDATE NEWS SET lastEmphasizeNews="'+lastEmphasizeNews+'" WHERE id=1');
		},
		function (err) {
//			alert("Error processing SQL insert: "+err.code + " - " + err.message);
		},
		function () {
			//alert("updateNewsNotificationsLastEmphasizeNews - UPDATE!");
			//showAlert("Valores guardados. updateNewsNotificationsLastEmphasizeNews");
			currentLastEmphasizeNews = lastEmphasizeNews;
		}
	);
	}else{
		if (typeof(M2AS)!="undefined" && typeof(M2AS.memory)!="undefined"){
						currentLastEmphasizeNews = lastEmphasizeNews;
						M2AS.memory.put("lastEmphasizeNews",""+lastEmphasizeNews);
				}
	}
}
