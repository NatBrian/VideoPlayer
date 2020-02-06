function doFirst(){
	barSize=600;
	playButton=document.getElementById('playButton');
	bar=document.getElementById('defaultBar');
	progressBar=document.getElementById('progressBar');

	playButton.addEventListener('click', playOrPause, false);
	bar.addEventListener('click', clickedBar, false);

	document.getElementById("videoCurrentTime").innerHTML = "00:00:00 / "
	document.getElementById("videoLengthTime").innerHTML = "00:00:00"
}

// play and pause button clicked
function playOrPause() {
	document.getElementById("videoCurrentTime").innerHTML = new Date(vid.currentTime * 1000).toISOString().substr(11, 8) +  " / ";

	if (!vid.paused && !vid.ended){
		vid.pause();
		playButton.innerHTML='Play';
		window.clearInterval(updateBar);
	} else {
		vid.play();
		playButton.innerHTML='Pause';
		updateBar=setInterval(update, 500);
	}
}

// update progress bar
function update() {
	document.getElementById("videoCurrentTime").innerHTML = new Date(vid.currentTime * 1000).toISOString().substr(11, 8) +  " / ";

	if (!vid.ended) {
		var size=parseInt(vid.currentTime*barSize/vid.duration);
		progressBar.style.width=size+'px';
	} else {
		progressBar.style.width='0px';
		playButton.innerHTML='Play';
		window.clearInterval(updateBar);
	}
}

// when progress bar is clicked
function clickedBar(e){
	if(!vid.ended){
		var mouseX=e.pageX-bar.offsetLeft;
		var newtime=mouseX*vid.duration/barSize;
		vid.currentTime=newtime;
		progressBar.style.width=mouseX+'px';
	}
}

window.addEventListener('load',doFirst,false);