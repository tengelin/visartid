(function () {
  const btnOpen = document.getElementById('openTimer');
  const chkAlwaysOnTop = document.getElementById('alwaysOnTop');

  chrome.runtime.sendMessage({ action: 'getState' }, (state) => {
    if (state) {
      chkAlwaysOnTop.checked = state.alwaysOnTop;
      btnOpen.textContent = state.timerOpen ? 'Visa timer' : 'Öppna timer';
    }
  });

  btnOpen.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openTimer' }, () => {
      btnOpen.textContent = 'Visa timer';
    });
  });

  chkAlwaysOnTop.addEventListener('change', () => {
    chrome.runtime.sendMessage({
      action: 'setAlwaysOnTop',
      value: chkAlwaysOnTop.checked,
    });
  });
}());
