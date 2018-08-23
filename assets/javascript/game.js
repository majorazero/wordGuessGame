/**
* Resets overarching game parameters aka the word bank and the score.
*/
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
  document.getElementById("loss").textContent = "";
  document.getElementById("retry").innerHTML = "";
  gameDone = false; //game just started
  nextRound();
}
/**
* Resets game state between ROUNDS, its a smaller scope than reset()
*/
function nextRound(){
  roundDone = false; //the round is restarting, so it's not "done"
  guessAttempts = 10; // reset guess attempts
  lettersGuessed = []; //clears letters Guessed
  gameWord = randomWordOutput().toLowerCase(); //pushes out a new word
  gameArray = new Array(gameWord.length);
  document.getElementById("next").innerHTML = "";
  sDisplay();
}

/**
* Returns a string that makes up the array. Used so HTML can understand.
* Specifically its used to deal with the lettersGuessed component of the app.
* @param {Array} arr The array of items, hopefully characters, to be stringified to a list.
*/
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
/**
* Returns a string for the HTML that represents the state of the word being guessed so far.
* Replaces words not guessed yet as " _ "
* @param {Array} arr The array used to respresent the letters guessed so far, for our app, this should only be gameArray
*/
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
/**
* Will randomly pick an index out of the word bank and return it. This also shrinks the word bank by one.
*/
function randomWordOutput(){
  if(wordBank.length != 0){
    return wordBank.splice(Math.floor(Math.random()*wordBank.length),1)[0];
  }
  else {
    return "";
  }
}
/**
* This will check to see if your gameArray is filled, which if it did, means you win that round.
* Will also check if you won the game.
* @param {Array} gameArr I'm not always consistent in how I name this, but this should only accept the game array.
*/
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
/**
* This handles how all the elements will get expresed in HTML.
* It's only "smart" component is the one where it handles what image will get outputted depending on the word bank and winState.
* It also determines loss.
*/
function sDisplay(){
  document.getElementById("wins").textContent = winCount;
  document.getElementById("guessRemain").textContent = guessAttempts;
  document.getElementById("lettersGuessed").textContent = arrayToText(lettersGuessed);
  document.getElementById("word").textContent = gameArrayToText(gameArray);
  if(guessAttempts === 0 ){ //shows loss screen if guess attempts reaches 0
    roundDone = true;
    document.getElementById("loss").textContent = "YOU LOSE!";
    document.getElementById("retry").innerHTML = "<button onclick='reset()'>Try Again?</button>";
  }
  if(gameDone === false){
    document.getElementById("screen").innerHTML =
    "<img class='img-fluid img-thumbnail' src='assets/images/"+gameWord+".jpeg'><h2 class='screen-title'>Who's this guy.</h2>";
  }
  else {
    document.getElementById("screen").innerHTML =
    "<img class='img-fluid img-thumbnail' src='assets/images/legend.jpeg'><h2 class='screen-title'>Damn, you nerd.</h2>";
    document.getElementById("word").textContent = "YOU WIN!";
    document.getElementById("retry").innerHTML = "<button onclick='reset()'>Play Again? ^_^</button>";
  }
}


//Declaring variables that we'll be using.
let wordBank;
let winCount = 0;
let guessAttempts = 10; //default starting guess
let lettersGuessed = []; // array for letters guessed so far.
let gameWord;
let gameArray;
let gameDone;
let roundDone;
reset();
/**
* This is the game, given that the correct key input and if round is not done,
* it will checks if the letter pressed exists within the current chosen word.
* If it is, it will cycle through and find all the positions where it exist, and apply them to a blank array that we
* define with a length based on our current chosen word.
* Afterwards, we'll check to see if the user won yet, and display the results to HTML.
*/
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
    sDisplay();
  }
};
