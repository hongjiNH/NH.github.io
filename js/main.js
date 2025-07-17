let currentQuiz = [];
let userAnswers = {};
let currentIndex = 0; // track current question index

function loadQuiz(file, title) {
  fetch(file)
    .then((res) => res.json())
    .then((data) => {
      currentQuiz = data;
      userAnswers = {};
      currentIndex = 0;
      document.getElementById("quiz-title").textContent = title;
      renderQuiz();
      updateNavButtons();
    })
    .catch((err) => {
      alert("Failed to load quiz. Check console for details.");
      console.error("Quiz load error:", err);
    });
}

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  if (currentQuiz.length === 0) {
    container.textContent = "No questions loaded.";
    return;
  }

  const q = currentQuiz[currentIndex];

  const div = document.createElement("div");
  div.className = "question";

  const questionText = document.createElement("p");
  questionText.textContent = `${currentIndex + 1}. ${q.question}`;
  div.appendChild(questionText);

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="q${currentIndex}" value="${i}"> ${opt}`;
    const input = label.querySelector("input");

    // Restore selection if exists
    if (userAnswers[currentIndex] === i) input.checked = true;

    // Disable if already answered
    if (userAnswers.hasOwnProperty(currentIndex)) {
      input.disabled = true;
      label.classList.remove("correct", "wrong");
      if (i === q.answer) label.classList.add("correct");
      else if (i === userAnswers[currentIndex]) label.classList.add("wrong");
    }

    input.addEventListener("change", () => checkAnswer(currentIndex, i));
    div.appendChild(label);
    div.appendChild(document.createElement("br"));
  });

  const expl = document.createElement("p");
  expl.id = `explanation-${currentIndex}`;
  expl.style.display = userAnswers.hasOwnProperty(currentIndex) ? "block" : "none";
  expl.textContent = q.explanation;
  div.appendChild(expl);

  container.appendChild(div);

  updateScore();
  updateNavButtons();
}

function checkAnswer(idx, selected) {
  userAnswers[idx] = selected;
  renderQuiz(); // re-render question to update styles and disable inputs
}

function updateScore() {
  const correct = Object.entries(userAnswers).filter(
    ([idx, ans]) => currentQuiz[idx].answer === ans
  ).length;
  document.getElementById("score").textContent = `Score: ${correct} / ${currentQuiz.length}`;
}

function shuffleQuestions() {
  currentQuiz.sort(() => Math.random() - 0.5);
  userAnswers = {};
  currentIndex = 0;
  renderQuiz();
  updateNavButtons();
}

function resetQuiz() {
  userAnswers = {};
  currentIndex = 0;
  renderQuiz();
  updateNavButtons();
}

function nextQuestion() {
  if (currentIndex < currentQuiz.length - 1) {
    currentIndex++;
    renderQuiz();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuiz();
  }
}

function updateNavButtons() {
  document.getElementById("prev-btn").disabled = currentIndex === 0;
  document.getElementById("next-btn").disabled = currentIndex === currentQuiz.length - 1;
}
