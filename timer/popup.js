let startTime;
let interval;

// Function to format time in minutes and seconds
function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = (totalSeconds % 60).toFixed(2);
  return `${mins} minute${mins !== 1 ? 's' : ''} ${secs} second${secs !== '1.00' ? 's' : ''}`;
}

// Function to update total time display
function updateTotalTime(totalTimeInSeconds) {
  document.getElementById('totalTime').textContent = formatTime(totalTimeInSeconds);
  document.getElementById('popupTotalTime').textContent = formatTime(totalTimeInSeconds);
}

// Function to handle timer update
function updateTimer() {
  const currentTime = new Date();
  const totalTime = Math.floor((currentTime - startTime) / 1000);
  updateTotalTime(totalTime);
}

// Start Timer
document.getElementById('start').addEventListener('click', () => {
  startTime = new Date();
  clearInterval(interval); // Ensure any existing interval is cleared before starting a new one
  interval = setInterval(updateTimer, 1000);
  updateTotalTime(0); // Reset the display to 0 when starting a new timer
  document.getElementById('popup').style.display = 'block'; // Show the popup when starting the timer
});

// End Timer
document.getElementById('end').addEventListener('click', () => {
  clearInterval(interval); // Stop the timer interval
  const endTime = new Date();
  const totalTime = Math.floor((endTime - startTime) / 1000);
  updateTotalTime(totalTime); // Display the final total time
});

// Close Popup
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('popup').style.display = 'none'; // Hide the popup when closing
});

// Initial state of the popup
document.getElementById('popup').style.display = 'none';
