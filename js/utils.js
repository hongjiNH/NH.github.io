// utils.js

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
