var numStepsToWin = 20;
var numCompSounds = 0;
var soundsCompPlayed = [];

var notes = ["green", "red", "yellow", "blue"];
var numString = "23102";
var empNumString = "";

var greenSound = document.getElementById("greenSound");
var redSound = document.getElementById("redSound");
var yellowSound = document.getElementById("yellowSound");
var blueSound = document.getElementById("blueSound");

var player = document.getElementById('player');
var index = 0;

var numPlayerTurns = 0;

$(document).ready(function() {
    initApp();
});

function initApp() {
    var greenBtn = document.getElementById("greenBtn");
    var redBtn = document.getElementById("redBtn");
    var yellowBtn = document.getElementById("yellowBtn");
    var blueBtn = document.getElementById("blueBtn");
    
    greenBtn.onclick = btnSound;
    redBtn.onclick = btnSound;
    yellowBtn.onclick = btnSound;
    blueBtn.onclick = btnSound;

    var greenSound = document.getElementById("greenSound");
    var redSound = document.getElementById("redSound");
    var yellowSound = document.getElementById("yellowSound");
    var blueSound = document.getElementById("blueSound");

    //greenSound.addEventListener('ended', playSound());

    //playRandomSound();
    // play sequence of sounds
    playSequence();
}

function btnSound(e) {
    var target = (e.target) ? e.target : e.srcElement;

    // check if user selects the correct button that
    // corresponds to the correct step in the sequence
    var btnNum = target.name;

    var audio = target.querySelector("audio");

    audio.load();
    audio.play();
}

function playSequence() {

    var index = 0;
    for (var i = 0; i < numCompSounds; i++) {
        playSound(i);
    }

    numCompSounds++;

    playRandomSound();
}

function playRandomSound() {
    var soundVal = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    var color;

    switch (soundVal) {
        case 1:
            console.log('Green.');
            color = document.querySelector('#greenSound');
            break;
        case 2:
            console.log('Red.');
            color = document.querySelector('#redSound');
            break;
        case 3:
            console.log('Yellow.');
            color = document.querySelector('#yellowSound');
            break;
        case 4:
            console.log('Blue.');
            color = document.querySelector('#blueSound');
            break;
    }

    color.load();
    color.play();
    soundsCompPlayed.push(soundVal);
}

function playSound(index) {
    var step = soundsCompPlayed[index];
    var color;

    switch (step) {
        case 1:
            console.log('Green.');
            color = document.querySelector('#greenSound');
            break;
        case 2:
            console.log('Red.');
            color = document.querySelector('#redSound');
            break;
        case 3:
            console.log('Yellow.');
            color = document.querySelector('#yellowSound');
            break;
        case 4:
            console.log('Blue.');
            color = document.querySelector('#blueSound');
            break;
    }

    color.load();
    color.play();
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