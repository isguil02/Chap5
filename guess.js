"use strict";

// global variables 
let randomNum = 0;
let tries = 0;
let best = 0;
let color = "black";
let lastWord = "try";


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
    if (isNaN(guess)) {
        message = "Not a valid number. Please enter a valid number.";
    } else if (guess < 1 || guess > 100) {
        message = "Invalid number. Enter a number between 1 and 100.";        
    } else {
        if (guess === lastWord) {
            if (guess === randomNum) {
            message = "You won! Start a new game to play again.";
            } else {
            message = "You already guessed that number! Try a different one.";
            }
        } else { tries++;
        switch (true) {
            case distance === 0:
                lastWord = (tries === 1) ? "try" : "tries";
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
        updateHistory(message,guess);
    }
        document.querySelector("#message").style.color = color;
        
    }
    document.querySelector("#message").textContent = message;
    color = "black"; // reset color for next guess
    lastWord = guess; // store so can check if made same guess twice
};


const playAgainClick = () => {
    randomNum = getRandomInt(100);
    tries = 0;
    document.querySelector("#number").value = "";
    document.querySelector("#message").textContent = "";
};
const updateBestScore = () => {
    if (best == 0 || tries < best) {
            best = tries;
            document.querySelector("#best_score").textContent = `${best} ${lastWord}`;
        }
};

const updateHistory = (message,guess) => {
    if (randomNum != guess) {
        document.querySelector("#history").innerHTML += `Guess ${tries}: ${guess} - ${message} <br>`;
    } else {
        document.querySelector("#history").textContent = ""; 
    }
};

document.addEventListener("DOMContentLoaded", () => {
    playAgainClick(); // initial a new game

    document.querySelector("#guess").addEventListener(
        "click", guessClick);
    document.querySelector("#play_again").addEventListener(
        "click", playAgainClick);
    
    document.querySelector("#number").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            console.log(guess);
            if (randomNum == guess) {
            playAgainClick();
            document.querySelector("#message").textContent = "New game started! Guess a number between 1 and 100.";
            } else {
                guessClick();
                console.log("hi");
            }
        }
    });
});