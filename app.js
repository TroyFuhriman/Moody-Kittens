
let kittens = []
let currentKitten = {}
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function refresh() {location.reload();
  return false;}

loadKittens()

 function addKitten(event) {event.preventDefault()
let form = event.target
let kittenName = form.kittenName.value
let currentKitten = kittens.find(kittens => kittens.name == kittenName)
if (!currentKitten){ 
  currentKitten = {id: generateId(), name: kittenName, affection:5, mood: "tolerant"} 
  kittens.push(currentKitten)
}
else {window.alert("Cannot have kittens with the same name")}
  

saveKittens()
drawKittens()
form.reset()
}


/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
if(kittensData){
  kittens = kittensData
}
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens()
let kittenNameElem = document.getElementById("kittens")
let kittensTemplate = ""

  kittens.forEach(kitten => {
    kittensTemplate +=`
    <div class="cat-border bg-dark kitten ${kitten.mood} text-light">
      <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4&size=150x150">
      <div class="d-flex justify-content-center">Name: ${kitten.name}</div>
      <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
      <div class="d-flex justify-content-center">Affection: ${kitten.affection}</div>
      <div class="d-flex space-between"></div>
      <button class="m-1" onclick="pet('${kitten.id}')">Pet</button>
      <button class="m-1" onclick="catnip('${kitten.id}')">Catnip</button>
      <button id="erase" class="btn-cancel eraser d-flex.justify-content-center"><i class="action fa fa-eraser aria-hidden="true" text-danger" onclick="removeKitten('${kitten.id}')"></i></button>
    </div>
 `
})

kittenNameElem.innerHTML = kittensTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let randomNumber = Math.random()
  if( randomNumber >.7) {currentKitten.affection ++;
  setKittenMood(currentKitten)
  saveKittens()
  }
  else currentKitten.affection --
  setKittenMood(currentKitten)
  saveKittens()
  

}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
currentKitten.affection = 5;
currentKitten.mood = "tolerant"
  saveKittens()
 

}

/**
 * Sets the kittens mood based on its affection
 * adventurous > 8 Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) 
{ document.getElementById("kittens").classList.remove("mood")
if (kitten.affection >=8) {kitten.mood = "adventurous", document.getElementById("Adventure").removeAttribute("hidden")}
if (kitten.affection<=6) {kitten.mood = "happy"}
if (kitten.affection <=5) {kitten.mood = "tolerant"}
if (kitten.affection <= 3) {kitten.mood = "angry"}
if (kitten.affection == 0) {kitten.mood = "gone"}
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
  document.getElementById("nameEntry").classList.remove("hidden");
}

function removeKitten(id){
  let index = kittens.findIndex(kitten => kitten.id == id)
kittens.splice(index, 1)
saveKittens()
}


/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
