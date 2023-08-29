var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var userClickedPattern = new Array();
var level = 0;
var started = false;


//function that starts the game
function nextSequence() {
    //choose colour
    userClickedPattern = [];
    var randomNumber = Math.random() * 4;
    var randomChoosenColour = buttonColours[Math.floor(randomNumber)];
    gamePattern.push(randomChoosenColour);
    scoreBox.innerHTML = "Score: " + level;
    var hiscoreval = level;
    let hiScore = localStorage.getItem("hiScore");
    if (hiScore === null) {
        hiscoreval = 0;
        localStorage.setItem("hiScore", JSON.stringify(hiscoreval))
    }
    else {
        hiscoreval = JSON.parse(hiScore);
        hiscoreBox.innerHTML = "high Score: " + hiScore;
    }

    if (level > hiscoreval) {
        hiscoreval = level;
        localStorage.setItem("hiScore", JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "high Score: " + hiscoreval;
    }
    level++;
    $("#level-title").text("level " + level);
    
    //animate colour
    $('#' + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
}

$(".start").click(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        animatePress("st");
        started = true;

    }
});

//click
$(".btn").click(function () {
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    animatePress(userChoosenColour);
    playSound(userChoosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var goAudio = new Audio('./sounds/wrong.mp3');
        goAudio.play();
        $("body").addClass("game-over");
        $('#level-title').text("Game Over, Press Start Key to Restart");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        startOver();
    }
}

//animate buttons
function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");

    setTimeout(function () {
        $('#' + currentColour).removeClass("pressed");
    }, 100);
}

//play sounds
function playSound(name) {
    var urL = 'sounds/' + name + '.mp3';
    //play audio
    var audio = new Audio(urL);
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
