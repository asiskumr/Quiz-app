
const questions = [
    {
        question: 'Number of primitive data types in Java are?',
        options: [{ option: 6, answer: false },
        { option: 7, answer: false },
        { option: 8, answer: true },
        { option: 9, answer: false }
        ]
    },
    {
        question: 'What is the size of float and double in java?',
        options: [{ option: '32 and 64', answer: true },
        { option: '32 and 32', answer: false },
        { option: '64 and 64', answer: false },
        { option: '64 and 32', answer: false }
        ]
    },
    {
        question: 'Automatic type conversion is possible in which of the possible cases?',
        options: [{ option: 'Byte to int', answer: false },
        { option: 'Long to int', answer: false },
        { option: 'int to long', answer: true },
        { option: 'Short t int', answer: false }
        ]
    },
    {
        question: 'Select the valid statement.',
        options: [{ option: 'char[] ch = new char(5)', answer: false },
        { option: 'char[] ch = new char()', answer: false },
        { option: 'char[] ch = new char[]', answer: false },
        { option: 'char[] ch = new char[5]', answer: true }
        ]
    }

]

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById("next-btn");
const lastQuestion = questions.length;
// let questionNumber = 0;
// let score = 0;

function startQuiz() {
    questionNumber = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetStateOfQuestion();
    console.log("questionNumber "+questionNumber)
    let serialNo = questionNumber + 1;
    console.log("serialNo "+serialNo)
    let currentQuestion = questions[questionNumber]
    questionElement.innerHTML = serialNo + ". " + currentQuestion.question;
    console.log(questionElement.innerHTML);
    currentQuestion.options.forEach((para) => {
        let optionButton = document.createElement('BUTTON');
        optionButton.innerText = para.option;
        optionButton.classList.add("btn");
        answerButtons.appendChild(optionButton);

        if (para.answer) {
            //Refer this to learn it again about dataset(data-*)
            //https://www.w3schools.com/tags/att_data-.asp#:~:text=The%20data%2D*%20attribute%20gives,server%2Dside%20database%20queries).
            optionButton.dataset.correct = para.answer; // creating DOMStringMap-> {correct: true}
        }
        optionButton.addEventListener("click", selectedAnswer);
    })
   
}
function selectedAnswer(e) {
    let selectedBtn = e.target;  //  <button class="btn" data-correct="true">Option 1</button>
    let isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("Right");  //  <button class="btn Right" data-correct="true">Option 1</button>
        score++;

    } else {                          //  <button class="btn">Option 2</button>
        selectedBtn.classList.add("Wrong");  //  <button class="btn Wrong">Option 2</button>
       
    }
     console.log(selectedBtn);

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("Right");
        }
        button.disabled = true;
    });
    // console.log(selectedBtn);

    nextBtn.style.display = "block";

}
nextBtn.addEventListener("click", () => {
    console.log("click happend " )
    if( questionNumber <  questions.length){
        // console.log("Handle next btn: ")
        // console.log( questionNumber < Questions.length);
        handleNextButton();
    }else{
         console.log("start quiz: ");
        // console.log( questionNumber < Questions.length);
        startQuiz();
    }
    
});
function showScore(){
    resetStateOfQuestion();
    questionElement.innerHTML = `You scored ${score}/${questions.length}.`
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
  
    
}
function handleNextButton(){
    // console.log("question number: "+ questionNumber);
    questionNumber++;
    if( questionNumber < questions.length){
        // console.log("show ques: ");
        // console.log( questionNumber < Questions.length);
        showQuestion();
    }else{
         console.log("show score: ");
        // console.log( questionNumber < Questions.length);
        showScore();
      
    }
}
function resetStateOfQuestion() {
    nextBtn.style.display = 'none'
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}
startQuiz();