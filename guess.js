"use strict";

// global variables 
let randomNum = 0;
let tries = 0;
let best = 0;
let color = "black";

// helper function
const getRandomInt = (max = 1000) => {
    let num = Math.random() * max;  // get a random number between 0 and max
    num = Math.floor(num)+1;        // round down to nearest integer
    return num;
};

// event handler functions
const guessClick = () => {
    const guess = parseInt(document.querySelector("#number").value);
    let message = "";
    const distance = Math.abs(guess - randomNum);
    tries++;
    if (isNaN(guess)) {
        message = "Not a valid number. Please enter a valid number.";
    } else if (guess < 1 || guess > 100) {
        message = "Invalid number. Enter a number between 1 and 100.";        
    } else {
        switch (true) {
            case distance === 0:
                const lastWord = (tries === 1) ? "try" : "tries";
                message = `Fire! You guessed it in ${tries} ${lastWord}!`;
                color = "green";
                updateBestScore();
                break;
            case distance <= 5:
                message = "Hot! (Within 5)";
                color = "red";
                break;
            case distance <= 10:
                message = "Warm! (Within 10)";
                color = "orangered";
                break;
            case distance <= 20:
                message = "Warm! (Within 20)";
                color = "orange";
                break;
            case distance <= 30:
                message = "Cold! (Within 30)";
                color = "lightblue";
                break;
            case distance <= 40:
                message = "Colder! (Within 40)";
                color = "blue";
                break;
            default:
                message = "Freezing! (Way off)";
                color = "darkblue";
        }
    }
    document.querySelector("#message").style.color = color;
    document.querySelector("#message").textContent = message;
};


const playAgainClick = () => {
    randomNum = getRandomInt(10);
    tries = 0;
    document.querySelector("#number").value = "";
    document.querySelector("#message").textContent = "";
};
const updateBestScore = () => {
    if (best == 0 || tries < best) {
            best = tries;
            document.querySelector("#best_score").textContent = `${best} tries`;
        }
};

document.addEventListener("DOMContentLoaded", () => {
    playAgainClick(); // initial a new game

    document.querySelector("#guess").addEventListener(
        "click", guessClick);
    document.querySelector("#play_again").addEventListener(
        "click", playAgainClick);
});