var my_media = null;
var mediaTimer = null;

function playAudio(src) {
    // Create Media object from src
    my_media = new Media(src, onSuccessPlayAudio, onErrorPlayAudio);
    // Play audio
    my_media.play();
}

function stopAudio() {
	 if (my_media != null) {
	        my_media.stop();
	        my_media.release();
	    }
//    clearInterval(mediaTimer);
//    mediaTimer = null;
}


// onSuccess Callback
//
function onSuccessPlayAudio() {
    console.log("playAudio():Audio Success");
}

// onError Callback 
//
function onErrorPlayAudio(error) {
    //alert( 'onErrorPlayAudio code: '    + error.code    + '\n' + 
          //'message: ' + error.message + '\n');
}

//Reproduce tres beeps
//
function playBeep() {
    navigator.notification.beep(3);
}

// Vibra dos segundos
//
function startVibrate() {
    if (currentTactileNoti == 1) {
  		navigator.notification.vibrate(700);
  	}
}


function startAudio(src) {
	
	stopAudio();
	
  if (currentSoundNoti == 1) {
		playAudio(src);
	}
}


