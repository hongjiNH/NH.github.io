// Toggle dark mode and remember preference
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  // 1. Apply saved theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
  }

  // 2. Toggle theme on click
  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');

      // Save new preference
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
});
