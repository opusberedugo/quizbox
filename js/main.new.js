let questions = [];
let questionBar = document.querySelector("p.question");
let options = document.querySelectorAll("p.option");
let controlButtons = document.querySelectorAll(".columns button");
let currentQuestion = 1;
let score = 0;





const clearScreen = () => {
  questionBar.textContent = "";
  options.forEach((v) => {
    v.textContent = ""
    v.classList.remove("selected")
  })

}

const getQuestion = () => {
  fetch("https://opentdb.com/api.php?amount=1").then((res) => {
    return res.json();
  }).then((data) => {
    // console.log(data.results);
    questions[questions.length] = data.results;
    questions = questions.flat();
  }).catch((e) => {
    console.log(e);
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

const getClassListString = (element) => {
  let classListString = [];
  element.classList.forEach((v) => {
    classListString.push(v);
  })
  return classListString.join(" ");
}

getQuestion();

for (const option of options) {
  option.onclick = () => {
    options.forEach((v) => { v.classList.remove("selected") })
    option.classList.add("selected")
  }
}



controlButtons[0].addEventListener("click", () => {
  if (getClassListString(options[0]).includes("selected")) {
    score++;
  }
  clearScreen();
  previousQuestion();

})

controlButtons[2].addEventListener("click", () => {
  if (currentQuestion === questions.length) {
    if (getClassListString(options[0]).includes("selected")) {
      score += 1;
    }
    ++currentQuestion;
    document.querySelector("p.point").textContent = `${score} point(s)`;
    document.querySelector("p.progress").textContent = `${currentQuestion} / 5`;

    clearScreen();
    getQuestion();


  } else if (currentQuestion != questions.length) {
    ++currentQuestion;
    clearScreen();

    if (getClassListString(options[0]).includes("selected")) {
      score += 1;
    }

    questionBar.innerHTML = questions[currentQuestion].question;
    options[0].innerHTML = questions[currentQuestion].correct_answer

    for (let i = 0; i < questions[currentQuestion].incorrect_answers.length; i++) {
      options[i + 1].innerHTML = questions[currentQuestion].incorrect_answers[i];
    }

    document.querySelector("p.point").textContent = `${score} point(s)`;
    document.querySelector("p.progress").textContent = `${currentQuestion} / 20`;

  }

})


controlButtons[0].onclick = () => {

  if (currentQuestion === 1) {
    controlButtons[0].disabled = true
  } else {
    --currentQuestion;
    --score;
    clearScreen();
    questionBar.innerHTML = questions[currentQuestion].question;
    options[0].innerHTML = questions[currentQuestion].correct_answer

    for (let i = 0; i < questions[currentQuestion].incorrect_answers.length; i++) {
      options[i + 1].innerHTML = questions[currentQuestion].incorrect_answers[i];
    }
  }

}