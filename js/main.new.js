let questions = [];
let questionBar = document.querySelector("p.question");
let options = document.querySelectorAll("p.option");
let controlButton = document.querySelectorAll(".columns button");
let currentQuestion = 1;
let score = 0;





const clearScreen = () => {
  questionBar.textContent = "";
  options.forEach((v) => {
    v.textContent = ""
  })
}

const getQuestion = () => {
  fetch("https://opentdb.com/api.php?amount=1").then((res) => {
    return res.json();
  }).then((data) => {
    // console.log(data.results);
    questions[questions.length] = data.results;
    questions = questions.flat();
  }).finally(() => {
    questionBar.innerHTML = questions[questions.length - 1].question;
    options[0].innerHTML = questions[questions.length - 1].correct_answer

    for (let i = 0; i < questions[questions.length - 1].incorrect_answers.length; i++) {
      options[i + 1].innerHTML = questions[questions.length - 1].incorrect_answers[i];
    }
  })
}

const previousQuestion = () => {
  --currentQuestion;
  score -= 1;
  console.log(currentQuestion)
  questionBar.innerHTML = questions[currentQuestion].question;
  document.querySelector("p.progress").textContent = `${currentQuestion} / 20`;

  questionBar.innerHTML = questions[currentQuestion].question;
  document.querySelector("p.point").textContent = `${score} point(s)`;


  for (let i = 0; i < questions[currentQuestion].incorrect_answers.length; i++) {
    options[i + 1].innerHTML = questions[currentQuestion].incorrect_answers[i];
  }

}

getQuestion();

for (const option of options) {
  option.onclick = () => {
    clearScreen();
    ++currentQuestion;
    document.querySelector("p.progress").textContent = `${currentQuestion} / 20`;
    getQuestion();

  }
}

options[0].onclick = () => {
  clearScreen();
  ++currentQuestion;
  ++score;
  document.querySelector("p.progress").textContent = `${currentQuestion} / 20`;
  document.querySelector("p.point").textContent = `${score} point(s)`;
  getQuestion();
}

controlButton[0].addEventListener("click", () => {
  clearScreen();
  previousQuestion();

})