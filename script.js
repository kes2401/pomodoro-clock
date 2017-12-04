let brk = $('.break-value');
let ssn = $('.session-value');
let min = $('.mins');
let sec = $('.secs');
let runTimer = false;
let totalSeconds;
let intervalID;

//----- Initialization -----
function init() {
  brk.text(5);
  ssn.text(25);
  totalSeconds = 1500;
  min.text(ssn.text());
  sec.text(zeroFill(0));
}

//----- Increase Session length -----
$('.increase-session-min').on('click', function() {
  if(!runTimer && ssn.text() >= 0){
    let tempmin = ssn.text();
    tempmin++;
    ssn.text(tempmin);
    min.text(tempmin);
    sec.text(zeroFill(0));
  }
});

//----- Decrease Session length -----
$('.decrease-session-min').on('click', function() {
  if(!runTimer && ssn.text() > 1){
    let tempmin = ssn.text();
    tempmin--;
    ssn.text(tempmin);
    min.text(tempmin);
    sec.text(zeroFill(0));
  }
});

function zeroFill(i) {
   return (i < 10 ? '0' : '') + i;
}

function timer() {
    totalSeconds -= 1;
    min.text(Math.floor(totalSeconds / 60));
	sec.text(zeroFill(totalSeconds % 60));    

	if(totalSeconds <= 0) {
		clearInterval(intervalID);
		let wav = 'https://res.cloudinary.com/da7wqg8ve/video/upload/v1511902392/sound_djztxe.wav';
    let audio = new Audio(wav);
		audio.play();
		min.text('--');
		sec.text('--');
		runTimer = false;
		$('.startstop').text('START');
	}
}

//----- Start/Stop button functionality -----
$('.startstop').on('click', function() {
	if(!runTimer) {
		runTimer = true;
		$('.startstop').text('STOP');
		min.text(ssn.text());
		sec.text(zeroFill(0));
		totalSeconds = min.text() * 60;
		console.log(totalSeconds);
		intervalID = setInterval(timer, 1000);

	} else if(runTimer) {
		runTimer = false;
		$('.startstop').text('START');		
		clearInterval(intervalID);
	}  
});

//on window.onload
window.onload = init();