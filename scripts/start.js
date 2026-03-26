(function() {
    var audioElement = new Audio("audio/timetimer.mp3");
    var form = document.getElementById("form");
    var btnStart = document.getElementById("start");
    var btnStop = document.getElementById("stop");
    var btnResume = document.getElementById("resume");
    var btnReset = document.getElementById("reset");
    var nrMins = document.getElementById("nrOfMinutes");
    var hideTime = document.getElementById("hideTime");
    var hideMinute = document.getElementById("hideMinute");
    var hideGradient = "conic-gradient(#fff 0 {deg}deg, transparent 0 0)";
    var hideMinuteGradient = "conic-gradient(#fff 0 {deg}deg, transparent 0 0)";
    var t;
    var msStart;
    var startValue;
    var remainingMs;

    btnStart.addEventListener("click", startTime);
    btnStop.addEventListener("click", stop);
    btnResume.addEventListener("click", resume);
    btnReset.addEventListener("click", reset);
    nrMins.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            startTime();
        }
    });

    nrMins.focus();
    nrMins.addEventListener("change", function(e) {
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

        var setTime = parseInt(60 - nrMins.value, 10);

        var date = new Date();
        var mm = date.getMinutes();
        msStart = date.setMinutes(mm + setTime);
        startValue = ((msStart - Date.now()) / 10000) * 2;

        countDown();
    }

    function countDown() {
        var value = startValue - (msStart - Date.now()) / 10000;
        if (value >= 354) {
            var minVal = (value - 354) * 60;
            hideMinute.style.background = hideMinuteGradient.replace(/\{deg\}/g, minVal);
        }

        hideTime.style.background = hideGradient.replace(/\{deg\}/g, value);
        if (value >= 360) {
            value = 360;
            endOfTime();
        } else {
            t = setTimeout(function() { countDown(); }, 100);
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
}());