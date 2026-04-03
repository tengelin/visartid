(function() {
  const audioElement = new Audio("audio/timetimer.mp3");
  const form = document.getElementById("form");
  const btnStart = document.getElementById("start");
  const btnStop = document.getElementById("stop");
  const btnResume = document.getElementById("resume");
  const btnReset = document.getElementById("reset");
  const nrMins = document.getElementById("nrOfMinutes");
  const hideTime = document.getElementById("hideTime");
  const hideMinute = document.getElementById("hideMinute");
  const hideGradient = "conic-gradient(#fff 0 {deg}deg, transparent 0 0)";
  const hideMinuteGradient = "conic-gradient(#fff 0 {deg}deg, transparent 0 0)";
  let t;
  let msStart;
  let startValue;
  let remainingMs;

  btnStart.addEventListener("click", startTime);
  btnStop.addEventListener("click", stop);
  btnResume.addEventListener("click", resume);
  btnReset.addEventListener("click", reset);
  nrMins.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      startTime();
    }
  });

  nrMins.focus();
  nrMins.addEventListener("change", (e) => {
    if (e.target.value > 60) {
      e.target.value = 60;
    } else if (e.target.value < 1) {
      e.target.value = 1;
    }
  });

  function startTime() {
    audioElement.pause();
    audioElement.currentTime = 0;
    form.classList.add("hidden");
    btnStart.classList.add("hidden");
    btnResume.classList.add("hidden");
    btnReset.classList.add("hidden");
    btnStop.classList.remove("hidden");

    const setTime = parseInt(60 - nrMins.value, 10);

    const date = new Date();
    const mm = date.getMinutes();
    msStart = date.setMinutes(mm + setTime);
    startValue = ((msStart - Date.now()) / 10000) * 2;

    countDown();
  }

  function countDown() {
    let value = startValue - (msStart - Date.now()) / 10000;
    if (value >= 354) {
      const minVal = (value - 354) * 60;
      hideMinute.style.background = hideMinuteGradient.replace(/\{deg\}/g, minVal);
    }

    hideTime.style.background = hideGradient.replace(/\{deg\}/g, value);
    if (value >= 360) {
      value = 360;
      endOfTime();
    } else {
      t = setTimeout(() => {
        countDown(); 
      }, 100);
    }
  }

  function stop() {
    clearTimeout(t);
    remainingMs = msStart - Date.now();
    btnStop.classList.add("hidden");
    btnResume.classList.remove("hidden");
    btnReset.classList.remove("hidden");
  }

  function resume() {
    btnResume.classList.add("hidden");
    btnReset.classList.add("hidden");
    btnStop.classList.remove("hidden");
    msStart = Date.now() + remainingMs;
    countDown();
  }

  function endOfTime() {
    clearTimeout(t);
    audioElement.play();
    form.classList.remove("hidden");
    btnStart.classList.remove("hidden");
    btnStop.classList.add("hidden");
    btnResume.classList.add("hidden");
    btnReset.classList.add("hidden");
    nrMins.focus();
  }

  function reset() {
    clearTimeout(t);
    form.classList.remove("hidden");
    btnStart.classList.remove("hidden");
    btnStop.classList.add("hidden");
    btnResume.classList.add("hidden");
    btnReset.classList.add("hidden");
    hideTime.style.background = "#fff";
    hideMinute.style.background = "#fff";
    nrMins.focus();
  }

  // Document Picture-in-Picture support
  const btnPip = document.getElementById("pip");

  if (window.documentPictureInPicture) {
    btnPip.classList.remove("hidden");

    btnPip.addEventListener("click", async () => {
      if (window.documentPictureInPicture.window) {
        window.documentPictureInPicture.window.close();
        return;
      }

      const timeEl = document.getElementById("time");
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 300,
        height: 340,
      });

      btnPip.innerHTML = "\u2715";
      btnPip.title = "Lossa från överst";
      btnPip.classList.add("pip-active");

      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = "styles/main.css";
      pipWindow.document.head.appendChild(style);

      pipWindow.document.body.appendChild(timeEl);

      pipWindow.addEventListener("pagehide", () => {
        const container = document.querySelector(".t-cell");
        container.appendChild(timeEl);
        btnPip.classList.remove("pip-active");
        btnPip.innerHTML = "\u{1F4CC}";
        btnPip.title = "Fäst överst";
      });
    });
  }
}());