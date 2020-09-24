function smoothScroll(target,duration){
  //what is clicked on
  var target = document.querySelector(target);
  //position of target on the window
  var targetPosition = target.getBoundingClientRect().top;
  //starting position of window
  var startPosition = window.pageYOffset;
  //how far it is to get there
  var distance = targetPosition - startPosition;
  //allows for requestAnimationFrame
  var startTime = null;

function animation(currentTime){
  //start time= time it takes for user to click button
  //current time = how long after that it takes to scroll?
  if (startTime === null) startTime = currentTime;
  //timeElapsed = how long it takes to get to target
  var timeElapsed = currentTime - startTime;
  //run = animation function
  //paramaters = t b c d
  var run = ease(timeElapsed, startPosition, distance, duration);
  console.log("targetPosition" + targetPosition);
//vertically scroll run function
  window.scrollBy(0, run);
  //duration = 1500, timeElapsed = how long it takes to get there
  //dont stop animation untill timeElapsed is over duration
  if(timeElapsed < duration) requestAnimationFrame(animation);
  }
//http://gizma.com/easing/
function ease(t, b, c, d) {
	t /= d/2;
	if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	t -= 2;
	return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
};
  requestAnimationFrame(animation);
}
var box1 = document.querySelector(".box1");
var box2 = document.querySelector(".box2");
var home = document.getElementById('home');
var aboutMe = document.getElementById('aboutMe');


home.addEventListener('click', function(){
  smoothScroll('.box1', 1500);
});

aboutMe.addEventListener('click',function(){
  smoothScroll('.box2',1000);
});




const texts = ['Lauren Faye Williams'];

//each word in the array
let count = 0;

//each letter of the word
let index = 0;

//text that is currents selected (changes, 0 , 1 , 2)
let currentText = '';

//individual letters added
let letter ='';

(function type(){

// if word = the length of the texts (3) reset back to 0
if (count === texts.length){
  count=0;
}

// current text is the ammount of words in the texts to be increased by one later
currentText = texts[count];

//letter is whatever text is selected incremented by one letter each time
letter = currentText.slice(0, ++index);

//select class adds each letter into the h1 element with the class
document.querySelector('.typing').innerText = letter;

//carry on incrementing if current word length is the same as the selected word then reset to 0
if (letter.length === currentText.length){
  count++;
}

//how quick it runs
setTimeout(type, 200);


}());
