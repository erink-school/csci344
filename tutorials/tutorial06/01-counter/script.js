let count = 0;

const counterEl = document.querySelector("#counter");
const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const resetBtn = document.querySelector("#resetBtn");

function updateDisplay() {
  counterEl.textContent = count;

  if (count > 0) {
    counterEl.style.color = "#4CAF50";
  } else if (count < 0) {
    counterEl.style.color = "#f44336";
  } else {
    counterEl.style.color = "#666";
  }
}

function increment() {
  count++;
  updateDisplay();
}

function decrement() {
  count--;
  updateDisplay();
}

function reset() {
  count = 0;
  updateDisplay();
}

incrementBtn.addEventListener("click", increment);
decrementBtn.addEventListener("click", decrement);
resetBtn.addEventListener("click", reset);

updateDisplay();