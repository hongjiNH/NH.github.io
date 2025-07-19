document.getElementById("sidebar-toggle").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  const body = document.body;

  sidebar.classList.toggle("expanded");
  body.classList.toggle("sidebar-expanded");
});

document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const submenu = btn.nextElementSibling;
    const parentSection = btn.closest('.nav-section');

    // Toggle submenu visibility by class
    submenu.classList.toggle('open');

    // Toggle active class on section
    parentSection.classList.toggle('open', submenu.classList.contains('open'));
    btn.classList.toggle('active', submenu.classList.contains('open'));
  });
});
