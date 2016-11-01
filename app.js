var navigator = window.navigator;
var Context = window.AudioContext || window.webkitAudioContext;
var context = new Context();

// audio
var mediaStream;
var rec;

// video
var videoMediaStream;
var video;

navigator.getUserMedia = (
  navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

function record() {
  navigator.getUserMedia({audio: true}, function(localMediaStream){
    mediaStream = localMediaStream;
    var mediaStreamSource = context.createMediaStreamSource(localMediaStream);
    rec = new Recorder(mediaStreamSource, {
      workerPath: '/bower_components/Recorderjs/recorderWorker.js'
    });

    rec.record();
  }, function(err){
    console.log('Not supported');
  });
}

function stop() {
  mediaStream.stop();
  rec.stop();

  rec.exportWAV(function(e){
    rec.clear();
    Recorder.forceDownload(e, "test.wav");
  });
}

function recordVideo() {
  navigator.getUserMedia({video: true, audio: true}, function(localMediaStream){
    videoMediaStream = localMediaStream;
    var Context = window.AudioContext || window.webkitAudioContext;
    var context = new Context();
    var mediaStreamSource = context.createMediaStreamSource(localMediaStream);

    video = document.querySelector('video');
    video.src = URL.createObjectURL(localMediaStream);
    video.play();
  }, function(err){
    console.log('Not supported');
  });
}


nextFrame();


var mediaStream;
function recordClock() {
    var canvas = document.getElementById('canvas');
    mediaStream = canvas.captureStream(30);

    //video = document.querySelector('video');
    //video.src = URL.createObjectURL(mediaStream);
    //video.play();

    rec = new MediaStreamRecorder(mediaStream);
    rec.mimeType = 'video/webm';
    rec.quality = 1.0;
    //rec.ondataavailable = function (blob) {
    //    // POST/PUT "Blob" using FormData/XHR2
    //    var blobURL = URL.createObjectURL(blob);
    //    document.write('' + blobURL + '');
    //};
    rec.start();
}


function stopVideo() {
    rec.stop();
    rec.ondataavailable = function (blob) {
        var blobURL = URL.createObjectURL(blob);
        document.write('' + blobURL + '');
        rec.save();
    };
}
