// function to load video file from local
(function localFileVideoPlayer() {
	'use strict'
	var URL = window.URL || window.webkitURL
	var displayMessage = function (message, isError) {
		var element = document.querySelector('#message')
		element.innerHTML = message
		element.className = isError ? 'error' : 'info'
	}
	var playSelectedFile = function (event) {
		var file = this.files[0]
		var type = file.type
		var videoNode = document.querySelector('video')
		var canPlay = videoNode.canPlayType(type)
		if (canPlay === '') canPlay = 'no'
			var message = 'Can play type "' + type + '": ' + canPlay
		var isError = canPlay === 'no'
		displayMessage(message, isError)

		if (isError) {
			return
		}

		var fileURL = URL.createObjectURL(file)
		videoNode.src = fileURL
	}
	var inputNode = document.querySelector('input')
	inputNode.addEventListener('change', playSelectedFile, false)
})()

vid = document.getElementById("uploadedVideo")


// function keeps running to check if video is loaded
checkforVideo();

function checkforVideo() {
    //Every 500ms, check if the video element has loaded
    var b = setInterval(function(){
        if(vid.readyState >= 3){
            document.getElementById("videoLengthTime").innerHTML = new Date(vid.duration * 1000).toISOString().substr(11, 8);
            //stop checking every half second
            clearInterval(b);

        }                   
    },500);
}