//Model
const app = document.getElementById("app");

const questionCard = [
  {
    questionID: "001",
    question: "Here is a question. What is the answer?",
    answer: "This is the answer to the question.",
  },
  {
    questionID: "002",
    question: "Here is another question. What is the answer?",
    answer: "This is the answer to the question.",
  },
];

//View

function updateView()
{
  app.innerHTML = /*HTML*/ `
    <div class="questionCard">${showQuestion()}</div>
    <div class="answerArea"><input type="text"></div>
    `;
}

updateView();

//Controller

function showQuestion() {}
