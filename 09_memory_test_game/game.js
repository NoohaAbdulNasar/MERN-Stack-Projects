var buttonColors =["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern= [];
var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started) {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started =true;
    }
})

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        console.log("success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        
        $("#level-title").text("Game Over at Level "+ level+", Press Any Key to Restart");
        
        startOver();
    }
}

function nextSequence(){

    userClickedPattern=[];
    level++;

    $("#level-title").text("Level "+ level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+ randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChoosenColor + ".mp3");
    audio.play();

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
      $("#"+currentColor).removeClass("pressed");
    }, 100);
}
    
function startOver(){
    $(document).keydown(function(){
        if (started) {
            level=0;
            gamePattern=[];
            started = false;
            nextSequence();
        }
    })
}    