const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
 
var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var errorCnt = 0;
 
// Add leading zero to numbers 9 or below (purely for aesthetics)
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}
  
// Run a standard minute/second/hundreds timer
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    
    //minutes
    timer[0] = Math.floor((timer[3]/100)/60); 
    //seconds
    timer[1] = Math.floor((timer[3]/100)-(timer[0]*60));  
    //hundreds of a second    
    timer[2] = Math.floor(timer[3]-(timer[1]*100)-(timer[0]*6000));    
}
 
// Match the text entered with the provided text on the page
function spellCheck() {
    let textEntered = testArea.value;  //This is what the user enters in the box
    //console.log(textEntered);
    
    let originTextMatch = originText.substring(0,textEntered.length); //treats the string of text as an array
    // console.log(originTextMatch);
    
    if (textEntered == originText) { //done with the test when all matches exactly
        clearInterval(interval); //stops the clock
        testWrapper.style.borderColor = "#429890"; //green
    } else {
        if (textEntered == originTextMatch){  //checking the text that has been entered so far
            testWrapper.style.borderColor = "#65CCf3"; //blue
        } else {
            testWrapper.style.borderColor = "#E95D0F"; //orange
            errorCnt++;
            console.log(errorCnt);
        }
    }
}
 
// Start the timer
function start() {
    let textEnteredLength = testArea.value.length;  //This is how many characters have been entered
    //console.log(textEnteredLength);
    
    //timerRunning prevents the timer from rerunning if all text is cleared and typing starts again
    if (textEnteredLength === 0 && !timerRunning) { 
        timerRunning = true;
        interval = setInterval(runTimer, 10); //runs every hundredth of a second
    }
}
 
// Reset button
function reset() {
    //console.log("reset button has been pressed");
    clearInterval(interval); //stops the clock
    interval = null; //clears array value
    timer = [0,0,0,0]; //resets to zero
    timerRunning = false;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    errorCnt = 0;
}
 
// Event listeners for keyboard input and the reset button
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
