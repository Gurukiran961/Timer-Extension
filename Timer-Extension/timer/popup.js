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
  chrome.storage.sync.set({ startTime: startTime.toISOString() });
  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
  updateTotalTime(0);
});

// End Timer
document.getElementById('end').addEventListener('click', () => {
  clearInterval(interval);
  const endTime = new Date();
  chrome.storage.sync.get(['startTime'], (result) => {
    if (result.startTime) {
      startTime = new Date(result.startTime);
      const totalTime = Math.floor((endTime - startTime) / 1000);
      updateTotalTime(totalTime);
    } else {
      updateTotalTime(0);
    }
  });
});
document.getElementById('start').addEventListener('click', () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('timer.html')
  });
});
