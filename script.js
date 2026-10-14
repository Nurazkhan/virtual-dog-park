const searchInput = document.querySelector("#breed-search");
const breedEntries = document.querySelectorAll(".breed-entry");
const searchStatus = document.querySelector("#search-status");
const emptyMessage = document.querySelector("#empty-message");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleBreeds = 0;

  breedEntries.forEach((entry) => {
    const matches = entry.dataset.breed.includes(searchTerm);
    entry.hidden = !matches;

    if (matches) {
      visibleBreeds += 1;
    }
  });

  searchStatus.textContent = `Showing ${visibleBreeds} ${visibleBreeds === 1 ? "breed" : "breeds"}`;
  emptyMessage.hidden = visibleBreeds !== 0;
});
