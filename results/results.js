// Execute the displayResults function once the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  displayResults();

  // Add event listener to the restart button to clear localStorage and redirect to the quiz page
  document
    .getElementById("restart-button")
    .addEventListener("click", function () {
      localStorage.clear();
      window.location.href = "../quiz/quiz.html";
    });
});

// Function to display the quiz results on the page
function displayResults() {
  const score = localStorage.getItem("quizScore");
  const totalQuestions = localStorage.getItem("totalQuestions");
  const startTime = parseInt(localStorage.getItem("startTime"), 10);
  const endTime = Date.now();
  const timeTaken = Math.floor((endTime - startTime) / 1000);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  const resultsContainer = document.getElementById("results-container");
  const restartButton = document.getElementById("restart-button");

  // Clear the container and generate the results HTML
  resultsContainer.innerHTML = `
    <p>You scored ${score} out of ${totalQuestions}</p>
    <p>Your percentage is ${((score / totalQuestions) * 100).toFixed(2)}%</p>
    <p>Time taken: ${minutes} minute(s) and ${seconds} second(s).</p>
  `;

  resultsContainer.appendChild(restartButton);
}