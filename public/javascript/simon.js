var numStepsToWin = 20;
var numCompSounds = 0;
var numPlayerSounds = 0;
var soundsCompPlayed = [];
var soundsPlayerPlayed = [];
var correctButtonPressed = true;
var strictMode = false;

var notes = ["green", "red", "yellow", "blue"];
var numString = "23102";
var empNumString = "";

var greenSound = document.getElementById("greenSound");
var redSound = document.getElementById("redSound");
var yellowSound = document.getElementById("yellowSound");
var blueSound = document.getElementById("blueSound");

var player = document.getElementById('player');
player.playbackRate = 0.5;

var index = 0;
var stepsCounter = document.getElementById("numSteps");
var congratsMsg = document.getElementById("congratsMsg");
var numPlayerTurns = 0;

function arrayContainsAnotherArray(needle, haystack){
    for(var i = 0; i < needle.length; i++){
        if(haystack.indexOf(needle[i]) === -1)
            return false;
    }
    return true;
}

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

    //var index = 0;
    //for (var i = 0; i < numCompSounds; i++) {
    //    playSound(i);
    //}
    //
    //playRandomSound();
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

    //color.load();
    //color.play();
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

//function playNote() {
//    if (index >= numString.length) {
//        stop();
//        return;
//    }
//    var note = notes[Number(numString[index])]; // transform the number to the corresponding note ('1' => 'C')
//    if (!note) {
//        stop();
//        return;
//    }
//    index++; // when 'playNote' is called the next time, the next note will be played
//    player.src = "../audio/simonSound" + note + ".mp3";
//    player.load();
//    player.play(); // when this ends, the 'ended' event will be fired and 'playNote' will be called
//}
//
//function stop () {
//    player.removeEventListener('ended', playNote); // the last note has been played, remove the event listener
//}
//
//player.addEventListener('ended', playNote); // whenever the sound ends, call 'playNote'
//playNote(); // start to play the first note

//User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.

//User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.