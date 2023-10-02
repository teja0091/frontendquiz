const quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
        answer: 'Mars'
    },
    {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4'
    },
    {
        question: 'What is the largest mammal on Earth?',
        options: ['Elephant', 'Giraffe', 'Blue Whale', 'Kangaroo'],
        answer: 'Blue Whale'
    },
    {
        question: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        answer: 'Carbon Dioxide'
    }
];

let score = 0;

const quizForm = document.getElementById('quiz-form');
const submitButton = document.getElementById('submit-button');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const questionsContainer = document.getElementById('questions-container');

function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestions() {
    // Shuffle the quizData array
    shuffleArray(quizData);

    const questionsHTML = quizData.map((data, index) => {
        const optionsHTML = data.options.map((option, optionIndex) => {
            return `<label>
                        <input type="radio" name="answer-${index}" value="${option}"> ${String.fromCharCode(97 + optionIndex)}) ${option}
                    </label>`;
        }).join('');

        return `<div>
                    <h2>Question ${index + 1}: ${data.question}</h2>
                    ${optionsHTML}
                </div>`;
    }).join('');

    questionsContainer.innerHTML = questionsHTML;
}

function calculateScore() {
    let totalCorrect = 0;

    quizData.forEach((data, index) => {
        const selectedAnswer = document.querySelector(`input[name="answer-${index}"]:checked`);
        if (selectedAnswer) {
            const userAnswer = selectedAnswer.value;
            if (userAnswer === data.answer) {
                totalCorrect++;
            }
        }
    });

    score = totalCorrect;
    resultContainer.style.display = 'block';
    scoreElement.textContent = `Your Score: ${score} / ${quizData.length}`;
}

function restartQuiz() {
    score = 0;
    resultContainer.style.display = 'none';
    displayQuestions();
}

submitButton.addEventListener('click', calculateScore);
restartButton.addEventListener('click', restartQuiz);

displayQuestions();
