// ================================
// 1. QUIZ QUESTIONS
// ================================

const questions = [
    {
        question: "What is the capital of Pakistan?",
        options: {
            A: "Lahore",
            B: "Islamabad",
            C: "Karachi",
            D: "Peshawar"
        },
        answer: "B"
    },
    {
        question: "Which language is used to style web pages?",
        options: {
            A: "HTML",
            B: "Python",
            C: "CSS",
            D: "Java"
        },
        answer: "C"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: {
            A: "let",
            B: "style",
            C: "design",
            D: "page"
        },
        answer: "A"
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        options: {
            A: "<p>",
            B: "<img>",
            C: "<h1>",
            D: "<a>"
        },
        answer: "D"
    },
    {
        question: "Which company developed JavaScript's original implementation?",
        options: {
            A: "Microsoft",
            B: "Netscape",
            C: "Google",
            D: "Apple"
        },
        answer: "B"
    }
];


// ================================
// 2. SELECT HTML ELEMENTS
// ================================

const questionElement = document.getElementById("question");
const answerInputs = document.querySelectorAll(".answer-input");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");


// ================================
// 3. QUIZ VARIABLES
// ================================

let currentQuestion = 0;
let score = 0;
let submitted = false;

const selectedAnswers = {};


// ================================
// 4. DISPLAY QUESTION
// ================================

function loadQuestion() {
    const current = questions[currentQuestion];

    questionElement.textContent =
        `Question ${currentQuestion + 1}: ${current.question}`;

    // Display answer options
    answerInputs.forEach((input) => {
        const option = input.value;

        document.getElementById(`option-${option}`).textContent =
            current.options[option];

        // Restore previously selected answer
        input.checked = selectedAnswers[currentQuestion] === option;
    });
    // update button states
    backBtn.Disabled=currentQuestion===0;
    nextBtn.Disabled=currentQuestion===questions.length-1;
}

// ================================
// 5. SAVE SELECTED ANSWER
// ================================

answerInputs.forEach((input) => {
    input.addEventListener("change", () => {
        selectedAnswers[currentQuestion] = input.value;
    });
});


// ================================
// 6. NEXT QUESTION
// ================================

nextBtn.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
});


// ================================
// 7. PREVIOUS QUESTION
// ================================

backBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});


// ================================
// 8. SUBMIT QUIZ
// ================================

submitBtn.addEventListener("click", () => {
    if (submitted) return;

    // Check whether every question has been answered
    const unanswered = questions.some(
        (_, index) => selectedAnswers[index] === undefined
    );

    if (unanswered) {
        alert("Please answer all questions before submitting!");
        return;
    }

    // Calculate score
    score = 0;

    questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.answer) {
            score++;
        }
    });

    submitted = true;

    // Display final result
    questionElement.textContent =
        `Quiz Completed! Your Score: ${score}/${questions.length}`;

    document.getElementById("answer-list").style.display = "none";

    backBtn.disabled = true;
    nextBtn.disabled = true;
    submitBtn.disabled = true;

    alert(
        `Quiz Completed!\nYour Score: ${score}/${questions.length}`
    );
});


// ================================
// 9. START QUIZ
// ================================

loadQuestion();