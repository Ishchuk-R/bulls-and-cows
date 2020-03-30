'use strict';

let generateNumber = generateNewNumberFunc();
let enteredNumber = '';
const enteredInput = document.getElementById('playNumber');
const modalWindow = document.getElementById('modalWindow');
const play = document.getElementById('play');
const newGameBtn = document.getElementById('newGame');
const resultBlock = document.getElementById('result');

/* Generate number */
function generateNewNumberFunc() {
  let generateNum = '';

  while (generateNum.length < 4) {
    const NumberThis = (function() {
      return Math.floor(Math.random() * 10);
    })();

    if (generateNum.search(NumberThis) === -1) {
      generateNum += NumberThis;
    }
  }
  console.log(generateNum);

  return generateNum;
}

/* modalWindow function */
function modalWindowStatus(status) {
  if (status) {
    modalWindow.classList.add('visible');
  } else {
    modalWindow.classList.remove('visible');
  }
}

/* Bulls and cows main function */
const bullsAndCows = function(generatedNumber, enteredNumber) {
  const enteredNumberObj = {};
  const count = {
    bulls: 0,
    cows: 0,
  };

  if (enteredNumber === undefined
    || enteredNumber === null
    || enteredNumber.length !== 4
    || isNaN(enteredNumber)) {
    return null;
  };

  for (let i = 0; i < 4; i++) {
    if (enteredNumberObj[enteredNumber[i]]) {
      return null;
    } else {
      enteredNumberObj[enteredNumber[i]] = true;
    }
  };

  for (let i = 0; i < 4; i++) {
    if (enteredNumber[i] === generatedNumber[i]) {
      count.bulls++;
    } else if (enteredNumber.includes(generatedNumber[i])) {
      count.cows++;
    }
  };

  return count;
};

/* Render function */
function renderBullsandCowsItem(result, enteredNumber) {
  const element = document.createElement('div');
  const enterNum = document.createElement('span');
  const enterText = document.createElement('span');

  resultBlock.append(element);
  element.className = 'list-group-item d-flex justify-content-between align-items-center';
  enterNum.className = 'badge badge-info';
  enterNum.innerHTML = `${enteredNumber}`;
  element.append(enterNum);
  element.append(enterText);

  switch(true){

    case (result === null):
      element.className += ` bg-danger`;
      enterText.innerHTML = `Wrong entered data. Are the numbers repeated?`;
      break;
    case (result === 'giveUp'):
      element.className += ` bg-info`;
      element.innerHTML = `Don't worry. You win next time!!! Right answer is ${generateNumber}`;
      break;
    case (result.bulls < 4):
      enterText.innerHTML = `Cows: ${result.cows}  Bulls: ${result.bulls}`;
      break;
    case (result.bulls === 4):
      element.className += ` bg-success`;
      enterText.innerHTML = `Congratulation. You win!!! Entered number is correct!!!`;
      play.style.display = 'none';
      newGameBtn.style.display = 'inline-block';
      break;
    default:
      element.innerHTML = `Something went wrong.`;
  }
};

/* Check entered value */
function checkEnteredValue() {
  modalWindowStatus(false);
  enteredNumber = ('' + enteredInput.value).trim();
  renderBullsandCowsItem(bullsAndCows(generateNumber, enteredNumber), enteredInput.value);
};

/* Click on play button */
play.onclick = function() {
  modalWindowStatus(true);
  enteredInput.value = '';
};

/* Click on Close button in modal window */
document.getElementById('closeWindow').onclick = function() {
  modalWindowStatus(false);
};

/* Validation enter input */
enteredInput.oninput = function(e) {
  e.target.value.search(/\b\d{1,4}\b/) === -1 ? this.classList.add('is-invalid')
    : this.classList.remove('is-invalid');
  if (isNaN(e.target.value)) {
    e.preventDefault();
  }

  if (e.key === 'Enter') {
    checkEnteredValue();
  }
};

/* Check entered number */
document.getElementById('try').onclick = function() {
  checkEnteredValue();
};

/* Click on give up button */
document.getElementById('giveUp').onclick = function() {
  modalWindowStatus(false);
  renderBullsandCowsItem('giveUp');
  newGameBtn.style.display = 'inline-block';
};

/* Click New game btn */
newGameBtn.onclick = function() {
  play.style.display = 'inline-block';
  newGameBtn.style.display = 'none';
  resultBlock.innerHTML = '';
  generateNumber = generateNewNumberFunc();
};
