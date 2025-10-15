// Game variables
let targetNumber;
let attempts;
let gameOver;
let guessHistory;

// DOM elements
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');
const resultDiv = document.getElementById('result');
const attemptsDiv = document.getElementById('attempts');
const guessHistoryDiv = document.getElementById('guessHistory');

// Initialize the game
function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;
    guessHistory = [];
    
    // Reset UI
    guessInput.value = '';
    resultDiv.textContent = '';
    resultDiv.className = 'result';
    attemptsDiv.textContent = 'Attempts: 0';
    guessHistoryDiv.innerHTML = '';
    
    // Enable input and button
    guessInput.disabled = false;
    submitBtn.disabled = false;
    
    // Focus on input
    guessInput.focus();
    
    console.log('Target number:', targetNumber); // For debugging
}

// Check the user's guess
function checkGuess() {
    if (gameOver) return;
    
    const userGuess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        resultDiv.textContent = 'Please enter a valid number between 1 and 100.';
        resultDiv.className = 'result error';
        return;
    }
    
    // Increment attempts
    attempts++;
    attemptsDiv.textContent = `Attempts: ${attempts}`;
    
    // Add to history
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = `#${attempts}: ${userGuess}`;
    guessHistoryDiv.appendChild(historyItem);
    
    // Scroll to bottom of history
    guessHistoryDiv.scrollTop = guessHistoryDiv.scrollHeight;
    
    // Check if guess is correct
    if (userGuess === targetNumber) {
        resultDiv.textContent = `🎉 Congratulations! You guessed the number in ${attempts} attempts!`;
        resultDiv.className = 'result success';
        gameOver = true;
        guessInput.disabled = true;
        submitBtn.disabled = true;
    } else {
        // Provide hint
        const difference = Math.abs(targetNumber - userGuess);
        let hint = '';
        
        if (difference <= 5) {
            hint = 'Very hot!';
        } else if (difference <= 10) {
            hint = 'Hot!';
        } else if (difference <= 20) {
            hint = 'Warm';
        } else if (difference <= 30) {
            hint = 'Cold';
        } else {
            hint = 'Very cold';
        }
        
        if (userGuess < targetNumber) {
            resultDiv.textContent = `Too low! ${hint}`;
        } else {
            resultDiv.textContent = `Too high! ${hint}`;
        }
        
        resultDiv.className = 'result info';
    }
    
    // Clear input and focus
    guessInput.value = '';
    guessInput.focus();
}

// Event listeners
submitBtn.addEventListener('click', checkGuess);

restartBtn.addEventListener('click', initGame);

guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Initialize the game when page loads
window.addEventListener('load', initGame);