// select elements
let onePlayer = document.querySelector(".chose-player .one-player");
let twoPlayers = document.querySelector(".chose-player .two-player");
let players = document.querySelector(".players");
let player1 = document.querySelector(".player-1");
let player2 = document.querySelector(".player-2");
let showLettersDiv = document.querySelector(".show-letters");

let playerOneScore = 0;
let playerTwoScore = 0;

let a = 0;

onePlayer.onclick = function () {
  players.classList.add("extra");
  a = 1;
  player2.innerHTML = "";
  createForm1();
};

twoPlayers.onclick = function () {
  a = 2;

  createForm2();

  round();
};

function round() {
  if (playerRound === 0 || playerRound === 2) {
    playerRound = 1;
  } else {
    playerRound = 2;
  }
}

let playerRound = 0;

// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// a
let span;

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  singers: ["amr diab", "hamaki", "mohamed fouad", "tamer hosny"],
  actors: [
    "adel imam",
    "ahmed el sakka",
    "ahmed helmy",
    "mohamed henedi",
    "Mona Zaki",
    "Karim Abdel Aziz",
  ],
  football: ["cristiano", "messi", "mo salah", "bassem"],
  movies: [
    "salam ya sahby",
    "al halfout",
    "mafia",
    "ibrahim al abyad",
    "el lembi",
    "okal",
    "x large",
  ],
  countries: [
    "syria",
    "palestine",
    "yemen",
    "egypt",
    "bahrain",
    "qatar",
    "emirates",
    "saudi arabia",
  ],
};

let s = 0;

// Get Random Property

let allKeys = Object.keys(words);

let randomPropNumber;
let randomPropName;
let randomPropValue;
let randomValueNumber;
let randomValueValue;
let lettersGuessContainer;
let lettersAndSpace;

let spans;
let spanText;
function createShowLetter(h) {
  spans = document.createElement("span");
  spanText = document.createTextNode(h);
  spans.append(spanText);
  showLettersDiv.appendChild(spans);
}

function createGuessLetters() {
  // Random Number Depend On Keys Length
  randomPropNumber = Math.floor(Math.random() * allKeys.length);

  // Category
  randomPropName = allKeys[randomPropNumber];

  // Category Words
  randomPropValue = words[randomPropName];

  // Random Number Depend On Words
  randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

  // The Chosen Word
  randomValueValue = randomPropValue[randomValueNumber];

  createShowLetter(randomValueValue);

  // Set Category Info
  document.querySelector(".game-info .category span").innerHTML =
    randomPropName;

  // Select Letters Guess Element
  lettersGuessContainer = document.querySelector(".letters-guess");

  // Convert Chosen Word To Array
  lettersAndSpace = Array.from(randomValueValue);
  // Create Spans Depend On Word
  lettersAndSpace.forEach((letter) => {
    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If Letter Is Space
    if (letter === " ") {
      // Add Class To The Span
      emptySpan.className = "with-space";
      s++;
    }

    // Append Span To The Letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
  });
}

createGuessLetters();

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// a
let spanValue = [];
let rightAttempts;

let trays = 0;

// a
function checker() {
  // Handle Clicking On Letters
  document.addEventListener("click", (e) => {
    guessSpans = document.querySelectorAll(".letters-guess span");

    theDraw = document.querySelector(".hangman-draw");
    // Set The Choose Status
    let theStatus = false;

    if (e.target.className === "letter-box") {
      e.target.classList.add("clicked");

      // Get Clicked Letter
      let theClickedLetter = e.target.innerHTML.toLowerCase();

      // The Chosen Word
      let theChosenWord = Array.from(randomValueValue.toLowerCase());

      theChosenWord.forEach((wordLetter, WordIndex) => {
        // If The Clicked Letter Equal To One Of The Chosen Word Letter
        if (theClickedLetter == wordLetter) {
          // Set Status To Correct
          theStatus = true;

          // Loop On All Guess Spans
          guessSpans.forEach((span, spanIndex) => {
            if (WordIndex === spanIndex) {
              span.innerHTML = theClickedLetter;

              s++;

              spanValue.splice(spanIndex, 1, span.innerHTML);
            }
          });
        }
      });

      // Outside Loop

      // If Letter Is Wrong
      if (theStatus !== true) {
        // Increase The Wrong Attempts
        wrongAttempts++;

        // Add Class Wrong On The Draw Element
        theDraw.classList.add(`wrong-${wrongAttempts}`);

        // Play Fail Sound
        document.getElementById("fail").play();

        if (wrongAttempts === 9) {
          for (let i = 1; i <= 9; i++) {
            theDraw.classList.remove(`wrong-${i}`);
          }

          deleteClass();
          trays++;

          if (a === 1) {
            if (trays === 3) {
              endGame2();
            }
          } else if (a === 2) {
            if (trays === 6) {
              howWin();
            }
          }

          round();
        }
      } else {
        rightAttempts = spanValue;

        let l = Array.from(randomValueValue);

        console.log(s);
        console.log(l.length);

        if (s === l.length) {
          console.log(`${s}  kotkot`);
          console.log(`${l.length}  kotkot`);

          deleteClass();

          trays++;
          if (a === 1) {
            playerOneScore++;
            player1.innerHTML = `${playerOneName}: <span>${playerOneScore}</span>`;
          } else {
            if (playerRound === 1) {
              playerOneScore++;
              player1.innerHTML = `${playerOneName}: <span>${playerOneScore}</span>`;
            } else {
              playerTwoScore++;
              player2.innerHTML = `${playerTwoName}: <span>${playerTwoScore}</span>`;
            }
          }

          // player1.innerHTML = `${playerOneName}: <span>${playerOneScore}</span>`;
          // player2.innerHTML = `${playerTwoName}: <span>${playerTwoScore}</span>`;

          if (a === 1) {
            if (trays === 3) {
              endGame2();
              // howWin();
              // deleteClass();
            }
          } else if (a === 2)
            if (trays === 6) {
              howWin();
              // deleteClass();
            }

          round();
        }

        // Play Success Sound
        document.getElementById("success").play();
      }
    }
  });
}

checker();

// a
function deleteClass() {
  let letterBox = document.querySelectorAll(".letters .letter-box");

  letterBox.forEach((e) => {
    e.classList.remove("clicked");
  });

  for (let i = 1; i <= 9; i++) {
    theDraw.classList.remove(`wrong-${i}`);
  }

  // Clear the guessed letters container
  lettersGuessContainer.innerHTML = "";

  // Reset the wrongAttempts and spanValue
  wrongAttempts = 0;
  spanValue = [];
  rightAttempts = "";
  s = 0;

  // Create new guessed letters for the next round
  createGuessLetters();
  checker();
}

let playerOneName;
let playerTwoName;

// a
function createForm1() {
  document.querySelector(".chose-player").remove();

  let div = document.createElement("div");
  let input1 = document.createElement("input");
  let btn = document.createElement("button");

  div.className = "div";
  input1.className = "input";
  btn.className = "btn";
  btn.textContent = "Submit";
  input1.setAttribute("type", "text");

  div.appendChild(input1);
  div.appendChild(btn);
  document.body.appendChild(div);

  let clickCount = 0;

  btn.addEventListener("click", () => {
    playerOneName = input1.value;
    clickCount++;
    if (clickCount === 1) {
      player1.innerHTML = `${
        playerOneName || "Player One"
      }: <span>${playerOneScore}</span>`;
    }
    div.remove();
  });
}

function createForm2() {
  document.querySelector(".chose-player").remove();

  let div = document.createElement("div");
  let input1 = document.createElement("input");
  let input2 = document.createElement("input");
  let btn = document.createElement("button");

  div.className = "div";
  input1.className = "input";
  input2.className = "input";
  btn.className = "btn";
  btn.textContent = "Submit";
  input1.setAttribute("type", "text");
  input2.setAttribute("type", "text");

  div.appendChild(input1);
  div.appendChild(btn);
  document.body.appendChild(div);

  let clickCount = 0;

  btn.addEventListener("click", () => {
    playerOneName = input1.value;
    clickCount++;
    if (clickCount === 1) {
      player1.innerHTML = `${
        playerOneName || "Player One"
      }: <span>${playerOneScore}</span>`;
    }

    div.appendChild(input2);
    if (clickCount === 2) {
      playerTwoName = input2.value;
      player2.innerHTML = `${
        playerTwoName || "Player Two"
      }: <span>${playerOneScore}</span>`;
      div.remove();
    }
  });
}

function howWin() {
  document.getElementById("win").play();
  showLettersDiv.classList.add("show");

  if (playerOneScore > playerTwoScore) {
    endGame(playerOneName, playerTwoName);
  } else if (playerOneScore < playerTwoScore) {
    endGame(playerTwoName, playerOneName);
  } else {
    endGame();
  }
}

// End Game Function
function endGame(theWinner, theLoser) {
  lettersContainer.classList.add("finished");

  // Create Popup Div
  let div = document.createElement("div");

  let divText;

  if (playerOneScore === playerTwoScore) {
    // Create Text
    divText = document.createTextNode(`No One Win Your Both Tie`);
  } else {
    // Create Text
    divText = document.createTextNode(
      `Nice Try ${String(theLoser).toUpperCase()}, But The Winner Is ${String(
        theWinner
      ).toUpperCase()}`
    );
  }

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);
}

// End Game Function
function endGame2() {
  showLettersDiv.classList.add("show");

  // Create Popup Div
  let div = document.createElement("div");

  let divText;

  if (playerOneScore === 3) {
    // Create Text
    divText = document.createTextNode(`you win good`);
    document.getElementById("win").play();
  } else if (playerOneScore === 2) {
    divText = document.createTextNode(`you win nice`);
    document.getElementById("win").play();
  } else if (playerOneScore === 1) {
    divText = document.createTextNode(`you lose but not bad`);
    document.getElementById("lose").play();
  } else if (playerOneScore === 0) {
    divText = document.createTextNode(`you lose so bad`);
    document.getElementById("lose").play();
  }

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);
}

document.querySelector(".play-again").onclick = () => location.reload();
