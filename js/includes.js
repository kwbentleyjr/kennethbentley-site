async function loadFooter() {
  const footer = document.getElementById("footer-placeholder");

  if (!footer) return;

  const response = await fetch("includes/footer.html");
  footer.innerHTML = await response.text();
}

loadFooter();