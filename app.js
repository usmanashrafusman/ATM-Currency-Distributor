let debit = document.querySelector("#debit"); // getting button to addEventListner
let prefCur = document.querySelector("#prefCur"); // getting input element to get get selected currecny
let currencyNotes = [500, 100, 50, 20, 10, 5, 1]; // array of currencies note
let amount = document.querySelector("#amount").value; // getting value of amount provided by user

debit.addEventListener("click", () => {
  prefCur = document.querySelector("#prefCur");
  amount = document.querySelector("#amount").value;
  const amountNum = Number(amount); // converting amount to number
  const decimal = amountNum - Math.floor(amount) !== 0; // getting if amount is not deimal
  if (decimal) {
    alert("Your Amount Is In Decimal , Please Enter Proper Amount");
  } else if (amountNum >= 100001) {
    //condition to make sure that amount is in between 100000
    alert("Maximum Transactions can be Rs.100,000/=");
  } else if (amountNum <= 99) {
    //condition to make sure amount is atlest 100
    alert("Maximum Transactions should be Rs.100/=");
  } else {
    // condition to check if preffered currency is not more than amount
    if (Number(prefCur.value) <= amountNum) {
      // dispatching money
      dispatchMoney();
    } else {
      alert("Your Selected Preferred Currency Is More Than Your Debit Amount");
    }
  }
});

// obj to get provided currency
let currencyProvided = {
  500: 0,
  100: 0,
  50: 0,
  20: 0,
  10: 0,
  5: 0,
  1: 0,
};

//function to diliver preffered currency
const dispatchMoney = () => {
  //getting index of preffered currency
  let indexOfPref = currencyNotes.indexOf(Number(prefCur.value));
  //getting possiblity of preffered currecny notes
  let noOfNotes = Math.floor(Number(amount) / Number(prefCur.value));
  if (noOfNotes >= 200) noOfNotes = 200;
  // condition to make sure preffered currecny is not more than 200
  let amountToPay = noOfNotes * Number(prefCur.value);
  //getting total preffered paid amount
  currencyProvided[Number(prefCur.value)] = noOfNotes;
  //deducting amount
  amount -= amountToPay;
  //removing preffered amount element from array
  currencyNotes.splice(indexOfPref, 1);
  if (amount != 0) {
    //checking if amount is not 0 then paying other currencies
    currencyNotes.forEach((value, index) => {
      payOtherCur(value, index);
    });
  }
  //saving paid currency in localstorage to show user
  localStorage.setItem("currency", JSON.stringify(currencyProvided));
  // changeing location to other html file to show user currency distribution
  location.href = "distributedCurrency.html";
};

const payOtherCur = (value, index) => {
  if (amount !== 0) {
    //dividing currency one by one
    noOfNotes = Math.floor(Number(amount) / value);
    currencyProvided[value] = noOfNotes;
    //getting amount to pay
    amountToPay = noOfNotes * value;
    //deducting amount
    amount -= amountToPay;
  }
};
