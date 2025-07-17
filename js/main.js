let currentQuiz = [];
let userAnswers = {};
let currentQuestionIndex = 0;

function loadQuiz(file, title) {
  fetch(file)
    .then((res) => res.json())
    .then((data) => {
      currentQuiz = data;
      userAnswers = {};
      currentQuestionIndex = 0;
      document.getElementById("quiz-title").textContent = title;
      renderQuiz();
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
    container.textContent = "No questions available.";
    return;
  }

  const q = currentQuiz[currentQuestionIndex];

  const div = document.createElement("div");
  div.className = "question";

  const questionText = document.createElement("p");
  questionText.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
  div.appendChild(questionText);

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="q${currentQuestionIndex}" value="${i}"> ${opt}`;
    
    const input = label.querySelector("input");
    input.addEventListener("change", () => checkAnswer(currentQuestionIndex, i));

    // If user already answered, mark it checked and disable options
    if (userAnswers[currentQuestionIndex] !== undefined) {
      input.checked = userAnswers[currentQuestionIndex] === i;
      input.disabled = true;
    }

    // Highlight correct/wrong answers after selection
    label.classList.remove("correct", "wrong");
    if (userAnswers[currentQuestionIndex] !== undefined) {
      if (i === q.answer) label.classList.add("correct");
      else if (i === userAnswers[currentQuestionIndex]) label.classList.add("wrong");
    }

    div.appendChild(label);
    div.appendChild(document.createElement("br"));
  });

  // Explanation
  const expl = document.createElement("p");
  expl.id = `explanation-${currentQuestionIndex}`;
  expl.style.display = userAnswers[currentQuestionIndex] !== undefined ? "block" : "none";
  expl.textContent = q.explanation;
  div.appendChild(expl);

  container.appendChild(div);

  // Update score and navigation buttons
  updateScore();
  updateNavigationButtons();
}

function checkAnswer(idx, selected) {
  const q = currentQuiz[idx];
  userAnswers[idx] = selected;
  renderQuiz(); // Re-render to update UI with answer feedback
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
  currentQuestionIndex = 0;
  renderQuiz();
}

function resetQuiz() {
  userAnswers = {};
  currentQuestionIndex = 0;
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


function saveAnswers() {
  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}

function loadAnswers() {
  const saved = localStorage.getItem('userAnswers');
  if (saved) {
    userAnswers = JSON.parse(saved);
  } else {
    userAnswers = {};
  }
}

// Then, call loadAnswers() after loading the quiz data and before renderQuiz()
// And call saveAnswers() each time user selects an answer, e.g. in checkAnswer():
function checkAnswer(idx, selected) {
  const q = currentQuiz[idx];
  userAnswers[idx] = selected;
  saveAnswers();
  renderQuiz();
}
