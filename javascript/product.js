document.addEventListener("DOMContentLoaded", function () {
const chips = document.querySelectorAll(".chip, .chip1");
const items = document.querySelectorAll(".skin-row-one");

chips.forEach(chip => {
  chip.addEventListener("click", function () {
    const filterType = chip.textContent.trim();

    // Remove active class from all chips and add to the clicked one
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    // Count items for each type to ensure minimum display
    let displayCount = 0;
    const minItemsToShow = 4;

    // First pass: Show items of selected type
    items.forEach(item => {
      const type = item.querySelector(".element > div").textContent.trim();
      if (filterType === "Show All" || type === filterType) {
        item.style.display = "inherit";
        displayCount++;
      } else {
        item.style.display = "none";
      }
    });

    // Second pass: If less than minimum items shown, display more items
    if (displayCount < minItemsToShow && filterType !== "Show All") {
      items.forEach(item => {
        if (displayCount < minItemsToShow && item.style.display === "none") {
          item.style.display = "inherit";
          displayCount++;
        }
      });
    }
  });
});
  });