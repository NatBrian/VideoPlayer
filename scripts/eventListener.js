var tempData = {};
var key = [];
var onClickTimeStamp = false;
var startTimeStamp = 0;
var endTimeStamp = 0;
var reactionTime = 1;
var volume = 100;
var counterTest = 1;
var json_name = "Time_Stamp";

// function keep running to check if shortcut is ON/OFF
var checkViewport = setInterval(function() {
	if (shortcutBool) {
        // console.log(shortcutBool);

        document.onkeydown = function (e) {
        	// console.log('presing key');

    // "space" key on press to create time stamps
    if (e.keyCode == 32) {
    	createTimeStamp();
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
	e.preventDefault()
});


} else {
        // console.log(shortcutBool);
        
        // when shortcut is off, stop all the key shortcut
        document.onkeydown = function (e) {
        	e.stopPropagation();
        }
        
    }
}, 1);


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


// create time stamp
function createTimeStamp(){
	var currTime = vid.currentTime;

	if (onClickTimeStamp) {
		endTimeStamp = parseFloat(currTime.toFixed(3));
		onClickTimeStamp = false;
		document.getElementById('timeStampEndList').innerHTML += ('<li id=end_'+counterTest+'><a href="javascript:onclick(playStopTimeStamp(' + startTimeStamp + ',' + endTimeStamp + '))">P</a>   <a href="javascript:onclick(setCurrTimeByValue(' + endTimeStamp + '))">' + endTimeStamp +'</a></li>');
		counterTest += 1;

		var tempKey = uniqueHash(randomGenerator(32), key);
		key.push(tempKey);

		tempData[tempKey] = ["TimeStamp", startTimeStamp, endTimeStamp];

		// store the tempData in "data" locally
		window.localStorage.setItem("data", JSON.stringify(tempData));

		// create download link for JSON file
		document.getElementById("downloadLink").innerHTML = "";

		var blob = new Blob([window.localStorage.getItem("data")], {type: "application/json"});
		var url  = URL.createObjectURL(blob);
		var a = document.createElement('a');

		a.download    = json_name + ".json";
		a.href        = url;
		a.textContent = json_name;

		document.getElementById('downloadLink').appendChild(a);
	} else {
		// reduce time stamp start time by reaction time
		startTimeStamp = parseFloat((currTime - reactionTime).toFixed(3));

		if (startTimeStamp < 0) {
			startTimeStamp = 0;
		}

		onClickTimeStamp = true;
		document.getElementById('timeStampStartList').innerHTML += ('<li id=start_'+counterTest+'><a href="javascript:onclick(deleteTimeStampByValue(' + counterTest + '))">x</a>   <a href="javascript:onclick(setCurrTimeByValue(' + startTimeStamp + '))">'+ startTimeStamp +'</a></li>');
		
	}    
}



function deleteTimeStampByValue(sec) {
	var olStartElem = document.getElementById('timeStampStartList');
	var timeStampNumber = Array.prototype.indexOf.call(olStartElem.childNodes, document.getElementById('start_'+sec));

	var deleteKey = key[timeStampNumber]

	// delete JSON element by key
	var json = JSON.parse(localStorage["data"]);
	delete json[deleteKey]
	localStorage["data"] = JSON.stringify(json);

	delete tempData[deleteKey]

	// remove key array element
	key.remove(deleteKey)

	// remove <li> from <ol>
	//var olStartElem = document.getElementById('timeStampStartList');
	//olStartElem.removeChild(olStartElem.childNodes[timeStampNumber-1])

	//var olEndElem = document.getElementById('timeStampEndList');
	//olEndElem.removeChild(olEndElem.childNodes[timeStampNumber-1])


	// remove <div>
	var startElem = document.getElementById('start_'+sec);
	startElem.remove();
	var endElem = document.getElementById('end_'+sec);
	endElem.remove();


	// recreate the download link
	document.getElementById("downloadLink").innerHTML = "";

	var blob = new Blob([window.localStorage.getItem("data")], {type: "application/json"});
	var url  = URL.createObjectURL(blob);
	var a = document.createElement('a');

	a.download    = json_name + ".json";
	a.href        = url;
	a.textContent = json_name;

	document.getElementById('downloadLink').appendChild(a);
}


// delete time stamp in JSON file
function deleteTimeStamp() {
	var timeStampNumber = document.getElementById("deleteTime").value;

	if (timeStampNumber != 0) {
		var deleteKey = key[timeStampNumber-1]

		// delete JSON element by key
		var json = JSON.parse(localStorage["data"]);
		delete json[deleteKey]
		localStorage["data"] = JSON.stringify(json);

		delete tempData[deleteKey]

		// remove key array element
		key.remove(deleteKey)

		// remove <li> from <ol>
		//var olStartElem = document.getElementById('timeStampStartList');
		//olStartElem.removeChild(olStartElem.childNodes[timeStampNumber-1])

		//var olEndElem = document.getElementById('timeStampEndList');
		//olEndElem.removeChild(olEndElem.childNodes[timeStampNumber-1])

		// remove <div>
		var startElem = document.getElementById('start_'+timeStampNumber);
		startElem.remove();
		var endElem = document.getElementById('end_'+timeStampNumber);
		endElem.remove();

		// recreate the download link
		document.getElementById("downloadLink").innerHTML = "";

		var blob = new Blob([window.localStorage.getItem("data")], {type: "application/json"});
		var url  = URL.createObjectURL(blob);
		var a = document.createElement('a');

		a.download    = json_name + ".json";
		a.href        = url;
		a.textContent = json_name;

		document.getElementById('downloadLink').appendChild(a);
	}
}


// helper function to remove array by element
Array.prototype.remove = function(data) {
	const index = this.indexOf(data)
	if(index >= 0) {
		this.splice(index ,1);
	}
	return this.length;
}


// rename JSON file
function renameJSON() {
	json_name = document.getElementById('rename_JSON').value; 

	// create download link for JSON file
	document.getElementById("downloadLink").innerHTML = "";

	var blob = new Blob([window.localStorage.getItem("data")], {type: "application/json"});
	var url  = URL.createObjectURL(blob);
	var a = document.createElement('a');

	a.download    = json_name + ".json";
	a.href        = url;
	a.textContent = json_name;

	document.getElementById('downloadLink').appendChild(a);
}