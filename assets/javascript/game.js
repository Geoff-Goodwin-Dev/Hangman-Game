const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var gameInProgress = false;
var badGuessArray = [];
var goodGuessArray = [];
var userGuess = "";

var wordsList = ['HORSE', 'SADDLE', 'ROBOT', 'FUTURE', 'PARK', 'ARTIFICIAL'];
var selectedWord = "";
var wordLettersArray = [];
var underscoredWord = [];
var key = "";
var wins = 0;
var losses = 0;
var guessDownCounter = 8;
var lifeCounterMax = 8;
var gradientColor = "linear-gradient(#40b529, #367a29)";
var percentLifeRemaining = 100;



function newRound() {
  gameInProgress = true;
  document.getElementById('start').style.visibility = 'hidden';
  badGuessArray = [];
  goodGuessArray = [];
  wordLettersArray = [];
  underscoredWord = [];
  guessDownCounter = 8;
  updateImage();
  document.getElementById('badLetterGuesses').innerText = badGuessArray.join(', ');
  document.getElementById('goodLetterGuesses').innerText = goodGuessArray.join(', ');
  gradientColor = "linear-gradient(#40b529, #367a29)";
  document.getElementById('progressBarInnerDiv').style.width = '100%';
  document.getElementById('progressBarInnerDiv').style.background = gradientColor;
  var buttonsSet = document.getElementsByClassName('keyboardButton');
  for (var i = 0; i < buttonsSet.length; i++) {
    buttonsSet[i].style.backgroundImage = "url('assets/images/typewriterbutton.png')";
    buttonsSet[i].style.color = '#4f3b1e';
  }
  randomWordSelect();
  updateStats();
  newTurn();
}

function newTurn() {
  document.onkeyup = function(pressed) {
    userGuess = pressed.key.toUpperCase();
    if (alphaChecker(userGuess) === true) {
      // document.getElementById('reset').disabled = false;
      letterGuess(userGuess);

    }
  }
}

function letterGuess(letter) {
  if (gameInProgress === true) {

    // CHECKS TO SEE IF LETTER HAS ALREADY BEEN SELECTED
    if ((badGuessArray.indexOf(letter) === -1) && (goodGuessArray.indexOf(letter) === -1)) {

      key = letter.toUpperCase();


      var keyPressed = "key" + letter;
      console.log("key pressed is:", letter);

      if (selectedLetterInWord() === false) {
        document.getElementById(keyPressed).style.color = 'red';
        document.getElementById(keyPressed).style.backgroundImage = "url('assets/images/typewriterbutton_dark.png')";
        badGuessArray.push(letter);
        document.getElementById('badLetterGuesses').innerText = badGuessArray.join(', ');
        guessDownCounter--;
        reduceRemaining();
        document.getElementById("guessDownCounter").innerText = guessDownCounter;
        updateImage();

        if (guessDownCounter === 0) {
          lossCountIncrease();
        }
      }
      else {
        document.getElementById(keyPressed).style.color = 'green';
        document.getElementById(keyPressed).style.backgroundImage = "url('assets/images/typewriterbutton_dark.png')";
        goodGuessArray.push(letter);
        document.getElementById('goodLetterGuesses').innerText = goodGuessArray.join(', ');
        replaceUnderscoreWithLetter(letter);
        if (underscoredWord.indexOf("_") === -1) {
          winCountIncrease();
        }
      }
    }
  }
}

function alphaChecker(x) {
  x = x.toUpperCase();
  if(alpha.indexOf(x) === -1) {
    return false;
  }
  else {
    return true;
  }
}

function randomWordSelect() {
  selectedWord = wordsList[(Math.floor(Math.random() * wordsList.length))];
  console.log("computer selects:", selectedWord);
  wordToArray();
}

function wordToArray() {
  for (var i = 0; i < selectedWord.length; i++) {
    wordLettersArray.push(selectedWord.charAt(i));
  }
  console.log(wordLettersArray);
  selectedWordToUnderscores();
}

function selectedWordToUnderscores() {
  for (var i = 0; i < wordLettersArray.length; i++) {
    underscoredWord.push("_");

  }
  console.log(underscoredWord);
  updateWordDisplay();
}

function reduceRemaining() {
  var percentLifeRemaining = ((100 * guessDownCounter) / lifeCounterMax);
  var progressBar = document.getElementById('progressBarInnerDiv');
  progressBar.style.width = percentLifeRemaining + '%';
  switch (true) {
    case (percentLifeRemaining > 0) && (percentLifeRemaining <= 15):
      gradientColor = "linear-gradient(#990000, #660000)";
      break;
    case (percentLifeRemaining > 15) && (percentLifeRemaining <= 30):
      gradientColor = "linear-gradient(#cc0000, #990000)";
      break;
    case (percentLifeRemaining > 30) && (percentLifeRemaining <= 40):
      gradientColor = "linear-gradient(#ff9900, #cc6600)";
      break;
    case (percentLifeRemaining > 40) && (percentLifeRemaining <= 50):
      gradientColor = "linear-gradient(#ffff00, #ffcc00)";
      break;
    case (percentLifeRemaining > 50) && (percentLifeRemaining <= 100):
      gradientColor = "linear-gradient(#40b529, #367a29)";
      break;
    default:
      console.log('unexpected value');
  }
  progressBar.style.background = gradientColor;

}

function replaceUnderscoreWithLetter(letter) {
  for (var i = 0; i < wordLettersArray.length; i++) {
    if (letter === wordLettersArray[i]) {
      underscoredWord[i] = letter;
      console.log(underscoredWord);
      updateWordDisplay();
    }
  }
}

function updateWordDisplay() {
  document.getElementById("wordDisplay").innerText = underscoredWord.join(' ');
}

function selectedLetterInWord() {
  if (wordLettersArray.indexOf(key) === -1) {
    return false;
  }
  else {
    return true;
  }
}

function winCountIncrease() {
  wins++;
  newRound();
}

function lossCountIncrease() {
  losses++;
  newRound();
}

function updateStats() {
  document.getElementById('wins').innerText = wins;
  document.getElementById('losses').innerText = losses;
  document.getElementById('guessDownCounter').innerText = guessDownCounter;
}

function updateImage() {
  switch (guessDownCounter) {
    case 8:
      document.getElementById('hangmanImg').src = "assets/images/manLayer_8.png";
      break;
    case 7:
      document.getElementById('hangmanImg').src = "assets/images/manLayer_7.png";
      break;
    case 6:
      document.getElementById('hangmanImg').src = "assets/images/manLayer_6.png";
      break;
    case 5:
      document.getElementById('hangmanImg').src = "assets/images/manLayer_5.png";
      break;
    case 4:
      document.getElementById('hangmanImg').src = "assets/images/manLayer_4.png";
      break;
    case 3:
      document.getElementById('hangmanImg').src = "assets/images/manLayer_3.png";
      break;
    case 2:
      document.getElementById('hangmanImg').src = "assets/images/manLayer_2.png";
      break;
    case 1:
      document.getElementById('hangmanImg').src = "assets/images/manLayer_1.png";
      break;
    case 0:
      document.getElementById('hangmanImg').src = "assets/images/manLayer_0.png";
      break;
    default:
      console.log("issue in displaying hangman image");
  }
}