var xhrServicesTest;

function setCurrentSlug(slug,nextPage){
currentSlug = slug;
bb.pushScreen(nextPage+'.html', ''+nextPage);
}


function getNewHighlight(usecache){
	var res;
	if(screen.width >= 480 || screen.height >= 480){
		res = 'hires';
	} else {
		res = 'lowres';
	}
	var $title,$body,xmlDoc,$xml,$intro,$imagen,$slug,builBody,height,width,urlS= ajaxURL+"publicador/seccion/destacado-smartphone/";
	xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: true, cache: usecache, success: function(result){
					
					$xml = $(result);
					$title = $xml.find("titulo");
					console.log(''+$title.text());
					$intro = $xml.find("intro");
					console.log(''+$intro.text());
					$imagen = $xml.find("urlbase");
					console.log(''+$imagen.text());
					$slug = $xml.find("slug");
					console.log(''+$slug.text());
					
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
						item.setAttribute('onclick', "setCurrentSlug('"+$slug.text()+"','detailNews')");
						item.setAttribute('x-blackberry-focusable','true');
						item.innerHTML = '<img id="noticiaDestacada" src="'+urlImagen+'" width = "'+width+'" />'+
						'<div onclick ="setCurrentSlug("'+$slug.text()+'","detailNews")" class = "bb-bb10-grid-item-overlay-'+res+'" x-blackberry-focusable = "true" onmouseover = "this.className = \'bb-bb10-grid-item-overlay-hover-'+res+'\'" onmouseout="this.className = \'bb-bb10-grid-item-overlay-'+res+'\'"  >  '+
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
									startAudio("sounds/AlarmComplete.mp3");
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
											startAudio("sounds/AlarmComplete.mp3");
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
						
						
						
				}, error: function(xhrServicesTest, textStatus, errorThrown){
					console.log(""+textStatus);
					console.log(""+errorThrown);
				}
				});
		
		window.addEventListener("resize", function() {
		  // Get screen size (inner/outerWidth, inner/outerHeight)
		document.getElementById('noticiaDestacada').width = (window.innerWidth);
		  
	}, false);
		
}


function getMinuteByMinute(cant,filterVen){
	
	var  idEvento,nameEvento,idDiscipline,nameDiscipline,idParticipacion, nameParticipacion, date, comentario ,urlS= "http://xmlolimpiadascms.movidamovil.com/juego/725/bn/"+cant+"/"+filterVen;
	xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: true, cache:false, success: function(result){
	  console.log("getMinuteByMinute: " + result);
	 
	 //find breaknews
	  $(result).find("breaknew").each(function() {
	  
		 $(this).find("evento").each(function(){
			idEvento = $(this).find("id").text();
			nameEvento = $(this).find("nombre").text();
		  });
		  $(this).find("disciplina").each(function(){
			idDiscipline= $(this).find("id").text();
			nameDiscipline = $(this).find("nombre").text();
		  });
		$(this).find("participacion").each(function(){
			idParticipacion = $(this).find("id").text();
			nameParticipacion = $(this).find("nombre").text();
		  });
		  
		date = $(this).find("fecha").text();
		comentario = $(this).find("comentario").text();
		
		var item,container, news = document.getElementById('minutoaminutoId');
			
			item = document.createElement('div');
			item.setAttribute('data-bb-type', 'item');
			item.setAttribute('data-bb-accent-text', ''+date);
			item.setAttribute('data-bb-venezuela', ''+nameParticipacion);
			item.setAttribute('data-bb-evento', ''+nameEvento);
			item.setAttribute('data-bb-title', ''+nameDiscipline );
			item.setAttribute('data-bb-img', 'images/discipline/'+idDiscipline+'.png');
			item.innerHTML = '' + comentario;
			// Create a dummy container
			
			container = document.createElement('div');
			container.appendChild(item);
			// Apply the styling
			bb.minutoaminuto.apply([container]);
			
			news.appendChild(container.firstChild);
			
			if (bb.scroller) {
				bb.scroller.refresh();
			}
			//check if breaknews notification
			if (lbnFound == false) {
				if (nameParticipacion == "Venezolanos") {
					var lbn = new Date(currentLastBreakNews);
					currentbn = new Date(date);
					
					//alert("lbn: "+lbn+" - currentbn: "+currentbn);
					
					if (currentbn > lbn) {
						startVibrate();
						M2AS.indicator.set(-1);	
						startAudio("sounds/AlarmComplete.mp3");
						if(!isFlagForeground){
								blackberry.app.setHomeScreenIcon("local:///images/icono_BB64x.png"); 
							}
						lbnFound = true;
					}
				
				}
			}
			//end check if breaknews notification
			
	  });
	  
	  
	  //update breaknews notification
	  if (lbnFound == true) {
	  	updateNewsNotificationsBreakNews(currentbn); //actualizo el ultimo bn de vzla
	  	lbnFound = false;
	  }
	  //end update breaknews notification
	  
	  document.getElementById('vermas').innerHTML = "ver m&aacute;s";
	  document.getElementById('load-narrative').innerHTML = "";
	  console.log(flagUpdate);
	  if(flagUpdate){
		  flagUpdate = false;
		  setTimeout("updateMinutoSyncro()",updateTimer);
	  }

}, error: function(xhrServicesTest, textStatus, errorThrown){
console.log(""+textStatus);
console.log(""+errorThrown);
}
});
	
		
}

function updateMinutoSyncro(){
	
 // Removing all children from an element
  var numItems = bb.screens.length;
  var currentStackItem = bb.screens[numItems-1]
 if(currentStackItem.id == "narrative" ){
	 document.getElementById('load-narrative').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";
	 var element = document.getElementById("minutoaminutoId");
	 while (element.firstChild) {
	   element.removeChild(element.firstChild);
	 }
	 
	 document.getElementById('vermas').innerHTML = "";
	 
	 getMinuteByMinute(cantMinuto,flagVen); //actualizacion del minuto a minuto (Momento Olimpico)
	 
	 getNewHighlight(false); //Actualizacion de la noticia destacada
	 
	 setTimeout("updateMinutoSyncro()",updateTimer); //si es necesario
 
 } else {
 	flagUpdate = true; 
 }
}


function getNews(slug,page){

			var title,intro,imagen,sluglocal,urlS= ajaxURL+"publicador/categoria/"+slug+"/?page="+page;
		xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: true, cache:false, success: function(result){
						  console.log("getNews: " + result);
						 
						 	document.getElementById('news-list').innerHTML = ""; //added
						 
						 //find every Tutorial and print the author
						  $(result).find("articulo").each(function()
						  {
						  
							sluglocal = $(this).find("slug").text();
							console.log("Prueba: "+sluglocal);
							title = $(this).find("titulo").text();
							intro = $(this).find("intro").text();
							imagen = $(this).find("urlbase").text();
							var position = imagen.lastIndexOf(".");
							var extesion = imagen.substring(position);
							var urlImagen = imagen.substring(0,position);
							console.log(extesion);
							console.log(urlImagen);
							//urlImagen  = urlImagen +'61x60'+extesion;
							
							urlImagen  = urlImagen +'289x232'+extesion;
							
							console.log(urlImagen);
							
							var item,container, news = document.getElementById('news-list');
								console.log(news);
								item = document.createElement('div');
								item.setAttribute('data-bb-type', 'item');
								item.setAttribute('data-bb-img', ''+urlImagen);
								item.setAttribute('data-bb-title', '' + title);
								item.setAttribute('data-type-list', 'news');
								item.setAttribute('onclick', "setCurrentSlug('"+sluglocal+"','detailNews')");
								item.innerHTML = '' + intro;
								// Create a dummy container
								
								container = document.createElement('div');
								container.appendChild(item);
								// Apply the styling
								bb.imageList.apply([container]);
								
								news.appendChild(container.firstChild);
								
								if (bb.scroller) {
									bb.scroller.refresh();
								}
								
								
								
							
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


function getGenerationGold(slug,page){
 
	var title,intro,imagen,sluglocal,urlS= ajaxURL+"publicador/categoria/"+slug+"/?page="+page;
			xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: true, cache:false, success: function(result){
							  console.log("getGenerationGold: " + result);
							 
							  document.getElementById('gd-list').innerHTML = ""; //added
							 
							 //find every Tutorial and print the author
							  $(result).find("articulo").each(function()
							  {
								sluglocal = $(this).find("slug").text();
								console.log(""+sluglocal);
								title = $(this).find("titulo").text();
								intro = $(this).find("intro").text();
								imagen = $(this).find("urlbase").text();
								
								var position = imagen.lastIndexOf(".");
								var extesion = imagen.substring(position);
								var urlImagen = imagen.substring(0,position);
								urlImagen  = urlImagen +'289x232'+extesion;
								console.log(urlImagen);
								
								var item,container, news = document.getElementById('gd-list');
									item = document.createElement('div');
									item.setAttribute('data-bb-type', 'item');
									item.setAttribute('data-bb-img', ''+urlImagen);
									item.setAttribute('data-bb-title', '' + title);
									item.setAttribute('data-type-list', 'generationGold');
									item.setAttribute('onclick', "setCurrentSlug('"+sluglocal+"','detailGeneration')");
									item.innerHTML = '' + intro;
									// Create a dummy container
									
									container = document.createElement('div');
									container.appendChild(item);
									// Apply the styling
									bb.imageList.apply([container]);
									
									news.appendChild(container.firstChild);
									
									if (bb.scroller) {
										bb.scroller.refresh();
									}
								
							  });
							  document.getElementById('load-GD').innerHTML = "";

								//paginacion
								var ptotal, pcurrent, pnext, pprevious, ppaginador;
								
								ppaginador = '';
								
								ptotal = $(result).find("totalpages").text();
								pcurrent = $(result).find("pagina").text();
								pnext = $(result).find("next").text();
								pprevious = $(result).find("previous").text();
								
								if ( (pcurrent != '') && (pcurrent != 1) ){
									if (pprevious != ''){
										ppaginador = ppaginador +'<a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"  onclick="getGenerationGold(\''+slug+'\','+pprevious+');" class= "aclick" >&laquo;&nbsp;Anterior</a>';
										
									}
								}
								
								if ( (ptotal != '') && (ptotal != 1) ){
									if (pnext != ''){
										ppaginador = ppaginador + '<span style="float: right;" > <a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'" onclick="getGenerationGold(\''+slug+'\','+pnext+');" class= "aclick">Siguiente&nbsp;&raquo;</a></span>';
									}
								}
								
								if (ppaginador !=''){
									ppaginador = '<br/>'  + ppaginador + '<br/><br/>';
								}
								
								document.getElementById('pag-load-GD').innerHTML = ppaginador;
								
								//end paginacion
								
							
								
						}, error: function(xhrServicesTest, textStatus, errorThrown){
							console.log(""+textStatus);
							console.log(""+errorThrown);
						}
						});


}



function getNewDetail(slug){
	
	var $title,$body,xmlDoc,$xml,$imagen,builBody,height,width,urlS= ajaxURL+"publicador/articulo/"+slug;
	xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: true, cache:false, success: function(result){
				console.log("result: " + result);
			    $xml = $(result);
			    console.log("XML: "+$xml);
			    $title = $xml.find("titulo");
				document.getElementById('load-detail').innerHTML = "";
				document.getElementById('title-detail').innerHTML = '<br/><b>'+$title.text()+'</b><br/>';
				
				var shareText = $title.text();
				
				//shareText = cleanText(shareText);
				
				document.getElementById('red-social').innerHTML = '<a    href="#" onclick="shareFB();"><img x-blackberry-focusable="true" onmouseover = "this.src = \'images/1339472875_FaceBook_32x32_select.png\'" onmouseout="this.src = \'images/1339472875_FaceBook_32x32.png\'" src="images/1339472875_FaceBook_32x32.png" width="32" height="32" /></a>&nbsp;&nbsp;<a   href="#" onclick = "shareTwitter(\''+shareText+'\');"><img x-blackberry-focusable="true" onmouseover = "this.src = \'images/1339470396_Twitter_32x32_select.png\'" onmouseout="this.src = \'images/1339470396_Twitter_32x32.png\'"  src="images/1339470396_Twitter_32x32.png" width="32" height="32" /></a>&nbsp;';
				
				$body = $xml.find("body");
				$imagen = $xml.find("urlbase");
				
				var position = $imagen.text().lastIndexOf(".");
				var extesion = $imagen.text().substring(position);
				var urlImagen = $imagen.text().substring(0,position);
				
				//manipular el body para darle formato
				var textoBody = $body.text();
				
				var textoEs = textoBody.replace(/\n/g,"<br/>");
				
				var textoTab = "&nbsp;";
				
				var textoPro = textoTab.concat(textoEs);
				//end manipular 
				
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


function getDiscipline(slug,page){
		console.log("discipline: ");
	var title,intro,imagen,sluglocal,urlS= ajaxURL+"publicador/categoria/"+slug+"/?page="+page;
			xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: true, cache:false, success: function(result){
							  console.log("getGenerationGold: " + result);
							  
							  document.getElementById('discipline-list').innerHTML = ""; //added
							 
							 //find every Tutorial and print the author
							  $(result).find("articulo").each(function()
							  {
								sluglocal = $(this).find("slug").text();
								console.log(""+sluglocal);
								title = $(this).find("titulo").text();
								intro = $(this).find("intro").text();
								imagen = $(this).find("urlbase").text();
								var position = imagen.lastIndexOf(".");
								var extesion = imagen.substring(position);
								var urlImagen = imagen.substring(0,position);
								urlImagen  = urlImagen +'61x60'+extesion;
								console.log(urlImagen);
								
								var item,container, news = document.getElementById('discipline-list');
									item = document.createElement('div');
									item.setAttribute('data-bb-type', 'item');
									item.setAttribute('data-bb-img', ''+urlImagen);
									item.setAttribute('data-bb-title', '' + title);
									item.setAttribute('data-type-list', 'discipline');
									item.setAttribute('onclick', "setCurrentSlug('"+sluglocal+"','detailDiscipline')");
									item.innerHTML = '' + intro;
									// Create a dummy container
									
									container = document.createElement('div');
									container.appendChild(item);
									// Apply the styling
									bb.imageList.apply([container]);
									
									news.appendChild(container.firstChild);
									
									if (bb.scroller) {
										bb.scroller.refresh();
									}
								
							  });
							  document.getElementById('load-discipline').innerHTML = "";
							  
							  //paginacion
								var ptotal, pcurrent, pnext, pprevious, ppaginador;
								
								ppaginador = '';
								
								ptotal = $(result).find("totalpages").text();
								pcurrent = $(result).find("pagina").text();
								pnext = $(result).find("next").text();
								pprevious = $(result).find("previous").text();
								
								if ( (pcurrent != '') && (pcurrent != 1) ){
									if (pprevious != ''){
										ppaginador = ppaginador +'<a x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"  onclick="getDiscipline(\''+slug+'\','+pprevious+');" class= "aclick" >&laquo;&nbsp; Anterior</a>';
										
									}
								}
								
								if ( (ptotal != '') && (ptotal != 1) ){
									if (pnext != ''){
										ppaginador = ppaginador + '<span style="float: right;" > <a x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'" onclick="getDiscipline(\''+slug+'\','+pnext+');" class= "aclick">Siguiente&nbsp;&raquo;</a></span>';
									}
								}
								
								if (ppaginador !=''){
									ppaginador = '<br/>' + ppaginador + '<br/><br/>';
								}
								
								document.getElementById('pag-load-discipline').innerHTML = ppaginador;
								
								//end paginacion
		

							
								
						}, error: function(xhrServicesTest, textStatus, errorThrown){
							console.log(""+textStatus);
							console.log(""+errorThrown);
						}
						});


}

function getMedal(page){
	console.log("getMedal");
		var urlS= "http://olimpiadas.movidamovil.com/medallero/?page="+page+"&cant=10"; 
			console.log(""+urlS);
			document.getElementById('load-medal-venezuela').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";
			document.getElementById('load-medal').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";
			/*
			document.getElementById('medal').innerHTML = "";
			document.getElementById('medal-venezuela').innerHTML = "";
			 */
		xhrServicesTest = $.ajax({url: urlS, dataType: 'json',  async: true, cache:false, success: function(data){
			getMedalDo(data);
		}, error: function(xhrServicesTest, textStatus, errorThrown){
			blackberry.widgetcache.clearAll();
			alert("No se pudo establecer comunicacion con el servidor.\ Por favor intenta de nuevo.");
		}
		});



}



function getMedalDo(data){
	
	var vzla = data['vzla'];
	console.log(""+vzla);
	makeTableVen(vzla.pos, vzla.pais,vzla.corto, vzla.oro, vzla.plata, vzla.bronce);
	//console.log("-"+ data['total']+"-"+data['cant']+"-"+data['page']+"-"+data['totalpages']);
	var page = data['page'];
	var pageNext;
	var pageBack;
	var totalPage = data['totalpages'];
	var pagination = document.getElementById('pagination-medal');
	//var paginationDown = document.getElementById('pagination-medal-down');
	
	var stringBuilder = ""; 
	if(totalPage != 0){
		if(page == totalPage){
			if(page != 1){
				pageBack =  parseInt(page)-1;
				stringBuilder = '<a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"  onclick="paginationMedal('+pageBack+');" class= "aclick" >&laquo;&nbsp;Anterior</a>';
			}
		}else if(page == 1 ){
			pageNext = parseInt(page)+1;
			console.log(""+pageNext);
			stringBuilder = '<span style="float: right;" > <a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"   onclick="paginationMedal('+pageNext+');" class= "aclick">Siguiente&nbsp;&raquo;</a> </span> '+
							'<a >&nbsp;</a>';
		}else{
			pageNext =  parseInt(page)+1;
			pageBack =  parseInt(page)-1;
		stringBuilder = '<span style="float: right;" >'+
						'<a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"   onclick="paginationMedal('+pageNext+');" class= "aclick">Siguiente&nbsp;&raquo; </a>'+
						'</span>'+
						'<a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"  onclick="paginationMedal('+pageBack+');" class= "aclick" >&laquo;&nbsp;Anterior</a>';
		}
	}
	pagination.innerHTML = stringBuilder;
	var list = data['lista'];
	//makeMedalRow(list);
	makeTableMedal(list);
	//paginationDown.innerHTML = stringBuilder;
}

function makeTableVen(pos,pais,corto,oro,plata,bronce){
// Create our containing table
			var medal = document.getElementById('medal-venezuela');
			var res;
			if(screen.width >= 480 || screen.height >= 480){
				res = 'hires';
			} else {
				res = 'lowres';
			}
			var total;
			var table = document.createElement('table');
			table.setAttribute('class','customers-'+res);
			table.setAttribute('id','medalVenID');
			var tr = document.createElement('tr');
			table.appendChild(tr);
			tr.setAttribute('class','venezuela');
			var thLabel = document.createElement('th');
			tr.appendChild(thLabel);
			thLabel.innerHTML = '#';
			thLabel = document.createElement('th');
			tr.appendChild(thLabel);
			thLabel.innerHTML = 'Pa&iacute;s';
			thLabel = document.createElement('th');
			tr.appendChild(thLabel);
			thLabel.innerHTML = 'Oro';
			thLabel = document.createElement('th');
			tr.appendChild(thLabel);
			thLabel.innerHTML = 'Plata';
			thLabel = document.createElement('th');
			tr.appendChild(thLabel);
			thLabel.innerHTML = 'Bronce';
			thLabel = document.createElement('th');
			tr.appendChild(thLabel);
			thLabel.innerHTML = 'Total';				
			
			
			var tr = document.createElement('tr');
			table.appendChild(tr);
			tr.setAttribute('class','venezuela');
			var tdLabel1 = document.createElement('td');
			tr.appendChild(tdLabel1);
			tdLabel1.innerHTML = ''+pos;
			tdLabel1 = document.createElement('td');
			tr.appendChild(tdLabel1);
			tdLabel1.innerHTML = '<div id="medalcounter" class ="medalcounter-'+res+'"><img src="images/flags/'+$.trim(corto)+'.png">&nbsp;'+pais+'</div>';
			tdLabel1 = document.createElement('td');
			tr.appendChild(tdLabel1);
			tdLabel1.setAttribute('class','center');
			tdLabel1.innerHTML = ''+oro;
			tdLabel1 = document.createElement('td');
			tr.appendChild(tdLabel1);
			tdLabel1.setAttribute('class','center');
			tdLabel1.innerHTML = ''+plata;
			tdLabel1 = document.createElement('td');
			tr.appendChild(tdLabel1);
			tdLabel1.setAttribute('class','center');
			tdLabel1.innerHTML = ''+bronce;
			tdLabel1 = document.createElement('td');
			tr.appendChild(tdLabel1);
			tdLabel1.setAttribute('class','center');
			total = parseInt(oro) + parseInt(plata) + parseInt(bronce);
			tdLabel1.innerHTML = ''+total;
			
			
			medal.appendChild(table);
			document.getElementById('load-medal-venezuela').innerHTML = "";
			if (bb.scroller) {
				bb.scroller.refresh();
			}

}


function makeTableMedal(list){
		// Create our containing table
		var medal = document.getElementById('medal');
		
		var res;
		if(screen.width >= 480 || screen.height >= 480){
			res = 'hires';
		} else {
			res = 'lowres';
		}
		var total;
		var table = document.createElement('table');
		table.setAttribute('class','customers-'+res);
		table.setAttribute('id','medalID');
		var tr = document.createElement('tr');
		table.appendChild(tr);
		var thLabel = document.createElement('th');
		tr.appendChild(thLabel);
		thLabel.innerHTML = '#';
		thLabel = document.createElement('th');
		tr.appendChild(thLabel);
		thLabel.innerHTML = 'Pa&iacute;s';
		thLabel = document.createElement('th');
		tr.appendChild(thLabel);
		thLabel.innerHTML = 'Oro';
		thLabel = document.createElement('th');
		tr.appendChild(thLabel);
		thLabel.innerHTML = 'Plata';
		thLabel = document.createElement('th');
		tr.appendChild(thLabel);
		thLabel.innerHTML = 'Bronce';
		thLabel = document.createElement('th');
		tr.appendChild(thLabel);
		thLabel.innerHTML = 'Total';							
			for( var i in list){
				tr = document.createElement('tr');
				table.appendChild(tr);
				if(i % 2 == 0)
				tr.setAttribute('class','alt');
				var tdLabel1 = document.createElement('td');
				tr.appendChild(tdLabel1);
				tdLabel1.innerHTML = ''+list[i].pos;
				tdLabel1 = document.createElement('td');
				tr.appendChild(tdLabel1);
				console.log("'"+list[i].corto+"'");
				tdLabel1.innerHTML = '<div id="medalcounter" class ="medalcounter-'+res+'"><img src="images/flags/'+$.trim(list[i].corto)+'.png">&nbsp;'+list[i].pais+'</div>';
				tdLabel1 = document.createElement('td');
				tr.appendChild(tdLabel1);
				tdLabel1.setAttribute('class','center');
				tdLabel1.innerHTML = ''+list[i].oro;
				tdLabel1 = document.createElement('td');
				tr.appendChild(tdLabel1);
				tdLabel1.setAttribute('class','center');
				tdLabel1.innerHTML = ''+list[i].plata;
				tdLabel1 = document.createElement('td');
				tr.appendChild(tdLabel1);
				tdLabel1.setAttribute('class','center');
				tdLabel1.innerHTML = ''+list[i].bronce;
				tdLabel1 = document.createElement('td');
				tr.appendChild(tdLabel1);
				tdLabel1.setAttribute('class','center');
				total = parseInt(list[i].oro) + parseInt(list[i].plata) + parseInt(list[i].bronce);
				tdLabel1.innerHTML = ''+total;
				
			}
		console.log(table);
		medal.appendChild(table);
		document.getElementById('load-medal').innerHTML = "";
		if (bb.scroller) {
			bb.scroller.refresh();
		}

}


function paginationMedal(page){
		var pagination = document.getElementById('pagination-medal');
		pagination.innerHTML = "";
		var d = document.getElementById("medal");
		var d_nested = document.getElementById("medalID");
		var throwawayNode = d.removeChild(d_nested);
		d = document.getElementById("medal-venezuela");
		d_nested = document.getElementById("medalVenID");
		throwawayNode = d.removeChild(d_nested);
		console.log(throwawayNode);
		getMedal(page);
}



function paginationCalendar(page){
	
	var pagination = document.getElementById('pagination-calendar');
	pagination.innerHTML = "";
	var paginationDay = document.getElementById('pagination-day');
	paginationDay.innerHTML = "";
	document.getElementById('load-calendar').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";
	var element = document.getElementById("calendarioListId");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	
	getCalendar(dateGlobal,page);
	
}


function paginationDay(pageDay){
	
	var paginationDay = document.getElementById('pagination-day');
	paginationDay.innerHTML = "";
	var pagination = document.getElementById('pagination-calendar');
	pagination.innerHTML = "";
	document.getElementById('load-calendar').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";
	var element = document.getElementById("calendarioListId");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	var day = pageDay.substring(7, 9);
	var month = pageDay.substring(5, 6);
	var year = pageDay.substring(0,4);
	
	var date = new Date(year,month,day);
	getCalendar(date,1);
}


function getCalendar(date,page){

	dateGlobal = date;
	var month = date.getMonth()+1;
	var day = date.getDate();
	stringDate = date.getFullYear()+"-"+month+"-"+date.getDate();
	
	var urlS= "http://olimpiadas.movidamovil.com/calendar/?dia="+stringDate+"&cant=15&page="+page;
	if (flagDisc != ""){
		urlS = urlS +"&iddisc="+flagDisc;
	}
	if(!flagVenCalen){
		urlS = urlS +"&vzla="+1;
		
	}
	console.log(urlS);
	document.getElementById('load-calendar').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";	
	xhrServicesTest = $.ajax({url: urlS, dataType: 'json',  cache:false, async: true, success: function(data){
		
		var page = data['page'];
		var pageNext,dayNext;
		var pageBack,dayBack;
		var totalPage = data['totalpages'];
		var paginationDay = document.getElementById('pagination-day');
		var pagination = document.getElementById('pagination-calendar');

		var stringBuilderDay = ""; 
		if(month<10){month='0'+month}
		if(day<10){day='0'+day}
		if(stringDate == '2012-8-12'){
			stringBuilderDay = ' <table width="100%" bgcolor="#FF6600" > <tr><td align="left" width="25%"><a   x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-white-hover\'" onmouseout = "this.className = \'aclick-white\'"  onclick="paginationDay(\'2012-7-11\');" class= "aclick-white" >&nbsp;&laquo;Ayer</a></td><td align="center" width="50%" class= "aclick-white" >'+day+'/'+month+'</td><td width="25%" align="right"></td></tr></table> ';
		}else if(stringDate == '2012-7-27' ){
			stringBuilderDay = '<table width="100%" bgcolor="#FF6600" > <tr><td align="left" width="25%"></td><td align="center" width="50%" class= "aclick-white" >'+day+'/'+month+'</td><td width="25%" align="right"> <a   x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-white-hover\'" onmouseout = "this.className = \'aclick-white\'"   onclick="paginationDay(\'2012-6-28\');" class= "aclick-white">Ma&ntilde;ana&raquo;&nbsp;</a> </td></tr></table>';
							
		}else{
			
			date.setDate(date.getDate()-1);
			var stringBackDay = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
			date.setDate(date.getDate()+2);
			var stringNextDay = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
			date.setDate(date.getDate()-1);
			stringBuilderDay = '<table width="100%" bgcolor="#FF6600" > <tr><td align="left" width="25%"><a   x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-white-hover\'"'+ 
				'onmouseout = "this.className = \'aclick-white\'"  onclick="paginationDay(\''+stringBackDay+'\');" class= "aclick-white" >&laquo;Ayer</a></td><td align="center" width="50%" class="aclick-white" >'+day+'/'+month+'</td><td width="25%" align="right">'+
				'<a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-white-hover\'" onmouseout = "this.className = \'aclick-white\'"    onclick="paginationDay(\''+stringNextDay+'\');" class= "aclick-white">Ma&ntilde;ana&raquo; </a></td></tr></table>';
		}
		
		paginationDay.innerHTML = stringBuilderDay;
		
		
		var stringBuilder = ""; 
		if(totalPage != 0){
			if(page == totalPage){
				if(page != 1){
					pageBack =  parseInt(page)-1;
					stringBuilder = '<a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"  onclick="paginationCalendar('+pageBack+');" class= "aclick" >&laquo;&nbsp;Anterior</a>';
				}
			}else if(page == 1 ){
				pageNext = parseInt(page)+1;
				console.log(""+pageNext);
				stringBuilder = '<span style="float: right;" > <a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"   onclick="paginationCalendar('+pageNext+');" class= "aclick">Siguiente&nbsp;&raquo;</a> </span> '+
								'<a  >&nbsp;</a>';
			}else{
				pageNext =  parseInt(page)+1;
				pageBack =  parseInt(page)-1;
			stringBuilder = '<span style="float: right;" >'+
							'<a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"   onclick="paginationCalendar('+pageNext+');" class= "aclick">Siguiente&nbsp;&raquo; </a>'+
							'</span>'+
							'<a  x-blackberry-focusable= "true" onmouseover = "this.className = \'aclick-hover\'" onmouseout = "this.className = \'aclick\'"  onclick="paginationCalendar('+pageBack+');" class= "aclick" >&laquo;&nbsp;Anterior</a>';
			}
		}
		pagination.innerHTML = stringBuilder;
		
		listCalendario = data['lista'];
		//makeMedalRow(list);
		makeTableCalendar(listCalendario);
//		paginationDown.innerHTML = stringBuilder;
		
		
		document.getElementById('load-calendar').innerHTML = "";
		
	}, error: function(xhrServicesTest, textStatus, errorThrown){
		
		alert("No se pudo establecer comunicacion con el servidor.\ Por favor intenta de nuevo.");
	}
	});
	
}


function makeTableCalendar(list){
	
	var calendar = document.getElementById('calendarioListId');
	var res;
	if(screen.width >= 480 || screen.height >= 480){
		res = 'hires';
	} else {
		res = 'lowres';
	}
	var flagVen = 0;
    var table = document.createElement('table');
	
	table.setAttribute('class','customers-'+res);
	table.setAttribute('id','tablaCalendarId');
    var tr = document.createElement('tr');
    table.appendChild(tr);
	
    var  thLabel = document.createElement('th');
	thLabel.setAttribute("width","25%");
	tr.appendChild(thLabel);
	thLabel.innerHTML = 'Hora';
	
	thLabel = document.createElement('th');
	tr.appendChild(thLabel);
	thLabel.innerHTML = 'Disciplina';
	
	thLabel = document.createElement('th');
	tr.appendChild(thLabel);
	thLabel.innerHTML = 'G&eacute;nero/Catego&iacute;a';
	
		for( var i in list){
			tr = document.createElement('tr');
			table.appendChild(tr);
			if(i % 2 == 0)
			tr.setAttribute('class','alt');
			var tdLabel1 = document.createElement('td');
			tr.appendChild(tdLabel1);
//			
			var hourMin = list[i].hora.substring(0, 5);
			var am =  list[i].hora.substring(9, 11);
			tdLabel1.innerHTML = ''+hourMin+" "+am;
			tdLabel1 = document.createElement('td');
			tr.appendChild(tdLabel1);
			tdLabel1.innerHTML = ''+list[i].disciplina;
			tdLabel1 = document.createElement('td');
			tr.appendChild(tdLabel1);
			tdLabel1.setAttribute('class','center');
			console.log(list[i].categoria);
			tdLabel1.innerHTML = ''+(list[i].categoria != null) ? list[i].categoria : "";
			
			
		}
	
	calendar.appendChild(table);
	
	
	if (bb.scroller) {
		bb.scroller.refresh();
	}

	
}






function getTest(){
	var $title,$body,xmlDoc,$xml;
	var urlS="http://xmlninoscms.movidamovil.com/publicador/seccion/destacado-3/";
	xhrServicesTest = $.ajax({ url: urlS, dataType: 'xml',  async: false, cache:false, success: function(result){
				console.log("result: " + result);
			    $xml = $(result);
			    console.log("XML: "+$xml);
			    $title = $xml.find("titulo");
				console.log("title: " +  $title.text());
				$body = $xml.find("body");
				console.log("body: " +  $body.text());
				}, error: function(xhrServicesTest, textStatus, errorThrown){
					console.log(""+textStatus);
					console.log(""+errorThrown);
				}
				});
}

