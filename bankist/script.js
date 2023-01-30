'use strict';

// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-12-07T18:49:59.371Z',
    '2022-12-09T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2022-12-07T18:49:59.371Z',
    '2022-12-09T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// * Functions
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

//* create the table of movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; // reset the field

  // if sorting is needed
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (tx, index) {
    const type = tx > 0 ? 'deposit' : 'withdrawal';

    // create current date
    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementDate(date, acc.locale);

    const currency = formatCurr(tx, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">2 deposit</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${currency}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//* compute total balances
const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);
  account.balance = balance;

  const currency = formatCurr(balance, account.locale, account.currency);
  labelBalance.textContent = `${currency}`;
};

// compute total values for the Summary stage under the table
const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(tx => tx > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = formatCurr(income, account.locale, account.currency);

  const expenditures = account.movements
    .filter(tx => tx < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = formatCurr(
    Math.abs(expenditures),
    account.locale,
    account.currency
  );

  // the bank pays out interest 1.3% on each deposit
  const interest = account.movements
    .filter(tx => tx > 0)
    .map(tx => (tx * account.interestRate) / 100)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = formatCurr(
    interest,
    account.locale,
    account.currency
  );
};

//* compute usernames
let usr = 'Steven Thomas Williams';
const result = usr
  .toLowerCase()
  .split(' ')
  .map(name => {
    return name[0];
  })
  .join('');

const createUsernames = function (accountArr) {
  accountArr.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

// refactoring some code to update data in UI
const updateUI = function (account) {
  // Display movements
  displayMovements(account);
  // Display balance
  calcDisplayBalance(account);
  // Display summary
  calcDisplaySummary(account);
};

const startLogOutTimer = function () {
  // set time to 5 min
  let time = 300;

  const tick = function () {
    // in each call, print the timer to UI
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    // at 0 stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    time--;
  };

  // call timer immediately and then every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//* Event handlers
//* implement LOGIN

let currentUser, timer;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentUser = accounts.find(acc => acc.username === inputLoginUsername.value); // compare login name with database

  if (currentUser?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // create current date and time
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); // zero-based
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // set up the advanced date version
    labelDate.textContent = new Intl.DateTimeFormat(
      currentUser.locale
      // options
    ).format(now);

    // check for existing timer and reset if exists
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentUser);
  }
});

//* implement TRANSFER functionality
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  ); // looking up the account based on username

  // initial checks for safety
  if (
    amount > 0 &&
    currentUser.balance >= amount &&
    receiverAcc &&
    receiverAcc.username !== currentUser.username
  ) {
    console.log('Transfer valid.');

    // make the transfer
    currentUser.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentUser.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // update UI
    updateUI(currentUser);
  }
  // clean out fields
  inputTransferAmount.value = inputTransferTo.value = '';

  // reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

// *request a LOAN from the bank
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value); // floor does type coersion

  if (amount > 0 && currentUser.movements.some(tx => tx >= amount / 10)) {
    setTimeout(function () {
      // add loan to movements
      currentUser.movements.push(amount);

      currentUser.movementsDates.push(new Date().toISOString());

      updateUI(currentUser);
    }, 2500);
    inputLoanAmount.value = '';

    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

//* close account = delete an account object from the array of accounts
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // check correct credentials before deleting
  if (
    inputCloseUsername.value === currentUser.username &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentUser.username
    );
    console.log('The index of this account is:', index);
    // delete current account
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

// *implement SORTING
// implemented via the displayMovements function
let isSorted = false; // state variable to monitor sorting and toggling it
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentUser, !isSorted);
  isSorted = !isSorted;
});

// *DATES
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0); // zero-based
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const min = `${now.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
