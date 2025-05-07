
let intervals = [];

function startTimer(button) {
  const timerContainer = button.parentElement;
  const timeDisplay = timerContainer.querySelector(".time");
  let time = 0;

  if (timerContainer.dataset.index === undefined) {
    timerContainer.dataset.index = intervals.length;
    intervals.push(null);
  }

  const index = timerContainer.dataset.index;

  if (intervals[index]) return; 
  intervals[index] = setInterval(() => {
    time++;
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}`;
  }, 1000);

  timerContainer.dataset.time = time;
}

function pauseTimer(button) {
  const timerContainer = button.parentElement;
  const index = timerContainer.dataset.index;
  clearInterval(intervals[index]);
  intervals[index] = null;
}

function resetTimer(button) {
  const timerContainer = button.parentElement;
  const timeDisplay = timerContainer.querySelector(".time");
  const index = timerContainer.dataset.index;
  clearInterval(intervals[index]);
  intervals[index] = null;
  timeDisplay.textContent = "00:00";
}
