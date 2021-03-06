document.getElementById("On").addEventListener("click", on_get_cam);
document.getElementById("oprit").addEventListener("click", opreste);
document.getElementById("id_speak").addEventListener("click", on_speak);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var synth = window.speechSynthesis;
var constraints;
var imageCapture;
var mediaStream;
var grabFrameButton = document.querySelector('button#grabFrame');
var canvas = document.querySelector('canvas');
var img = document.querySelector('img');
var video = document.querySelector('video');
var videoSelect = document.querySelector('select#videoSource');
grabFrameButton.onclick = grabFrame;
videoSelect.onchange = getStream;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function on_get_cam(){
	document.getElementById("oprit").classList.remove('disabled');
	document.getElementById("oprit").classList.add('buttonOff');
	document.getElementById("oprit").disabled=false;
	document.getElementById("grabFrame").classList.remove('disabled');
	document.getElementById("grabFrame").classList.add('buttonPic');
	document.getElementById("grabFrame").disabled=false;
	
	
navigator.mediaDevices.enumerateDevices()
  .then(gotDevices)
  .catch(error => {
    console.log('enumerateDevices() error: ', error);
  })
  .then(getStream);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  function gotDevices(deviceInfos) {
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    console.log('Found media input or output device: ', deviceInfo);
    var option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'Camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    }
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function getStream() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => {
      track.stop();
    });
  }
  var videoSource = videoSelect.value;
  constraints = {
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(gotStream)
    .catch(error => {
      console.log('getUserMedia error: ', error);
    });
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function gotStream(stream) {
  console.log('getUserMedia() got stream: ', stream);
  mediaStream = stream;
  video.srcObject = stream;
  video.classList.remove('hidden');
  imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
  getCapabilities();
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function getCapabilities() {
  imageCapture.getPhotoCapabilities().then(function(capabilities) {
    console.log('Camera capabilities:', capabilities);
    if (capabilities.zoom.max > 0) {
      zoomInput.min = capabilities.zoom.min;
      zoomInput.max = capabilities.zoom.max;
      zoomInput.value = capabilities.zoom.current;
      zoomInput.classList.remove('hidden');
    }
   }).catch(function(error) {
    console.log('getCapabilities() error: ', error);
  });
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function on_cam_error(e){
//    alert("cam error");
//}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function on_cam_ok(e){
//    document.getElementById("id_video").srcObject = e;
//}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function on_get_cam(){
    // var c = {audio: false, video:true};
//  navigator.mediaDevices.getUserMedia(c, on_cam_ok, on_cam_error);

    // navigator.mediaDevices.getUserMedia(c)
    // .then(function(stream) {
    // /* use the stream */
    // document.getElementById("id_video").srcObject = stream;
    // })
    // .catch(function(err) {
    // /* handle the error */
    // });
// }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function on_speak(){
	document.getElementById("id_text").classList.remove('hidden');
    var enunt = new SpeechSynthesisUtterance();
    enunt.lang = "en-US";
	r=Math.floor((Math.random()*5)+1);
	if(r===1){
	enunt.text =" Yo momma is so fat that Dora can't even explore her!";
	document.getElementById("id_text").innerHTML =enunt.text;
	}
	else if(r===2){
	enunt.text =" You get ten times more girls than me? ten times zero is zero...";
	document.getElementById("id_text").innerHTML =enunt.text;
	}
	else if(r===3){
	enunt.text =" You are not as bad as people say, you are much, much worse.";
	document.getElementById("id_text").innerHTML =enunt.text;
	}
	else if(r===4){
	enunt.text =" Stop trying to be a smart ass, you're just an ass.";
	document.getElementById("id_text").innerHTML =enunt.text;
	}
	else if(r===5){
	enunt.text =" You, sir, are an oxygen thief!";
	document.getElementById("id_text").innerHTML =enunt.text;
	}
	else if(r===6){
	enunt.text =" Roses are red violets are blue, God made me pretty, what happened to you?";
	document.getElementById("id_text").innerHTML =enunt.text;
	}
	else if(r===7){
	enunt.text =" If laughter is the best medicine, your face must be curing the world.";
	document.getElementById("id_text").innerHTML =enunt.text;
	}
	else if(r===8){
	enunt.text =" You're so ugly, you scared the crap out of the toilet.";
	document.getElementById("id_text").innerHTML =enunt.text;
	}
	else if(r===9){
	enunt.text =" You should be proud of yourself.";
	document.getElementById("id_text").innerHTML =enunt.text;
	}
	else{
	enunt.text = "You are awesome!";
	document.getElementById("id_text").innerHTML =enunt.text;
	}
		
    synth.speak(enunt);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function opreste(videoElem) {
	
	canvas.classList.add('hidden');
	document.getElementById("id_speak").classList.remove('buttonSpk');
	document.getElementById("id_speak").classList.add('disabled');
	document.getElementById("id_speak").disabled=true;
	document.getElementById("oprit").classList.remove('buttonOff');
	document.getElementById("oprit").classList.add('disabled');
	document.getElementById("oprit").disabled=true;
	document.getElementById("grabFrame").classList.remove('buttonPic');
	document.getElementById("grabFrame").classList.add('disabled');
	document.getElementById("grabFrame").disabled=true;
	document.getElementById("id_text").classList.add('hidden');
	
	
    let stream = videoElem.srcObject;
	let tracks =  document.getElementById("id_video").srcObject.getTracks();

	tracks.forEach(function(track) {
		track.stop();
		
	
	});

            document.getElementById("id_video").srcObject = null;


}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function grabFrame(){
	imageCapture.grabFrame().then(function(imageBitmap) {
    console.log('Grabbed frame:', imageBitmap);
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
    canvas.classList.remove('hidden');
	document.getElementById("id_speak").classList.remove('disabled');
	document.getElementById("id_speak").classList.add('buttonSpk');
	document.getElementById("id_speak").disabled=false;
  }).catch(function(error) {
    console.log('grabFrame() error: ', error);
  });
  
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~