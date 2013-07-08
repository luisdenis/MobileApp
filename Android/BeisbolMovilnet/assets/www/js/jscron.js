var jsCron = {
		hora:null,
		minuto : null,
		interval: null,
		nameTeam: null,
		flag : false,
		parse: function(strUnix) {
				return strUnix.match(/^(\d+|\*) (\d+|\*) (\d+|\*) (\d+|\*) (\d|\*) +(\w+)/);
		},
		check: function() {
			
			var hoy = new Date();
			var horaHoy = hoy.getHours() ; 
			var minutoHoy = hoy.getMinutes();
			if (horaHoy >= 12){
				horaHoy -= 12
			}
			if (horaHoy == 0) horaHoy = 12;
			if (minutoHoy <= 9) minutoHoy = "0" + minutoHoy; 
			if (horaHoy <= 9) horaHoy = "0" + horaHoy; 
			
//			console.log("--"+this.hora+"--"+this.minuto);
//			console.log("--"+horaHoy+"--"+minutoHoy);
			
			if((this.hora != null && this.minuto != null) && (this.hora == horaHoy  && this.minuto == minutoHoy)  ){
				 // Removing all children from an element
				var day = actualDate.substring(8, 10);
				var month = actualDate.substring(5, 7);
				var year = actualDate.substring(0,4);
				var flagDate = new Date(year,month,day);
				
				if((hoy.getMonth() == flagDate.getMonth()) && (hoy.getDate() == flagDate.getDate()) && (stackActivity[indexStackActivity] == "home")){
					
					if(flagUpdateGame){
						 flagUpdateGame = false;
						  setTimeout("updateGameSyncro()",updateTimer);
					 }
					
				}
				
				this.finish();
				window.plugins.statusBarNotification.clear();
				startVibrate();
				window.plugins.statusBarNotification.notify("Comienza el Juego", this.nameTeam);
				startAudio("/android_asset/www/sounds/AlarmComplete.mp3");
				
			}
			
		},
		set: function(strUnix,strTeam) {
			console.log(strUnix);
			this.nameTeam = strTeam;
			this.hora = strUnix.substring(0, 2);
			this.minuto = strUnix.substring(3, 5);
			console.log("--"+this.hora+"--"+this.minuto);
		},
		init: function(seg) {
			var seg = 60000;
			if(!this.flag){
				this.interval = setInterval("jsCron.check()", seg);
				this.flag = true;
			}
		},
		finish: function(){
			if(this.interval != null){ 
				clearInterval(this.interval);
				this.flag = false;
			}
		}
};
