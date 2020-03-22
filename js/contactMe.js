
/* storing elements to variable so they're easier to access.
I will be storing a few elements into these variables such
as the preview video player, the recording video player, the
start button, the download button, and the dowload button */
let preview = document.getElementById("preview");
let recording = document.getElementById("viewing");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let downloadButton = document.getElementById("downloadButton");


/* this variable and "wait()" function are going to be used to
create a new promise. This promise would only be resolved once
the time set in the "timeRecording" variable is resolved. This
will be useful later on when setting the timeout limit for the
recordings */
let timeRecording = 5000;
function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}


/* this function is going to be used to handle all the recording
processed inside the contact page. This means that this function
will be responsible for making the camera turn on, ask for
permission from the client, and record the video and audio from
the clients camera */
function record(stream, length) {
    /* creating the "MediaRecorder" that will handle recording
    the input stream */
    let recorder = new MediaRecorder(stream);

    /* this array will be used to hold the the media given to the
    "ondataavailable" event handler */
    let media = [];

    /* i am setting up the event handler event in the next line.
    the event revieved is called a blob, and that contains the
    media that the event handler pushes onto the "media" array */
    recorder.ondataavailable = event => media.push(event.data);

    /* this starts the recording process by calling the
    "recorder.start()" process */
    recorder.start();

    /* creating a new promise called "errorReject", that is
    resolved when the MediaRecorder's "onstop" event hander is
    called and rejected in the case that the "onerror" event
    handler is called */
    let errorReject = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = event => reject(event.name);
    });

    /* this is creating a new promise named "finished" to where,
    when the time elapsed in the "wait()" function, the
    "MediaRecorder" is stopped , if recording */
    let finished = wait(length).then(
        () => recorder.state == "recording" && recorder.stop()
    );

    /* these few lines are used to create a new promis for when
    the other two promises ("errorReject" & "finished") have been
    furfilled. once that have been furfilled, the array named
    "media" is returned to the caller */
    return Promise.all([
        errorReject,
        finished
    ])
    .then(() => media);
}


/* this function stops the input media */
function stop(stream) {
    stream.getTracks().forEach(track => track.stop());
}


/* this is an event listener, which listens for a click even
apon the start button. The next few lines are used to request
a new "MediaStream", in which will be recorded. Both the audio
and the video will be recorded */
startButton.addEventListener("click", function() {
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
})


/* This changes the the video being captured to display in the
preview box. This happens when the promise returned by the
"getUserMedia()" process is furfilled */
.then(stream => {
    preview.srcObject = stream;
    /* the download button link is also set here to refer to
    the stream */
    downloadButton.href = stream;
    /* this line is here to make sure that the code will work on
    firefox. this is by arranging for "preview.captureStream" to
    call "preview.mozCaptureStream()"  */
    preview.captureStream = preview.captureStream || preview.mozCaptureStream;

    /* after all this the promise will be furfilled when the
    preview video starts to play is created and returned */
    return new Promise(resolve => preview.onplaying = resolve);
})


/* calling the "record()" function created earlier passing the the
preview stream and time recording variable as peramiters */
.then(() => record(preview.captureStream(), timeRecording))


/* the first think that happens in this proces is that the chuncks
get merged into one blob in whick the Multipurpose Internet Mail
Extensions type is video/webm. The next part tells the browser to
download the file as "VideoMessage.webm". this is by setting the
downloads buttons download attribute */
.then (recordedChunks => {
    let recordedBlob = new Blob(recordedChunks, {type: "video/webm"});
    recording.src = URL.createObjectURL(recordedBlob);
    downloadButton.href = recording.src;
    downloadButton.download = "VideoMessage.webm";
})
/* this is to catch errors */
.catch("error");
}, false);


/* this is an event listener, which listens for a click even
apon the stop button. when the stop button is pressed, this
function calls the stop() function, which ends the preview
MediaStream */
stopButton.addEventListener("click", function() {
    stop(preview.srcObject);
}, false);
