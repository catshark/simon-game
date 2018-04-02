var numCompSounds = 0;
var soundsCompPlayed = [];
var soundsPlayerPlayed = [];
var correctButtonPressed = true;
var strictMode = false;

var player = document.getElementById('player');
player.playbackRate = 0.5;

var index = 0;
var stepsCounter = document.getElementById("numSteps");
var congratsMsg = document.getElementById("congratsMsg");
var numPlayerTurns = 0;

$(document).ready(function() {
    initApp();
});

function initApp() {
    var greenBtn = document.getElementById("greenBtn");
    var redBtn = document.getElementById("redBtn");
    var yellowBtn = document.getElementById("yellowBtn");
    var blueBtn = document.getElementById("blueBtn");
    var startBtn = document.getElementById("startBtn");
    var strictBtn = document.getElementById("strictBtn");

    greenBtn.onclick = btnSound;
    redBtn.onclick = btnSound;
    yellowBtn.onclick = btnSound;
    blueBtn.onclick = btnSound;

    startBtn.onclick = startGame;
    strictBtn.onclick = startStrictGame;

    var greenSound = document.getElementById("greenSound");
    var redSound = document.getElementById("redSound");
    var yellowSound = document.getElementById("yellowSound");
    var blueSound = document.getElementById("blueSound");

    //greenSound.addEventListener('ended', playSound());

    // play sequence of sounds
    player.addEventListener('ended', playSequence);
    //playSequence();
}

function startGame() {
    stepsCounter.textContent = "0";
    numPlayerTurns = 0;
    numCompSounds = 0;
    soundsPlayerPlayed = [];
    soundsCompPlayed = [];
    playSequence();

}

function startStrictGame() {
    stepsCounter.textContent = "0";
    numPlayerTurns = 0;
    numCompSounds = 0;
    soundsPlayerPlayed = [];
    soundsCompPlayed = [];
    strictMode = true;
    playSequence();
}

function btnSound(e) {
    var target = (e.target) ? e.target : e.srcElement;

    // check if user selects the correct button that
    // corresponds to the correct step in the sequence
    var btnNum = Number(target.name);

    soundsPlayerPlayed.push(btnNum);
    if ((soundsPlayerPlayed[numPlayerTurns] === soundsCompPlayed[numPlayerTurns]) && (soundsPlayerPlayed.length === soundsCompPlayed.length)
        && soundsPlayerPlayed.length === 20) {
        console.log("player clicked " + soundsPlayerPlayed[numPlayerTurns]);
        console.log("you beat the memory game!");
        congratsMsg.textContent = "You beat the memory game!";

    } else if ((soundsPlayerPlayed[numPlayerTurns] === soundsCompPlayed[numPlayerTurns]) && (soundsPlayerPlayed.length === soundsCompPlayed.length)) {
        console.log("player clicked " + soundsPlayerPlayed[numPlayerTurns]);
        correctButtonPressed = true;
        numPlayerTurns = 0;
        soundsPlayerPlayed = [];
        // play sound
        player.addEventListener('ended', playSequence);
        player.src = "../audio/simonSound" + btnNum + ".mp3";
        player.play();
        playSequence();

    } else if ((soundsPlayerPlayed[numPlayerTurns] === soundsCompPlayed[numPlayerTurns]) && (soundsPlayerPlayed.length < soundsCompPlayed.length)) {
        console.log("player clicked " + soundsPlayerPlayed[numPlayerTurns]);
        correctButtonPressed = true;
        numPlayerTurns++;
        // play sound
        player.src = "../audio/simonSound" + btnNum + ".mp3";
        player.play();
    } else if (strictMode) {
        console.log("wrong button pressed!");
        startStrictGame();
    }
    else {
        numPlayerTurns = 0;
        soundsPlayerPlayed = [];
        correctButtonPressed = false;
        console.log("wrong button pressed!");
        player.addEventListener('ended', playSequence);
        playSequence();
    }
}

function playSequence() {

    var numSteps = 0;

    if (index >= soundsCompPlayed.length && correctButtonPressed) {
        index = 0;
        stop();
        playRandomSound();
        numSteps = soundsCompPlayed.length;
        stepsCounter.textContent = "" + numSteps;
        return;
    }
    else if (index >= soundsCompPlayed.length && !correctButtonPressed) {
        index = 0;
        stop();
        return;
    }

    var note = soundsCompPlayed[index];
    index++;

    player.src = "../audio/simonSound" + note + ".mp3";
    player.play();
    console.log("computer played " + note);

}

function stop () {
    player.removeEventListener('ended', playSequence); // the last note has been played, remove the event listener
}

function playSound(index) {
    var step = soundsCompPlayed[index];
    var color;

    switch (step) {
        case 1:
            console.log('Play Green step');
            color = document.querySelector('#greenSound');
            break;
        case 2:
            console.log('Play Red step');
            color = document.querySelector('#redSound');
            break;
        case 3:
            console.log('Play Yellow step');
            color = document.querySelector('#yellowSound');
            break;
        case 4:
            console.log('Play Blue step');
            color = document.querySelector('#blueSound');
            break;
    }
}

function playRandomSound() {
    var soundVal = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    var color;

    switch (soundVal) {
        case 1:
            console.log('Randomly played Green.');
            color = document.querySelector('#greenSound');
            break;
        case 2:
            console.log('Randomly played Red.');
            color = document.querySelector('#redSound');
            break;
        case 3:
            console.log('Randomly played Yellow.');
            color = document.querySelector('#yellowSound');
            break;
        case 4:
            console.log('Randomly played Blue.');
            color = document.querySelector('#blueSound');
            break;
    }

    color.playbackRate = 0.5;
    color.load();
    color.play();
    numCompSounds++;
    soundsCompPlayed.push(soundVal);
}