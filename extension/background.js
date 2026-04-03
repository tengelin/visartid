(function () {
  let timerWindowId = null;
  let alwaysOnTop = true;

  chrome.storage.local.get('alwaysOnTop', (result) => {
    if (result.alwaysOnTop !== undefined) {
      alwaysOnTop = result.alwaysOnTop;
    }
  });

  function recoverTimerWindow() {
    chrome.windows.getAll({ populate: true }, (windows) => {
      for (const win of windows) {
        if (win.type === 'popup' && win.tabs) {
          for (const tab of win.tabs) {
            if (tab.url && tab.url.includes('timer.html')) {
              timerWindowId = win.id;
              return;
            }
          }
        }
      }
    });
  }

  recoverTimerWindow();

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openTimer') {
      if (timerWindowId !== null) {
        chrome.windows.get(timerWindowId, {}, (win) => {
          if (chrome.runtime.lastError || !win) {
            timerWindowId = null;
            createTimerWindow(sendResponse);
          } else {
            chrome.windows.update(timerWindowId, { focused: true });
            sendResponse({ status: 'focused' });
          }
        });
      } else {
        createTimerWindow(sendResponse);
      }
      return true;
    }

    if (message.action === 'setAlwaysOnTop') {
      alwaysOnTop = message.value;
      chrome.storage.local.set({ alwaysOnTop });
      sendResponse({ status: 'ok' });
      return false;
    }

    if (message.action === 'getState') {
      sendResponse({
        alwaysOnTop,
        timerOpen: timerWindowId !== null,
      });
      return false;
    }
  });

  function createTimerWindow(sendResponse) {
    const url = chrome.runtime.getURL('timer.html');
    chrome.windows.create({
      url,
      type: 'popup',
      width: 300,
      height: 300,
    }, (win) => {
      timerWindowId = win.id;
      sendResponse({ status: 'opened' });
    });
  }

  chrome.windows.onFocusChanged.addListener((windowId) => {
    if (!alwaysOnTop) {
      return;
    }
    if (timerWindowId === null) {
      return;
    }
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
      return;
    }
    if (windowId === timerWindowId) {
      return;
    }
    setTimeout(() => {
      chrome.windows.get(timerWindowId, {}, (win) => {
        if (!chrome.runtime.lastError && win) {
          chrome.windows.update(timerWindowId, { focused: true });
        }
      });
    }, 100);
  });

  chrome.windows.onRemoved.addListener((windowId) => {
    if (windowId === timerWindowId) {
      timerWindowId = null;
    }
  });
}());
