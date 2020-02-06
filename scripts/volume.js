function setVolumeSliderValue(volumeValue) {
	document.querySelector('#volume').value = volumeValue;
}

function setVolume() { 
	vid.volume = document.querySelector('#volume').value / 100;
}

function setVolumeByValue(volumeValue) {
	document.querySelector('#volume').value = volumeValue * 100;
	document.getElementById("vSlider").value = volumeValue * 100;
	vid.volume = volumeValue;	
}