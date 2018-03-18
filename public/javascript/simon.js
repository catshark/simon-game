$(document).ready(function() {
    initApp();
});

function initApp() {
    var greenBtn = document.getElementById("greenBtn");
    var redBtn = document.getElementById("redBtn");
    var yellowBtn = document.getElementById("yellowBtn");
    var blueBtn = document.getElementById("blueBtn");
    
    greenBtn.onclick = playSound;
    redBtn.onclick = playSound;
    yellowBtn.onclick = playSound;
    blueBtn.onclick = playSound;
}

function playSound(e) {
    var target = (e.target) ? e.target : e.srcElement;

    var audio = target.querySelector("audio");
    audio.play();
}