// Toggle sidebar expand/collapse
document.getElementById("sidebar-toggle").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("expanded");
});

// Handle expandable nav sections
document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const submenu = btn.nextElementSibling;
    const parentSection = btn.closest('.nav-section');

    // Toggle submenu visibility
    const isVisible = submenu.style.display === 'block';
    submenu.style.display = isVisible ? 'none' : 'block';

    // Toggle active class on section
    parentSection.classList.toggle('open', !isVisible);
    btn.classList.toggle('active', !isVisible);
  });
});
