// quiz-events.js

function handleCheckboxChange(questionIdx, optionIdx, checked) {
  if (!Array.isArray(userAnswers[questionIdx])) userAnswers[questionIdx] = [];

  if (checked) {
    if (!userAnswers[questionIdx].includes(optionIdx)) {
      userAnswers[questionIdx].push(optionIdx);
    }
  } else {
    userAnswers[questionIdx] = userAnswers[questionIdx].filter(i => i !== optionIdx);
  }
  // Wait for submit button to actually mark submitted
}

function submitCurrentAnswer() {
  if (!userAnswers[currentQuestionIndex] || userAnswers[currentQuestionIndex].length === 0) {
    alert("Please select at least one answer before submitting.");
    return;
  }
  submitted[currentQuestionIndex] = true;
  renderQuiz();
  updateReviewButtons();
}

function nextQuestion() {
  if (currentQuestionIndex < currentQuiz.length - 1) {
    currentQuestionIndex++;
    renderQuiz();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuiz();
  }
}

function resetQuiz() {
  userAnswers = {};
  submitted = {};
  currentQuestionIndex = 0;
  renderQuiz();

  const wrongContainer = document.getElementById("wrong-answers");
  if (wrongContainer) {
    wrongContainer.innerHTML = "";
    wrongContainer.style.display = "none";
  }

  const divider = document.getElementById("quiz-divider");
  if (divider) {
    divider.style.display = "none";
  }

  const btnWrong = document.getElementById("btn-wrong");
  if (btnWrong) {
    btnWrong.textContent = "Wrong (0)";
    btnWrong.dataset.wrongIndices = "[]";
    btnWrong.disabled = true;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToQuestion(idx) {
  if (idx >= 0 && idx < currentQuiz.length) {
    currentQuestionIndex = idx;
    renderQuiz();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Attach button event handlers after DOM loaded
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submit-btn").addEventListener("click", submitCurrentAnswer);
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
  document.getElementById("prev-btn").addEventListener("click", prevQuestion);
});
