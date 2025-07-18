// wrong-answers.js

function updateReviewButtons() {
  let wrongCount = 0;
  let wrongIndices = [];

  currentQuiz.forEach((q, idx) => {
    const userAns = userAnswers[idx] || [];
    const isSubmitted = !!submitted[idx];
    const score = calculatePartialScore(userAns, q.answer);

    if (isSubmitted && score < 1) {
      wrongCount++;
      wrongIndices.push(idx);
    }
  });

  const btnWrong = document.getElementById("btn-wrong");
  btnWrong.textContent = `Wrong Question(${wrongCount})`;
  btnWrong.dataset.wrongIndices = JSON.stringify(wrongIndices);
  btnWrong.disabled = wrongCount === 0;
}

function showWrongDetails() {
  const wrongContainer = document.getElementById("wrong-answers");
  const divider = document.getElementById("quiz-divider");
  const controls = document.getElementById("explanation-controls");

  wrongContainer.innerHTML = "";
  wrongContainer.style.display = "block";
  if (divider) divider.style.display = "block";
  if (controls) controls.style.display = "flex";

  const wrongIndices = JSON.parse(document.getElementById("btn-wrong").dataset.wrongIndices || "[]");
  if (wrongIndices.length === 0) {
    wrongContainer.innerHTML = "<p>✅ No wrong answers. Good job!</p>";
    return;
  }

  wrongIndices.forEach(idx => {
    const q = currentQuiz[idx];
    const userAns = userAnswers[idx] || [];

    const div = document.createElement("div");
    div.className = "question";
    div.style.marginBottom = "20px";

    div.innerHTML = `
      <p><strong>Question ${idx + 1}:</strong> ${q.question}</p>
      <ul style="padding-left: 20px;">
        ${q.options.map((choice, i) => {
          const selected = userAns.includes(i);
          const correct = q.answer.includes(i);
          const bgColor = correct ? "#28a745" : (selected ? "#dc3545" : "#f1f1f1");

          return `<li style="
              background-color: ${bgColor};
              margin: 4px 0;
              padding: 6px 10px;
              border-radius: 4px;
              list-style-type: none;
            ">
            ${selected ? "✅ " : ""}${choice}
          </li>`;
        }).join("")}
      </ul>
      ${q.explanation ? `<button class="toggle-explanation">Show Explanation</button><div class="explanation" style="display:none; margin-top: 5px;">${q.explanation}</div>` : ""}
      <hr>
    `;

    wrongContainer.appendChild(div);
  });

  // Toggle explanation buttons
  wrongContainer.querySelectorAll('.toggle-explanation').forEach(btn => {
    btn.addEventListener('click', () => {
      const expl = btn.nextElementSibling;
      const visible = expl.style.display === 'block';
      expl.style.display = visible ? 'none' : 'block';
      btn.textContent = visible ? 'Show Explanation' : 'Hide Explanation';
    });
  });

  wrongContainer.scrollIntoView({
    behavior: "smooth"
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-wrong").addEventListener("click", showWrongDetails);

  const expandBtn = document.getElementById("expand-all");
  const collapseBtn = document.getElementById("collapse-all");

  if (expandBtn && collapseBtn) {
    expandBtn.addEventListener("click", () => {
      document.querySelectorAll("#wrong-answers .explanation").forEach(div => {
        div.style.display = "block";
      });
      document.querySelectorAll("#wrong-answers .toggle-explanation").forEach(btn => {
        btn.textContent = "Hide Explanation";
      });
    });

    collapseBtn.addEventListener("click", () => {
      document.querySelectorAll("#wrong-answers .explanation").forEach(div => {
        div.style.display = "none";
      });
      document.querySelectorAll("#wrong-answers .toggle-explanation").forEach(btn => {
        btn.textContent = "Show Explanation";
      });
    });
  }
});