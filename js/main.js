let currentQuiz = [];
let userAnswers = {};
let currentQuestionIndex = 0;

function loadQuiz(file, title) {
  fetch(file)
    .then(res => res.json())
    .then(data => {
      currentQuiz = data;
      userAnswers = {};
      currentQuestionIndex = 0;
      document.getElementById("quiz-title").textContent = title;
      renderQuiz();
    })
    .catch(err => {
      alert("Failed to load quiz.");
      console.error(err);
    });
}

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  if (currentQuiz.length === 0) {
    container.textContent = "No questions loaded.";
    return;
  }

  const q = currentQuiz[currentQuestionIndex];

  // Question text
  const questionEl = document.createElement("p");
  questionEl.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
  container.appendChild(questionEl);

  // Options
  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.style.display = "block";
    label.innerHTML = `<input type="radio" name="answer" value="${i}"> ${opt}`;

    const input = label.querySelector("input");
    input.disabled = userAnswers[currentQuestionIndex] !== undefined;
    if (userAnswers[currentQuestionIndex] === i) {
      input.checked = true;
    }
    input.addEventListener("change", () => checkAnswer(currentQuestionIndex, i));

    if (userAnswers[currentQuestionIndex] !== undefined) {
      if (i === q.answer) label.style.backgroundColor = "#d2f8d2"; // correct green
      else if (i === userAnswers[currentQuestionIndex]) label.style.backgroundColor = "#f8d2d2"; // wrong red
    }

    container.appendChild(label);
  });

  // Explanation
  const expl = document.createElement("p");
  expl.style.display = userAnswers[currentQuestionIndex] !== undefined ? "block" : "none";
  expl.textContent = q.explanation || "";
  container.appendChild(expl);

  updateScore();
  updateNavigationButtons();
}

function checkAnswer(idx, selected) {
  userAnswers[idx] = selected;
  renderQuiz();
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

function updateNavigationButtons() {
  document.getElementById("prev-btn").disabled = currentQuestionIndex === 0;
  document.getElementById("next-btn").disabled = currentQuestionIndex === currentQuiz.length - 1;
}

function updateScore() {
  let correctCount = 0;
  for (const [idx, ans] of Object.entries(userAnswers)) {
    if (currentQuiz[idx] && currentQuiz[idx].answer === ans) correctCount++;
  }
  document.getElementById("score").textContent = `Score: ${correctCount} / ${currentQuiz.length}`;
}

function shuffleQuestions() {
  currentQuiz.sort(() => Math.random() - 0.5);
  userAnswers = {};
  currentQuestionIndex = 0;
  renderQuiz();
}

function resetQuiz() {
  userAnswers = {};
  currentQuestionIndex = 0;
  renderQuiz();
}
