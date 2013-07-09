var debug=false; //ejecutar aplicacion en modo debug

var debugAppStartUp=false; //debug del proceso de inicio de la aplicacion. (servicio login)

var webmode=false; //si esta en true no ejecuta comandos de la plataforma o phonegap (para pruebas en browser pc)

var allowWIFI=true; // true permite el uso de WIFI en la aplicacion

var clientId="BlackBerry";

var arraySlug = new Array();
var indexArraySlug= -1;
var clientVersion="1.1.0.4";  //Version de la aplicacion
var appName = "Venezuela Ol\u00edmpica Movilnet";

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

var msnaDB;
var cantMinuto = 10;
var flagVen= "all";
var dateGlobal;
var flagDisc = "";
var flagVenCalen = true;
var listCalendario;

var flagBD = true;
var cantItemMedal = 5;
var ajaxURL="http://xmlolimpiadascms.movidamovil.com/";
var imagesURL="http://s3.amazonaws.com/";
var currentSlug =""; 

var currentTactileNoti = 1;
var currentSoundNoti = 1;

var isBackground = false;

var updateTimer = 300000; //5 minutos

if (debug){
	updateTimer = 60000; //1 minuto, si esta en modo debug
}

var flagUpdate = true;
var isFlagForeground= true;

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