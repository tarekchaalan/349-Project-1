document.addEventListener("DOMContentLoaded", function () {
  initializeQuiz();
  initializeTimer();
});

function initializeQuiz() {
  const questionStatusList = document.getElementById("question-status");
  populateQuestionStatusList(questionStatusList);
  addAnswerSelectionListeners();
  document
    .getElementById("quiz-form")
    .addEventListener("submit", handleQuizSubmission);
}

function populateQuestionStatusList(questionStatusList) {
  for (let i = 1; i <= 10; i++) {
    const li = document.createElement("li");
    li.textContent = `Question ${i}`;
    li.id = `status-q${i}`;
    li.className = "unanswered";
    questionStatusList.appendChild(li);

    // Add click event listener to each question status
    li.addEventListener("click", function () {
      openCorrespondingAccordion(i);
    });
  }
}

function openCorrespondingAccordion(questionNumber) {
  // Find the accordion button that corresponds to the clicked question status
  const accordionButton = document.querySelector(
    `#accordionExample .accordion-item:nth-child(${questionNumber}) .accordion-header .accordion-button`
  );
  if (!accordionButton.classList.contains("collapsed")) {
    // If the accordion is already open, do nothing
    return;
  }
  // Trigger a click on the accordion button to open it
  accordionButton.click();
}

function addAnswerSelectionListeners() {
  const accordionItems = document.getElementsByClassName("accordion-item");
  Array.from(accordionItems).forEach((item, index) => {
    item
      .querySelectorAll('.form-check input[type="radio"]')
      .forEach((input) => {
        const questionNumber = `q${index + 1}`;
        const previouslySelected = localStorage.getItem(questionNumber);

        if (
          previouslySelected &&
          input.id === `${questionNumber}-option${previouslySelected}`
        ) {
          input.checked = true;
          updateQuestionStatus(questionNumber, previouslySelected);
        }

        input.addEventListener("change", function () {
          const optionIndex = this.id.charAt(this.id.length - 1);
          localStorage.setItem(questionNumber, optionIndex);
          updateQuestionStatus(questionNumber, optionIndex);

          // Ensure the accordion for the answered question remains open
          const collapseElementId = item.querySelector(
            ".accordion-collapse"
          ).id;
          const accordionButton = item.querySelector(
            `[data-bs-target="#${collapseElementId}"]`
          );
          new bootstrap.Collapse(accordionButton.nextElementSibling, {
            toggle: false,
          });
        });
      });
  });
}

function updateQuestionStatus(questionNumber, selectedValue) {
  document.getElementById(`status-${questionNumber}`).className = "answered";
  document.getElementById(
    `status-${questionNumber}`
  ).textContent = `Question ${questionNumber.replace(
    "q",
    ""
  )} > Option ${selectedValue.toUpperCase()}`;
}

function updateQuestionStatus(questionNumber, selectedValue) {
  document.getElementById(`status-${questionNumber}`).className = "answered";
  document.getElementById(
    `status-${questionNumber}`
  ).textContent = `Question ${questionNumber.replace(
    "q",
    ""
  )} > Option ${selectedValue.toUpperCase()}`;
}

function handleQuizSubmission(event) {
  event.preventDefault();
  const scores = calculateScore();
  saveScoreAndRedirect(scores);
}

function calculateScore() {
  const correctAnswers = {
    q1: "3",
    q2: "1",
    q3: "3",
    q4: "2",
    q5: "3",
    q6: "1",
    q7: "1",
    q8: "2",
    q9: "3",
    q10: "2",
  };
  let score = 0;

  Object.keys(correctAnswers).forEach((question) => {
    const selectedOption = document.querySelector(
      `input[name="${question}"]:checked`
    );
    if (selectedOption && selectedOption.value === correctAnswers[question]) {
      score++;
    }
  });

  return { score, totalQuestions: Object.keys(correctAnswers).length };
}

function saveScoreAndRedirect(scores) {
  localStorage.setItem("quizScore", scores.score);
  localStorage.setItem("totalQuestions", scores.totalQuestions);
  window.location.href = "../results/results.html";
}

// Timer functionality
function initializeTimer() {
  const timeDisplay = document.getElementById("time");
  //   localStorage.removeItem("startTime");
  if (!localStorage.getItem("startTime")) {
    localStorage.setItem("startTime", Date.now());
  }
  startTimerFromSavedPoint(timeDisplay);
}

function startTimerFromSavedPoint(timeDisplay) {
  const totalDuration = 600; // 10 minutes in seconds
  const startTime = parseInt(localStorage.getItem("startTime"), 10);
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  let remainingTime = totalDuration - elapsedTime;

  if (remainingTime <= 0) {
    handleTimeUp();
  } else {
    startTimer(remainingTime, timeDisplay);
  }
}

function startTimer(duration, display) {
  let timer = duration;
  updateTimerDisplay(timer, display); // Ensure the timer is updated immediately before starting interval

  const interval = setInterval(() => {
    timer--;
    updateTimerDisplay(timer, display);

    if (timer <= 0) {
      clearInterval(interval);
      handleTimeUp();
    }
  }, 1000);
}

function updateTimerDisplay(timer, display) {
  const minutes = parseInt(timer / 60, 10);
  const seconds = parseInt(timer % 60, 10);
  display.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function handleTimeUp() {
  console.log("Time is up!");
  alert("Time is up! Submitting quiz.");
  handleQuizSubmission(new Event("submit")); // Programmatically submit the quiz, adjust as needed for your application
}
