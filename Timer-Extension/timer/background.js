chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ startTime: null });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'startTimer') {
      const startTime = new Date();
      chrome.storage.sync.set({ startTime: startTime.toISOString() });
      sendResponse({ success: true });
    } else if (request.type === 'endTimer') {
      const endTime = new Date();
      chrome.storage.sync.get(['startTime'], (result) => {
        if (result.startTime) {
          const startTime = new Date(result.startTime);
          const totalTime = Math.floor((endTime - startTime) / 1000);
          sendResponse({ totalTime });
        } else {
          sendResponse({ totalTime: 0 });
        }
      });
      return true; // Keep the message channel open for async response
    }
  });
  