function createDB(){
	if (window.openDatabase) {
        //Will either return the existing database or null and call our creation callback onDBCreate
        msnaDB = window.openDatabase('MovilnetOlimpiada', '1.0', 'Movilnet Olimpiada', 5242880);
    } else {
        alert("This device does not have HTML5 Database support");
    }
	return msnaDB;	
}
