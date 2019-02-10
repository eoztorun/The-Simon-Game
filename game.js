var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function nextSequence() {
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  return randomNumber;
}

var randomChosenColour = buttonColours[nextSequence()];
gamePattern.push(randomChosenColour);

//flash the division with the id random chosen colour
$("#" + randomChosenColour).fadeIn().fadeOut().fadeIn();

//function to play the relevant sound
function playSound(colour) {
  var soundFile = "sounds/" + colour + ".mp3";
  var media = new Audio(soundFile);
  media.play();
}

playSound(randomChosenColour);
