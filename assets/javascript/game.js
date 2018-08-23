//rules:
// 1. letters already guessed should not be able to be guessed again (on the same round)
// 2. 10 guess attempt per word attempt
// 3. letters guessed should be reset with each new Words
// 4. When the wordBank is empty, you get a secret win screen. game ends.
// 5. If guess attempts run out and words not guess, game ends.

function reset() {
  wordBank = [ //refills wordBank
    "Jaina",
    "Arthas",
    "Guldan",
    "Maiev",
    "Garrosh",
    "Thrall",
    "Anduin",
    "Malfurion",
    "Rexxar"
  ];
  winCount = 0;
  guessAttempt = 10;
  lettersGuessed = [];
  document.getElementById("loss").textContent = "";
  document.getElementById("retry").innerHTML = "";
  gameDone = false; //game just started
}
//resets round
function nextRound(){
  roundDone = false; //the round is restarting, so it's not "done"
  guessAttempts = 10; // reset guess attempts
  lettersGuessed = []; //clears letters Guessed
  gameWord = randomWordOutput().toLowerCase(); //pushes out a new word
  gameArray = new Array(gameWord.length);
  document.getElementById("next").innerHTML = "";
  sDisplay();
}
function init(){ //initializes game
  reset();
  nextRound();
}
//I need to write a custom function to print out arrays for the doc
function arrayToText(arr) {
  if(arr.length === 0){
    return "No wrong guesses yet!";
  }
  let hText = "";
  for(let i =0; i < arr.length; i++){
    if (i === arr.length-1){//if its the LAST element of the array
      hText += arr[i]; //its so I don't include a comma space for the last entry
    }
    else{
      hText += arr[i]+", ";
    }
  }
  return hText;
}

//Second array function for hangman array display
function gameArrayToText(arr){
  let hText = "";
  for(let i=0; i <arr.length; i++){
    if(arr[i] === undefined){//if its an empty array.
      hText += " _ ";
    }
    else{
      if (i === 0){ //if its the first letter of the array we'll capitalize it.
        hText += arr[i].toUpperCase();
      }
      else{
        hText += arr[i];
      }
    }
  }
  return hText;
}


//pushes out a random word from the array
function randomWordOutput(){
  if(wordBank.length != 0){
    return wordBank.splice(Math.floor(Math.random()*wordBank.length),1)[0];
  }
  else {
    return "";
  }
}

//checks progress
function checkProgress(gameArr){
  for(let i =0; i < gameArr.length; i++){
    if(gameArr[i] === undefined) {
      return; //exits progress check if it catches undefined.
    }
  }
  winCount++;
  roundDone = true; //round is over.
  if(wordBank.length === 0){ //you've won and the word bank is empty
    gameDone = true;
    return;
  }
  document.getElementById("next").innerHTML = "<button onclick='nextRound()'>Next?</button>";
  return;
}
//handles image display
function sDisplay(){
  document.getElementById("wins").textContent = winCount;
  document.getElementById("guessRemain").textContent = guessAttempts;
  document.getElementById("lettersGuessed").textContent = arrayToText(lettersGuessed);
  document.getElementById("word").textContent = gameArrayToText(gameArray);
  if(guessAttempts === 0 ){ //shows loss screen if guess attempts reaches 0
    roundDone = true;
    document.getElementById("loss").textContent = "YOU LOSE!";
    document.getElementById("retry").innerHTML = "<button onclick='init()'>Try Again?</button>";
  }
  if(gameDone === false){
    document.getElementById("screen").innerHTML =
    "<img class='img-fluid img-thumbnail' src='assets/images/"+gameWord+".jpeg'><h2 class='screen-title'>Who's this guy.</h2>";
  }
  else {
    document.getElementById("screen").innerHTML =
    "<img class='img-fluid img-thumbnail' src='assets/images/legend.jpeg'><h2 class='screen-title'>Damn, you nerd.</h2>";
    document.getElementById("word").textContent = "YOU WIN!";
    document.getElementById("retry").innerHTML = "<button onclick='init()'>Play Again? ^_^</button>";
  }
}


//Words (Names), we'll be guessing from.
let wordBank;
let winCount = 0;
//this stuff should reset.
let guessAttempts = 10; //default starting guess
let lettersGuessed = []; // array for letters guessed so far.
let gameWord;
let gameArray;
let gameDone;
let roundDone;
reset();
nextRound();
// //we'll push a word out of the bank
// let gameWord = randomWordOutput().toLowerCase(); //we're gonna do this so the game is not NOT case sensitive.
// let gameArray = new Array(gameWord.length);



//game basically starts when user tries to type in inputs
document.onkeyup = function(event){
  if (event.keyCode >= 65 && event.keyCode <= 90 && roundDone === false) { //ensures that it will only accept letters as inputs. (NO MORE META OR SHIFT YEE)
    console.log(gameWord);
    let pos = gameWord.indexOf(event.key.toLowerCase()); //position being checked
    if(pos === -1 && lettersGuessed.indexOf(event.key) === -1){ //if the input is NOT part of the word, position will return -1; also we wont punish repeat guesses
      guessAttempts--; //guessAttempt gets deducted by one
      lettersGuessed.push(event.key.toLowerCase()); //letters guessed gets pushed into the list
    }
    else { //only other possibility is that the letter DOES exist
      gameArray[pos] = event.key.toLowerCase();
      while(pos != -1){ //run this until pos === -1, basically meanning it ran out of indexes to search for
        console.log(gameArray);
        pos = gameWord.indexOf(event.key.toLowerCase(),pos+1); //we'll look for another position of the word beyond the first place we found it
        if (pos != -1){ //if it found something again
          gameArray[pos] = event.key.toLowerCase(); //it will fill in the next blank space
        }
        //else nothing happens so we don't need to write the code, and if it ends of equaling -1, the while loop will end.
      }
    }

    checkProgress(gameArray);
    //game should update document when all the data has been run through, so we put all that stuff at the end.
    //remember it needs to be IN the onkeyup function since we need this to update everytime the game state changes
    sDisplay();
  }
};
