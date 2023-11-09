const questions = [
  {
    question: "What is the color of the sky?",
    answers: [
      { text: "Blue", correct: false },
      { text: "Yellow", correct: false },
      { text: "Black", correct: true },
      { text: "Clear", correct: false },
    ],
  },
  {
    question: "What is the color of the Ocean?",
    answers: [
      { text: "Blue", correct: false },
      { text: "Yellow", correct: false },
      { text: "Black", correct: false },
      { text: "Clear", correct: true },
    ],
  },
  {
    question: "What is the color of the moon?",
    answers: [
      { text: "White", correct: false },
      { text: "Bright", correct: false },
      { text: "Grey", correct: true },
      { text: "Black", correct: false },
    ],
  },
];

const questionElement = $("#question");
const answerButtons = $("#answer_btns");
const nextButton = $("#next_btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.html("Next");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.html(questionNo + ". " + currentQuestion.question);

  currentQuestion.answers.forEach((answer) => {
    const button = $("<button>").html(answer.text).addClass("btn");
    answerButtons.append(button);
    if (answer.correct) {
      button.attr("data-correct", answer.correct);
    }
    button.on("click", selectAnswer);
  });
}

function resetState() {
  nextButton.hide();
  answerButtons.empty();
}

function selectAnswer(e) {
  const selectBtn = $(e.target);
  const isCorrect = selectBtn.data("correct") === true;
  if (isCorrect) {
    selectBtn.addClass("correct");
    score++;
  } else {
    selectBtn.addClass("incorrect");
  }
  answerButtons.children().each((index, button) => {
    if ($(button).data("correct") === true) {
      $(button).addClass("correct");
    }
    $(button).prop("disabled", true);
  });
  nextButton.show();
}

function showScore() {
  resetState();
  questionElement.html(`you scored ${score} out of ${questions.length}!`);
  nextButton.html("Play Again");
  nextButton.show();
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.on("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
