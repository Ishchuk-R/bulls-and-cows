'use strict';

let generateNumber = '';
let enteredNumber = '';
const enteredInput = document.getElementById('playNumber');
const modalWindow = document.getElementById('modalWindow');
const play = document.getElementById('play');

/* Generate number */
while (generateNumber.length < 4) {
  const NumberThis = (function() {
    return Math.floor(Math.random() * 10);
  })();

  if (generateNumber.search(NumberThis) === -1) {
    generateNumber += NumberThis;
  }
}
console.log(generateNumber);

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
  const resultBlock = document.getElementById('result');
  const element = document.createElement('div');
  const enterNum = document.createElement('span');
  const enterText = document.createElement('span');

  resultBlock.append(element);
  element.className = 'list-group-item d-flex justify-content-between align-items-center';
  enterNum.className = 'badge badge-info';
  enterNum.innerHTML = `${enteredNumber}`;
  element.append(enterNum);
  element.append(enterText);

  if (result === null) {
    element.className += ` bg-danger`;
    enterText.innerHTML = `Wrong entered data. Are the numbers repeated?`;
  } else if (result === 'giveUp') {
    element.className += ` bg-info`;
    element.innerHTML = `Don't worry. You win next time!!! Right answer is ${generateNumber}`;
    play.style.display = 'none';
  } else if (result.bulls < 4) {
    enterText.innerHTML = `Cows: ${result.cows}  Bulls: ${result.bulls}`;
  } else if (result.bulls === 4) {
    element.className += ` bg-success`;
    enterText.innerHTML = `Congratulation. You win!!! Entered number is correct!!!`;
    play.style.display = 'none';
  } else {
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
enteredInput.onkeypress = function(e) {
  e.target.value.search(/\b\d{1,4}\b/) === -1 ? this.classList.add('is-invalid')
    : this.classList.remove('is-invalid');

  if (isNaN(e.target.value)) {
    event.preventDefault();
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
};
