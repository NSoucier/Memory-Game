const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// Fisher Yates algorithm used to shuffle array
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let clickcount = 0;
var score = 0;
let scoreUI = document.createElement('h2');
scoreUI.innerText = `Your current score: ${score}`;
gameContainer.parentElement.appendChild(scoreUI);

function handleCardClick(event) {
    score++;
    scoreUI.innerText = `Your current score: ${score}`;
    console.log("you just clicked", event.target.classList.value);
    clickcount++;
    console.log(score)

    //eliminate clicking on an existing match
    if (event.target.id == "matched") {
        clickcount--;
    }

    if (clickcount === 1 && event.target.id != "matched") {
        console.log('should be a 1:' + clickcount)
        event.target.style.backgroundColor = event.target.classList.value;
        let temp = event.target;
        temp.setAttribute('id', 'firstclick');
        console.log(temp)  
    } 

    //eliminate clicking on same box twice
    if (event.target.id==='firstclick' && clickcount ===2) {
        clickcount--;
    }
    if (clickcount === 2) {
        console.log('should be a 2:' + clickcount)
        event.target.style.backgroundColor = event.target.classList.value;
        let first = document.getElementById('firstclick');
        first.setAttribute('id', '');
        console.log('heyo')

        //leave revealed if it's a match
        if (event.target.style.backgroundColor === first.style.backgroundColor) {
            first.setAttribute('id', 'matched');
            event.target.setAttribute('id', 'matched');
            clickcount = 0;
        } else {
            setTimeout(function (){
                event.target.style.backgroundColor = "white";
                first.style.backgroundColor = "white";
                clickcount = 0;
            },1000)
        }
        }
}

// when the DOM loads
createDivsForColors(shuffledColors);
