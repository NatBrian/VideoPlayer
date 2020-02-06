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

// set reaction time
function setReactionTime(){
	reactionTime = document.getElementById("reactionInput").value
}