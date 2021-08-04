let questions = [];
let questionBar = document.querySelector("p.question");
let options = document.querySelectorAll("p.option");
let currentQuestion = 1;
let scrore = 0;

const removeArrayItem = (i, arr) => {
  let newArr = [];

  for (let index = 0; index < arr.length; index++) {
    if (index === i) {

    } else {
      newArr[newArr.length] = arr[i];
    }
  }
  return newArr
}



const getQuestion = () => {
  let randomQuestionNumber = Math.floor(Math.random() * questionsBase.length)

  questions[questions.length] = questionsBase[randomQuestionNumber];
  questionsBase = removeArrayItem(randomQuestionNumber, questionsBase);

  // return randomQuestionNumber;

}

const clearScreen = () => {
  questionBar.textContent = "";
  options.forEach((v) => {
    v.textContent = ""
  })
}

const nextQuestion = () => {

  let quest = "";
  quest = questions[questions.length - 1].question;
  quest = quest.replaceAll('&eacute;', 'é');
  quest = quest.replaceAll('&quot;', '"');
  quest = quest.replaceAll("&#039;", "'");

  questionBar.textContent = quest;

  options[0].textContent = questions[questions.length - 1].correct_answer

  for (let i = 0; i < questions[questions.length - 1].incorrect_answers.length; i++) {
    options[i + 1].innerHTML = questions[questions.length - 1].incorrect_answers[i];
  }
}

const nextQuestion2 = (questNumber) => {}

fetch("https://opentdb.com/api.php?amount=1").then((res) => {
  return res.json();
}).then((data => {
  questionsBase = data.results;
})).catch((e) => {
  console.error(e);
}).then(() => {
  getQuestion();
  let quest = "";
  quest = questions[questions.length - 1].question;
  quest = quest.replaceAll('&eacute;', 'é');
  quest = quest.replaceAll('&quot;', '"');
  quest = quest.replaceAll("&#039;", "'");
  questionBar.textContent = quest;

  options[0].textContent = questions[questions.length - 1].correct_answer

  for (let i = 0; i < questions[questions.length - 1].incorrect_answers.length; i++) {
    options[i + 1].textContent = questions[questions.length - 1].incorrect_answers[i];
  }
});

options.forEach((v) => {
  v.onclick = () => {
    clearScreen();
    getQuestion();
  }
})