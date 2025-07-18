// quiz-render.js

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  if (currentQuiz.length === 0) {
    container.textContent = "No questions loaded.";
    return;
  }

  const q = currentQuiz[currentQuestionIndex];

  // Question text
  // Question text with line breaks
  const questionEl = document.createElement("p");
  questionEl.innerHTML = `${currentQuestionIndex + 1}. ${q.question.replace(/\n/g, "<br>")}`;
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
      if (q.answer.includes(i)) {
        label.classList.add("correct"); // Highlight correct
      }
      if (!q.answer.includes(i) && userAnswers[currentQuestionIndex].includes(i)) {
        label.classList.add("wrong"); // Highlight wrong selections
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
      feedback.style.color = "#006400"; // Dark green
    } else if (scoreForQuestion > 0) {
      feedback.textContent = "Not quite correct.";
      feedback.style.color = "orange";
    } else {
      feedback.textContent = "Wrong.";
      feedback.style.color = "#8B0000"; // Dark red
    }

    container.appendChild(feedback);

    // ✅ FIXED: render explanation with line breaks
    const expl = document.createElement("p");
    expl.className = "explanation";
    expl.innerHTML = (q.explanation || "").replace(/\n/g, "<br>");
    container.appendChild(expl);
  }

  updateScore();
  updateNavigationButtons();
  updateReviewButtons();
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