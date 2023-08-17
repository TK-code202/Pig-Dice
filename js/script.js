
$(document).ready(function () {
  // Selecting elements
  const player0 = document.querySelector(".player--0");
  const player1 = document.querySelector(".player--1");
  const score0 = document.getElementById("score--0");
  const score1 = document.getElementById("score--1");
  const current0 = document.getElementById("current--0");
  const current1 = document.getElementById("current--1");

  const diceImg = document.querySelector(".dice");
  const btnRoll = document.querySelector(".roll-btn");
  const btnHold = document.querySelector(".hold-btn");
  const statement = document.getElementById("statement");
        

  let scores, currentScore, activePlayer, playing;


  const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0; 
    if (activePlayer === 0) {
      activePlayer = 1;
    } else {
      activePlayer = 0;
    }
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
  };

  // Rolling dice functionality
  btnRoll.addEventListener("click", function () {
    if (playing) {
      // Generating a random dice roll
      const dice = Math.floor(Math.random() * 6) + 1;

      // Display dice
      diceImg.src = `./img/dice-${dice}.png`;

      // Check for rolled 1
      if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        // Switch to next player
        switchPlayer();
      }
    }
  });

  
// Hold Button functionality
  btnHold.addEventListener("click", function () {
    if (playing) {
      // Add current score to active player's score
      scores[activePlayer] += currentScore;
      // scores[1] = scores[1] + currentScore

      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      // Check if player's score is >= 100
      if (scores[activePlayer] >= 100) {
        // Finish the game
        playing = false;

        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove("player--active");

          if (activePlayer === 0) {
            statement.textContent = "Player 1 is the winner";
          } else {
            statement.textContent = "Player 2 is the winner";
          }
      } else {
        //Switch to the next player
        switchPlayer();
      }
    }
  });

  // Starting conditions
  //Start Game Functionality
  const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    statement.textContent = null;

    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
  };
  init();

  //New Game
  $(".btn--new").click(function () {
    init();
  });
});
