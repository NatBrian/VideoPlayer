// Upload JSON File
(function(){
    
    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event){
        console.log(event.target.result);
        var obj = JSON.parse(event.target.result);

 		// store the tempData in "data" locally
		window.localStorage.setItem("data", JSON.stringify(obj));
		// alert(window.localStorage.getItem("data"));      

		var uploaded_json = JSON.stringify(window.localStorage.getItem("data"));

		var regexp = /([A-Za-z0-9.]+)/g;
		var string_list = [...uploaded_json.matchAll(regexp)];
		var startTimeStamp_list = [];
		var endTimeStamp_list = [];


		for (var i = 0; i < string_list.length; i+=4) {
			key.push(string_list[i][0]);
			startTimeStamp_list.push(string_list[i+2][0]);
			endTimeStamp_list.push(string_list[i+3][0]);
		}

		for (var i = 0; i < key.length; i++) {
			var tempStart = parseFloat(startTimeStamp_list[i]).toFixed(3);
			var tempEnd = parseFloat(endTimeStamp_list[i]).toFixed(3);
			tempData[key[i]] = ["TimeStamp", tempStart, tempEnd];

			document.getElementById('timeStampStartList').innerHTML += ('<li id=start_'+counterTest+'><a href="javascript:onclick(deleteTimeStampByValue(' + counterTest + '))">x</a>   <a href="javascript:onclick(setCurrTimeByValue(' + tempStart + '))">'+ tempStart +'</a></li>');		
			document.getElementById('timeStampEndList').innerHTML += ('<li id=end_'+counterTest+'><a href="javascript:onclick(playStopTimeStamp(' + tempStart + ',' + tempEnd + '))">P</a>   <a href="javascript:onclick(setCurrTimeByValue(' + tempEnd + '))">' + tempEnd +'</a></li>');
			counterTest += 1;
		}

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
 
    document.getElementById('upload_JSON').addEventListener('change', onChange);

}());