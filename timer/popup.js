let startTime;
let endTime;

// Function to format time in minutes and seconds
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(2);
  return `${mins} minutes ${secs} seconds`;
}

// Function to update total time display
function updateTotalTime(totalTimeInSeconds) {
  document.getElementById('totalTime').textContent = formatTime(totalTimeInSeconds);
}

// Start Timer
document.getElementById('start').addEventListener('click', () => {
  startTime = new Date();
  chrome.storage.sync.set({ startTime: startTime.toISOString() });
  updateTotalTime(0);
});

// End Timer
document.getElementById('end').addEventListener('click', () => {
  endTime = new Date();
  chrome.storage.sync.get(['startTime'], (result) => {
    if (result.startTime) {
      startTime = new Date(result.startTime);
      const totalTime = (endTime - startTime) / 1000;
      updateTotalTime(totalTime);
    } else {
      updateTotalTime(0);
    }
  });
});
