const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

// Function to update display
function updateDisplay(value) {
  display.value = value;
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const btnValue = button.textContent;

    if (button.classList.contains("clear")) {
      currentInput = "";
      updateDisplay("");
    } 
    else if (button.classList.contains("delete")) {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    }
    else if (button.classList.contains("equal")) {
      try {
        let expression = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
        let result = eval(expression);

        // Handle division by zero
        if (result === Infinity || isNaN(result)) {
          updateDisplay("Error");
          currentInput = "";
        } else {
          updateDisplay(result);
          currentInput = result.toString();
        }
      } catch {
        updateDisplay("Error");
        currentInput = "";
      }
    }
    else {
      currentInput += btnValue;
      updateDisplay(currentInput);
    }
  });
});

// Keyboard Support
document.addEventListener("keydown", (event) => {
  if (event.key.match(/[0-9+\-*/.]/)) {
    currentInput += event.key;
    updateDisplay(currentInput);
  }
  else if (event.key === "Enter") {
    try {
      let expression = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
      let result = eval(expression);
      updateDisplay(result);
      currentInput = result.toString();
    } catch {
      updateDisplay("Error");
      currentInput = "";
    }
  }
  else if (event.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  }
  else if (event.key === "Escape") {
    currentInput = "";
    updateDisplay("");
  }
});
