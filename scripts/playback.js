function setVideoSliderValue(speedValue) {
	document.querySelector('#playbackrate').value = speedValue;
}

function setVideoSpeed() { 
	vid.playbackRate = document.querySelector('#playbackrate').value;
}

function setVideoSpeedByValue(speedValue) {
	document.querySelector('#playbackrate').value = speedValue;
	document.getElementById("slider").value = speedValue;
	vid.playbackRate = speedValue;	
}