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
	update()
} 

// set video current time by seconds
function setCurrTimeBySec() {
	var inputTime = document.getElementById("currInput2").value

	vid.currentTime = parseFloat(inputTime);

	// update progress bar
	update()
} 

function setCurrTimeByValue(seconds) {
	// alert(parseFloat(seconds))

	vid.currentTime = parseFloat(seconds);

	// update progress bar
	update()
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
	update()
}

// backward video
function backwardVideo(){
	var curr = vid.currentTime;
	vid.currentTime = curr - (1*document.querySelector('#playbackrate').value)

	// update progress bar
	update()
}


//play and stop according to time stamp
function playStopTimeStamp(start,end) {
	vid.currentTime = parseFloat(start);
	vid.play();
	playButton.innerHTML='Pause';
	update();
	vid.addEventListener("timeupdate", function(){
		if(vid.currentTime >= parseFloat(end))
		{
			vid.pause();	// Stop the Video
			playButton.innerHTML='Play';
			update();
			
		}	
		update();
	});	
}


