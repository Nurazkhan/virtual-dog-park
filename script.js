const searchInput = document.querySelector("#breed-search");
const breedEntries = document.querySelectorAll(".breed-entry");
const searchStatus = document.querySelector("#search-status");
const emptyMessage = document.querySelector("#empty-message");
const adoptionForm = document.querySelector("#adoption-form");
const dogNameInput = document.querySelector("#dog-name");
const dogBreedInput = document.querySelector("#dog-breed");
const nameError = document.querySelector("#name-error");
const dogProfile = document.querySelector("#dog-profile");
const profileImage = document.querySelector("#profile-image");
const profileName = document.querySelector("#profile-name");
const profileBreed = document.querySelector("#profile-breed");
const profileHappiness = document.querySelector("#profile-happiness");
const careMessage = document.querySelector("#care-message");

let happiness = 50;

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

function adoptDog(event) {
  event.preventDefault();
  const dogName = dogNameInput.value.trim();

  if (dogName.length === 0 || dogName.length > 20) {
    nameError.textContent = "Enter a name with 1 to 20 characters.";
    dogNameInput.focus();
    return;
  }

  const dogBreed = dogBreedInput.value;
  const breedImages = {
    Beagle: "assets/beagle.svg",
    "Golden Retriever": "assets/golden-retriever.svg",
    Poodle: "assets/poodle.svg",
  };

  nameError.textContent = "";
  profileName.textContent = dogName;
  profileBreed.textContent = dogBreed;
  profileImage.src = breedImages[dogBreed];
  profileImage.alt = `Illustration of a ${dogBreed}.`;
  happiness = 50;
  updateHappiness();
  careMessage.textContent = "";
  dogProfile.hidden = false;
}

function updateHappiness(message) {
  profileHappiness.textContent = happiness;
  careMessage.textContent = message || "";
}

function careForDog(activity) {
  if (dogProfile.hidden) {
    return;
  }

  happiness = Math.min(happiness + 10, 100);
  updateHappiness(happiness === 100 ? "Your dog is very happy!" : `Your dog enjoyed ${activity}.`);
}

adoptionForm.addEventListener("submit", adoptDog);
dogNameInput.addEventListener("input", () => {
  nameError.textContent = "";
});
document.querySelector("#feed-button").addEventListener("click", () => careForDog("a snack"));
document.querySelector("#play-button").addEventListener("click", () => careForDog("playing"));
