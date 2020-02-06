// set volume slider value
function setVolumeSliderValue(volumeValue) {
	document.querySelector('#volume').value = volumeValue;
}

// set the volume
function setVolume() { 
	vid.volume = document.querySelector('#volume').value / 100;
}

// set the volume by given value
function setVolumeByValue(volumeValue) {
	document.querySelector('#volume').value = volumeValue * 100;
	document.getElementById("vSlider").value = volumeValue * 100;
	vid.volume = volumeValue;	
}