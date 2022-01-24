"use strict";
const game = () => {
    let pScore = 0;
    let cScore = 0;
    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");
        if (!playBtn || !introScreen || !match)
            throw new Error('Html component not found');
        playBtn.addEventListener("click", () => {
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };
    const playMatch = () => {
        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img");
        if (!playerHand || !computerHand)
            throw new Error('Player or Computer hand element not found');
        hands.forEach(hand => {
            hand.addEventListener("animationend", function () {
                hand.style.animation = "";
            });
        });
        const computerOptions = ["rock", "paper", "scissors"];
        options.forEach(option => {
            option.addEventListener("click", function () {
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];
                setTimeout(() => {
                    compareHands(option.textContent, computerChoice);
                    playerHand.src = `./assets/${option.textContent}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;
                }, 2000);
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";
            });
        });
    };
    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        if (!playerScore || !computerScore)
            throw new Error('Player or Computer Score components not found');
        playerScore.textContent = String(pScore);
        computerScore.textContent = String(cScore);
    };
    const compareHands = (playerChoice, computerChoice) => {
        const winner = document.querySelector(".winner");
        if (!winner)
            throw new Error('Winner component not found');
        if (playerChoice === computerChoice) {
            winner.textContent = "It is a tie";
            return;
        }
        if (playerChoice === "rock") {
            if (computerChoice === "scissors") {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
            else {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
        }
        if (playerChoice === "paper") {
            if (computerChoice === "scissors") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
            else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }
        if (playerChoice === "scissors") {
            if (computerChoice === "rock") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
            else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }
    };
    startGame();
    playMatch();
};
game();
//# sourceMappingURL=app.js.map