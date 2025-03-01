document.addEventListener("DOMContentLoaded", function () {
    const timeLeftDisplay = document.getElementById("time-left");
    const pauseTimeLeftDisplay = document.getElementById("pause-time-left");
    const sessionDecrementButton = document.getElementById("decrement");
    const sessionIncrementButton = document.getElementById("increment");
    const pauseDecrementButton = document.getElementById("pause-decrement");
    const pauseIncrementButton = document.getElementById("pause-increment");
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");
    const resetButton = document.getElementById("reset");
    const beepSound = document.getElementById("beep");
  
    let sessionLength = 25;
    let pauseLength = 5;
    let sessionTimeInSeconds = sessionLength * 60;
    let pauseTimeInSeconds = pauseLength * 60;
    let isRunning = false;
    let timerInterval;
  
    //Display Update
    const updateDisplay = () => {
      const sessionMinutes = Math.floor(sessionTimeInSeconds / 60);
      const sessionSeconds = sessionTimeInSeconds % 60;
      timeLeftDisplay.textContent = `${sessionMinutes.toString().padStart(2, "0")}:${sessionSeconds.toString().padStart(2, "0")}`;
      const pauseMinutes = Math.floor(pauseTimeInSeconds / 60);
      const pauseSeconds = pauseTimeInSeconds % 60;
      pauseTimeLeftDisplay.textContent = `${pauseMinutes.toString().padStart(2, "0")}:${pauseSeconds.toString().padStart(2, "0")}`;
    };
  
    // Starting Timer
    const startTimer = () => {
      if(!isRunning){
        isRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
      }
    };
  
    // Stopping Timer
    const stopTimer = () => {
      if(isRunning){
        clearInterval(timerInterval);
        isRunning = false;
      }
    };
  
    // Reset the Timer
    const resetTimer = () => {
      clearInterval(timerInterval);
      isRunning = false;
      sessionLength = 25;
      pauseLength = 5;
      sessionTimeInSeconds = sessionLength * 60;
      pauseTimeInSeconds = pauseLength * 60;
      updateDisplay();
      beepSound.pause();
      beepSound.currentTime = 0;
    };
  
    // Update the Timer
    const updateTimer = () => {
      if(isRunning){
        if(sessionTimeInSeconds > 0){
          sessionTimeInSeconds--;
          if(sessionTimeInSeconds === 0){
            beepSound.play(); // Sound plays when session timer is 0:00
            pauseTimeInSeconds = pauseLength * 60;
            updateDisplay();
          } else {
            updateDisplay();
          }
        } else if (pauseTimeInSeconds > 0) {
          pauseTimeInSeconds--;
          updateDisplay();
        } else {
          beepSound.play(); // Sound plays when pause timer is 0:00
          clearInterval(timerInterval);
          sessionTimeInSeconds = sessionLength * 60;
          pauseTimeInSeconds = pauseLength * 60;
          isRunning = false;
          updateDisplay();
        }
      }
    };
  
    // Decrement and Increment by Button click
    sessionDecrementButton.addEventListener("click", () => {
      if(!isRunning && sessionLength > 1){
        sessionLength--;
        sessionTimeInSeconds = sessionLength * 60;
        updateDisplay();
      }
    });
    
    sessionIncrementButton.addEventListener("click", () => {
      if(!isRunning && sessionLength < 60){
        sessionLength++;
        sessionTimeInSeconds = sessionLength * 60;
        updateDisplay();
      }
    });
    
    pauseDecrementButton.addEventListener("click", () => {
      if(!isRunning && pauseLength > 1){
        pauseLength--;
        pauseTimeInSeconds = pauseLength * 60;
        updateDisplay();
      }
    });
    
    pauseIncrementButton.addEventListener("click", () => {
      if(!isRunning && pauseLength < 60){
        pauseLength++;
        pauseTimeInSeconds = pauseLength * 60;
        updateDisplay();
      }
    });
  
    startButton.addEventListener("click", startTimer);
    
    stopButton.addEventListener("click", stopTimer);
    
    resetButton.addEventListener("click", resetTimer);
    
    updateDisplay();
  
  });