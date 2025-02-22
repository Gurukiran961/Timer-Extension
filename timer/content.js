if (!document.getElementById('rpe-timer-popup')) {
    const popup = document.createElement('div');
    popup.id = 'rpe-timer-popup';
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.width = '300px';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid #ccc';
    popup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '10000';
  
    popup.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2>Timer Popup</h2>
        <button id="closePopup">&times;</button>
      </div>
      <button id="start">Start Timer</button>
      <button id="end">End Timer</button>
      <p>Total Time: <span id="totalTime">0</span></p>
      <p>Total Time in Popup: <span id="popupTotalTime">0</span></p>
    `;
  
    document.body.appendChild(popup);
  
    document.getElementById('closePopup').addEventListener('click', () => {
      popup.style.display = 'none';
    });
  
    let startTime;
    let interval;
  
    function formatTime(totalSeconds) {
      const mins = Math.floor(totalSeconds / 60);
      const secs = (totalSeconds % 60).toFixed(2);
      return `${mins} minute${mins !== 1 ? 's' : ''} ${secs} second${secs !== '1.00' ? 's' : ''}`;
    }
  
    function updateTotalTime(totalTimeInSeconds) {
      document.getElementById('totalTime').textContent = formatTime(totalTimeInSeconds);
      document.getElementById('popupTotalTime').textContent = formatTime(totalTimeInSeconds);
    }
  
    function updateTimer() {
      const currentTime = new Date();
      const totalTime = Math.floor((currentTime - startTime) / 1000);
      updateTotalTime(totalTime);
    }
  
    document.getElementById('start').addEventListener('click', () => {
      startTime = new Date();
      clearInterval(interval);
      interval = setInterval(updateTimer, 1000);
      updateTotalTime(0);
      popup.style.display = 'block';
    });
  
    document.getElementById('end').addEventListener('click', () => {
      clearInterval(interval);
      const endTime = new Date();
      const totalTime = Math.floor((endTime - startTime) / 1000);
      updateTotalTime(totalTime);
    });
  }
  