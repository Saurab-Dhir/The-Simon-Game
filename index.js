var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level "+level)
    nextSequence()
    console.log("Game started");
    started = true;
  }
});


function nextSequence() {
  userClickedPattern = [];

  level = level + 1;

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  $("#"+randomChosenColour).fadeOut(250).fadeIn(250);
  gamePattern.push(randomChosenColour)
  playSound(randomChosenColour)

  $("h1").text("Level "+level+"!");


};

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour)
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  document.getElementById(currentColour).classList.add('pressed');
  setTimeout(function() { document.getElementById(currentColour).classList.remove('pressed');}, 100);

}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length == gamePattern.length){
      setTimeout(function () {nextSequence();}, 2000);
    }

}

  else {
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over");},100);
    $("#level-title").text("Game Over! Press any Key to Restart")

    startOver()
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
