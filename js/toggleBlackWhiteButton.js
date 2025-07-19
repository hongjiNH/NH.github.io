 window.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;

    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
    }

    // Delay to wait for nav.html to be injected
    setTimeout(() => {
      const themeToggle = document.getElementById('theme-toggle');
      if (!themeToggle) return;

      // Set checkbox state based on saved theme
      themeToggle.checked = savedTheme === 'dark';

      // Handle toggle
      themeToggle.addEventListener('change', () => {
        const isDark = themeToggle.checked;
        body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    }, 100); // adjust delay if nav takes longer
  });