function updateMenuMinute(){
		// Removing all children from an element
	document.getElementById('load-narrative').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";
	var element = document.getElementById("minutoaminutoId");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	document.getElementById('vermas').innerHTML = "";
	getMinuteByMinute(cantMinuto,flagVen);
	
}


function selectVen(){
	if(flagVen == "ven"){
		flagVen = "all";
	}else{
		flagVen = "ven";
	}
	document.getElementById('vermas').innerHTML = "";
	// Removing all children from an element
	document.getElementById('load-narrative').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";
	var element = document.getElementById("minutoaminutoId");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	getMinuteByMinute(cantMinuto,flagVen);
	
	
}


function seeMore(){
	
	// Removing all children from an element
	document.getElementById('load-narrative').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";
	var element = document.getElementById("minutoaminutoId");
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	cantMinuto += 10;
	document.getElementById('vermas').innerHTML = "";
	getMinuteByMinute(cantMinuto,flagVen);
	
	
}


function selectDiscipline(){
	flagDisc = document.getElementById("iddisc").value;
//	getUpdateCalendar(listCalendario);
	document.getElementById('load-calendar').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";
	var element = document.getElementById("calendarioListId");
	var pagination = document.getElementById('pagination-calendar');
	pagination.innerHTML = "";
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	getCalendar(dateGlobal,1);
	
}

function selectOnlyVen(){
	if ($('#partVen').is(':checked') ){
		flagVenCalen = false;
	} else {
		flagVenCalen = true;
		
	}
//	getUpdateCalendar(listCalendario);
	document.getElementById('load-calendar').innerHTML = "<img id='loading' alt='Cargando' src='images/loading1.gif' />Cargando....";
	var element = document.getElementById("calendarioListId");
	var pagination = document.getElementById('pagination-calendar');
	pagination.innerHTML = "";
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
	getCalendar(dateGlobal,1);
	
}




function exitApp(){
alert("exitApp");
}
