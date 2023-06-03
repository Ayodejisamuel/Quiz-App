var minutes = 120;

let hour = minutes / 60;

var seconds = minutes * 60;

timerdiv = document.getElementById("time");

let countdownInterval = setInterval(function () {
  let minutesleft = Math.floor(seconds / 60) % 60;
  let secondsleft = seconds % 60;
  seconds--;

  if (secondsleft < 0) {
    secondsleft = "0" + secondsleft;
    timerdiv.style.color = "red";
  }

  timerdiv.innerHTML = minutesleft + " : " + secondsleft;

  if (seconds < 0) {
    clearInterval(countdownInterval);
    timerdiv.innerHTML = "Time Expired";
    timerdiv.style.color = "red";
  }
}, 1000);

countdownInterval;

function buildQuiz() {
  const output = [];

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (letters in currentQuestion.answers)
      answers.push(
        `<label>
               ${letters} <input type="radio" name="question${questionNumber}" value="${letters}">
         ${currentQuestion.answers[letters]}</label>`
      );

    output.push(`
    <div class="slide">
    <div class="question">${currentQuestion.question}</div>
    <hr class="line">
    <div class="answers">${answers.join("")}</div>
    </div>`);
  });
  quizContainer.innerHTML = output.join("");
}
 
function showResult() {
  const answerContainers = quizContainer.querySelectorAll(".answers");

  let numCorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
   
    const correctOption = answerContainer.querySelector(`input[value=${currentQuestion.correctAnswer}]`)

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;

    }

    const options = answerContainer.querySelectorAll("input[type=radio]")

options.forEach(option => {
  const optionLabel = option.parentElement;
  optionLabel.style.color = (option.value === currentQuestion.correctAnswer) ? "lightgreen" : "red"
  if(option.checked) {
   optionLabel.style.fontWeight = "bold"
  }

})
  });

  resultsContainer.innerHTML = ` Result : ${Math.round(
    ((numCorrect * 10) / myQuestions.length) * 10
  ).toFixed(2)}% `;
}

function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

function next() {
  showSlide(currentSlide + 1);
}

function previous() {
  showSlide(currentSlide - 1);
}

// declear our variable

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");

buildQuiz();
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

showSlide(currentSlide);

// event listener

// let competeScore = showResult();

previousButton.addEventListener("click", previous);
nextButton.addEventListener("click", next);

submitButton.addEventListener("click", () => {
  swal({
    title: "Are you sure ?",
    text: "Once Submitted, you will not be able to return back!",
    icon: "warning",
    buttons: true,
    buttons: ["Back To Quiz", "Submit Quiz"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Successful! Your result has been saved!", {
        icon: "success",
        results: showResult(),
        result: showSlide(0),
      });
    } else {
      swal(previous());
    }
  });
});
