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
		endTimeStamp = parseFloat(currTime.toFixed(3))*1000;
		onClickTimeStamp = false;

		// document.getElementById('timeStampEndList').innerHTML += ('<li id=end_'+counterTest+'><a href="javascript:playStopTimeStamp(' + startTimeStamp + ',' + endTimeStamp + ')">P</a>   <a href="javascript:setCurrTimeByValue(' + endTimeStamp + ')">' + endTimeStamp + '<input type="text" id="endTimeStampInput">' + +'</a></li>');
		var stringGetStart = "document.getElementById('startTimeStampInput_" +counterTest+ "').value"
		var stringGetEnd = "document.getElementById('endTimeStampInput_" +counterTest+ "').value"
		// document.getElementById('timeStampEndList').innerHTML += ('<li id=end_'+counterTest+'><a href="javascript:playStopTimeStamp(' + stringGetStart + ',' + stringGetEnd + ')">P</a>   <a href="javascript:setCurrTimeByValue(' + stringGetEnd + ')">' + '<input type="text" id="endTimeStampInput_'+counterTest+'" size="3" placeholder="' + endTimeStamp +'" value="' + endTimeStamp + '"></a>   <a href="javascript:replaceEndTimeStamp(' + stringGetEnd + ',' + counterTest + ')">r</a></li>');
		document.getElementById('timeStampEndList').innerHTML += ('<li id=end_'+counterTest+'><button type="button" onclick="playStopTimeStamp(' + stringGetStart + ',' + stringGetEnd + ')">P</button><a href="javascript:setCurrTimeByValue(' + stringGetEnd + ')">' + '<input type="text" id="endTimeStampInput_'+counterTest+'" size="3" placeholder="' + endTimeStamp +'" value="' + endTimeStamp + '" onfocusout="replaceEndTimeStamp(' + stringGetAction + ',' + counterTest + ')"></a><button type="button" onclick="replaceEndTimeStamp(' + stringGetEnd + ',' + counterTest + ')">r</button></li>');

		var stringGetAction = "document.getElementById('actionTimeStampInput_" +counterTest+ "').value"
		// document.getElementById('timeStampActList').innerHTML += ('<li id=action_'+counterTest+'><input type="text" id="actionTimeStampInput_'+counterTest+'" size="4" placeholder="action" value="action"><a href="javascript:replaceActionTimeStamp(' + stringGetAction + ',' + counterTest + ')">r</a></li>');
		document.getElementById('timeStampActList').innerHTML += ('<li id=action_'+counterTest+'><input type="text" id="actionTimeStampInput_'+counterTest+'" size="4" placeholder="action" value="action" onfocusout="replaceActionTimeStamp(' + stringGetAction + ',' + counterTest + ')"><button type="button" onclick="replaceActionTimeStamp(' + stringGetAction + ',' + counterTest + ')">r</button></li>');
		var stringGetDesc = "document.getElementById('descTimeStampInput_" +counterTest+ "').value"
		// document.getElementById('timeStampDescList').innerHTML += ('<li id=desc_'+counterTest+'><input type="text" id="descTimeStampInput_'+counterTest+'" size="8" placeholder="place_holder" value="place_holder"><a href="javascript:replaceDescTimeStamp(' + stringGetDesc + ',' + counterTest + ')">r</a></li>');
		document.getElementById('timeStampDescList').innerHTML += ('<li id=desc_'+counterTest+'><input type="text" id="descTimeStampInput_'+counterTest+'" size="8" placeholder="place_holder" value="place_holder" onfocusout="replaceDescTimeStamp(' + stringGetAction + ',' + counterTest + ')"><button type="button" onclick="replaceDescTimeStamp(' + stringGetDesc + ',' + counterTest + ')">r</button></li>');

		counterTest += 1;

		var tempKey = uniqueHash(randomGenerator(32), key);
		key.push(tempKey);

		tempData[tempKey] = ["action", startTimeStamp, endTimeStamp, "place_holder"];

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
		startTimeStamp = parseFloat((currTime - reactionTime).toFixed(3))*1000;

		if (startTimeStamp < 0) {
			startTimeStamp = 0;
		}

		onClickTimeStamp = true;
		// document.getElementById('timeStampStartList').innerHTML += ('<li id=start_'+counterTest+'><a href="javascript:deleteTimeStampByValue(' + counterTest + ')">x</a>   <a href="javascript:setCurrTimeByValue(' + startTimeStamp + ')">'+ startTimeStamp +'</a></li>');
		var stringGetStart = "document.getElementById('startTimeStampInput_" +counterTest+ "').value"
		// document.getElementById('timeStampStartList').innerHTML += ('<li id=start_'+counterTest+'><a href="javascript:deleteTimeStampByValue(' + counterTest + ')">x</a>   <a href="javascript:setCurrTimeByValue(' + stringGetStart + ')">'+ '<input type="text" id="startTimeStampInput_'+counterTest+'" size="3" placeholder="' + startTimeStamp + '" value="' + startTimeStamp + '"></a>   <a href="javascript:replaceStartTimeStamp(' + stringGetStart + ',' + counterTest + ')">r</a></li>');
		document.getElementById('timeStampStartList').innerHTML += ('<li id=start_'+counterTest+'><button type="button" onclick="deleteTimeStampByValue(' + counterTest + ')">x</button><a href="javascript:setCurrTimeByValue(' + stringGetStart + ')">'+ '<input type="text" id="startTimeStampInput_'+counterTest+'" size="3" placeholder="' + startTimeStamp + '" value="' + startTimeStamp + '" onfocusout="replaceEndTimeStamp(' + stringGetAction + ',' + counterTest + ')"></a><button type="button" onclick="replaceStartTimeStamp(' + stringGetStart + ',' + counterTest + ')">r</button></li>');

	}    
}



function deleteTimeStampByValue(value) {
	var olStartElem = document.getElementById('timeStampStartList');
	var timeStampNumber = Array.prototype.indexOf.call(olStartElem.childNodes, document.getElementById('start_'+value));

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
	var startElem = document.getElementById('start_'+value);
	startElem.remove();
	var endElem = document.getElementById('end_'+value);
	endElem.remove();
	var actElem = document.getElementById('action_'+value);
	actElem.remove();
	var descElem = document.getElementById('desc_'+value);
	descElem.remove();


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


// replace start time in timeStamp with input text value
function replaceStartTimeStamp(value, counter) {
	document.getElementById("startTimeStampInput_" + counter).placeholder = value;

	// replace the value
	document.getElementById("startTimeStampInput_" + counter).value = value;
    document.getElementById("startTimeStampInput_" + counter).setAttribute("value", value);

	var temp = document.getElementById("startTimeStampInput_" + counter);
	temp.value = value;
	
	localStorage.setItem(document.getElementById("startTimeStampInput_" + counter), temp);

	var olStartElem = document.getElementById('timeStampStartList');
	var timeStampNumber = Array.prototype.indexOf.call(olStartElem.childNodes, document.getElementById('start_'+counter));

	var targetKey = key[timeStampNumber];

	// edit JSON element by key
	var json = JSON.parse(localStorage["data"]);
	var tempAction = json[targetKey][0];
	var tempEnd = json[targetKey][2];
	var tempHolder = json[targetKey][3];
	
	json[targetKey] = [tempAction, value, tempEnd, tempHolder];
	localStorage["data"] = JSON.stringify(json);

	// store the tempData in "data" locally
	tempData[targetKey] = [tempAction, value, tempEnd, tempHolder];
	window.localStorage.setItem("data", JSON.stringify(tempData));	

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

// replace end time in timeStamp with input text value
function replaceEndTimeStamp(value, counter) {
	document.getElementById("endTimeStampInput_" + counter).placeholder = value;

	// replace the value
	document.getElementById("endTimeStampInput_" + counter).value = value;
    document.getElementById("endTimeStampInput_" + counter).setAttribute("value", value);

	var olEndElem = document.getElementById('timeStampEndList');
	var timeStampNumber = Array.prototype.indexOf.call(olEndElem.childNodes, document.getElementById('end_'+counter));

	var targetKey = key[timeStampNumber];

	// edit JSON element by key
	var json = JSON.parse(localStorage["data"]);
	var tempStart = json[targetKey][1];
	var tempAction = json[targetKey][0];
	var tempHolder = json[targetKey][3];

	json[targetKey] = [tempAction, tempStart, value, tempHolder];
	localStorage["data"] = JSON.stringify(json);

	// store the tempData in "data" locally
	tempData[targetKey] = [tempAction, tempStart, value, tempHolder];
	window.localStorage.setItem("data", JSON.stringify(tempData));	

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

function replaceActionTimeStamp(value, counter) {   
	document.getElementById("actionTimeStampInput_" + counter).placeholder = value;

	// replace the value
	document.getElementById("actionTimeStampInput_" + counter).value = value;
    document.getElementById("actionTimeStampInput_" + counter).setAttribute("value", value);
	
	var olActionElem = document.getElementById('timeStampActList');
	var timeStampNumber = Array.prototype.indexOf.call(olActionElem.childNodes, document.getElementById('action_'+counter));

	var targetKey = key[timeStampNumber];

	// edit JSON element by key
	var json = JSON.parse(localStorage["data"]);
	var tempStart = json[targetKey][1];
	var tempEnd = json[targetKey][2];
	var tempHolder = json[targetKey][3];

	json[targetKey] = [value, tempStart, tempEnd, tempHolder];
	localStorage["data"] = JSON.stringify(json);

	// store the tempData in "data" locally
	tempData[targetKey] = [value, tempStart, tempEnd, tempHolder];
	window.localStorage.setItem("data", JSON.stringify(tempData));

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

function replaceDescTimeStamp(value, counter) {
	document.getElementById("descTimeStampInput_" + counter).placeholder = value;
	
	// replace the value
	document.getElementById("descTimeStampInput_" + counter).value = value;
    document.getElementById("descTimeStampInput_" + counter).setAttribute("value", value);

	var olDescElem = document.getElementById('timeStampDescList');
	var timeStampNumber = Array.prototype.indexOf.call(olDescElem.childNodes, document.getElementById('desc_'+counter));

	var targetKey = key[timeStampNumber];

	// edit JSON element by key
	var json = JSON.parse(localStorage["data"]);
	var tempAction = json[targetKey][0];
	var tempStart = json[targetKey][1];
	var tempEnd = json[targetKey][2];

	json[targetKey] = [tempAction, tempStart, tempEnd, value];
	localStorage["data"] = JSON.stringify(json);

	// store the tempData in "data" locally
	tempData[targetKey] = [tempAction, tempStart, tempEnd, value];
	window.localStorage.setItem("data", JSON.stringify(tempData));

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

function clearTimeStamp() {
	var olStartElem = document.getElementById('timeStampStartList');
	var olEndElem = document.getElementById('timeStampEndList');
	var olDescElem = document.getElementById('timeStampDescList');
	var olActElem = document.getElementById('timeStampActList');

	while(olStartElem.firstChild){
  		olStartElem.removeChild(olStartElem.firstChild);
	}

	while(olEndElem.firstChild){
  		olEndElem.removeChild(olEndElem.firstChild);
	}

	while(olDescElem.firstChild){
  		olDescElem.removeChild(olDescElem.firstChild);
	}

	while(olActElem.firstChild){
  		olActElem.removeChild(olActElem.firstChild);
	}

	tempData = {};
	key = [];
	onClickTimeStamp = false;
	startTimeStamp = 0;
	endTimeStamp = 0;
	counterTest = 1;

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
}