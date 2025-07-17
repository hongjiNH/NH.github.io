let currentQuiz = [];
let userAnswers = {};

function loadQuiz(file, title) {
 fetch('/NH.github.io/data/quiz1.json')
    .then((res) => res.json())
    .then((data) => {
      currentQuiz = data;
      userAnswers = {};
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

  currentQuiz.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "question";

    const questionText = document.createElement("p");
    questionText.textContent = `${idx + 1}. ${q.question}`;
    div.appendChild(questionText);

    q.options.forEach((opt, i) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="q${idx}" value="${i}"> ${opt}`;
      label.querySelector("input").addEventListener("change", () =>
        checkAnswer(idx, i)
      );
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    const expl = document.createElement("p");
    expl.id = `explanation-${idx}`;
    expl.style.display = "none";
    expl.textContent = q.explanation;
    div.appendChild(expl);

    container.appendChild(div);
  });

  updateScore();
}

function checkAnswer(idx, selected) {
  const q = currentQuiz[idx];
  userAnswers[idx] = selected;

  const inputs = document.getElementsByName(`q${idx}`);
  inputs.forEach((r, i) => {
    r.disabled = true;
    r.parentElement.classList.remove("correct", "wrong");
    if (i === q.answer) r.parentElement.classList.add("correct");
    else if (i === selected) r.parentElement.classList.add("wrong");
  });

  document.getElementById(`explanation-${idx}`).style.display = "block";
  updateScore();
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
  renderQuiz();
}

function resetQuiz() {
  userAnswers = {};
  renderQuiz();
}
