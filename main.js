const form = document.querySelector("form");
const inputTexts = form.querySelectorAll("input[type='text']");
const inputNumbers = form.querySelectorAll("input[type='number']");
const cardNumber = document.getElementById("card-front-number");
const cardName = document.getElementById("card-front-name");
const cardMM = document.getElementById("card-front-mm");
const cardYY = document.getElementById("card-front-yy");
const cardCVV = document.getElementById("card-back-cvv");
const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
const numberRegex = /^(?:\d{4} ){3}\d{4}$/;
const monthRegex = /^(0?[1-9]|1[0-2])$/;
const cvcRegex = /^\d{3}$/;
const currentYear = new Date().getFullYear();
const validYearsLastTwoDigits = Array.from(
  { length: 11 },
  (_, i) => (currentYear + i) % 100
);
const yearRegex = new RegExp(`^(?:${validYearsLastTwoDigits.join("|")})$`);

const successMessage = document.querySelector(".success-message-container");
const successBtn = document.getElementById("success-btn");
successMessage.style.display = "none";

// Adding a submit event listener to the form for input validation
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Calling the validation function
  validateInput(inputTexts, inputNumbers);
});

// Adding a click event listener to reload the page when the payment is successful
successBtn.addEventListener("click", () => {
  location.reload();
});

// Event listener for the card name input
document.getElementById("card-name").addEventListener("input", (event) => {
  const inputValue = event.target.value;
  cardName.textContent = inputValue || "Full Name";
});

// Event listener for the card number input
document.getElementById("card-number").addEventListener("input", (event) => {
  const inputValue = event.target.value;
  cardNumber.textContent = inputValue || "0000 0000 0000 0000";
});

// Event listener for the expiration month input
document.getElementById("exp-mm").addEventListener("input", (event) => {
  const inputValue = event.target.value;
  cardMM.textContent = inputValue || "MM";
});

// Event listener for the expiration year input
document.getElementById("exp-yy").addEventListener("input", (event) => {
  const inputValue = event.target.value;
  cardYY.textContent = inputValue || "YY";
});

// Event listener for the CVC input
document.getElementById("card-cvc").addEventListener("input", (event) => {
  const inputValue = event.target.value;
  cardCVV.textContent = inputValue || "CVC";
});

// Adding a submit event listener to the form for input validation
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Calling the validation function
  validateInput(inputTexts, inputNumbers);
});

// Adding a click event listener to reload the page when the payment is successful
successBtn.addEventListener("click", () => {
  location.reload();
});

// Function for input validation
function validateInput(inputTexts, inputNumbers) {
  let allInputsCorrect = true;

  // Storing default card information
  const defaultCardName = cardName.textContent;
  const defaultCardNumber = cardNumber.textContent;
  const defaultCardMM = cardMM.textContent;
  const defaultCardYY = cardYY.textContent;
  const defaultCardCVV = cardCVV.textContent;

  // Looping through text input fields for validation
  inputTexts.forEach((inputText) => {
    const inputValue = inputText.value;
    const textError = document.querySelector(`[data-for='${inputText.id}']`);

    // Handling card name and card number inputs
    if (inputText.id === "card-name") {
      if (inputValue === "") {
        cardName.textContent = defaultCardName;
      } else {
        cardName.textContent = inputValue;
      }
    } else if (inputText.id === "card-number") {
      if (inputValue === "") {
        cardNumber.textContent = defaultCardNumber;
      } else {
        cardNumber.textContent = inputValue;
      }
    }

    // Validation for inputs
    if (inputValue === "") {
      textError.textContent = "Can't be blank";
      inputText.classList.add("error-input");
      allInputsCorrect = false;
    } else if (inputText.id === "card-name" && !nameRegex.test(inputValue)) {
      textError.textContent = "Wrong format, add the name";
      inputText.classList.add("error-input");
      allInputsCorrect = false;
    } else if (
      inputText.id === "card-number" &&
      !numberRegex.test(inputValue)
    ) {
      textError.textContent = "Wrong format, numbers only";
      inputText.classList.add("error-input");
      allInputsCorrect = false;
    } else {
      textError.textContent = "";
      inputText.classList.remove("error-input");
    }
  });

  // Looping through number input fields for validation
  inputNumbers.forEach((inputNumber) => {
    const inputValue = inputNumber.value;
    const dateError = document.getElementById("date-error");
    const cvcError = document.getElementById("cvc-error");

    // Handling expiration month, expiration year, and CVV inputs
    if (inputNumber.id === "exp-mm") {
      if (inputValue === "") {
        cardMM.textContent = defaultCardMM;
      } else {
        cardMM.textContent = inputValue;
      }
    } else if (inputNumber.id === "exp-yy") {
      if (inputValue === "") {
        cardYY.textContent = defaultCardYY;
      } else {
        cardYY.textContent = inputValue;
      }
    } else if (inputNumber.id === "card-cvc") {
      if (inputValue === "") {
        cardCVV.textContent = defaultCardCVV;
      } else {
        cardCVV.textContent = inputValue;
      }
    }

    // Validation logic for number inputs
    if (inputNumber.id === "exp-mm" || inputNumber.id === "exp-yy") {
      if (inputValue === "") {
        dateError.textContent = "Can't be blank";
        inputNumber.classList.add("error-input");
        allInputsCorrect = false;
      } else if (
        (inputNumber.id === "exp-mm" && monthRegex.test(inputValue)) ||
        (inputNumber.id === "exp-yy" && yearRegex.test(inputValue))
      ) {
        dateError.textContent = "";
        inputNumber.classList.remove("error-input");
      } else {
        dateError.textContent = "Wrong format";
        inputNumber.classList.add("error-input");
        allInputsCorrect = false;
      }
    } else if (inputNumber.id === "card-cvc") {
      if (inputValue === "") {
        cvcError.textContent = "Can't be blank";
        inputNumber.classList.add("error-input");
        allInputsCorrect = false;
      } else if (!cvcRegex.test(inputValue)) {
        cvcError.textContent = "Wrong format";
        inputNumber.classList.add("error-input");
        allInputsCorrect = false;
      } else {
        cvcError.textContent = "";
        inputNumber.classList.remove("error-input");
      }
    }
  });

  // Show success message
  if (allInputsCorrect) {
    successMessage.style.display = "flex";
    form.style.display = "none";
  } else {
    successMessage.style.display = "none";
    form.style.display = "flex";
  }
}
