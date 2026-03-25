(function() {
    const audioElement = new Audio("audio/timetimer.mp3");
    const form = document.getElementById("form");
    const btnRestart = document.getElementById("restart");
    const nrMins = document.getElementById("nrOfMinutes")
    const btnStart = document.getElementById("start");
    const hideTime = document.getElementById("hideTime");
    const hideMinute = document.getElementById("hideMinute");
    let hideGradient = "conic-gradient(#fff 0 {deg}deg, transparent 0 0)";
    let hideMinuteGradient = "conic-gradient(#fff 0 {deg}deg, transparent 0 0)";
    let t;

    btnStart.addEventListener("click", startTime);
    btnRestart.addEventListener("click", restart);

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
        btnRestart.classList.remove("hidden");

        const setTime = parseInt(60 - nrMins.value, 10);
        
        let date = new Date();
        const mm = date.getMinutes();
        const msStart = date.setMinutes(mm + setTime);
        const startValue = ((msStart - Date.now())/10000) * 2;
        
        
        function countDown() {
            let value = startValue - (msStart - Date.now())/10000;
            if (value >= 354) {
                let minVal = (value - 354) * 60;
                hideMinute.style.background = hideMinuteGradient.replace(/\{deg\}/g, minVal);
            }
            
            hideTime.style.background = hideGradient.replace(/\{deg\}/g, value);
            if (value >= 360) {
                value = 360;
                endOfTime();
            } else {
                t = setTimeout(function(){ countDown() }, 100);
            }
        }
        
        countDown();
    }

    function endOfTime() {
        clearTimeout(t);
        audioElement.play();
        form.classList.remove("hidden");
        btnRestart.classList.add("hidden");
        nrMins.focus();
    }

    function restart() {
        clearTimeout(t);
        form.classList.remove("hidden");
        btnRestart.classList.add("hidden");
        hideTime.style.background = "#fff";
        hideMinute.style.background = "#fff";
        nrMins.focus();
    }
}());