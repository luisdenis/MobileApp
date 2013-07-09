
function Cache(){

	this.getCrc32=function(key,subKey){
		var data=this.get(key,subKey);
		if (data!=null){
			return data.crc32;
		}return null;
	}
	
	this.exist=function(key,subKey){
		if (typeof(subKey)=="undefined") subKey=0;
		if (this[key]==null || typeof(this[key])=="undefined") return false;
		else return (typeof(this[key][subKey])!="undefined");
	}
	
	this.get=function(key,subKey){
		if (typeof(subKey)=="undefined") subKey=0;
		if (this.exist(key,subKey)){
			return this[key][subKey];
		}else{
			return null;
		}
	}
	
	this.set=function(key,subKey,value){
		if (typeof(value)=="undefined"){ value=subKey; subKey=0;}
		if (typeof(this[key])=="undefined" || this[key]==null) this[key]= new Array();
		return this[key][subKey]=value;
	}
	
	this.unset=function(key,subKey){
		if (typeof(this[key])!="undefined"){
			if (typeof(subKey)!="undefined"){
				this[key].splice(subKey, 1);
			}else{
				this[key]=null;
			}
		}
	}
}

var ajaxCache = new Cache();