$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  var add = document.getElementById('add');
  var subtract = document.getElementById('subtract');
  var multiply = document.getElementById('multiply');
  var divide = document.getElementById('divide');
  var operator;
  var numberLimit = 10;


  $('#number-limit').on('input', function() {
    numberLimit = Number($(this).val());
    $('#number-display').text(numberLimit);
  });
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

   var updateHighScore = function () {
    if (score > highScore) {
    highScore = score;
    $('#highScore').text(highScore);
    }
  };

  var getOperator = function() {
    let operators = [];
    if (add.checked === true) {
            operators.push('+');
    }
    if (subtract.checked === true) {
            operators.push('-');
    }
    if (multiply.checked === true) {
            operators.push('*');
    }
    if (divide.checked === true) {
            operators.push('/');
    }
    if (operators.length === 0) {
            operator = '+';
    } else if (operators.length === 1) {
            operator = operators[0];
    } else {
            let i = Math.floor(Math.random() * operators.length);
            operator = operators[i];
    }
    return operator;
  }

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  };
  
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(numberLimit);
    var num2 = randomNumberGenerator(numberLimit);
    operator = getOperator();

    if (operator === '/' && num2 === 0) num2 = 1;
    
    if (operator === '+') {
      question.answer = num1 + num2;
      question.equation = String(num1) +  operator + String(num2);
    } else if (operator === '-') {
      if (num1 < num2) [num1, num2] = [num2, num1];
        question.answer = num1 - num2;
        question.equation = String(num1) + operator + String(num2);
    } else if (operator === '*') {
      question.answer = num1 * num2;
      question.equation = String(num1) + operator + String(num2);
    } else if (operator === '/') {
      question.answer = num1;
      question.equation = String(num1 * num2) + operator + String(num2);
    }


    
    return question;
  };
  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  };
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
      updateHighScore();
    }
  };
  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  $('#time-left').text(timeLeft);
  $('#score').text(score);
  $('#highScore').text(highScore);
    
  renderNewQuestion();
});