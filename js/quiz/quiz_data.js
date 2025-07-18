// quiz-data.js

let currentQuiz = [];
let userAnswers = {};
let currentQuestionIndex = 0;
let submitted = {};  // Track submitted questions (by index)

function loadQuiz(file, title) {
  fetch(file)
    .then(res => res.json())
    .then(data => {
      currentQuiz = data;
      userAnswers = {};
      submitted = {};
      currentQuestionIndex = 0;
      document.getElementById("quiz-title").textContent = title;
      renderQuiz();
    })
    .catch(err => {
      alert("Failed to load quiz.");
      console.error(err);
    });
}
