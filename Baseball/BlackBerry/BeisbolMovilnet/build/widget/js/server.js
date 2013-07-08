var xhrServicesTest;
var actualDate,idGameCurrent ="",idEventCurrent ="", hourEventCurrent="",alive = "",inningsUp = true,nameShortHome = "",nameShortVisit="", inningsGeneral,carreraVisit,carreraHome;

function getNewHighlight(usecache){
	var res;
	if(screen.width >= 480 || screen.height >= 480){
		res = 'hires';
	} else {
		res = 'lowres';
	}
	var $title,$body,xmlDoc,$xml,$intro,$imagen,$slug,builBody,height,width,urlS=ajaxURL+"publicador/seccion/destacado-smartphone/";
	xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: true, cache: usecache, success: function(result){
					
					$xml = $(result);
					$title = $xml.find("titulo");
					//console.log(''+$title.text());
					$intro = $xml.find("intro");
					//console.log(''+$intro.text());
					$imagen = $xml.find("urlbase");
					//console.log(''+$imagen.text());
					$slug = $xml.find("slug");
					//console.log(''+$slug.text());
					
					var dateEN = $xml.find("fecha").text();
					document.getElementById('newHighlight').innerHTML ="";
					
					var position = $imagen.text().lastIndexOf(".");
					var extesion = $imagen.text().substring(position);
					var urlImagen = $imagen.text().substring(0,position);
					urlImagen  = urlImagen +''+extesion;
					
					var item, newHighlight = document.getElementById('newHighlight');
					var width = ((window.innerWidth));
						item = document.createElement('div');
						item.setAttribute('class', 'bb-bb10-grid-item col-1-' + res);
						item.setAttribute('onclick', "nextActivity('"+$slug.text()+"','detailNews')");
						item.innerHTML = '<img id="noticiaDestacada" src="'+urlImagen+'" width = "'+width+'" />'+
						'<div onclick ="nextActivity("'+$slug.text()+'","detailNews")" class = "bb-bb10-grid-item-overlay-'+res+'" x-blackberry-focusable = "true" onmouseover = "this.className = \'bb-bb10-grid-item-overlay-hover-'+res+'\'" onmouseout="this.className = \'bb-bb10-grid-item-overlay-'+res+'\'"   >'+
							'<div><p class="title">'+$title.text()+'</p></div>'+
						'</div>';
						newHighlight.appendChild(item);
						document.getElementById('load-highlight').innerHTML ="";
						
						//check if EmphasizeNews notification
						if (lenFound == false) {
							
								var len = new Date(currentLastEmphasizeNews);
								currenten = new Date(dateEN);
								
								//alert("len: "+len+" - currenten: "+currenten);
								
								if (currenten > len) {
									startVibrate();
									M2AS.indicator.set(-1);
									startAudio("local:///sounds/AlarmComplete.mp3");
									if(!isFlagForeground){
										blackberry.app.setHomeScreenIcon("local:///images/icono_BB64x.png"); 
									}
								
									lenFound = true;
									currentLastEmphasizeNewsTitle = $title.text();
									
								} else {
										if (currentLastEmphasizeNewsTitle != $title.text()){
											//tienen la misma fecha pero el titulo es diferente
											startVibrate();
											M2AS.indicator.set(-1);
											startAudio("local:///sounds/AlarmComplete.mp3");
											if(!isFlagForeground){
												blackberry.app.setHomeScreenIcon("local:///images/icono_BB64x.png"); 
											}										
									
											lenFound = true;
											currentLastEmphasizeNewsTitle = $title.text();
										
										}
								}
						}
						//end check if EmphasizeNews notification
						
						//update EmphasizeNews notification
					  if (lenFound == true) {
					  	updateNewsNotificationsLastEmphasizeNews(currenten); //actualizo el ultimo en
					  	lenFound = false;
					  }
						
						
						 window.addEventListener("resize", function() {
						  // Get screen size (inner/outerWidth, inner/outerHeight)
							if(document.getElementById('noticiaDestacada') != null)
							document.getElementById('noticiaDestacada').width = window.innerWidth;
						}, false);
						
				}, error: function(xhrServicesTest, textStatus, errorThrown){
					console.log(""+textStatus);
					console.log(""+errorThrown);
				}
				});
		
		
}



//HOME GAMES
/*
 * METO QUE TE LISTA LOS JUEGOS MEDIANTE UNA FECHA
 * ESTA FECHA ES DE ORIGEN DEL OBJETO Date
 * */
function getGames(date){
	
	var month = date.getMonth()+1;
	if(month<10){month='0'+month}
	var day = date.getDate();
	var year = date.getFullYear();
	
	var urlS= ajaxURL+"juego/dia-smartphone/"+year+"/"+month+"/"+day+"/";
	document.getElementById('idGameTable').innerHTML = "";
	document.getElementById('date-game').innerHTML = "";
	xhrServicesTest = $.ajax({url: urlS, dataType: 'xml',  async: true, cache:false, success: function(result){
		getGamesDo(result,date);		
	}, error: function(xhrServicesTest, textStatus, errorThrown){
		var month = date.getMonth();
		if(month<10){month='0'+month}
		actualDate = date.getFullYear()+"-"+month+"-"+date.getDate();
		alert("No se pudo establecer comunicacion con el servidor.\ Por favor intenta de nuevo.");
		console.log(""+textStatus);
		console.log(""+errorThrown);
		//COLOCAR UN BOTON PARA REITENTAR
	}
	});
		
}
/**
 * METODO QUE TE PERMITE PROCESAR LA INFORMACION PROVENIENTE DEL SERVIDOR
 * JUEGOS
 * @param result
 * @param date
 * @returns {Boolean}
 */
function getGamesDo(result,date){
	var game = document.getElementById('idGameTable');
	
	var res, fechaGame = "",i = 0, gameBegin = false, hourGameNext="",nameShortVisitNext="",nameShortHomeNext="";
	var flagDontGame = false;
	if(screen.width >= 480 || screen.height >= 480){
		res = 'hires';
	} else {
		res = 'lowres';
	}
	
	 $(result).find("juego").each(function() {
		var table = document.createElement('table');
		table.setAttribute("width","100%");		
		
		table.setAttribute('class','customers-'+res);
		table.setAttribute("cellspacing","0");
		table.setAttribute("cellpadding","0");
		
		table.setAttribute('onmouseover',"this.setAttribute('class','alt-"+res+"')");
		table.setAttribute('onmouseout',"this.setAttribute('class','customers-"+res+"')");
		table.setAttribute('x-blackberry-focusable','true');
		
		
		  flagDontGame = true;
		  var idGame = "",
		  hour = "",
		  nameHome = "",
		  nameShortHome = "",
		  nameStadium = "",
		  nameVisit = "",
		  nameShortVisit ="",
		  day = "", casa ="", visitante="",
		  rain = "",
		  alive = "",
		  casaCarreras="",
		  visitantesCarreras="",stringBuilderUp="",
		  inningNun = 0;
		  var stringStatusGame = "";
		
		  idGame = $(this).find("id").text();
		  console.log(idGame);
		  table.setAttribute('onclick','nextActivity(\''+idGame+'\',\'minute\')');
		  
		  $(this).find("diamante").each(function(){
				casaCarreras = $(this).find("casacarreras").text();
				visitantesCarreras = $(this).find("visitantecarreras").text();
	     });
		  
		  $(this).find("global").each(function(){
			 fechaGame = $(this).find("fecha").text(); 
			 hour =  $(this).find("hora").text();
			 
			 $(this).find("casa").each(function(){
					nameHome = $(this).find("nombre").text();
					nameShortHome = $(this).find("nombrecorto").text();
					nameStadium = $(this).find("estadio").text();
		     });
			 $(this).find("visitante").each(function(){
					nameVisit = $(this).find("nombre").text();
					nameShortVisit = $(this).find("nombrecorto").text();
		     });
			 
		  });
		
		  $(this).find("innings").each(function(){
				 $(this).find("inning").each(function() {	
					 casa = $(this).find("casa").text(); 
					 visitante = $(this).find("visitante").text();
					 inningNun++;
				 });
		
			 if(casa == "None"){
				 stringBuilderUp = '<img class ="arrow-'+res+'" id="arrowUP" src="images/bullet_arrow_up.png" alt="arrowUp" />';
			 }else{
				 stringBuilderUp = '<img class ="arrow-'+res+'" id="arrowUP" src="images/bullet_arrow_down.png" alt="arrowDown"  />';
			 }  
			 
		});
		  
		  $(this).find("estado").each(function(){
				day = $(this).find("dia").text();
				rain = $(this).find("lluvia").text();
				alive = $(this).find("activo").text();

				if(alive == "0"){
					stringStatusGame = '&nbsp;-&nbsp <b>'+hour+'</b>';
					casaCarreras = "-";
					visitantesCarreras = "-";
					if(hourGameNext == ""){ 
						nameShortVisitNext = nameShortVisit;
						hourGameNext = hour;
						nameShortHomeNext = nameShortHome;
					}
				}else if(alive == "1"){
					stringStatusGame = '&nbsp;-&nbsp <b style="color: #33ff00;" >En Vivo</b>\n<div ">'+inningNun+''+stringBuilderUp+'</div> ';
					gameBegin = true;
				}else if(alive == "2"){
					stringStatusGame = '&nbsp;-&nbsp <b style="color: #C01704;" >Finalizado</b>';
				}else if(alive == "3"){
					stringStatusGame = '&nbsp;-&nbsp <b style="color: #C01704;" >Suspendido</b>';
					if(inningNun == 0){
						casaCarreras = "-";
						visitantesCarreras = "-";
						stringStatusGame = stringStatusGame +'\n<div ><b>'+hour+'</b></div>';
					}else{
						stringStatusGame = stringStatusGame +'\n<div >'+inningNun+''+stringBuilderUp+'</div> ';	
					}	
				}
				if(rain == 1){
					stringStatusGame =  '<div id="logoTeam" > <img class ="rain-'+res+'"  src="images/rain_64.png" />'+stringStatusGame + '</div>';	
				}				
	     });
		  
		var tr = document.createElement('tr');
		
		table.appendChild(tr);
		var tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '<img id="logoHome" class ="logo-'+res+'" src="images/'+nameShortHome+'.png"  alt=""/>';
		tdLabel1.setAttribute("width","20%");
		tdLabel1.setAttribute("align","center");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '<span class="text-'+res+'" >'+casaCarreras+'</span>';
		tdLabel1.setAttribute("width","10%");
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("rowspan","2");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		var strVs = "";
		if(i==0){ strVs = '<img  class ="vs-'+res+'" src="images/home_vs.png" /><br/>';}
		tdLabel1.innerHTML = strVs+''+stringStatusGame+'\n<div >'+nameStadium+'</div>';
	//	tdLabel1.innerHTML = '<img  class ="vs-'+res+'" src="images/home_vs.png" /><br/>'+stringStatusGame+'\n<div >'+nameStadium+'</div>';
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("valign","top");
		tdLabel1.setAttribute('style', 'background-image: url(\'images/style/backgroung_vs.png\');background-position: center;');
		tdLabel1.setAttribute("rowspan","2");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '<span  class="text-'+res+'" >'+visitantesCarreras+'</span>';
		tdLabel1.setAttribute("width","10%");
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("rowspan","2");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '<img id="logoVisit" class ="logo-'+res+'" src="images/'+nameShortVisit+'.png"  alt=""/>';
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("width","20%");
		tr = document.createElement('tr');
		table.appendChild(tr);
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.setAttribute("align","center");
		tdLabel1.innerHTML = '<span class="textName-'+res+'" >'+nameShortHome+'</span>';
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.setAttribute("align","center");
		tdLabel1.innerHTML = '<span class="textName-'+res+'" >'+nameShortVisit+'</span>';
		game.appendChild(table);
		 //var separador = document.createElement('hr');
		 //game.appendChild(separador);
		 i++;
	  });
	 
	 document.getElementById('load-game').innerHTML = "";
	 document.getElementById('load-highlight').innerHTML = "";
	 
	 var hoy = new Date();
	 if((hoy.getMonth() == date.getMonth()) && (hoy.getDate() == date.getDate()) ){
		 if(flagDontGame){
			 if(gameBegin){
				 if(flagUpdateGame){
					 flagUpdateGame = false;
					  setTimeout("updateGameSyncro()",updateTimer);
				  }
			 }else{
				 //Tarea programada
				flagUpdateGame = true;
				jsCron.init();
				jsCron.set(hourGameNext, nameShortHomeNext +" vs "+nameShortVisitNext);
			 }
		}
	 }
		//var game = document.getElementById('idGameTable');
	
		var stringBuilder = formatDate(date);
		var flagHoy = true;
		if((hoy.getMonth() == date.getMonth()) && (hoy.getDate() == date.getDate()) ){			
			if((hoy.getMonth() == 9) && (hoy.getDate() == 11)){
				flagHoy= false;
			}

			var month = date.getMonth();
			if(month<10){month='0'+month}
			actualDate = date.getFullYear()+"-"+month+"-"+date.getDate();
			if(!flagDontGame){
				game.innerHTML = '<br/><div align= "center"><b style="color:white;"  >No se tienen juegos para la jornada de hoy</b></div><br/>';
			}
			
			date.setDate(date.getDate()-1);
			var month = date.getMonth();
			if(month<10){month='0'+month}
			var stringBuilder1 = date.getFullYear()+"-"+month+"-"+date.getDate();
			
			var strDate = '<table width = "100%" style="background-image:url(\'images/style/barra_flechas.jpg\');  background-repeat: repeat-x;" ><tr><td align="left" width = "10%">';
			if(flagHoy){
				strDate = strDate + ' <img x-blackberry-focusable="true" onmouseover = "this.src = \'images/arrow_left_click.png\'" onmouseout="this.src = \'images/arrow_left.png\'"  class ="arrowLeft-'+res+'" id="" alt=""  src="images/arrow_left.png"  onclick="paginationDay(\''+stringBuilder1+'\');" /> ';
			}
			strDate = strDate + '</td><td align="center" width= "80%"><b style="font-family: Freshman;">'+stringBuilder+'</b></td><td align="right" width = "10%"></td></tr> </table>';
			
			document.getElementById('date-game').innerHTML = strDate;
			
		}else{
			if(!flagDontGame){
				var day = actualDate.substring(8, 10);
				var month = actualDate.substring(5, 7);
				var year = actualDate.substring(0,4);
				var flagDate = new Date(year,month,day);
				
				document.getElementById('load-game').innerHTML = "<img width='30' height='30' id='loading' alt='Cargando' src='images/loading.gif' />&nbsp;Cargando....";
				if(flagDate > date){	
					date.setDate(date.getDate()-1);
					getGames(date);
					return false;
				}else{
					date.setDate(date.getDate()+1);
					getGames(date);
					return false;
				}
			}
			if((date.getMonth() == 9) && (date.getDate() == 11)){
				flagHoy= false;
			}
			var month = date.getMonth();
			if(month<10){month='0'+month}
			actualDate = date.getFullYear()+"-"+month+"-"+date.getDate();
			date.setDate(date.getDate()-1);
			month = date.getMonth();
			if(month<10){month='0'+month}
			var stringBuilder1 = date.getFullYear()+"-"+month+"-"+date.getDate();
			date.setDate(date.getDate()+2);
			month = date.getMonth();
			if(month<10){month='0'+month}
			var stringBuilder2 = date.getFullYear()+"-"+month+"-"+date.getDate();
			var strDate = '<table  width = "100%" style="background-image:url(\'images/style/barra_flechas.jpg\');  background-repeat: repeat-x;"><tr><td align="left" width = "10%">';
			if(flagHoy){
				strDate = strDate + '<img x-blackberry-focusable="true" onmouseover = "this.src = \'images/arrow_left_click.png\'" onmouseout="this.src = \'images/arrow_left.png\'"  class ="arrowLeft-'+res+'" id="" alt="" src="images/arrow_left.png"  onclick="paginationDay(\''+stringBuilder1+'\');" /> ';
			}
			strDate = strDate + '</td><td align="center" width= "80%"><b style="font-family: Freshman;">'+stringBuilder+'</b></td><td align="right"  width = "10%"><img x-blackberry-focusable="true" onmouseover = "this.src = \'images/arrow_right_click.png\'" onmouseout="this.src = \'images/arrow_right.png\'"  class ="arrowLeft-'+res+'" id="" alt="" src="images/arrow_right.png" onclick="paginationDay(\''+stringBuilder2+'\');" /></td></tr> </table>';
			document.getElementById('date-game').innerHTML = strDate;			
		}
	
	
}


/**
 * METODO QUE ACTUALIZA LA TABLA GAME
 * ES LLAMADO DESDE EL METODO updateGameSyncro
 */
function updateGameSyncro(){
	
	var hoy = new Date();
	var day = actualDate.substring(8, 10);
	var month = actualDate.substring(5, 7);
	var year = actualDate.substring(0,4);
	var flagDate = new Date(year,month,day);
	
	 jsCron.finish();
	 // Removing all children from an element
	 if((hoy.getMonth() == flagDate.getMonth()) && (hoy.getDate() == flagDate.getDate()) && (stackActivity[indexStackActivity] == "home") && flagUpdateGame == false ){
		 var element = document.getElementById("idGameTable");
		 while (element.firstChild) {
		   element.removeChild(element.firstChild);
		 }
		 document.getElementById('date-game').innerHTML= "";
		 document.getElementById('load-game').innerHTML = "<img width='30' height='30' id='loading' alt='Cargando' src='images/loading.gif' />Cargando....";
		 getGames(flagDate);
		 setTimeout("updateGameSyncro()",updateTimer); //si es necesario
	 } else {
		 flagUpdateGame = true; 
	 }
}


function paginationDay(pageDay){
	var element = document.getElementById("idGameTable");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	var day = pageDay.substring(8, 10);
	var month = pageDay.substring(5, 7);
	var year = pageDay.substring(0,4);
	var date = new Date(year,month,day);
	document.getElementById('load-game').innerHTML = "<img  width='30' height='30' id='loading' alt='Cargando' src='images/loading.gif' /> &nbsp;Cargando....";
	getGames(date);
}

//FIN HOME GAMES

/**
 * OBTIENE EL MINUTO A MINUTO DEL SERVER
 * IDGAME  ID DEL JUEGO A NARRAR
 * CANT CANTIDAD DE ROW DE COMENTARIOS
 * FLAGEVENT FLAG PARA INDICAR SI SE DESEA IMPRIMIR EL EVENTO
 */
function getMinuteByMinute(idGame,cant,flagEvent){
	var  urlS=ajaxURL+"/juego/"+idGame+"/smartphone/"+cant+"/"+flagEvent;
	xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: true, cache:false, success: function(result){
		setMinuteByMinuteDo(result);
	}, error: function(xhrServicesTest, textStatus, errorThrown){
		alert("No se pudo establecer comunicacion con el servidor.\ Por favor intenta de nuevo.");
		console.log(""+textStatus);
		console.log(""+errorThrown);
	}
	});
	
}

function setMinuteByMinuteDo(result){
	var res;
	if(screen.width >= 480 || screen.height >= 480){
		res = 'hires';
	} else {
		res = 'lowres';
	}
	var idEvent,nameEvent,date,comment, i = 0,y = 0;
	  $(result).find("breaknews").each(function() {
		 $(this).find("breaknew").each(function(){
			idEvent = $(this).find("id").text();
			nameEvent = textoEvento[idEvent];
			date =  $(this).find("fecha").text();
			comment =  $(this).find("comentario").text();
			var item,container, breakNews = document.getElementById('minutoaminutoId');
			//Notificaciones de evento
			//solo se selecciona el primer elemento de lo break news.
			//currentSlug idGame que utilizar para el servicio.
			//idgamCurrent se usa para indicar cual fue el ultimo juego a sincronizar
			//hourEventCurrent la hora del ultimo evento que sono.
	if(y == 0){
		var comentarioFirts = comment;
		
		var strN = "Narración";
		var strImagen = 'http://beisbol.movilnet.com.ve/especiales/facebook/images/estadios/'+nameShortHome.toLowerCase()+'.jpg';
		var strBody = 'Estoy siguiendo el juego desde mi tel\u00e9fono y en el inning '+inningsGeneral+', '+nameShortHome+': '+carreraHome+' y '+nameShortVisit+': '+carreraVisit+' Corre la voz!';
		document.getElementById('red-social').innerHTML = '<img x-blackberry-focusable="true" onmouseover = "this.src = \'images/facebook_select.png\'" onmouseout="this.src = \'images/facebook.png\'"     class="redSocial-'+res+'"  id="reintentarButton" src="images/facebook.png" '+
		'onclick="facebookWallPost(\' '+escape('Narraci\u00f3n: '+comentarioFirts)+'\',\''+escape(strBody)+'\',\''+escape(strImagen)+'\',\'http://apps.facebook.com/pasionbeisbol/\' );"/>'+
		'<img  x-blackberry-focusable="true" onmouseover = "this.src = \'images/twitter_select.png\'" onmouseout="this.src = \'images/twitter.png\'"   src="images/twitter.png" class="redSocial-'+res+'" onclick="shareTwitter(\''+encodeURIComponent(comentarioFirts)+'\');"  /> ';
		
		//document.getElementById('red-social').innerHTML = ' <img  class="arrowLeft-'+res+'" id="menuPrincipalButtonLoser" '+
		//'src="images/sms.png" onclick="shareSMS(\''+escape(comentarioFirts)+'\');"  />&nbsp;<img   class="arrowLeft-'+res+'" '+
		//' id="reintentarButton" src="images/facebook.png" onclick="facebookWallPost(\'Minuto a minuto Beisbol Movilnet\',\''+escape(comentarioFirts)+'\',\'http://beisbol2012.blve.com/minuto/images/leones.jpg\',\'http://apps.facebook.com/pasionbeisbol/\' );" '+
		//'/>&nbsp;<img  src="images/twitter.png" class="arrowLeft-'+res+'" onclick="shareTwitter(\''+escape(comentarioFirts)+'\');"  /> ';
	}
	
	if(idEvent != 1){
		if(i == 0){
				if(currentSlug == idGameCurrent ){
					if((date != hourEventCurrent) ){
						if(flagSoundEvent){
							startVibrate();
							var strEvent1="";
							if(nameEvent = "Comentario clave") strEvent1 = "Comentarioclave";
							else strEvent1 = nameEvent;
							startAudio("local:///sounds/"+strEvent1+".mp3");
							/*window.plugins.statusBarNotification.clear();
							var nameAction = (inningsUp) ? nameShortVisit :  nameShortHome;
							var prefString;
							if(nameAction == "Aguilas") prefString = "de las"; else prefString = "de los"; 
							
							if(idEvent == 2)
								window.plugins.statusBarNotification.notify(nameShortHome+" vs "+nameShortVisit, nameAction+" batea para Dobleplay");
								else if(idEvent == 3)
									window.plugins.statusBarNotification.notify(nameShortHome+" vs "+nameShortVisit, "JONRON!!!! "+prefString+" "+nameAction);
								else if(idEvent == 5)
									window.plugins.statusBarNotification.notify(nameShortHome+" vs "+nameShortVisit, "Ponchaooo el bateador "+prefString+" "+nameAction );
								else if(idEvent == 7)
									window.plugins.statusBarNotification.notify(nameShortHome+" vs "+nameShortVisit, nameAction+" batea un Hit!!!! " );
								else if(idEvent == 8)
									window.plugins.statusBarNotification.notify(nameShortHome+" vs "+nameShortVisit, "Boleto para bateador "+prefString+" "+nameAction );
								else if(idEvent == 9)
									window.plugins.statusBarNotification.notify(nameShortHome+" vs "+nameShortVisit, nameAction+" batea un Triple!!!! " );
								else if(idEvent == 10)
									window.plugins.statusBarNotification.notify(nameShortHome+" vs "+nameShortVisit, nameAction+" batea un Doble!!!! " );
								else if(idEvent == 12)
									window.plugins.statusBarNotification.notify(nameShortHome+" vs "+nameShortVisit, "Comentario clave: "+comment);
							*/
						}
						
					
					}
				
			}
			hourEventCurrent = date;
		}
	}
	i++;
	y++;
	
	
	
	item = document.createElement('div');
	item.setAttribute('data-bb-type', 'item');
	item.setAttribute('data-bb-evento', ''+nameEvent);
	item.setAttribute('data-bb-title', ''+date );
	item.innerHTML = '' + comment;
	// Create a dummy container
	
	container = document.createElement('div');
	container.appendChild(item);
	// Apply the styling
	bb.minutoaminuto.apply([container]);
	
	breakNews.appendChild(container.firstChild);
	
	if (bb.scroller) {
		bb.scroller.refresh();
	}
  });
	
			//check if breaknews notification
//			if (lbnFound == false) {
//				
//					var lbn = new Date(currentLastBreakNews);
//					currentbn = new Date(date);
//					
//					//alert("lbn: "+lbn+" - currentbn: "+currentbn);
//					
//					if (currentbn > lbn) {
//						window.plugins.statusBarNotification.clear();
//						startVibrate();
//						window.plugins.statusBarNotification.notify("Atleta Venezolano en acci\u00f3n", comentario);
//						startAudio("/android_asset/www/sounds/AlarmComplete.mp3");
//						lbnFound = true;
//					}
//				
//				
//			}
			//end check if breaknews notification
		 idGameCurrent = currentSlug;
		 
	  });
	//end breaknews
	  
	  
	  
	  //update breaknews notification
//	  if (lbnFound == true) {
//	  	updateNewsNotificationsBreakNews(currentbn); //actualizo el ultimo bn de vzla
//	  	lbnFound = false;
//	  }
	  //end update breaknews notification
	  
	  document.getElementById('vermas').innerHTML = "ver m&aacute;s";
	  document.getElementById('load-narrative').innerHTML = "";
	  
//	  if(flagUpdate){
//		  flagUpdate = false;
//		  setTimeout("updateMinutoSyncro()",updateTimer);
//	  }
	
}


function getStatusInnings(idGame){	
	var  urlS=ajaxURL+"/juego/"+idGame+"/smartphone";
	xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: true, cache:false, success: function(result){
		setStatusInningsDo(result);
	}, error: function(xhrServicesTest, textStatus, errorThrown){
		alert("No se pudo establecer comunicacion con el servidor.\ Por favor intenta de nuevo.");
		console.log(""+textStatus);
		console.log(""+errorThrown);
	}
	});
	
}


function setStatusInningsDo(result){
	var inningStatus = document.getElementById('status-inning');
	var stringBuilderBase = "", stringStatusGame ="", nameVisit="",nameStadium="";
	var bolas,strikes,outs,casacarreras,casahits,casaerrores,visitantecarreras,visitantehits,visitenteerrores,home,primera,segunda,tercera; 
	var casaCarreras, visitantesCarreras;
	var casa,visitante,stringBuilderUp = "",fechaGame="",hour="";
	var inningNun = 0;
	if(screen.width >= 480 || screen.height >= 480){
		res = 'hires';
	} else {
		res = 'lowres';
	}
	 $(result).find("juego").each(function() {
		    $(this).find("global").each(function(){
				 fechaGame = $(this).find("fecha").text();
				 hour =  $(this).find("hora").text();
				 
				 $(this).find("casa").each(function(){
						nameShortHome = $(this).find("nombrecorto").text();
						nameStadium = $(this).find("estadio").text();
						
			     });
				 $(this).find("visitante").each(function(){
						nameVisit = $(this).find("nombre").text();
						nameShortVisit = $(this).find("nombrecorto").text();
			     });
				 
			  });
			 
			$(this).find("diamante").each(function(){
		 
				 bolas = $(this).find("bolas").text(); 
				 strikes = $(this).find("strikes").text();
				 outs =  $(this).find("outs").text();
				
				 carreraHome =  casacarreras =  $(this).find("casacarreras").text();
				 casahits = $(this).find("casahits").text(); 
				 casaerrores = $(this).find("casaerrores").text();
				
				 carreraVisit = visitantecarreras =  $(this).find("visitantecarreras").text();
				 visitantehits = $(this).find("visitantehits").text(); 
				 visitenteerrores = $(this).find("visitanteerrores").text();
				
				 home = $(this).find("home").text();
				 primera =  $(this).find("primera").text();
				 segunda =  $(this).find("segunda").text();
				 tercera =  $(this).find("tercera").text();
				stringBuilderBase = '<img class ="diamante-'+res+'"  src="images/diamante_short';
				if(primera != "None"){
				stringBuilderBase = stringBuilderBase+"_1"
				}
				if(segunda != "None"){
				stringBuilderBase  =  stringBuilderBase+"_2";
				}
				if(tercera != "None"){
				stringBuilderBase = stringBuilderBase +"_3";
				}
				stringBuilderBase = stringBuilderBase+'.png" alt="Diamante" />';
			});
	
			 $(this).find("innings").each(function(){
					 $(this).find("inning").each(function() {	
						 casa = $(this).find("casa").text(); 
						 visitante = $(this).find("visitante").text();
						 inningNun++;
					 });
					 inningsGeneral = inningNun;
				 if(casa == "None"){
					 inningsUp = true;
					 stringBuilderUp = '<img class ="arrow-'+res+'"  src="images/bullet_arrow_up.png" alt="arrowUp" />';
				 }else{
					 inningsUp= false;
					 stringBuilderUp = '<img class ="arrow-'+res+'"  src="images/bullet_arrow_down.png" alt="arrowDown" />';
				 }  
				 
			});
	 
			 $(this).find("estado").each(function(){
					var day = $(this).find("dia").text();
					var rain = $(this).find("lluvia").text();
					alive = $(this).find("activo").text();
					if(alive == "0"){
						stringStatusGame = '&nbsp;-&nbsp;<b style="color: white; class="textIntro-'+res+'" >'+hour+'</b>';
						casaCarreras = "-";
						visitantesCarreras = "-";
					}else if(alive == "1"){
						stringStatusGame = '-&nbsp;<b style="color: #33ff00;" class="textIntro-'+res+'" >En Vivo</b>';
					}else if(alive == "2"){
						stringStatusGame = '-&nbsp;<b style="color: #C01704;" class="textIntro-'+res+'"  >Finalizado</b>';
					}else if(alive == "3"){
						stringStatusGame = '-&nbsp;<b style="color: #C01704;" class="textIntro-'+res+'"  >Suspendido</b>';
						if(inningNun == 0){
							casaCarreras = "-";
							visitantesCarreras = "-";
							stringStatusGame = stringStatusGame +' &nbsp;<b style="color: white;" class="textIntro-'+res+'" >'+hour+'</b>';
						}
					}
					stringStatusGame =  stringStatusGame+"&nbsp;<span class='textIntro-"+res+"' style='color: white;'>"+nameStadium+"</span>";
					if(rain == 1){
						stringStatusGame =  ''+stringStatusGame + ' <img class ="rain-'+res+'"  src="images/rain_64.png" />';
					}
			 });
	
	 });
	 
	 //status game
	 var statusGame = document.getElementById('status-game');
	 var item = document.createElement('div');
		 item.innerHTML = stringStatusGame;
		 statusGame.appendChild(item);
	
	 //box score
	var table = document.createElement('table');
	table.setAttribute('border','1');
	table.setAttribute('class','customersboxscore-'+res);
	
	table.setAttribute('id','statusInning');		 
	var tr = document.createElement('tr');
	table.appendChild(tr);
	
	var tdLabel1 = document.createElement('th');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("width","50%");
	tdLabel1.innerHTML = 'Equipo';
	
	tdLabel1 = document.createElement('th');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("width","5%");
	tdLabel1.innerHTML = 'C';
	
	
	tdLabel1 = document.createElement('th');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("width","5%");
	tdLabel1.innerHTML = 'H';
	
	
	tdLabel1 = document.createElement('th');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("width","5%");
	tdLabel1.innerHTML = 'E';
	
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("width","20%");
	tdLabel1.setAttribute("align","center");
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff; border-bottom: 1px dotted #C0C0C0; font-family: scoreboard;background-image: url('images/style/background_boxscore_td.png');");
	tdLabel1.innerHTML = ''+inningNun+'&nbsp;'+stringBuilderUp;
	

	tdLabel1 = document.createElement('td');
	tdLabel1.setAttribute("rowspan","3");
	tr.appendChild(tdLabel1);
	tdLabel1.innerHTML = stringBuilderBase+"";
//	tdLabel1.setAttribute("width","15%");
	tdLabel1.setAttribute("align","center");
	tdLabel1.setAttribute("valign","middle");
	tdLabel1.setAttribute("style","background-image: url('images/style/background_boxscore_td.png');");
	
	
	tr = document.createElement('tr');
	table.appendChild(tr);
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
	
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff; background-image: url('images/style/background_boxscore_td.png');");
	tdLabel1.innerHTML = ''+nameShortHome;
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
//	tdLabel1.setAttribute("width","5%");
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff; background-image: url('images/style/background_boxscore_td.png');");
	tdLabel1.innerHTML = ''+casacarreras;
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
//	tdLabel1.setAttribute("width","5%");
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff; background-image: url('images/style/background_boxscore_td.png');");
	tdLabel1.innerHTML = ''+casahits;
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff; background-image: url('images/style/background_boxscore_td.png');");
//	tdLabel1.setAttribute("width","5%");
	tdLabel1.innerHTML = ''+casaerrores;
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("align","center");
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff; border-bottom: 1px dotted #C0C0C0; font-family: scoreboard;background-image: url('images/style/background_boxscore_td.png');");
//	tdLabel1.setAttribute("width","5%");
	tdLabel1.innerHTML = ''+bolas+"-"+strikes;
	
	tr = document.createElement('tr');
	table.appendChild(tr);
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff; background-image: url('images/style/background_boxscore_td.png');");
	tdLabel1.innerHTML = ''+nameShortVisit;
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff; background-image: url('images/style/background_boxscore_td.png');");
//	tdLabel1.setAttribute("width","5%");
	tdLabel1.innerHTML = ''+visitantecarreras;
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff; background-image: url('images/style/background_boxscore_td.png');");
//	tdLabel1.setAttribute("width","5%");
	tdLabel1.innerHTML = ''+visitantehits;
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff; background-image: url('images/style/background_boxscore_td.png');");
//	tdLabel1.setAttribute("width","5%");
	tdLabel1.innerHTML = ''+visitenteerrores;
	
	tdLabel1 = document.createElement('td');
	tr.appendChild(tdLabel1);
	tdLabel1.setAttribute("style","border-right: 2px solid #ffffff;font-family: scoreboard;background-image: url('images/style/background_boxscore_td.png'); ");
//	tdLabel1.setAttribute("width","25%");
	tdLabel1.setAttribute("align","center");
	var stringOuts = (outs > 1) ? "outs" : "out"; 
	tdLabel1.innerHTML = "&nbsp; "+outs+" "+stringOuts;
	
	inningStatus.appendChild(table); 
	document.getElementById('load-game-status').innerHTML = "";
	
	
	if(flagUpdate){
		  flagUpdate = false;
		  setTimeout("updateMinutoSyncro()",updateTimerMinute);
	  }
	  
	getMinuteByMinute(currentSlug,cantMinuto,flagEvent);
}
//Crom de sincronizacion
function updateMinutoSyncro(){
	
	 // Removing all children from an element
	 if(stackActivity[indexStackActivity] == "minute" && alive == 1 ){
		 
		 var element = document.getElementById("minutoaminutoId");
		 while (element.firstChild) {
		   element.removeChild(element.firstChild);
		 }
		 element = document.getElementById("status-inning");
		 while (element.firstChild) {
		   element.removeChild(element.firstChild);
		 }
		 document.getElementById('load-narrative').innerHTML = "<img width='30' height='30' id='loading' alt='Cargando' src='images/loading.gif' />Cargando....";
		 document.getElementById('load-game-status').innerHTML = "<img width='30' height='30' id='loading' alt='Cargando' src='images/loading.gif' />Cargando....";
		 document.getElementById('vermas').innerHTML = "";
		 document.getElementById('status-game').innerHTML = "";
		// getMinuteByMinute(currentSlug,cantMinuto,flagEvent);	
		 getStatusInnings(currentSlug);
		 
		 setTimeout("updateMinutoSyncro()",updateTimerMinute); //si es necesario
	 
	 } else {
	 	flagUpdate = true; 
	 }
}



function getNews(slug,page){
	var title,intro,imagen,sluglocal,urlS= ajaxURL+"publicador/categoria/"+slug+"/?page="+page;
	
	xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async:true, cache:false, success: function(result){
						if(screen.width >= 480 || screen.height >= 480){
							res = 'hires';
						} else {
							res = 'lowres';
						}
					document.getElementById('news-list').innerHTML = ""; 
					 //find every Tutorial and print the author
					  $(result).find("articulo").each(function()
					  {
						sluglocal = $(this).find("slug").text();
						title = $(this).find("titulo").text();
						intro = $(this).find("intro").text();
						imagen = $(this).find("urlbase").text();
						var position = imagen.lastIndexOf(".");
						var extesion = imagen.substring(position);
						var urlImagen = imagen.substring(0,position);
//						console.log(extesion);
//						console.log(urlImagen);
						//urlImagen  = urlImagen +'61x60'+extesion;
						urlImagen  = urlImagen +'289x232'+extesion;

						var item,container, news = document.getElementById('news-list');

						
						var table = document.createElement('table');
					    table.setAttribute("width","100%");
					    table.setAttribute('onclick', "nextActivity('"+sluglocal+"','detailNews')");
						table.setAttribute('onmouseover',"this.setAttribute('class','altNews-"+res+"')");
						table.setAttribute('onmouseout',"this.setAttribute('class','')");
						table.setAttribute('x-blackberry-focusable','true');
						
					    table.setAttribute('id','tablaNewsId');
					    var tr = document.createElement('tr');
					    table.appendChild(tr);
					    
					    var thLabel = document.createElement('td');
						thLabel.setAttribute("colspan","2");
						tr.appendChild(thLabel);
						thLabel.innerHTML = '<b>'+title+'</b>';
					 
					    tr = document.createElement('tr');
					    table.appendChild(tr);
					    
					    thLabel = document.createElement('td');
					    thLabel.setAttribute("align","left");
					    thLabel.setAttribute("valign","top");
						tr.appendChild(thLabel);
						thLabel.innerHTML = '<div><img src="'+urlImagen+'" class = "imagenNews-'+res+'" /> <p align="justify" class="textIntro-'+res+'"> '+intro+'</p></div> ';
						
						news.appendChild(table);
						var separador = document.createElement('hr');
						news.appendChild(separador);
						
						
					  });
					  document.getElementById('load-news').innerHTML = "";

						//paginacion
						var ptotal, pcurrent, pnext, pprevious, ppaginador;
						
						ppaginador = '';
						
						ptotal = $(result).find("totalpages").text();
						pcurrent = $(result).find("pagina").text();
						pnext = $(result).find("next").text();
						pprevious = $(result).find("previous").text();
						
						if ( (pcurrent != '') && (pcurrent != 1) ){
							if (pprevious != ''){
								ppaginador = ppaginador +'<a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"  onclick="getNews(\''+slug+'\','+pprevious+');" class= "aclick" >&laquo;&nbsp;Anterior</a>';
								
							}
						}
						
						if ( (ptotal != '') && (ptotal != 1) ){
							if (pnext != ''){
								ppaginador = ppaginador + '<span style="float: right;" > <a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'" onclick="getNews(\''+slug+'\','+pnext+');" class= "aclick">Siguiente&nbsp;&raquo;</a></span>';
							}
						}
						
						if (ppaginador !=''){
							ppaginador = '<br/>'  + ppaginador + '<br/><br/>';
						}
						
						document.getElementById('pag-load-news').innerHTML = ppaginador;
						
						//end paginacion
				
				}, error: function(xhrServicesTest, textStatus, errorThrown){
					console.log(""+textStatus);
					console.log(""+errorThrown);
				}
				});
}

function getNewDetail(slug){
	var $title,$body,xmlDoc,$xml,$imagen,builBody,height,res,width,urlS= ajaxURL+"publicador/articulo/"+slug;
	xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: true, cache:true, success: function(result){
				  $xml = $(result);
			    //console.log("XML: "+$xml);
			    $title = $xml.find("titulo");
			    $intro = $xml.find("intro");
			    
				document.getElementById('load-detail').innerHTML = "";
				document.getElementById('title-detail').innerHTML = '<br/><b>'+$title.text()+'</b><br/>';
				var shareText = $title.text();
				//shareText = cleanText(shareText);
				$body = $xml.find("body");
				$imagen = $xml.find("urlbase");
				
//				document.getElementById('red-social').innerHTML = '<img id="idfacebook" src="images/facebook.png" '+
//				'width="32" height="32" onclick="facebookWallPost(\'Minuto a minuto Beisbol Movilnet\',\''+comentarioFirts+'\',\'http://beisbol2012.blve.com/minuto/images/leones.jpg\'); '+
//				'facebookWallPost(\''+$title.text()+'\',\''+$body.text()+'\',\''+$imagen.text()+'\');" />'+
//				'&nbsp;&nbsp;<img  src="images/twitter.png" width="32" height="32" onclick="shareTwitter()" />&nbsp;';
//				
				
				var position = $imagen.text().lastIndexOf(".");
				var extesion = $imagen.text().substring(position);
				var urlImagen = $imagen.text().substring(0,position);
				//manipular el body para darle formato
				var textoBody = $body.text();
				var textoEs = textoBody.replace(/\n/g,"<br/>");
				var textoTab = "&nbsp;";
				var textoPro = textoTab.concat(textoEs);
				//end manipular 
				//console.log("AQUI3");
//				document.getElementById('red-social').innerHTML = '<img id="idfacebook" src="images/facebook.png" '+
//				'width="32" height="32" onclick="facebookWallPost(\'Minuto a minuto Beisbol Movilnet\',\''+textoBody+'\',\'http://beisbol2012.blve.com/minuto/images/leones.jpg\');" /> '+
//				'&nbsp;<img  src="images/twitter.png" width="32" height="32" onclick="shareTwitter()" />&nbsp;';
				
				if(screen.width >= 480 || screen.height >= 480){
					res = 'hires';
				} else {
					res = 'lowres';
				}
				
				var stringBuilder = "http://beisbol.movilnet.com.ve/noticias/detalle/?categoria=noticias&slug="+slug;
				document.getElementById('red-social').innerHTML = '<img x-blackberry-focusable="true" onmouseover = "this.src = \'images/facebook_select.png\'" onmouseout="this.src = \'images/facebook.png\'"    class="arrowLeft-'+res+'" '+
				' id="reintentarButton" src="images/facebook.png" onclick="facebookWallPost(\''+escape($title.text())+'\',\''+escape($intro.text())+'\',\''+escape($imagen.text())+'\',\''+escape(stringBuilder)+'\');" '+
				'/>&nbsp;<img x-blackberry-focusable="true" onmouseover = "this.src = \'images/twitter_select.png\'" onmouseout="this.src = \'images/twitter.png\'"     src="images/twitter.png" class="arrowLeft-'+res+'" onclick=\'shareTwitter("'+encodeURIComponent(shareText)+'");\'  /> ';
				
				if (screen.width >= 480 || screen.height >= 480) {
					urlImagen  = urlImagen +'289x232'+extesion;
				} else {
					urlImagen  = urlImagen +'79x103'+extesion;
				}
				//document.getElementById('body-detail').innerHTML = '<p align="justify" > <img id="imageRight" src="'+urlImagen+'" /> '+$body.text()+"</p>";
				document.getElementById('body-detail').innerHTML = '<img id="imageRight" src="'+urlImagen+'" /> <br/> <p align="justify" >  '+textoPro+"</p>";
				
				}, error: function(xhrServicesTest, textStatus, errorThrown){
					console.log(""+textStatus);
					console.log(""+errorThrown);
				}
				});
}




function tablaPosition(strTabla){
	
	var urlS= ajaxURL+"juego/"+strTabla+"/";
	document.getElementById('load-Position').innerHTML = "<img width='30' height='30' id='loading' alt='Cargando' src='images/loading.gif' />Cargando....";
	xhrServicesTest = $.ajax({url: urlS, dataType: 'xml', async: true, cache:false, success: function(data){
		listPosition(data);
		document.getElementById('load-Position').innerHTML = "";		
	}, error: function(xhrServicesTest, textStatus, errorThrown){
		alert("No se pudo establecer comunicacion con el servidor.\ Por favor intenta de nuevo.");
	}
	});
	
}

function listPosition(list){
	var calendar = document.getElementById('tabladePositionId');
	var res;
	if(screen.width >= 480 || screen.height >= 480){
		res = 'hires';
	} else {
		res = 'lowres';
	}
	var flagVen = 0;
    var table = document.createElement('table');
    table.setAttribute("cellspacing","0");
    table.setAttribute("cellpadding","8");
    table.setAttribute("width","100%");
    
	table.setAttribute('class','customers-'+res);
	table.setAttribute('id','tablaPositionId');
    var tr = document.createElement('tr');
    table.appendChild(tr);
	
    var  thLabel = document.createElement('th');
    thLabel.setAttribute("width","50%");
    thLabel.setAttribute("align","left");
	tr.appendChild(thLabel);
	thLabel.innerHTML = 'Equipos';
	
	thLabel = document.createElement('th');
	tr.appendChild(thLabel);
	thLabel.innerHTML = 'JJ';
	
	thLabel = document.createElement('th');
	tr.appendChild(thLabel);
	thLabel.innerHTML = 'JG';
	
	thLabel = document.createElement('th');
	tr.appendChild(thLabel);
	thLabel.innerHTML = 'JP';
	
	thLabel = document.createElement('th');
	tr.appendChild(thLabel);
	thLabel.innerHTML = 'VENT';
	
	thLabel = document.createElement('th');
	tr.appendChild(thLabel);
	thLabel.innerHTML = 'AVG';
	
	
	 //find breaknews
	  var i = 1;
	  var firstJuegoGanados, fisrtJuegosLoser;
	  var dif;
	  $(list).find("equipo").each(function() {
		  console.log(""+firstJuegoGanados+"' -- '"+fisrtJuegosLoser);
		  var nameEquipo = $(this).find("nombrecorto").text();
		  
		  var juegosjugados = $(this).find("juegosjugados").text();
		  var juegosganados = $(this).find("juegosganados").text();
		  var juegosperdidos = $(this).find("juegosperdidos").text();
		  var average = $(this).find("average").text();
		  if(i == 1){
			  dif = "--";
			  firstJuegoGanados = juegosganados;
			  fisrtJuegosLoser = juegosperdidos;
			  
		  }else{
			  dif = Math.abs(( Math.abs(parseInt(firstJuegoGanados)-parseInt(juegosganados)) + Math.abs(parseInt(fisrtJuegosLoser)-parseInt(juegosperdidos)) )/2);
			  console.log(dif);
		  }
		  
		    tr = document.createElement('tr');
			table.appendChild(tr);
//			if(i % 2 == 0)
//			tr.setAttribute('class','alt');
			
			var tdLabel1 = document.createElement('td');
			tr.appendChild(tdLabel1);
			tdLabel1.innerHTML = ''+'<div id="logoTeam" class ="logoTeam-'+res+'"><img src="images/'+nameEquipo+'.png">&nbsp;'+nameEquipo+'</div>';
			
			tdLabel1 = document.createElement('td');
			tdLabel1.setAttribute("align","center");
			tr.appendChild(tdLabel1);
			tdLabel1.innerHTML = ''+juegosjugados;
			
			tdLabel1 = document.createElement('td');
			tdLabel1.setAttribute("align","center");
			tr.appendChild(tdLabel1);
			tdLabel1.innerHTML = ''+juegosganados;
			
			tdLabel1 = document.createElement('td');
			tdLabel1.setAttribute("align","center");
			tr.appendChild(tdLabel1);
			tdLabel1.innerHTML = ''+juegosperdidos;
			
			
			tdLabel1 = document.createElement('td');
			tdLabel1.setAttribute("align","center");
			tr.appendChild(tdLabel1);
			
			tdLabel1.innerHTML = ''+dif;
			
			tdLabel1 = document.createElement('td');
			tdLabel1.setAttribute("align","center");
			tr.appendChild(tdLabel1);
			tdLabel1.innerHTML = ''+average;
			i++;
	  });
	
	calendar.appendChild(table);
	
	
	if (bb.scroller) {
		bb.scroller.refresh();
	}
	
	
}


//HOME GAMES
function getResultados(date){
	var month = date.getMonth()+1;
	if(month<10){month='0'+month}
	var day = date.getDate();
	var year = date.getFullYear();
	var urlS= ajaxURL+"juego/resultados/"+year+"/"+month+"/"+day+"/";
	document.getElementById('idResultadoTable').innerHTML = "";
	document.getElementById('date-game-resultado').innerHTML = "";
	
	xhrServicesTest = $.ajax({url: urlS, dataType: 'xml',  async: true, cache:false, success: function(result){
		getResultadosDo(result,date);
		
	}, error: function(xhrServicesTest, textStatus, errorThrown){
		//blackberry.widgetcache.clearAll();
		
		var month = date.getMonth();
		if(month<10){month='0'+month}
		actualDate = date.getFullYear()+"-"+month+"-"+date.getDate();
		alert("No se pudo establecer comunicacion con el servidor.\ Por favor intenta de nuevo.");
		console.log(""+textStatus);
		console.log(""+errorThrown);
	}
	});
		
}


function getResultadosDo(result,date){
	
	var game = document.getElementById('idResultadoTable');
	var res, fechaGame = "",i = 0, gameBegin = false, hourGameNext="",nameShortVisitNext="",nameShortHomeNext="";
	var flagDontGame = false;
	if(screen.width >= 480 || screen.height >= 480){
		res = 'hires';
	} else {
		res = 'lowres';
	}
	
	 $(result).find("juego").each(function() {
		var table = document.createElement('table');
		table.setAttribute("width","100%");
		
		table.setAttribute('class','customers-'+res);
		table.setAttribute("cellspacing","0");
		table.setAttribute("cellpadding","0");
		
		table.setAttribute('onmouseover',"this.setAttribute('class','alt-"+res+"')");
		table.setAttribute('onmouseout',"this.setAttribute('class','customers-"+res+"')");
		table.setAttribute('x-blackberry-focusable','true');
		
		
		  flagDontGame = true;
		  var idGame = "",
		  hour = "",
		  nameHome = "",
		  nameShortHome = "",
		  nameStadium = "",
		  nameVisit = "",
		  nameShortVisit ="",
		  day = "", casa ="", visitante="",
		  rain = "",
		  alive = "",
		  casaCarreras="",
		  visitantesCarreras="",
		  inningNun = 0;
		  var stringStatusGame = "";
		
		  idGame = $(this).find("id").text();
		  //console.log(idGame);
		  table.setAttribute('onclick','nextActivity(\''+idGame+'\',\'minute\')');
		  
		  $(this).find("diamante").each(function(){
				casaCarreras = $(this).find("casacarreras").text();
				visitantesCarreras = $(this).find("visitantecarreras").text();
	     });
		  
		  
		  $(this).find("global").each(function(){
			 fechaGame = $(this).find("fecha").text(); 
			 hour =  $(this).find("hora").text();
			 
			 $(this).find("casa").each(function(){
					nameShortHome = $(this).find("nombrecorto").text();
					nameStadium = $(this).find("estadio").text();
		     });
			 $(this).find("visitante").each(function(){
					nameShortVisit = $(this).find("nombrecorto").text();
		     });
			 
		  });
		
	  
		  $(this).find("estado").each(function(){
				day = $(this).find("dia").text();
				rain = $(this).find("lluvia").text();
				alive = $(this).find("activo").text();

				if(alive == "0"){
					stringStatusGame = '-&nbsp <b>'+hour+'</b>';
					casaCarreras = "-";
					visitantesCarreras = "-";
					if(hourGameNext == ""){ 
						nameShortVisitNext = nameShortVisit;
						hourGameNext = hour;
						nameShortHomeNext = nameShortHome;
					}
				}else if(alive == "1"){
					stringStatusGame = '&nbsp;-&nbsp <b style="color: #33ff00;" >En Vivo</b>\n<div >'+inningNun+'</div> ';
					gameBegin = true;
				}else if(alive == "2"){
					stringStatusGame = '-&nbsp <b  style="color: #C01704;" >Finalizado</b>';
				}else if(alive == "3"){
					stringStatusGame = '&nbsp;-&nbsp <b style="color: #C01704;" >Suspendido</b>';
					if(inningNun == 0){
						casaCarreras = "-";
						visitantesCarreras = "-";
						stringStatusGame = stringStatusGame +'\n<div ><b>'+hour+'</b></div>';
					}else{
						stringStatusGame = stringStatusGame +'\n<div >'+inningNun+'</div> '; 
						
					}
					
				}

				if(rain == 1){
					stringStatusGame =  '<div id="logoTeam" class ="logoTeam-'+res+'"> <img class ="rain-'+res+'"  src="images/rain_64.png" />'+stringStatusGame + '</div>';	
				}
				
//				tdLabel1.innerHTML = stringStatusGame;
				
	     });
		  
		var tr = document.createElement('tr');
		table.appendChild(tr);
		var tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '<img id="logoHome" class ="logo-'+res+'" src="images/'+nameShortHome+'.png"  alt=""/>';
		tdLabel1.setAttribute("width","20%");
		tdLabel1.setAttribute("align","center");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = ' <span class="text-'+res+'" >'+casaCarreras+'</span>';
		tdLabel1.setAttribute("width","10%");
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("rowspan","2");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		var strVs = "";
		if(i==0){ strVs = '<img  class ="vs-'+res+'" src="images/home_vs.png" /><br/>';}
		tdLabel1.innerHTML = strVs+''+stringStatusGame+'\n<div >'+nameStadium+'</div>';
		//tdLabel1.innerHTML = '<img  class ="vs-'+res+'" src="images/home_vs.png" /><br/>'+stringStatusGame+'\n<div >'+nameStadium+'</div>';
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("valign","top");
		tdLabel1.setAttribute('style', 'background-image: url(\'images/style/backgroung_vs.png\');background-position: center;');
		tdLabel1.setAttribute("rowspan","2");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '<span class="text-'+res+'" >'+visitantesCarreras+'</span>';
		tdLabel1.setAttribute("width","10%");
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("rowspan","2");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '<img id="logoVisit" class ="logo-'+res+'" src="images/'+nameShortVisit+'.png"  alt=""/>';
		tdLabel1.setAttribute("align","center");
		
		
		tdLabel1.setAttribute("width","20%");
		tr = document.createElement('tr');
		table.appendChild(tr);
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.setAttribute("align","center");
		tdLabel1.innerHTML = '<span class="textName-'+res+'" >'+nameShortHome+'</span>';
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.setAttribute("align","center");
		tdLabel1.innerHTML = '<span class="textName-'+res+'" >'+nameShortVisit+'</span>';
		 game.appendChild(table);
		 //var separador = document.createElement('hr');
		 //game.appendChild(separador);
		 i++;
	  });
	
	 document.getElementById('load-game-resultado').innerHTML = "";

		var hoy = new Date();
		var stringBuilder = formatDate(date);
		console.log(actualDate);
		var flagHoy = true;
		
		if((hoy.getMonth() == date.getMonth()) && (hoy.getDate() == date.getDate()) ){
			var month = date.getMonth();
			if(month<10){month='0'+month}
			actualDate = date.getFullYear()+"-"+month+"-"+date.getDate();

			if((date.getMonth() == 9) && (date.getDate() == 11)){
				flagHoy= false;
			}
			if(!flagDontGame){
				var day = actualDate.substring(8, 10);
				var month = actualDate.substring(5, 7);
				var year = actualDate.substring(0,4);
				var flagDate = new Date(year,month,day);
				
				document.getElementById('load-game-resultado').innerHTML = "<img width='30' height='30'  id='loading' alt='Cargando' src='images/loading.gif' />Cargando....";
				date.setDate(date.getDate()-1);
				if(flagHoy)
				getResultados(date);
				else document.getElementById('load-game-resultado').innerHTML = "No se tiene resultados";
				return false;		
			}
			date.setDate(date.getDate()-1);
			var month = date.getMonth();
			if(month<10){month='0'+month}
			var stringBuilder1 = date.getFullYear()+"-"+month+"-"+date.getDate();
			
			
			var strDate = '<table width = "100%"   style="background-image:url(\'images/style/barra_flechas.jpg\');  background-repeat: repeat-x;" > <tr><td align="left" width = "10%">';
			if(flagHoy){
				strDate = strDate + ' <img  x-blackberry-focusable="true" onmouseover = "this.src = \'images/arrow_left_click.png\'" onmouseout="this.src = \'images/arrow_left.png\'"  class ="arrowLeft-'+res+'" id="" alt="" src="images/arrow_left.png" onclick="paginationResutadoDay(\''+stringBuilder1+'\');" />';
			}
			strDate = strDate + '</td><td align="center" width= "80%">'+stringBuilder+'</td><td align="right" width = "10%"></td></tr> </table>';
			document.getElementById('date-game-resultado').innerHTML = strDate;
			
			
			
		}else{
			
			if((date.getMonth() == 9) && (date.getDate() == 11)){
				flagHoy= false;
			}
			
			if(!flagDontGame){
				var day = actualDate.substring(8, 10);
				var month = actualDate.substring(5, 7);
				var year = actualDate.substring(0,4);
				var flagDate = new Date(year,month,day);
				document.getElementById('load-game-resultado').innerHTML = "<img width='30' height='30'  id='loading' alt='Cargando' src='images/loading.gif' />Cargando....";
				if(flagDate > date){	
					date.setDate(date.getDate()-1);
					if(flagHoy)
					getResultados(date);
					else document.getElementById('load-game-resultado').innerHTML = "No se tiene resultados";
					return false;
				}else{
					date.setDate(date.getDate()+1);
					if(flagHoy)
					getResultados(date);
					else document.getElementById('load-game-resultado').innerHTML = "No se tiene resultados";
					return false;
				}
			}
			var month = date.getMonth();
			if(month<10){month='0'+month}
			
			actualDate = date.getFullYear()+"-"+month+"-"+date.getDate();
			date.setDate(date.getDate()-1); 
			var month = date.getMonth();
			if(month<10){month='0'+month}
			var stringBuilder1 = date.getFullYear()+"-"+month+"-"+date.getDate();
			date.setDate(date.getDate()+2);
			var month = date.getMonth();
			if(month<10){month='0'+month}
			var stringBuilder2 = date.getFullYear()+"-"+month+"-"+date.getDate();
			
			var strDate = '<table  width = "100%"  style="background-image:url(\'images/style/barra_flechas.jpg\');  background-repeat: repeat-x;" ><tr><td align="left" width = "10%">';
			if(flagHoy){
				strDate = strDate + '<img x-blackberry-focusable="true" onmouseover = "this.src = \'images/arrow_left_click.png\'" onmouseout="this.src = \'images/arrow_left.png\'"   class ="arrowLeft-'+res+'"  id="" alt="" src="images/arrow_left.png" onclick="paginationResutadoDay(\''+stringBuilder1+'\');" />';
			}
			strDate = strDate + '</td><td align="center" width= "80%">'+stringBuilder+'</td><td align="right"  width = "10%"><img x-blackberry-focusable="true" onmouseover = "this.src = \'images/arrow_right_click.png\'" onmouseout="this.src = \'images/arrow_right.png\'"  class ="arrowLeft-'+res+'" id="" alt="" src="images/arrow_right.png" onclick="paginationResutadoDay(\''+stringBuilder2+'\');" /></td></tr> </table>';
			document.getElementById('date-game-resultado').innerHTML = strDate;				
		}
	
	
}

function paginationResutadoDay(pageDay){
	var element = document.getElementById("idResultadoTable");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	var day = pageDay.substring(8, 10);
	var month = pageDay.substring(5, 7);
	var year = pageDay.substring(0,4);
	var date = new Date(year,month,day);
	document.getElementById('load-game-resultado').innerHTML = "<img  width='30' height='30'  id='loading' alt='Cargando' src='images/loading.gif' />Cargando....";
	getResultados(date);
}


Date.prototype.getWeek = function() { 
    var determinedate = new Date(); 
    determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate()); 
    var D = determinedate.getDay(); 
    if(D == 0) D = 7; 
    determinedate.setDate(determinedate.getDate() + (4 - D)); 
    var YN = determinedate.getFullYear(); 
    var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000); 
    var WN = 1 + Math.floor(ZBDoCY / 7); 
    return WN; 
}


Date.prototype.getWeekSecuencial = function() { 
    var determinedate = new Date(); 
    determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate()); 
    var D = determinedate.getDay();
    if(D == 0) D = 7; 
    determinedate.setDate(determinedate.getDate() + (4 - D)); 
    var YN = determinedate.getFullYear(); 
    var ZBDoCY = Math.floor((determinedate.getTime() - new Date(2012, 9, 11, -6)) / 86400000); 
    var WN = 1 + Math.floor(ZBDoCY / 7);
    return WN; 
}




function getCalendar(date,page){
	
	dateGlobal = date;
	var month = date.getMonth()+1;
	var day = date.getDate();
	stringDate = date.getFullYear()+"-"+month+"-"+date.getDate();
	var dateWeek = new Date();
	dateWeek.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
	var weeknumber = dateWeek.getWeek();
	var weeknumberSecuencial = dateWeek.getWeekSecuencial();
	
	var firstWeek  = new Date(2012,11,31 );
	var lastWeek  = new Date(2013,0,6);
	
	if(date >= firstWeek && date <= lastWeek){
		var urlS= ajaxURL+"juego/semana/2012/53/smartphone/";
	}else if(date >= lastWeek){
		var urlS= ajaxURL+"juego/semana/"+date.getFullYear()+"/"+ (parseInt(weeknumber)-1);+"/smartphone/";
	}else{
		var urlS= ajaxURL+"juego/semana/"+date.getFullYear()+"/"+weeknumber+"/smartphone/";
	}
	
	document.getElementById('load-calendar').innerHTML = "<img width='30' height='30' id='loading' alt='Cargando' src='images/loading.gif' />Cargando....";
	xhrServicesTest = $.ajax({url: urlS, dataType: 'xml', async: true, cache:false, success: function(data){
	var pageBack,dayBack;
	var paginationDay = document.getElementById('pagination-day');
	var stringBuilderDay = ""; 
	if(month<10){month='0'+month}
	if(day<10){day='0'+day}

	if(weeknumberSecuencial == '1'){
		stringBuilderDay = '<table width="100%" style="background-image: url(\'images/style/background_boxscore_td.png\');" > <tr><td align="left" width="30%"></td>'+
		'<td align="center" width="40%" style="color: white;">Semana '+weeknumberSecuencial+'</td><td width="30%" '+
		'align="right"> '+
		'<img x-blackberry-focusable="true" onmouseover = "this.src = \'images/arrow_right_click.png\'" onmouseout="this.src = \'images/arrow_right.png\'"  class ="arrowLeft-'+res+'" id="" alt="" src="images/arrow_right.png" onclick="paginationCalendarDay(\'2012-09-18\');" /> '+
		'</td></tr></table>';
	}else{
		date.setDate(date.getDate()-7);
		var monthValidate = (date.getMonth() < 10) ? "0"+date.getMonth() : date.getMonth();
		var dayValidate = (date.getDate() < 10) ? "0"+date.getDate() : date.getDate();
		
		var stringBackDay = date.getFullYear()+"-"+monthValidate+"-"+dayValidate;
		date.setDate(date.getDate()+14);
		monthValidate = (date.getMonth() < 10) ? "0"+date.getMonth() : date.getMonth();
		dayValidate = (date.getDate() < 10) ? "0"+date.getDate() : date.getDate();
		
		var stringNextDay = date.getFullYear()+"-"+monthValidate+"-"+dayValidate;
		date.setDate(date.getDate()-7);
		console.log(""+stringBackDay+" --- "+stringNextDay);
		var nextWeek = (parseInt(weeknumberSecuencial)+1);
		if(nextWeek == 53 ) nextWeek = 1;	
		var backWeek  = (parseInt(weeknumberSecuencial)-1);
		if(backWeek == 0) backWeek = 52;
		stringBuilderDay = '<table width="100%" style=" font-family: Freshman; background-image: url(\'images/style/background_boxscore_td.png\');" > <tr><td align="left" width="30%">'+ 
			'<img x-blackberry-focusable="true" onmouseover = "this.src = \'images/arrow_left_click.png\'" onmouseout="this.src = \'images/arrow_left.png\'"  class ="arrowLeft-'+res+'" id="" alt="" src="images/arrow_left.png"    onclick="paginationCalendarDay(\''+stringBackDay+'\');" /></td><td align="center" width="40%" style="color: white;">Semana '+weeknumberSecuencial+'</td><td width="30%" align="right">'+
			'<img x-blackberry-focusable="true" onmouseover = "this.src = \'images/arrow_right_click.png\'" onmouseout="this.src = \'images/arrow_right.png\'"  class ="arrowLeft-'+res+'" src="images/arrow_right.png"   onclick="paginationCalendarDay(\''+stringNextDay+'\');"  > </td></tr></table>';
	}
	
		paginationDay.innerHTML = stringBuilderDay;
		makeTableCalendar(data);		
		document.getElementById('load-calendar').innerHTML = "";
		
	}, error: function(xhrServicesTest, textStatus, errorThrown){
		alert("No se pudo establecer comunicacion con el servidor.\ Por favor intenta de nuevo.");
	}
	});
	
}

function paginationCalendarDay(pageDay){
	
	var paginationDay = document.getElementById('pagination-day');
	paginationDay.innerHTML = "";
	document.getElementById('load-calendar').innerHTML = "<img width='30' height='30'  id='loading' alt='Cargando' src='images/loading.gif' />Cargando....";
	var element = document.getElementById("calendarioListId");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	var day = pageDay.substring(8, 10);
	var month = pageDay.substring(5, 7);
	var year = pageDay.substring(0,4);
	
	var date = new Date(year,month,day);
	getCalendar(date,1);
}



function makeTableCalendar(list){
	
	var calendar = document.getElementById('calendarioListId');
	var res, fechaGame = "",i = 0, gameBegin = false, hourGameNext="",nameShortVisitNext="",nameShortHomeNext="";
	var flagDontGame = false, dayName="", pastName = "";
	var table;
	if(screen.width >= 480 || screen.height >= 480){
		res = 'hires';
	} else {
		res = 'lowres';
	}
	 $(list).find("juego").each(function() {
		
		table = document.createElement('table');
		table.setAttribute("width","100%");
		table.setAttribute('id','tablaCalendarId');
		
		table.setAttribute('class','customers-'+res);
		table.setAttribute("cellspacing","0");
		table.setAttribute("cellpadding","0");
		
		table.setAttribute('onmouseover',"this.setAttribute('class','alt-"+res+"')");
		table.setAttribute('onmouseout',"this.setAttribute('class','customers-"+res+"')");
		table.setAttribute('x-blackberry-focusable','true');
		 
		  flagDontGame = true;
		  var idGame = "",
		  hour = "",
		  nameHome = "",
		  nameShortHome = "",
		  nameStadium = "",
		  nameVisit = "",
		  nameShortVisit ="",
		  day = "", casa ="", visitante="",
		  rain = "",
		  alive = "",
		  casaCarreras="",
		  visitantesCarreras="",stringBuilderUp="",
		  inningNun = 0;
		  var stringStatusGame = "";
		
		  idGame = $(this).find("id").text();
		  console.log(idGame);

		  $(this).find("global").each(function(){
			 fechaGame = $(this).find("fecha2").text();
			 fecha2 = $(this).find("fecha").text();
			 
			 var pos = fechaGame.indexOf(",");
			 //console.log("'"+fechaGame.substring(0,pos)+"'");
			 dayName = fechaGame.substring(0,pos);
			 hour =  $(this).find("hora").text();
			 if(pastName != dayName){
				 var div = document.createElement('div');
				 div.innerHTML = ""+fecha2.substring(0,(fecha2.length)-4).toUpperCase();
				 div.setAttribute("width","100%");
				 div.setAttribute("align","center");
				 div.setAttribute("class","textDiaSemana");
				 calendar.appendChild(div);
		  	 }
			 pastName = fechaGame.substring(0,pos);
			 
			 $(this).find("casa").each(function(){
					nameShortHome = $(this).find("nombrecorto").text();
					nameStadium = $(this).find("estadio").text();
		     });
			 $(this).find("visitante").each(function(){
					nameShortVisit = $(this).find("nombrecorto").text();
		     });
			 
		  });
		var tr = document.createElement('tr');
		table.appendChild(tr);
		var tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '<img id="logoHome" class ="logo-'+res+'" src="images/'+nameShortHome+'.png"  alt=""/>';
		tdLabel1.setAttribute("width","25%");
		tdLabel1.setAttribute("align","center");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '';
		tdLabel1.setAttribute("width","7%");
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("rowspan","2");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		var strVs = "";
		if(i==0){ strVs = '<img  class ="vs-'+res+'" src="images/home_vs.png" /><br/>';}
		tdLabel1.innerHTML = strVs+'\n'+hour+'\n<div >'+nameStadium+'</div>';
		//tdLabel1.innerHTML = '<img class ="vs-'+res+'" src="images/home_vs.png" /><br/>'+hour+'\n<div>'+nameStadium+'</div>';
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("valign","top");
		tdLabel1.setAttribute('style', 'background-image: url(\'images/style/backgroung_vs.png\');background-position: center;');
		tdLabel1.setAttribute("rowspan","2");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '';
		tdLabel1.setAttribute("width","7%");
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("rowspan","2");
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.innerHTML = '<img  id="logo"  class ="logo-'+res+'" src="images/'+nameShortVisit+'.png"  alt=""/>';
		tdLabel1.setAttribute("align","center");
		tdLabel1.setAttribute("width","25%");
		tr = document.createElement('tr');
		table.appendChild(tr);
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.setAttribute("align","center");
		tdLabel1.innerHTML = '<span class="textName-'+res+'" >'+nameShortHome+'</span>';
		tdLabel1 = document.createElement('td');
		tr.appendChild(tdLabel1);
		tdLabel1.setAttribute("align","center");
		tdLabel1.innerHTML = '<span class="textName-'+res+'" >'+nameShortVisit+'</span>';
		calendar.appendChild(table);
		//var separador = document.createElement('hr');
		//calendar.appendChild(separador);
		 i++;
	  });
	 
	 document.getElementById('load-calendar').innerHTML = "";

}




