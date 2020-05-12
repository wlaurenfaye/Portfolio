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
// current text is the ammount of words in the texts? to be increased by one later
currentText = texts[count];

//letter is whatever text is selected incremented by one letter each time
letter = currentText.slice(0, ++index);

//select class and look at content, adding each letter
document.querySelector('.typing').textContent = letter;

//check if current text is = to ammount of words in the text, if so increment to the next word then reset to 0
if (letter.length === currentText.length){
  count++;
}

//how quick it runs
setTimeout(type, 600);


}());
