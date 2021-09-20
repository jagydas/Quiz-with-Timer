// declare variable for storing time and score

var timeEl = document.querySelector("p.timer");
console.log("timeEL" + timeEl);
 var timeLeft = 60;
var scoreEl =document.querySelector("#score");
console.log("scoreEl" + scoreEl);

var introEl =document.querySelector("#intro");
console.log("introEl" + introEl);

// question section
var quizQsEl = document.querySelector("#quizQs");

//question stores
var questionsEl = document.querySelector("#question");

// question answer count

var questionAnsCount = 0;

//final section

var finalScoreEl = document.querySelector("#finalScore");

// correct ans check
  var finalcheckEl = document.querySelector("#finalcheckEl");
//user initials

var initialsEl =document.querySelector("#initials");

//higest score(

var highestScoreEl = document.querySelector("#highestScore");

//list of scroe

var scoreListEl = document.querySelector("#scoreList");

//array to score all  scores

var scoreArr = [];

// button selector

var quizBtnEl = document.querySelector("#start");

//answer button class

var ansBtnEl =document.querySelectorAll("button.ansBtn");
var ansBtn1El = document.querySelector("answer1");
var ansBtn2El = document.querySelector("answer2");
var ansBtn3El = document.querySelector("answer3");
var ansBtn4El = document.querySelector("answer4");

// submit-score
var submitScrBtn = document.querySelector("#submit-score");
// goback
var goBackBtn = document.querySelector("#goback");
// clearscores
var clearScrBtn = document.querySelector("#clearscores");

//view highest score

var viewscoreEl = document.querySelector("#view-score");

// decalre Question object
 //array of objects 
var questions = [{

    question:"Inside which HTML element do we put the JavaScript?",
    answers: ["1> <javascript>","2> <scripting>","3> <js>","4> <script>"],
    correctAnswer: "4"
},
{
 question:"Where is the correct place to insert a JavaScript?",
 answers:[" Both the <head> section and the <body> section are correct"," The <head> section", "The <body> section"],
 correctAnswer:" Both the <head> section and the <body> section are correct"

},

{
 question: "How can you add a comment in a JavaScript?",
 answers: ["This is a comment","//This is a comment","<!-- This is a comment -->"],
 correctAnswer: "<!-- This is a comment -->"

},
{
 question: "JavaScript is the same as Java.",
 answers: ["False","True"],
 correctAnswer : "True"
},

{
    question: "Which event occurs when the user clicks on an HTML element?",
    answers:["onclick","onmouseover", "onchange","onmouseclick"],
    correctAnswer:"onclick"
}
];

// Timer function
 function setTimer(){

    var timeInterval= setInterval(function(){

        timeLeft--;
        timeEl.textContent = `Time:${timeLeft}s`;
        if(timeLeft == 0 || questionAnsCount == questions.length){
            clearInterval(timeInterval);
            quizQsEl.style.display = "none";
            scoreEl.textContent = timeLeft;
            finalScoreEl.style.display ="block";
        }

    },1000);
 }

//start quiz with timer

function quizStart(){
    introEl.style.display ="none";
    quizQsEl.style.display = "block";
    questionAnsCount =0;
    setTimer();
    setQuestion(questionAnsCount);
}


// set qs,save the count and display next qs
    function setQuestion(id){
       if(id < questions.length){
        questionsEl.textContent = questions[id].question;
        ansBtn1El.textContent = questions[id].answer[0];
        ansBtn2El.textContent = questions[id].answer[1];
        ansBtn3El.textContent = questions[id].answer[2];
        ansBtn4El.textContent = questions[id].answers[3];

       }

    }


// function to check the answer and display next question
        function checkAns(event){
            event.preventDefault();
        

// append msg to div showing correct and wrong answer count
finalcheckEl.style.display = "block";
 var p =document.createElement("p");
 finalcheckEl.appendChild(p);

 //timout after 1sec

 setTimeout(function(){
    p.style.display ="none";

 },1000);

// answer check
 if(questions[questionAnsCount].correctAnswer == event.target.value){

    p.textContent ="Correct!";
 }
 else if (questions[questionAnsCount].correctAnswer != event.taget.value){
    timeLeft = timeLeft -10;
    p.textContent = "Wrong!";
 }
  //increment so question index is increased
  if(questionAnsCount < questions.length){
    questionAnsCount++;
  }
  // call setQuestion to bring in next question when any ansBtn is clicked
  setQuestion(questionAnsCount);


  }
 function addScore(event){
     event.preventDefault();
     finalScoreEl.style.display = "none";
    highestScoreEl.style.display = "block";

 var init = initialsEl.value.toUpperCase();
 scoreArr.push({initials:init,score : highestScoreEl});
 }
 //sorted score
 scoreArr = scoreArr.sort((a,b) =>{
     if(a.score < b.score){
         return 1;
     }else {
         return -1 ;
     }
 });

 scoreListEl.innerHTML = "";
 for(var i =0; i < scoreArr.length; i++){
  var li = document.createElement("li");
  li.textContent = `${scoreArr[i].initials}:``${scoreArr[i].score}`;
 scoreListEl.append(li);
   
 }

 // local storage
 storeScores();
 displayScores();

 function storeScores(){
     localStorage.setItem("scoreArr",JSON.stringify(scoreArr));
 }


 function displayScores() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    // update the scoreArr with retrieved scoreArr from local storage
     if(storedScoreList != null){
         scoreArr =storedScoreList;
     }

 }

 // clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// EventListeners
// Start timer and display first question when click start quiz
quizBtnEl.addEventListener("click", quizStart);


ansBtnEl.forEach(item =>{
    item.addEventListener("click",checkAns);
});
//add score
submitScrBtn.addEventListener("click",addScore);

//go back button
goBackBtn.addEventListener("click",function(){
    highestScoreEl.style.display = "none";
    introEl.style.display = "block";
    timeLeft =60;
    timeEl.textContent = `Time:$(timeLeft)s`

});

// Clear the scores
clearScrBtn.addEventListener("click",clearScores);

// highscore button
viewscoreEl.addEventListener("click",function(){
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});