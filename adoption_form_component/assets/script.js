// Streamlit messaging helpers
function postToStreamlit(type, data = {}) {
  window.parent.postMessage({
    isStreamlitMessage: true,
    type: type,
    ...data,
  }, "*");
}

function initStreamlit() {
  postToStreamlit("streamlit:componentReady", { apiVersion: 1 });
}

function setFrameHeight(height) {
  postToStreamlit("streamlit:setFrameHeight", { height: height });
}

// The `data` argument can be any JSON-serializable value.
function sendDataToPython(data) {
  postToStreamlit("streamlit:setComponentValue", data);
}

function sendJsonToPython(obj) {
  sendDataToPython({value: obj, dataType: "json"});
}

// ----------------------------------------------------
// Fox Pokémon dictionary ordered by National Dex number
const foxSpecies = {
  "Vulpix": { name: "Vulpix", isFurry: false, id: 37 },
  "Ninetales": { name: "Ninetales", isFurry: false, id: 38 },
  "Zorua": { name: "Zorua", isFurry: false, id: 570 },
  "Zoroark": { name: "Zoroark", isFurry: true, id: 571 },
  "Fennekin": { name: "Fennekin", isFurry: false, id: 653 },
  "Braixen": { name: "Braixen", isFurry: true, id: 654 },
  "Delphox": { name: "Delphox", isFurry: true, id: 655 },
  "Nickit": { name: "Nickit", isFurry: false, id: 827 },
  "Thievul": { name: "Thievul", isFurry: false, id: 828 },
  "Alolan Vulpix": { name: "Alolan Vulpix", isFurry: false, id: 37 },
  "Alolan Ninetales": { name: "Alolan Ninetales", isFurry: false, id: 38 },
  "Hisuian Zorua": { name: "Hisuian Zorua", isFurry: false, id: 570 },
  "Hisuian Zoroark": { name: "Hisuian Zoroark", isFurry: true, id: 571 }
};

// ----------------------------------------------------
// DOM references
const form = document.getElementById("adoption-form");
const speciesSelect = document.getElementById("species");
const isShiny = document.getElementById("isShiny");
const spriteImg = document.getElementById("sprite");

// Dynamically populate species dropdown
function populateSpeciesDropdown() {
  for (const [key, value] of Object.entries(foxSpecies)) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = key;
    speciesSelect.appendChild(option);
  }
}

// Generate sprite URL based on species name and shiny status
function getSpriteURL(name, shiny) {
  const base = "https://img.pokemondb.net/sprites/home";
  const variantPath = shiny ? "shiny" : "normal";

  // Normalize names to match Pokémon DB URLs
  let normalizedName = name.toLowerCase();

  // Handle regional variants - move variant to end
  if (normalizedName.startsWith("alolan ")) {
    normalizedName = normalizedName.replace("alolan ", "") + "-alolan";
  } else if (normalizedName.startsWith("hisuian ")) {
    normalizedName = normalizedName.replace("hisuian ", "") + "-hisuian";
  }

  // Replace any remaining spaces with hyphens
  normalizedName = normalizedName.replace(/\s+/g, "-");

  return `${base}/${variantPath}/${normalizedName}.png`;
}

// Update preview image when selection changes
function updateImage() {
  const selected = speciesSelect.value;
  spriteImg.src = selected ? getSpriteURL(selected, isShiny.checked) : "";
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const genderInput = form.querySelector('input[name="gender"]:checked');
  const speciesName = speciesSelect.value;

  if (!speciesName || !genderInput || !form.firstName.value || !form.lastName.value) {
    alert("Please fill out all required fields.");
    return;
  }

  const isFurry = foxSpecies[speciesName].isFurry ?? false;

  const data = {
    firstName: form.firstName.value.trim(),
    middleName: form.middleName.value.trim(),
    lastName: form.lastName.value.trim(),
    species: speciesName,
    shiny: isShiny.checked,
    gender: genderInput.value,
    furry: isFurry,
  };

  console.log("Submitting:", data);
  sendJsonToPython(data);
});

// React to updates from Streamlit Python side
function onDataFromPython(event) {
  if (event.data.type !== "streamlit:render") return;

  const preselected = event.data.args?.preselected;
  if (preselected && foxSpecies[preselected]) {
    speciesSelect.value = preselected;
  } else {
    speciesSelect.value = "Delphox";
  }

  updateImage();
}

// ----------------------------------------------------
// Initialize component
populateSpeciesDropdown();
speciesSelect.addEventListener("change", updateImage);
isShiny.addEventListener("change", updateImage);
window.addEventListener("message", onDataFromPython);

initStreamlit();
setFrameHeight(1000);
updateImage();
