// let currentQuiz = [];
// let userAnswers = {};
// let currentQuestionIndex = 0;
// let submitted = {};  // Track submitted questions (by index)

// function loadQuiz(file, title) {
//   fetch(file)
//     .then(res => res.json())
//     .then(data => {
//       currentQuiz = data;
//       userAnswers = {};
//       submitted = {};
//       currentQuestionIndex = 0;
//       document.getElementById("quiz-title").textContent = title;
//       renderQuiz();
//     })
//     .catch(err => {
//       alert("Failed to load quiz.");
//       console.error(err);
//     });
// }

// function renderQuiz() {
//   const container = document.getElementById("quiz-container");
//   container.innerHTML = "";

//   if (currentQuiz.length === 0) {
//     container.textContent = "No questions loaded.";
//     return;
//   }

//   const q = currentQuiz[currentQuestionIndex];

//   // Question text
//   const questionEl = document.createElement("p");
//   questionEl.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
//   container.appendChild(questionEl);

//   // Initialize userAnswers array for current question if not set
//   if (!Array.isArray(userAnswers[currentQuestionIndex])) {
//     userAnswers[currentQuestionIndex] = [];
//   }

//   // Options (checkboxes)
//   q.options.forEach((opt, i) => {
//     const label = document.createElement("label");
//     label.style.display = "block";

//     label.innerHTML = `<input type="checkbox" name="answer" value="${i}"> ${opt}`;
//     const input = label.querySelector("input");

//     // Disable if question submitted
//     input.disabled = !!submitted[currentQuestionIndex];

//     input.checked = userAnswers[currentQuestionIndex].includes(i);

//     input.addEventListener("change", () => handleCheckboxChange(currentQuestionIndex, i, input.checked));

//     // Show green/red backgrounds only if submitted
//     if (submitted[currentQuestionIndex]) {
//         if (q.answer.includes(i)) {
//             label.classList.add("correct"); // Highlight all correct options
//         }
//         if (!q.answer.includes(i) && userAnswers[currentQuestionIndex].includes(i)) {
//             label.classList.add("wrong"); // Highlight wrong selections
//         }
//     }

//     container.appendChild(label);
//   });

//   // Show feedback only if submitted
//   if (submitted[currentQuestionIndex]) {
//     const scoreForQuestion = calculatePartialScore(userAnswers[currentQuestionIndex], q.answer);

//     const feedback = document.createElement("p");
//     feedback.style.fontWeight = "bold";

//     if (scoreForQuestion === 1) {
//       feedback.textContent = "Correct!";
//       feedback.style.color = "#006400";  // darker green
//     } else if (scoreForQuestion > 0) {
//       feedback.textContent = "Not quite correct.";
//       feedback.style.color = "orange";
//     } else {
//       feedback.textContent = "Wrong.";
//       feedback.style.color = "#8B0000";  // darker red
//     }
//     container.appendChild(feedback);

//     const expl = document.createElement("p");
//     expl.className = "explanation";
//     expl.textContent = q.explanation || "";
//     container.appendChild(expl);
//   }

//   updateScore();
//   updateNavigationButtons();
//   updateReviewButtons();
// }

// function handleCheckboxChange(questionIdx, optionIdx, checked) {
//   if (!Array.isArray(userAnswers[questionIdx])) userAnswers[questionIdx] = [];

//   if (checked) {
//     if (!userAnswers[questionIdx].includes(optionIdx)) {
//       userAnswers[questionIdx].push(optionIdx);
//     }
//   } else {
//     userAnswers[questionIdx] = userAnswers[questionIdx].filter(i => i !== optionIdx);
//   }
//   // Wait for submit button to actually mark submitted
// }

// function submitCurrentAnswer() {
//   if (!userAnswers[currentQuestionIndex] || userAnswers[currentQuestionIndex].length === 0) {
//     alert("Please select at least one answer before submitting.");
//     return;
//   }
//   submitted[currentQuestionIndex] = true;
//   renderQuiz();
//   updateReviewButtons();

// }

// function calculatePartialScore(selected, correct) {
//   if (selected.length === 0) return 0;

//   const totalCorrect = correct.length;
//   let correctSelected = selected.filter(x => correct.includes(x)).length;
//   let wrongSelected = selected.filter(x => !correct.includes(x)).length;

//   let score = (correctSelected - wrongSelected) / totalCorrect;
//   if (score < 0) score = 0;
//   if (score > 1) score = 1;

//   return score;
// }

// function nextQuestion() {
//   if (currentQuestionIndex < currentQuiz.length - 1) {
//     currentQuestionIndex++;
//     renderQuiz();
//   }
// }

// function prevQuestion() {
//   if (currentQuestionIndex > 0) {
//     currentQuestionIndex--;
//     renderQuiz();
//   }
// }

// function updateNavigationButtons() {
//   document.getElementById("prev-btn").disabled = currentQuestionIndex === 0;
//   document.getElementById("next-btn").disabled = currentQuestionIndex === currentQuiz.length - 1;
// }

// function updateScore() {
//   let totalScore = 0;
//   for (const [idx, ans] of Object.entries(userAnswers)) {
//     if (submitted[idx]) {
//       totalScore += calculatePartialScore(ans, currentQuiz[idx].answer);
//     }
//   }
//   document.getElementById("score").textContent = `Score: ${totalScore.toFixed(2)} / ${currentQuiz.length}`;
// }

// function resetQuiz() {
//   userAnswers = {};
//   submitted = {};
//   currentQuestionIndex = 0;
//   renderQuiz();

//   // Clear and hide wrong answers container
//   const wrongContainer = document.getElementById("wrong-answers");
//   if (wrongContainer) {
//     wrongContainer.innerHTML = "";
//     wrongContainer.style.display = "none"; // ✅ hide the container on reset
//   }

//   // Also hide the divider if used
//   const divider = document.getElementById("quiz-divider");
//   if (divider) {
//     divider.style.display = "none";
//   }

//   // Reset wrong button
//   const btnWrong = document.getElementById("btn-wrong");
//   if (btnWrong) {
//     btnWrong.textContent = "Wrong (0)";
//     btnWrong.dataset.wrongIndices = "[]";
//     btnWrong.disabled = true;
//   }

//   // Reset wrong details view
//     const wrongBtn = document.getElementById("btn-wrong");
//     if (wrongBtn) {
//     wrongBtn.dataset.wrongIndices = "[]";
//     }
//     window.scrollTo({ top: 0, behavior: "smooth" });

// }

// function updateReviewButtons() {
//   let wrongCount = 0;
//   let wrongIndices = [];

//   currentQuiz.forEach((q, idx) => {
//     const userAns = userAnswers[idx] || [];
//     const isSubmitted = !!submitted[idx];
//     const score = calculatePartialScore(userAns, q.answer);

//     if (isSubmitted && score < 1) {
//       wrongCount++;
//       wrongIndices.push(idx);
//     }
//   });

//   const btnWrong = document.getElementById("btn-wrong");
//   btnWrong.textContent = `Wrong (${wrongCount})`;
//   btnWrong.dataset.wrongIndices = JSON.stringify(wrongIndices);
//   btnWrong.disabled = wrongCount === 0;

// }

// // Navigate to question index (for buttons)
// function goToQuestion(idx) {
//   if (idx >= 0 && idx < currentQuiz.length) {
//     currentQuestionIndex = idx;
//     renderQuiz();
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }
// }

// // Show wrong questions details below quiz container
// // 1. Show explanation controls when showing wrong details
// function showWrongDetails() {
//   const wrongContainer = document.getElementById("wrong-answers");
//   const divider = document.getElementById("quiz-divider");
//   const controls = document.getElementById("explanation-controls");  // added

//   wrongContainer.innerHTML = ""; // Clear previous content
//   wrongContainer.style.display = "block";
//   if (divider) divider.style.display = "block";
//   if (controls) controls.style.display = "flex";  // show controls container

//   const wrongIndices = JSON.parse(document.getElementById("btn-wrong").dataset.wrongIndices || "[]");
//   if (wrongIndices.length === 0) {
//     wrongContainer.innerHTML = "<p>✅ No wrong answers. Good job!</p>";
//     return;
//   }

//   wrongIndices.forEach(idx => {
//     const q = currentQuiz[idx];
//     const userAns = userAnswers[idx] || [];

//     const div = document.createElement("div");
//     div.className = "question";
//     div.style.marginBottom = "20px";

//     div.innerHTML = `
//       <p><strong>Question ${idx + 1}:</strong> ${q.question}</p>
//       <ul style="padding-left: 20px;">
//         ${q.options.map((choice, i) => {
//           const selected = userAns.includes(i);
//           const correct = q.answer.includes(i);
//           const bgColor = correct ? "#28a745" : (selected ? "#dc3545" : "#f1f1f1");

//           return `<li style="
//               background-color: ${bgColor};
//               margin: 4px 0;
//               padding: 6px 10px;
//               border-radius: 4px;
//               list-style-type: none;
//             ">
//             ${selected ? "✅ " : ""}${choice}
//           </li>`;
//         }).join("")}
//       </ul>
//       ${q.explanation ? `<button class="toggle-explanation">Show Explanation</button><div class="explanation" style="display:none; margin-top: 5px;">${q.explanation}</div>` : ""}
//       <hr>
//     `;

//     wrongContainer.appendChild(div);
//   });

//   // Add toggle buttons for each wrong explanation
//   wrongContainer.querySelectorAll('.toggle-explanation').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const expl = btn.nextElementSibling;
//       const visible = expl.style.display === 'block';
//       expl.style.display = visible ? 'none' : 'block';
//       btn.textContent = visible ? 'Show Explanation' : 'Hide Explanation';
//     });
//   });

//   wrongContainer.scrollIntoView({ behavior: "smooth" });
// }

// // 2. Add Expand All / Collapse All buttons event listeners on DOMContentLoaded
// window.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("btn-wrong").addEventListener("click", showWrongDetails);

//   const expandBtn = document.getElementById("expand-all");
//   const collapseBtn = document.getElementById("collapse-all");

//   if (expandBtn && collapseBtn) {
//     expandBtn.addEventListener("click", () => {
//       document.querySelectorAll("#wrong-answers .explanation").forEach(div => {
//         div.style.display = "block";
//       });
//       document.querySelectorAll("#wrong-answers .toggle-explanation").forEach(btn => {
//         btn.textContent = "Hide Explanation";
//       });
//     });

//     collapseBtn.addEventListener("click", () => {
//       document.querySelectorAll("#wrong-answers .explanation").forEach(div => {
//         div.style.display = "none";
//       });
//       document.querySelectorAll("#wrong-answers .toggle-explanation").forEach(btn => {
//         btn.textContent = "Show Explanation";
//       });
//     });
//   }
// });


// // Attach button click handlers only once, after DOM ready
// window.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("btn-wrong").addEventListener("click", showWrongDetails);
// });

// function displayWrongAnswers() {
//   const container = document.getElementById("wrong-answers");
//   const controls = document.getElementById("explanation-controls");

//   // Show explanation control buttons
//   controls.style.display = "flex";

//   // Clear existing content
//   container.innerHTML = "";

//   wrongAnswers.forEach(({ question, explanation, selected, correct }, i) => {
//     const block = document.createElement("div");
//     block.classList.add("wrong-block");

//     block.innerHTML = `
//       <h3>Question ${i + 1}</h3>
//       <p>${question}</p>
//       <p><strong>Your answer:</strong> ${selected}</p>
//       <p><strong>Correct answer:</strong> ${correct}</p>
//       <button class="toggle-explanation">Show Explanation</button>
//       <div class="explanation" style="display: none; margin-top: 5px;">
//         ${explanation}
//       </div>
//       <hr>
//     `;

//     container.appendChild(block);
//   });

//   // Add toggle buttons for each wrong explanation
//   container.querySelectorAll('.toggle-explanation').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const expl = btn.nextElementSibling;
//       const visible = expl.style.display === 'block';
//       expl.style.display = visible ? 'none' : 'block';
//       btn.textContent = visible ? 'Show Explanation' : 'Hide Explanation';
//     });
//   });
// }
