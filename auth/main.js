// Function to toggle between signup and login forms
function toggleForms() {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  signupForm.classList.toggle("active");
  loginForm.classList.toggle("active");
}

// Handle Signup form submission
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    // Store username and password in localStorage
    localStorage.setItem(username, password);
    alert("Signup successful. Please log in.");
  });

// Handle Login form submission
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const storedPassword = localStorage.getItem(username);

    // Check if entered password matches stored password and redirect to quiz page
    if (password === storedPassword) {
      localStorage.clear();
      window.location.href = "../quiz/quiz.html";
    } else {
      alert("Invalid username or password.");
    }
  });
