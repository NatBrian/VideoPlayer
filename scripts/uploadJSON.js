// Upload JSON File
(function(){
    
    function onChange(event) {
    	clearTimeStamp();
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

		var regexp = /([A-Za-z0-9._\s\-]+)/g;
		var string_list = [...uploaded_json.matchAll(regexp)];
		var startTimeStamp_list = [];
		var endTimeStamp_list = [];
		var actionTimeStamp_list = [];
		var descTimeStamp_list = [];
		var tempString_list = [];

		for (var i = 0; i < string_list.length; i++) {
			tempString_list.push(string_list[i][0])
		}
		string_list = tempString_list
		// sort start time
		var swapp;
		do {
			swapp = false;
			for (var i = 0; i < string_list.length; i+=5) {
				if (string_list[i+2] > string_list[i+7]) {
					var temp1 = string_list[i+2];
					string_list[i+2] = string_list[i+7];
               		string_list[i+7] = temp1;

					var temp2 = string_list[i];
					string_list[i] = string_list[i+5];
               		string_list[i+5] = temp2;

               		var temp3 = string_list[i+3];
					string_list[i+3] = string_list[i+8];
               		string_list[i+8] = temp3;

               		var temp4 = string_list[i+4];
					string_list[i+4] = string_list[i+9];
               		string_list[i+9] = temp4;

					var temp5 = string_list[i+1];
					string_list[i+1] = string_list[i+6];
               		string_list[i+6] = temp5;
               		swapp = true;
				}
			}
		} while (swapp)

		for (var i = 0; i < string_list.length; i+=5) {
			console.log(string_list[i] + " " + string_list[i+1] + " "  + string_list[i+2] + "" + string_list[i+3] + "" + string_list[i+4])

			key.push(string_list[i]);
			startTimeStamp_list.push(string_list[i+2]);
			endTimeStamp_list.push(string_list[i+3]);
			descTimeStamp_list.push(string_list[i+4])
			actionTimeStamp_list.push(string_list[i+1])
		}

		for (var i = 0; i < key.length; i++) {
			var tempStart = parseFloat(startTimeStamp_list[i]);
			var tempEnd = parseFloat(endTimeStamp_list[i]);
			tempData[key[i]] = [actionTimeStamp_list[i], tempStart, tempEnd, descTimeStamp_list[i]];

			// document.getElementById('timeStampStartList').innerHTML += ('<li id=start_'+counterTest+'><a href="javascript:deleteTimeStampByValue(' + counterTest + ')">x</a>   <a href="javascript:setCurrTimeByValue(' + tempStart + ')">'+ tempStart +'</a></li>');		
			// document.getElementById('timeStampEndList').innerHTML += ('<li id=end_'+counterTest+'><a href="javascript:playStopTimeStamp(' + tempStart + ',' + tempEnd + ')">P</a>   <a href="javascript:setCurrTimeByValue(' + tempEnd + ')">' + tempEnd +'</a></li>');
			
			// edit timestamp
			var stringGetStart = "document.getElementById('startTimeStampInput_" +counterTest+ "').value"
			// document.getElementById('timeStampStartList').innerHTML += ('<li id=start_'+counterTest+'><a href="javascript:deleteTimeStampByValue(' + counterTest + ')">x</a>   <a href="javascript:setCurrTimeByValue(' + stringGetStart + ')">'+ '<input type="text" id="startTimeStampInput_'+counterTest+'" size="3" placeholder="' + tempStart + '" value="' + tempStart + '"></a><a href="javascript:replaceStartTimeStamp(' + stringGetStart + ',' + counterTest + ')">r</a></li>');
			document.getElementById('timeStampStartList').innerHTML += ('<li id=start_'+counterTest+'><button type="button" onclick="deleteTimeStampByValue(' + counterTest + ')">x</button><a href="javascript:setCurrTimeByValue(' + stringGetStart + ')">'+ '<input type="text" id="startTimeStampInput_'+counterTest+'" size="3" placeholder="' + tempStart + '" value="' + tempStart + '" onfocusout="replaceStartTimeStamp(document.getElementById(\'startTimeStampInput_' + counterTest + '\').value,' + counterTest + ')"></a><button type="button" onclick="replaceStartTimeStamp(' + stringGetStart + ',' + counterTest + ')">r</button></li>');
			var stringGetEnd = "document.getElementById('endTimeStampInput_" +counterTest+ "').value"
			// document.getElementById('timeStampEndList').innerHTML += ('<li id=end_'+counterTest+'><a href="javascript:playStopTimeStamp(' + stringGetStart + ',' + stringGetEnd + ')">P   </a><a href="javascript:setCurrTimeByValue(' + stringGetEnd + ')">' + '<input type="text" id="endTimeStampInput_'+counterTest+'" size="3" placeholder="' + tempEnd +'" value="' + tempEnd + '"></a><a href="javascript:replaceEndTimeStamp(' + stringGetEnd + ',' + counterTest + ')">r</a></li>');
			document.getElementById('timeStampEndList').innerHTML += ('<li id=end_'+counterTest+'><button type="button" onclick="playStopTimeStamp(' + stringGetStart + ',' + stringGetEnd + ')">P</button><a href="javascript:setCurrTimeByValue(' + stringGetEnd + ')">' + '<input type="text" id="endTimeStampInput_'+counterTest+'" size="3" placeholder="' + tempEnd +'" value="' + tempEnd + '" onfocusout="replaceEndTimeStamp(document.getElementById(\'endTimeStampInput_' + counterTest + '\').value,' + counterTest + ')"></a><button type="button" onclick="replaceEndTimeStamp(' + stringGetEnd + ',' + counterTest + ')">r</button></li>');
			var stringGetAction = "document.getElementById('actionTimeStampInput_" +counterTest+ "').value"
			// document.getElementById('timeStampActList').innerHTML += ('<li id=action_'+counterTest+'><input type="text" id="actionTimeStampInput_'+counterTest+'" size="4" placeholder="' + actionTimeStamp_list[i] + '" value="' + actionTimeStamp_list[i] + '"><a href="javascript:replaceActionTimeStamp(' + stringGetAction + ',' + counterTest + ')">r</a></li>');
			document.getElementById('timeStampActList').innerHTML += ('<li id=action_'+counterTest+'><input type="text" id="actionTimeStampInput_'+counterTest+'" size="4" placeholder="' + actionTimeStamp_list[i] + '" value="' + actionTimeStamp_list[i] + '" onfocusout="replaceActionTimeStamp(document.getElementById(\'actionTimeStampInput_' + counterTest + '\').value,' + counterTest + ')"><button type="button" onclick="replaceActionTimeStamp(' + stringGetAction + ',' + counterTest + ')">r</button></li>');
			var stringGetDesc = "document.getElementById('descTimeStampInput_" +counterTest+ "').value"
			// document.getElementById('timeStampDescList').innerHTML += ('<li id=desc_'+counterTest+'><input type="text" id="descTimeStampInput_'+counterTest+'" size="8" placeholder="' + descTimeStamp_list[i] + '" value="' + descTimeStamp_list[i] + '"><a href="javascript:replaceDescTimeStamp(' + stringGetDesc + ',' + counterTest + ')">r</a></li>');
			document.getElementById('timeStampDescList').innerHTML += ('<li id=desc_'+counterTest+'><input type="text" id="descTimeStampInput_'+counterTest+'" size="8" placeholder="' + descTimeStamp_list[i] + '" value="' + descTimeStamp_list[i] + '" onfocusout="replaceDescTimeStamp(document.getElementById(\'descTimeStampInput_' + counterTest + '\').value,' + counterTest + ')"><button type="button" onclick="replaceDescTimeStamp(' + stringGetDesc + ',' + counterTest + ')">r</button></li>');

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