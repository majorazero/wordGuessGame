//Words (Names), we'll be guessing from.
let wordBank = [
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
let winCount = 0;
//this stuff should reset.
let guessAttempts = 10; //default starting guess
let lettersGuessed = []; // array for letters guessed so far.


//rules:
// 1. letters already guessed should not be able to be guessed again (on the same round)
// 2. 10 guess attempt per word attempt
// 3. letters guessed should be reset with each new Words
// 4. When the wordBank is empty, you get a secret win screen. game ends.
// 5. If guess attempts run out and words not guess, game ends.

//I need to write a custom function to print out arrays for the doc
function arrayToText(arr) {
  if(arr.length === 0){
    return "No Guesses Yet!";
  }
  let hText = "";
  for (let i =0; i < arr.length; i++){
    if (i === arr.length-1){//if its the LAST element of the array
      hText += arr[i]; //its so I don't include a comma space for the last entry
    }
    else{
      hText += arr[i]+", ";
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
//we'll push a word out of the bank
let gameWord = randomWordOutput();
let gameArray = [];
console.log(gameWord);
//game basically starts when user tries to type in inputs
document.onkeyup = function(event){
  console.log(gameWord);
  let pos = gameWord.indexOf(event.key); //position being checked
  if(pos === -1){ //if the input is NOT part of the word, position will return -1
    guessAttempts--; //guessAttempt gets deducted by one
    lettersGuessed.push(event.key); //letters guessed gets pushed into the list
  }
  else { //only other possibility is that the letter DOES exist
    gameArray[pos] = event.key;
    while(pos != -1){ //run this until pos === -1, basically meanning it ran out of indexes to search for
      console.log(pos);
      pos = gameWord.indexOf(event.key,pos+1); //we'll look for another position of the word beyond the first place we found it
      if (pos != -1){ //if it found something again
        gameArray[pos] = event.key; //it will fill in the next blank space
      }
      //else nothing happens so we don't need to write the code, and if it ends of equaling -1, the while loop will end.
    }
  }

  //game should update document ONLY when all the data has been run through, so we put all that stuff at the end.
  document.getElementById("wins").textContent = winCount;
  document.getElementById("guessRemain").textContent = guessAttempts;
  document.getElementById("lettersGuessed").textContent = arrayToText(lettersGuessed);

  if(guessAttempts === 0 ){ //you lose if guessAttempts reaches 0
    document.getElementById("loss").textContent = "YOU LOSE!";
  }
};
