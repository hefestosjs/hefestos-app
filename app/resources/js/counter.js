document.getElementById("increment").addEventListener("click", () => {
  const countDisplay = document.getElementById("count-display");
  const currentCount = parseInt(countDisplay.textContent, 10);
  countDisplay.textContent = currentCount + 1;
});
