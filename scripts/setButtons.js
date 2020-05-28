// set video current time
function setCurrTime() {
	var inputTime = document.getElementById("currInput").value
	var regexTime = /(\w+):(\w+):(\w+)/

	if (inputTime.match(regexTime)) {
		var matchingTime = regexTime.exec(inputTime)
		var inputHour = matchingTime[1]
		var inputMin = matchingTime[2]
		var inputSec = matchingTime[3]
	} else {
		alert("SET TIME POSITION WRONG INPUT!!! (HH:MM:SS)")
	}

	vid.currentTime = (parseInt(inputHour) * 3600) + (parseInt(inputMin) * 60) + (parseInt(inputSec));

	// update progress bar
	update();
} 

// set video current time by seconds
function setCurrTimeBySec() {
	var inputTime = document.getElementById("currInput2").value

	vid.currentTime = parseFloat(inputTime);

	// update progress bar
	update();
} 

function setCurrTimeByValue(seconds) {
	// alert(parseFloat(seconds))

	seconds /= 1000

	vid.currentTime = parseFloat(seconds);

	// update progress bar
	update();
} 

// set reaction time
function setReactionTime(){
	reactionTime = document.getElementById("reactionInput").value
}

// fast forward video
function forwardVideo(){
	var curr = vid.currentTime;
	vid.currentTime = curr + (1*document.querySelector('#playbackrate').value)

	// update progress bar
	update();
}

// backward video
function backwardVideo(){
	var curr = vid.currentTime;
	vid.currentTime = curr - (1*document.querySelector('#playbackrate').value)

	// update progress bar
	update();
}

//Fix so that you don't have to pass arguement to the checkVideoDonePlaying function
globalend = 0;
//play and stop according to time stamp
function playStopTimeStamp(start, end) {
	//console.log("Initiatated...", start, end);
	globalend = end/1000;

	vid.currentTime = parseFloat(start/1000);
	vid.play();
	playButton.innerHTML='Pause';
	update();
	vid.addEventListener("timeupdate", checkVideoDonePlaying);
}


function checkVideoDonePlaying()
{
	console.log("Running... ", vid.currentTime);

	if(vid.currentTime >= parseFloat(globalend))
	{
	    vid.pause();	// Stop the Video
		vid.removeEventListener("timeupdate", checkVideoDonePlaying); //Necessary because otherwise keeps running and when hitting play it will stop

		//console.log("Ended...", vid.currentTime, parseFloat(globalend));

		playButton.innerHTML='Play';
		update();

	}

	update();
}