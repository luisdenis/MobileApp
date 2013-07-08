
function updateMenuMinute(){
	// Removing all children from an element
	
	getStatusInnings(currentSlug);
	getMinuteByMinute(currentSlug,cantMinuto,flagEvent);
	
	document.getElementById('load-game-status').innerHTML = "<img id='loading' width='30' height='30' alt='Cargando' src='images/loading.gif' />Cargando....";
	document.getElementById('load-narrative').innerHTML = "<img id='loading' width='30' height='30' alt='Cargando' src='images/loading.gif' />Cargando....";
	var element = document.getElementById("status-inning");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	element = document.getElementById("minutoaminutoId");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	document.getElementById('vermas').innerHTML = "";
	document.getElementById('status-game').innerHTML = "";
	
}
function onlyEvent(){
	
	// Removing all children from an element
//	document.getElementById('load-game-status').innerHTML = "<img id='loading' alt='Cargando' src='images/loading.gif' />Cargando....";
	document.getElementById('load-narrative').innerHTML = "<img id='loading' width='30' height='30' alt='Cargando' src='images/loading.gif' />&nbsp;Cargando....";
//	var element = document.getElementById("status-inning");
//	while (element.firstChild) {
//	  element.removeChild(element.firstChild);
//	}
	element = document.getElementById("minutoaminutoId");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	document.getElementById('vermas').innerHTML = "";
//	document.getElementById('status-game').innerHTML = "";
//	getStatusInnings(currentSlug);
	if(flagEvent == "all")
	flagEvent = 'evt';
	else flagEvent = 'all';
	
	getMinuteByMinute(currentSlug,cantMinuto,flagEvent);
	
	 var idOnlyEvent = document.getElementById('idOnlyEvent');
	 
	
	if(flagOnlyEvent){ 
		flagOnlyEvent = false;
		idOnlyEvent.setAttribute("onmouseover","this.src='images/style/commentbutton_normal_select.png'");
		idOnlyEvent.setAttribute("onmouseout","this.src='images/style/commentbutton_normal.png'");
		idOnlyEvent.src = "images/style/commentbutton_normal_select.png";
	} else{ 
		flagOnlyEvent = true;
		idOnlyEvent.setAttribute("onmouseover","this.src='images/style/commentbutton_click_select.png'");
		idOnlyEvent.setAttribute("onmouseout","this.src='images/style/commentbutton_click.png'");
		idOnlyEvent.src = "images/style/commentbutton_click_select.png";		
	} 

}


function updateGame(){
	// Removing all children from an element
	document.getElementById('load-game').innerHTML = "<img id='loading' width='30' height='30' alt='Cargando' src='images/loading.gif' />Cargando....";
	var element = document.getElementById("idGameTable");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	var day = actualDate.substring(8, 10);
	var month = actualDate.substring(5, 7);
	var year = actualDate.substring(0,4);
	var date = new Date(year,month,day);
	getGames(date);
}



function seeMore(){
	// Removing all children from an element
	document.getElementById('load-narrative').innerHTML = "<img id='loading' width='30' height='30' alt='Cargando' src='images/loading.gif' />Cargando....";
	var element = document.getElementById("minutoaminutoId");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	cantMinuto += 7;
	document.getElementById('vermas').innerHTML = "";
	getMinuteByMinute(currentSlug,cantMinuto,flagEvent);	
}




