// set playback slider value
function setVideoSliderValue(speedValue) {
	document.querySelector('#playbackrate').value = speedValue;
}

// set playback speed
function setVideoSpeed() { 
	vid.playbackRate = document.querySelector('#playbackrate').value;
}

// set playback speed by input
function setVideoSpeedByValue(speedValue) {
	document.querySelector('#playbackrate').value = speedValue;
	document.getElementById("slider").value = speedValue;
	vid.playbackRate = speedValue;	
}