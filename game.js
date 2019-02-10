var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  //empty the user pattern for next level
  userClickedPattern = [];

  //increment the level
  level += 1;
  $("h1").text("Level " + level);

  //generate a random number to select from button colours array
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //flash the division with the id random chosen colour
  $("#" + randomChosenColour).fadeIn().fadeOut().fadeIn();
  playSound(randomChosenColour);
}

//function to play the relevant sound
function playSound(colour) {
  var soundFile = "sounds/" + colour + ".mp3";
  var media = new Audio(soundFile);
  media.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  //remove class pressed after 0.1s
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  }
  else {
    console.log("wrong");
    //game over animations
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over! Press any key to restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}

$("div[type='button']").click(function() {
  //handle button click event
  var userChosenColour = this.id; //stores the id of the selected element to a variable
  userClickedPattern.push(userChosenColour);

  //animations
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //pass the user's last answer to check
  checkAnswer(userClickedPattern.length - 1);
});

$("*").keydown(function () {
  if (level === 0) {
    nextSequence();
    $("h1").text("Level 0");    
  }
});
