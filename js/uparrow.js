// Show button after scrolling down 100px
window.onscroll = function () {
  const btn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Scroll to top when button clicked
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollTopBtn");
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
