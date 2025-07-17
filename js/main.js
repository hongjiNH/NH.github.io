let currentQuiz = [];
let userAnswers = {};
let currentQuestionIndex = 0;
let submitted = {};  // Track submitted questions

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

  // Initialize userAnswers array for current question if not set
  if (!Array.isArray(userAnswers[currentQuestionIndex])) {
    userAnswers[currentQuestionIndex] = [];
  }

  // Options (checkboxes)
  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.style.display = "block";

    label.innerHTML = `<input type="checkbox" name="answer" value="${i}"> ${opt}`;
    const input = label.querySelector("input");

    // Disable if question submitted
    input.disabled = !!submitted[currentQuestionIndex];

    input.checked = userAnswers[currentQuestionIndex].includes(i);

    input.addEventListener("change", () => handleCheckboxChange(currentQuestionIndex, i, input.checked));

    // Show green/red backgrounds only if submitted
    if (submitted[currentQuestionIndex]) {
      if (q.answer.includes(i) && userAnswers[currentQuestionIndex].includes(i)) {
            label.classList.add("correct");
            } else if (userAnswers[currentQuestionIndex].includes(i)) {
            label.classList.add("wrong");
        }
    }

    container.appendChild(label);
  });

  // Show feedback only if submitted
  if (submitted[currentQuestionIndex]) {
    const scoreForQuestion = calculatePartialScore(userAnswers[currentQuestionIndex], q.answer);

    const feedback = document.createElement("p");
    feedback.style.fontWeight = "bold";

    if (scoreForQuestion === 1) {
      feedback.textContent = "Correct!";
      feedback.style.color = "green";
    } else if (scoreForQuestion > 0) {
      feedback.textContent = "Not quite correct.";
      feedback.style.color = "orange";
    } else {
      feedback.textContent = "Wrong.";
      feedback.style.color = "red";
    }
    container.appendChild(feedback);

    const expl = document.createElement("p");
    expl.className = "explanation";
    expl.textContent = q.explanation || "";
    container.appendChild(expl);
  }

  updateScore();
  updateNavigationButtons();
}

function handleCheckboxChange(questionIdx, optionIdx, checked) {
  if (!Array.isArray(userAnswers[questionIdx])) userAnswers[questionIdx] = [];

  if (checked) {
    if (!userAnswers[questionIdx].includes(optionIdx)) {
      userAnswers[questionIdx].push(optionIdx);
    }
  } else {
    userAnswers[questionIdx] = userAnswers[questionIdx].filter(i => i !== optionIdx);
  }

  // Don't call renderQuiz() here, wait for submit
}

function submitCurrentAnswer() {
  if (!userAnswers[currentQuestionIndex] || userAnswers[currentQuestionIndex].length === 0) {
    alert("Please select at least one answer before submitting.");
    return;
  }
  submitted[currentQuestionIndex] = true;
  renderQuiz();
}

function calculatePartialScore(selected, correct) {
  if (selected.length === 0) return 0;

  const totalCorrect = correct.length;
  let correctSelected = selected.filter(x => correct.includes(x)).length;
  let wrongSelected = selected.filter(x => !correct.includes(x)).length;

  let score = (correctSelected - wrongSelected) / totalCorrect;
  if (score < 0) score = 0;
  if (score > 1) score = 1;

  return score;
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
  let totalScore = 0;
  for (const [idx, ans] of Object.entries(userAnswers)) {
    if (submitted[idx]) {
      totalScore += calculatePartialScore(ans, currentQuiz[idx].answer);
    }
  }
  document.getElementById("score").textContent = `Score: ${totalScore.toFixed(2)} / ${currentQuiz.length}`;
}

function resetQuiz() {
  userAnswers = {};
  submitted = {};
  currentQuestionIndex = 0;
  renderQuiz();
}
