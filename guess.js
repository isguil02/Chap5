"use strict";
/**
 * ============================================================================
 * PROGRAM: Number Guessing Game
 * 
 * SUMMARY:
 * An number guessing game where the user attempts to guess a 
 * randomly generated number between 1 and 100 the game provides feedback 
 * based on how close the guess is to the target number (Hot/Cold/Freezing).
 * The application tracks the number of tries, prevents duplicate guesses,
 * and maintains a best score record.
 * 
 * AUTHOR: Isaiah Guilliatt
 * DATE: 2/26/2026
 * GITHUB REPOSITORY:https://github.com/isguil02/Chap5
 * 
 * FEATURES:
 * - Random number generation between 1 and 100
 * - feedback system (Hot/Warm/Cold/Freezing)
 * - Duplicate guess prevention
 * - Try counter and best score tracking
 * - Guess history display
 * - Enter key support for quick submissions
 * - Input validation for numbers 1-100
 * ============================================================================
 */
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
    color = "black"; // default color for messages
    if (isNaN(guess)) {
        message = "Not a valid number. Please enter a valid number.";
    } else if (guess < 1 || guess > 100) {
        message = "Invalid number. Enter a number between 1 and 100.";        
    } else if (lastWord == "w") {
                message = "You already won! Click \"Play Again\" or enter to start a new game."
            } else if (guess === lastWord) {
                message = "You already guessed that number! Try a different one.";
            } else { 
                tries++;
        switch (true) {
            case distance === 0:
                lastWord = (tries === 1) ? "try" : "tries";
                message = `Fire! You guessed it in ${tries} ${lastWord}! Click "Play Again" or enter to start a new game.`;
                document.querySelector("#history").innerHTML += `You Guessed ${randomNum} (The correct answer) in ${tries} ${lastWord}!`; // add to history when guess is correct;
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
        if (distance !=0) {document.querySelector("#history").innerHTML += `Guess ${tries}: ${guess} - ${message} <br>`;}
    }
    document.querySelector("#message").textContent = message;
    lastWord = guess; // store so can check if made same guess twice
    document.querySelector("#number").value = ""; // clear input field
    document.querySelector("#message").style.color = color;
};


const playAgainClick = () => {
    randomNum = getRandomInt(100);
    console.log(randomNum);
    tries = 0;
    document.querySelector("#number").value = "";
    document.querySelector("#message").textContent = "New game started! Guess a number between 1 and 100.";
    document.querySelector("#history").textContent = "";
    lastWord = "try";
};
const updateBestScore = () => {
    if (best == 0 || tries < best) {
            best = tries;
            document.querySelector("#best_score").textContent = `${best} ${lastWord}`;
        }
};

/**const updateHistory = (message,guess) => {
    if (randomNum != guess) {
        document.querySelector("#history").innerHTML += `Guess ${tries}: ${guess} - ${message} <br>`;
    } else {
        document.querySelector("#history").textContent = ""; 
    }
};**/

document.addEventListener("DOMContentLoaded", () => {
    playAgainClick(); // initial a new game
    document.querySelector("#guess").addEventListener(
        "click", guessClick);
    document.querySelector("#play_again").addEventListener(
        "click", playAgainClick);
    
    document.querySelector("#number").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const guess = parseInt(document.querySelector("#number").value);
            if (lastWord === "w") {
                playAgainClick();
                lastWord = "try";
            } else if (randomNum === guess) {
            guessClick();
            lastWord = "w";
            } else {
                guessClick();
            }
        }
    });
});