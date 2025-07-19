export function setupRightPanelButtons() {
  const expandBtn = document.getElementById("expand-all");
  const collapseBtn = document.getElementById("collapse-all");

  // Expand all explanations
  if (expandBtn) {
    expandBtn.addEventListener("click", () => {
      document.querySelectorAll("#wrong-answers .explanation").forEach(div => div.style.display = "block");
      document.querySelectorAll("#wrong-answers .toggle-explanation").forEach(btn => btn.textContent = "Hide Explanation");
    });
  }

  // Collapse all explanations
  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
      document.querySelectorAll("#wrong-answers .explanation").forEach(div => div.style.display = "none");
      document.querySelectorAll("#wrong-answers .toggle-explanation").forEach(btn => btn.textContent = "Show Explanation");
    });
  }
}
