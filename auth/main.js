function toggleForms() {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  signupForm.classList.toggle("active");
  loginForm.classList.toggle("active");
}

// Handle Signup
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    localStorage.setItem(username, password);
    alert("Signup successful. Please log in.");
  });

// Handle Login
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const storedPassword = localStorage.getItem(username);
    if (password === storedPassword) {
      // Redirect to the quiz page if login is successful
      window.location.href = "../quiz/quiz.html";
    } else {
      alert("Invalid username or password.");
    }
  });
