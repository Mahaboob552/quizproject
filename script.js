const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: "Pacific Ocean"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correct: "Leonardo da Vinci"
    },
    {
        question: "What is the smallest continent?",
        options: ["Asia", "Australia", "Africa", "Europe"],
        correct: "Australia"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionTitle = document.querySelector('.question-title');
const optionsList = document.querySelector('.options');
const nextBtn = document.querySelector('.next-btn');
const previousBtn = document.querySelector('.previous-btn');
const retryBtn = document.querySelector('.retry-btn');
const resultContainer = document.querySelector('.result-container');
const resultText = document.querySelector('.result-text');

// Load the question and options
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    optionsList.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('li');
        optionElement.textContent = option;
        optionElement.classList.add('option');
        optionsList.appendChild(optionElement);

        optionElement.addEventListener('click', () => handleAnswer(optionElement, option));
    });
}

// Handle the answer selection
function handleAnswer(optionElement, selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    // Disable all options after selection
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(opt => opt.style.pointerEvents = 'none');

    // Check if the selected option is correct
    if (selectedOption === currentQuestion.correct) {
        optionElement.classList.add('correct');
        score++;
    } else {
        optionElement.classList.add('incorrect');
    }

    // Disable the buttons and show result
    nextBtn.disabled = false;
}

// Go to the next question
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextBtn.disabled = true; // Disable next button until the answer is selected
    } else {
        showFinalScore();
    }
});

// Go to the previous question
previousBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        nextBtn.disabled = true; // Disable next button until the answer is selected
    }
});

// Retry the quiz
retryBtn.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    loadQuestion();
    resultContainer.classList.remove('show');
    nextBtn.disabled = true;
});

// Show the final score at the end
function showFinalScore() {
    resultText.textContent = `Quiz Over! Your score is ${score} out of ${questions.length}.`;
    resultContainer.classList.add('show');
    nextBtn.disabled = true;
    retryBtn.style.display = 'block';
}

// Initial setup
loadQuestion();
nextBtn.disabled = true; // Disable next button until an answer is selected
