
let playerName = "שחקן"; // Default player name
let score = 0;





function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeGame(language='en-US') {
    debugger
    if (!words || !Array.isArray(words)) return;

    const wordContainer = document.getElementById('wordContainer');
    const translationContainer = document.getElementById('translationContainer');
    wordContainer.innerHTML = '';
    translationContainer.innerHTML = '';
    updateScore(0); // Reset score at game start

    const shuffledWords = shuffleArray([...words]);
    const shuffledTranslations = shuffleArray([...words]);

    function speakText(text) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language; // Set the language
        synth.speak(utterance);
    }

    let speakTimeout; // Declare a variable to hold the timeout

    shuffledWords.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        wordDiv.textContent = word.text;
        wordDiv.draggable = true;

        // Existing event listener for drag start
        wordDiv.addEventListener('dragstart', dragStart);

        // Modified event listener for mouse enter
        wordDiv.addEventListener('mouseenter', function () {
            // Set a timeout to speak the word after 1 second
            speakTimeout = setTimeout(function () {
                speakText(wordDiv.textContent);
            }, 1000); // 1000 milliseconds delay
        });

        // Add event listener for mouse leave
        wordDiv.addEventListener('mouseleave', function () {
            // Clear the timeout if the user leaves the word before 1 second
            clearTimeout(speakTimeout);
        });

        wordContainer.appendChild(wordDiv);
    });



    shuffledTranslations.forEach(word => {
        const translationDiv = document.createElement('div');
        translationDiv.className = 'translation';
        translationDiv.textContent = word.translation;
        translationDiv.addEventListener('dragover', dragOver);
        translationDiv.addEventListener('drop', drop);
        translationContainer.appendChild(translationDiv);
    });
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.textContent);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const draggedText = event.dataTransfer.getData("text");
    if (words.some(word => word.text === draggedText && word.translation === event.target.textContent)) {
        event.target.classList.add("correct");
        event.target.style.backgroundColor = 'lightgreen';
        document.querySelectorAll('.word').forEach(wordDiv => {
            if (wordDiv.textContent === draggedText) {
                wordDiv.style.opacity = "0.5";
            }
        });
        updateScore(score + 1);
        showMessage(true);
        if (score === words.length) {
            document.getElementById('statusMessage').textContent = "המשחק הסתיים בהצלחה!";
            startConfetti();
        }
    } else {
        showMessage(false);
    }
}

function showMessage(isCorrect) {
    const messageDiv = document.getElementById('statusMessage');
    messageDiv.textContent = isCorrect ? `  כל הכבוד!` : `  זה היה קרוב!`;
    setTimeout(() => messageDiv.textContent = '', 3000);
}

function updateName() {
    playerName = document.getElementById('nameInput').value.trim() || "שחקן";
}

function updateScore(newScore) {
    score = newScore;
    document.getElementById('scoreDisplay').textContent = `נקודות: ${score}`;
}

function startConfetti() {
    const confettiCount = 100;
    const confettiElement = document.createElement('div');
    document.body.appendChild(confettiElement);

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random animation duration between 1s to 3s
        confetti.style.opacity = Math.random(); // Random opacity for each confetti
        confetti.style.top = `${-Math.random() * 20}px`; // Start from above the screen
        confettiElement.appendChild(confetti);
    }

    setTimeout(() => confettiElement.remove(), 3000); // Remove confetti after 3 seconds
}

// Call startConfetti when the game ends successfully
// For demonstration, you can call it on document load
document.addEventListener('DOMContentLoaded', startConfetti);

// initializeGame();

