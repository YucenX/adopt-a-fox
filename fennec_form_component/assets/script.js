
// ----------------------------------------------------
// Just copy/paste these functions as-is:

function sendMessageToStreamlitClient(type, data) {
  const outData = Object.assign({
    isStreamlitMessage: true,
    type: type,
  }, data);
  window.parent.postMessage(outData, "*");
}

function init() {
  sendMessageToStreamlitClient("streamlit:componentReady", {apiVersion: 1});
}

function setFrameHeight(height) {
  sendMessageToStreamlitClient("streamlit:setFrameHeight", {height: height});
}

// The `data` argument can be any JSON-serializable value.
function sendDataToPython(data) {
  sendMessageToStreamlitClient("streamlit:setComponentValue", data);
}

function sendJsonToPython(data) {
  sendDataToPython({value: data, dataType: "json"});
}

// ----------------------------------------------------

// Simple DOM references
const form = document.getElementById("adoption-form");
const species = document.getElementById("species");
const isShiny = document.getElementById("isShiny");
const sprite = document.getElementById("sprite");

// Mapping Pokémon names to Home sprite URLs
const spriteURLs = {
  Fennekin: {
    normal: "https://img.pokemondb.net/sprites/home/normal/fennekin.png",
    shiny: "https://img.pokemondb.net/sprites/home/shiny/fennekin.png",
  },
  Braixen: {
    normal: "https://img.pokemondb.net/sprites/home/normal/braixen.png",
    shiny: "https://img.pokemondb.net/sprites/home/shiny/braixen.png",
  },
  Delphox: {
    normal: "https://img.pokemondb.net/sprites/home/normal/delphox.png",
    shiny: "https://img.pokemondb.net/sprites/home/shiny/delphox.png",
  },
};

// Update image when species or shiny changes
function updateImage() {
  const selected = species.value;
  const shiny = isShiny.checked;
  if (selected && spriteURLs[selected]) {
    sprite.src = shiny
      ? spriteURLs[selected].shiny
      : spriteURLs[selected].normal;
  } else {
    sprite.src = "";
  }
}

// Listen for changes to update preview
species.addEventListener("change", updateImage);
isShiny.addEventListener("change", updateImage);

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page refresh

  const gender = form.querySelector('input[name="gender"]:checked');

  // Validate required fields
  if (!species.value || !gender || !form.firstName.value || !form.lastName.value) {
    alert("Please fill out all required fields.");
    return;
  }

  // Construct data
  const data = {
    firstName: form.firstName.value.trim(),
    middleName: form.middleName.value.trim(),
    lastName: form.lastName.value.trim(),
    species: species.value,
    shiny: isShiny.checked,
    gender: gender.value,
  };

  // Output to console
  console.log(JSON.stringify(data, null, 2));
  sendJsonToPython(data);

});

// data is any JSON-serializable value you sent from Python,
// and it's already deserialized for you.
function onDataFromPython(event) {
  if (event.data.type !== "streamlit:render") return;
  if (event.data.args.preselected && event.data.args.preselected in spriteURLs) {
    species.value = event.data.args.preselected;  // Access values sent from Python here!
  } else {
    species.value = "Delphox";
  }

  updateImage();

}

window.addEventListener("message", onDataFromPython);
init();
setFrameHeight(1000);
