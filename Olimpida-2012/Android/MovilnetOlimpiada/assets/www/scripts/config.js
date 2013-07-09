var debug=false; //ejecutar aplicacion en modo debug

var debugAppStartUp=false; //debug del proceso de inicio de la aplicacion. (servicio login)

var webmode=false; //si esta en true no ejecuta comandos de la plataforma o phonegap (para pruebas en browser pc)

var allowWIFI=true; // true permite el uso de WIFI en la aplicacion

var msnaDB;
var clientId="Android";
var clientVersion="1.1.0.4";  //Version de la aplicacion
var appName = "Venezuela Ol\u00edmpica Movilnet";

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
var flagVen= "all";
var cantMinuto = 10;
var dateGlobal;
var flagDisc = "";
var flagVenCalen = true;
var listCalendario;


var currentTactileNoti;
var currentSoundNoti;


var ajaxURL="http://xmlolimpiadascms.movidamovil.com/";
var imagesURL="http://s3.amazonaws.com/";
var currentSlug =""; 

var isBackground = false;

var updateTimer = 180000; //3 minutos

if (debug){
	updateTimer = 60000; //1 minuto, si esta en modo debug
}


var flagUpdate = true;

//----- control lbn -----
var currentLastBreakNews = "";
var lbnFound = false;
var currentbn = "";
//----- control len -----
var currentLastEmphasizeNews = "";
var lenFound = false;
var currenten = "";
var currentLastEmphasizeNewsTitle = "";


var wapURL="http://wap.movidamovil.com/olimpiadas/";