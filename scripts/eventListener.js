var tempData = {};
var key = [];
var onClickTimeStamp = false;
var startTimeStamp = 0;
var endTimeStamp = 0;
var reactionTime = 1;
var volume = 100

document.onkeydown = function (e) {

    // "space" key on press to create time stamps
    if (e.keyCode == 32) {
    	var currTime = vid.currentTime;

    	if (onClickTimeStamp) {
    		endTimeStamp = currTime;
    		onClickTimeStamp = false;
    		document.getElementById('timeStampEndList').innerHTML += ('<li>'+ endTimeStamp +'</li>');

    		var tempKey = uniqueHash(randomGenerator(32), key);

    		key.push(tempKey);

    		tempData[tempKey] = ["TimeStamp", startTimeStamp, endTimeStamp];

    		window.localStorage.setItem("data", JSON.stringify(tempData));

    		document.getElementById("downloadLink").innerHTML = "";

    		var blob = new Blob([window.localStorage.getItem("data")], {type: "application/json"});
    		var url  = URL.createObjectURL(blob);
    		var a = document.createElement('a');

    		a.download    = "Time_Stamp.json";
    		a.href        = url;
    		a.textContent = "Time_Stamp";

    		document.getElementById('downloadLink').appendChild(a);
    	} else {
    		startTimeStamp = currTime - reactionTime;
    		onClickTimeStamp = true;
    		document.getElementById('timeStampStartList').innerHTML += ('<li>'+ startTimeStamp +'</li>');
    	}    
    }

	// "Arrow Right" key on press to fast forward
	if (e.keyCode == 39) {
		var currTime = vid.currentTime;
    	// the speed of the fast forward depends on the playback rate
    	vid.currentTime = currTime + (1*document.querySelector('#playbackrate').value);

    	// update progress bar
    	update();
    }

    // "Arrow Left" key on press to backward
    if (e.keyCode == 37) {
    	var currTime = vid.currentTime;
    	// the speed of the backward depends on the playback rate
    	vid.currentTime = currTime - (1*document.querySelector('#playbackrate').value);
    	
    	// update progress bar
    	update();
    }

    // "Enter" key on press to play/pause video 
    if (e.keyCode == 13) {
    	if (vid.paused){
    		vid.play();
    		playButton.innerHTML='Pause';
    	}
    	else {
    		vid.pause();
    		playButton.innerHTML='Play';
    	}
    }

    // "1 - 6" key on press to change playback speed
    if (e.keyCode == 49) {
    	setVideoSpeedByValue(0.5)
    }

    if (e.keyCode == 50) {
    	setVideoSpeedByValue(1)
    }

    if (e.keyCode == 51) {
    	setVideoSpeedByValue(2)
    }

    if (e.keyCode == 52) {
    	setVideoSpeedByValue(4)
    }

    if (e.keyCode == 53) {
    	setVideoSpeedByValue(8)
    }

    if (e.keyCode == 54) {
    	setVideoSpeedByValue(16)
    }    

    // "+ -" key on press to change volume
    if (e.keyCode == 187) {
    	volume += 10
    	vid.volume = volume/100
    	setVolumeByValue(volume/100)
    }

    if (e.keyCode == 189) {
    	volume -= 10
    	vid.volume = volume/100
    	setVolumeByValue(volume/100)
    }

    // "Q" key on press to full screen 
    if (e.keyCode == 81) {
    	vid.webkitEnterFullscreen()
    }
};

// prevent "Space" key to scroll webpage
window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

// generate random string
function randomGenerator(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// generate unique hash from random string
function uniqueHash(result, key) {
	if (key.length == 0) {
		return result
	}

	for (i = 0; i < key.length; i++) {
		if (result == key[i]) {
			result = randomGenerator(32);
			i = 0;
		}	
	}
	return result;
}