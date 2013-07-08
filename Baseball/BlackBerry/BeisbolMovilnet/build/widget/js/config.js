var debug=false; //ejecutar aplicacion en modo debug

var debugAppStartUp=false; //debug del proceso de inicio de la aplicacion. (servicio login)

var webmode=false; //si esta en true no ejecuta comandos de la plataforma o phonegap (para pruebas en browser pc)

var allowWIFI=true; // true permite el uso de WIFI en la aplicacion

var msnaDB;
var flagBD = false;
var clientId="Blackberry";
var clientVersion="1.0.0.2";  //Version de la aplicacion
var appName = "Beisbol Movilnet";

/*
Acentos en Java Script alert y confirm
\u00e1 -> á 
\u00e9 -> é 
\u00ed -> í 
\u00f3 -> ó 
\u00fa -> ú 
\u00c1 -> Á 
\u00c9 -> É 
\u00cd -> Í 
\u00d3 -> Ó 
\u00da -> Ú 
\u00f1 -> ñ 
\u00d1 -> Ñ

*/

//VARIABLE QUE TE PERMITEN LLEVAR LA PILA DE LA COLA
var stackActivity = new Array();
var indexStackActivity = 0;
//---------------------------------------------------
var arraySlug = new Array();
var indexArraySlug= -1;		
//Flags y contadores
var flagUnReadMessages = 0;
var flagStatusChange = 0;
var flagFriendRequest = 0;

var countFriendRequest = 0;
var countStatusChange = 0;
var countUnReadMessages = 0;
var countTotalFriends = 0;
var countNotificationChange = 0;
//END Flags y contadores

var timmerA = null;

var uaCode = "";

var m2asDB;
var flagEvent= "all";
var cantMinuto = 20;
var dateGlobal;
var flagDisc = "";
var flagVenCalen = true;
var listCalendario;

var roundRegular = "rondaregular"; 
var team = "";

var currentTactileNoti =1;
var currentSoundNoti=1;


var ajaxURL="http://xmlp.movidamovil.com/";
var imagesURL="http://s3.amazonaws.com/";
var currentSlug =""; 

var isBackground = false;


var updateTimer = 300000; //5 minutos
var updateTimerMinute = 60000; //1 minutos

if (debug){
	updateTimer = 60000; //1 minuto, si esta en modo debug
}
var flagUpdate = true;
var flagUpdateGame = true;
var flagSoundEvent = true;
var flagOnlyEvent = true;

//----- control lbn -----
var currentLastBreakNews = "";
var lbnFound = false;
var currentbn = "";
//----- control len -----
var currentLastEmphasizeNews = "";
var lenFound = false;
var currenten = "";
var currentLastEmphasizeNewsTitle = "";


//var wapURL="http://wap.movidamovil.com/olimpiadas/";
var wapURL="http://wap.movidamovil.com/beisbol/";

var textosemana = new Array(7);
textosemana[0]="Domingo";
textosemana[1]="Lunes";
textosemana[2]="Martes";
textosemana[3]="Miercoles";
textosemana[4]="Jueves";
textosemana[5]="Viernes";
textosemana[6]="Sabado";


var textomes = new Array (12);
textomes[1]="Enero";
textomes[2]="Febrero";
textomes[3]="Marzo";
textomes[4]="Abril";
textomes[5]="Mayo";
textomes[6]="Junio";
textomes[7]="Julio";
textomes[8]="Agosto";
textomes[9]="Septiembre";
textomes[10]="Octubre";
textomes[11]="Noviembre";
textomes[12]="Diciembre";


var textoEvento = new Array(9);

textoEvento[1]="";
textoEvento[2]="Dobleplay";
textoEvento[3]="Homerun";
textoEvento[5]="Ponche";
textoEvento[7]="Hit";
textoEvento[8]="Boleto";
textoEvento[9]="Triple";
textoEvento[10]="Doble";
textoEvento[12]="Comentario clave";

var teamArray = new Array(8);
teamArray[1] = "Aguilas";
teamArray[2] = "Bravos";
teamArray[3] = "Caribes";
teamArray[4] = "Cardenales";
teamArray[5] = "Navegantes";
teamArray[6] = "Tiburones";
teamArray[7] = "Tigres";
teamArray[8] = "Leones";


var timerArray = new Array(8);
timerArray[1] = "120000";
timerArray[2] = "300000";
timerArray[4] = "1800000";
timerArray[5] = "3600000";





