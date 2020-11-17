// ”Job Role” section
// Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
// Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".
// Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.




/* -----------------Global variables----------------- */
// Global Variables
const fieldsetBasicInfo = document.querySelector('.basic-info');
const fieldsetActivities = document.querySelector('.activities');
const jobRole = document.querySelector('#title');
const tShirtDesign = document.querySelector('#design');
const jsPunsOptions = document.querySelectorAll('.jsPuns');
const iLoveJsShirtOptions = document.querySelectorAll('.iLoveJsShirt');
const checkboxes = document.querySelectorAll('.activities input');
const activitiesTotalDiv = document.getElementById('total');
const paymentType = document.querySelector('#payment');



/* -----------------UNDISPLAY----------------- */
// Undisplay Job Role
document.getElementById("other-title").style.display = "none";
// Undisplay Shirt Colors
document.getElementById("shirt-colors").style.display = "none";
// Undisplay Paypal
document.getElementById("paypal").style.display = "none";
// Undisplay Bitcoin
document.getElementById("bitcoin").style.display = "none";



/* ----------------------”Job Role” section---------------------- */
// Display Job role if other value is selected in the select menu
jobRole.addEventListener('change', (event) => {
    if (event.target.value == "other") {
        document.getElementById("other-title").style.display = "block";
    }
    else {
        document.getElementById("other-title").style.display = "none";
    }
});


/* ----------------------”T-Shirt Info” section---------------------- */
// Display different shirt color depending of the design chosen
tShirtDesign.addEventListener('change', (event) => {
    // Display certain colors if js-puns is selected
    if (event.target.value == "js-puns") {
        jsPunsOptions[0].selected = true;
        for (let i = 0; i < iLoveJsShirtOptions.length; i++) {
            iLoveJsShirtOptions[i].style.display = "none";
        }
        for (let i = 0; i < jsPunsOptions.length; i++) {
            jsPunsOptions[i].style.display = "block";
        }
        document.getElementById("shirt-colors").style.display = "block";
    }
    // Display certain colors if heart-js is selected
    else if (event.target.value == "heart-js") {
        iLoveJsShirtOptions[0].selected = true;
        for (let i = 0; i < jsPunsOptions.length; i++) {
            jsPunsOptions[i].style.display = "none";
        }
        for (let i = 0; i < iLoveJsShirtOptions.length; i++) {
            iLoveJsShirtOptions[i].style.display = "block";
        }
        document.getElementById("shirt-colors").style.display = "block";
    }
    // Display box is hidden if no design has been chosen
    else {
        document.getElementById("shirt-colors").style.display = "none";
    }
});



/* ----------------------”Register for Activities” section---------------------- */
// Disable the checkbox and visually indicates that the workshop in the competing time slot isn't disabled
document.querySelector('.activities').addEventListener('change', e => {
    // Restart total
    let activitiesTotal = 0;

    activitiesTotalDiv.innerText = "";
    // Variable to store the checkbox input that was just clicked
    const clicked = e.target;

    // Variable to store the `data-day-and-time` attribute of the checkbox that was just clicked
    const clickedType = clicked.getAttribute('data-day-and-time');

    // Disable loop-Loop over the checkbox input elements
    for (let i = 0; i < checkboxes.length; i++) {
        //    Disable/enable the item if it has the same 'data-day-and-time' as the item that was checked/unchecked, 
        const checkboxType = checkboxes[i].getAttribute('data-day-and-time');
        if (clickedType === checkboxType && clicked !== checkboxes[i]) {
            if (clicked.checked) {
                checkboxes[i].disabled = true;
            }
            // Else, the`disabled` property of `checkboxes[i]` is false
            else {
                checkboxes[i].disabled = false;
            }
        }
    }

    // Total loop-Loop over the checkbox elements to determine if it has been checked and add it to the total
    for (let i = 0; i < checkboxes.length; i++) {
        const checkboxesDataCost = parseInt(checkboxes[i].getAttribute('data-cost'));
        // Loop over the checkbox elements to determine if it has been checked and add it to the total
        if (checkboxes[i].checked) {
            activitiesTotal += checkboxesDataCost;
        }
    }
    // Add the total in the total Div
    activitiesTotalDiv.insertAdjacentHTML("beforeend",
        `<p>Total: $${activitiesTotal}</p>`);
});


/* ----------------------Payment Info Section---------------------- */
// Display payment sections based on the payment option chosen in the select menu.
paymentType.addEventListener('change', (event) => {
    if (event.target.value == "credit card") {
        document.getElementById("credit-card").style.display = "block";
        document.getElementById("paypal").style.display = "none";
        document.getElementById("bitcoin").style.display = "none";
    }
    else if (event.target.value == "paypal") {
        document.getElementById("credit-card").style.display = "none";
        document.getElementById("paypal").style.display = "block";
        document.getElementById("bitcoin").style.display = "none";
    }
    else if (event.target.value == "bitcoin") {
        document.getElementById("credit-card").style.display = "none";
        document.getElementById("paypal").style.display = "none";
        document.getElementById("bitcoin").style.display = "block";
    }
    else {
        document.getElementById("credit-card").style.display = "block";
        document.getElementById("paypal").style.display = "none";
        document.getElementById("bitcoin").style.display = "none";
    }
});




/* ----------------------Form validation---------------------- */
// Form validation variables
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#mail");
const activitiesFieldset = document.querySelector("fieldset.activities");
const activitiesInputs = document.querySelectorAll(".activities input");
const paymentSelector = document.querySelector("#payment");
const creditCardNumberInput = document.querySelector("#cc-num");
const zipCodeInput = document.querySelector("#zip");
const cvvInput = document.querySelector("#cvv");

// Error message variables
const nameAlert = document.getElementById("name-alert");
const emailAlert = document.getElementById("email-alert");
const activitiesAlert = document.getElementById("activities-alert");
const paymentChoiceAlert = document.getElementById("payment-choice-alert");
const creditCardNumberAlert = document.getElementById("credit-card-number-alert");
const zipCodeAlert = document.getElementById("zip-code-alert");
const cvvAlert = document.getElementById("cvv-alert");

/* NAME Validator */
const nameInputValidator = () => {
    const nameInputValue = nameInput.value;
    nameAlert.innerHTML = "";

    if (nameInputValue.length > 0) {
        nameAlert.style.display = "block";
        nameAlert.innerHTML = "Valid";
        nameAlert.style.color = "green";
        return true;
    }
    else {
        // No empty name field alert
        nameAlert.style.display = "block";
        nameAlert.innerHTML = "This field cannot be empty";
        nameAlert.style.color = "red";
        return false;
    }
}



/* EMAIL Validator */
const emailInputValidator = () => {
    const emailValue = emailInput.value;
    emailAlert.innerHTML = "";

    // Variable to store the .indexOf of the `@` in the email value
    var emailAtIndex = emailValue.indexOf('@');
    // 4. Create a variable to store the .lastIndexOf of the `.` in the email value
    const emailDotIndex = emailValue.lastIndexOf('.');

    // If the `@` index is greater than one AND the `.` last index is greater than the `@` index + 1, 
    // Set the email's border to white and return true
    // Else, set the email's border to red and return false
    if (emailAtIndex > 1 && emailDotIndex > emailAtIndex++) {
        emailAlert.style.display = "block";
        emailAlert.innerHTML = "Valid";
        emailAlert.style.color = "green";
        return true;
    }
    else {
        // Enter a valid email adress alert
        emailAlert.style.display = "block";
        emailAlert.innerHTML = "Please enter a valid email adress";
        emailAlert.style.color = "red";
        return false;
    }
}



/* ACTIVITIES Validator */
const activitiesValidator = () => {
    activitiesAlert.innerHTML = "";
    for (let i = 0; i < activitiesInputs.length; i += 1) {
        if (activitiesInputs[i].checked) {
            document.querySelector(".activities legend").style.color = "inherit";
            return true;
        }
    }
    // You must select one activity minimum Alert
    activitiesAlert.style.display = "block";
    activitiesAlert.innerHTML = "Please select at least one activity";
    activitiesAlert.style.color = "red";
    return false;
}

/* ----------------------Credit card validation---------------------- */

/* PAYMENT-SELECTOR Validator */
const paymentSelectorValidator = () => {
    paymentChoiceAlert.innerHTML = "";
    if (paymentSelector.value !== "select payment method") {
        return true;
    }
    else {
        //   Payment choice alert
        paymentChoiceAlert.style.display = "block";
        paymentChoiceAlert.innerHTML = "You must select a payment method";
        paymentChoiceAlert.style.color = "red";
        return false;
    }
}

// CREDIT CARD NUMBER Validator-Credit Card field should only accept a number between 13 and 16 digits.
const creditCardNumberInputValidator = () => {
    const creditCardNumberInputValue = creditCardNumberInput.value;
    const creditcardNumberRegEx = /^[0-9]{13,16}$/
    const creditcardNumberMultipleCharactersRegex = /^\d+$/;
    creditCardNumberAlert.innerHTML = "";

    if (paymentSelector.value == "credit card") {
        if (creditcardNumberRegEx.test(creditCardNumberInputValue) == true) {
            //   Credit Card Number Valid Alert
            creditCardNumberAlert.style.display = "block";
            creditCardNumberAlert.innerHTML = "Valid";
            creditCardNumberAlert.style.color = "green";
            return true;
        }
        else if (creditcardNumberMultipleCharactersRegex.test(creditCardNumberInputValue) == false && creditCardNumberInputValue.length > 0) {
            //   Credit Card Numeric Values ONLY Alert
            creditCardNumberAlert.style.display = "block";
            creditCardNumberAlert.innerHTML = "This field must contain ONLY numeric values";
            creditCardNumberAlert.style.color = "red";
            return false;
        }
        else if (creditCardNumberInputValue.length < 13 || creditCardNumberInputValue.length > 16) {
            //   Credit Card between 13 and 16 Numeric Number Alert
            creditCardNumberAlert.style.display = "block";
            creditCardNumberAlert.innerHTML = "This field must contain between 13 and 16 numeric values";
            creditCardNumberAlert.style.color = "red";
            return false;
        }
    }
}



// ZIP CODE Validator-The Zip Code field should accept a 5 - digit number.
const zipCodeInputValidator = () => {
    const zipCodeInputValue = zipCodeInput.value;
    const zipcodeRegex = /^[0-9]{5}$/;
    const zipCodeMultipleCharactersRegex = /^\d+$/;
    zipCodeAlert.innerHTML = "";

    if (paymentSelector.value == "credit card") {
        if (zipcodeRegex.test(zipCodeInputValue) == true) {
            //   Zip Code Valid Alert
            zipCodeAlert.style.display = "block";
            zipCodeAlert.innerHTML = "Valid";
            zipCodeAlert.style.color = "green";
            return true;
        }
        else if (zipCodeMultipleCharactersRegex.test(zipCodeInputValue) == false && zipCodeInputValue.length > 0) {
            //   Zip Code Numeric Values ONLY Alert
            zipCodeAlert.style.display = "block";
            zipCodeAlert.innerHTML = "This field must contain ONLY numeric values";
            zipCodeAlert.style.color = "red";
            return false;
        }
        else if (zipCodeInputValue.length < 5 || zipCodeInputValue.length > 5) {
            //   Zip Code 5 Numbers Alert
            zipCodeAlert.style.display = "block";
            zipCodeAlert.innerHTML = "This field must contain only 5 numeric values";
            zipCodeAlert.style.color = "red";
            return false;
        }
    }
}


// CVV Validator-The CVV should only accept a number that is exactly 3 digits long.
const cvvInputValidator = () => {
    const cvvInputValue = cvvInput.value;
    const cvvRegex = /^[0-9]{3}$/;
    const cvvMultipleCharactersRegex = /^\d+$/;
    cvvAlert.innerHTML = "";

    if (paymentSelector.value == "credit card") {
        if (cvvRegex.test(cvvInputValue) == true) {
            //   CVV Valid Alert
            cvvAlert.style.display = "block";
            cvvAlert.innerHTML = "Valid";
            cvvAlert.style.color = "green";
            return true;
        }
        else if (cvvMultipleCharactersRegex.test(cvvInputValue) == false && cvvInputValue.length > 0) {
            //   CVV Numeric Values ONLY Alert
            cvvAlert.style.display = "block";
            cvvAlert.innerHTML = "This field must contain ONLY numeric values";
            cvvAlert.style.color = "red";
            return false;
        }
        else if (cvvInputValue.length < 3 || cvvInputValue.length > 3) {
            //   CVV 3 Numeric Values  Alert
            cvvAlert.style.display = "block";
            cvvAlert.innerHTML = "This field must contain only 3 numeric values";
            cvvAlert.style.color = "red";
            return false;
        }
    }
}


/* ---------------------- REAL TIME VALIDATORS ---------------------- */

/* Real time validation */
// To add real time validation, use the .addEventListener() method on the form elements/sections
// Use events like `keyup`, `blur` and/or `mouseout`
// As the callback, use the validatison functions above, but remember, 
// Don't use parens when passing a reference to a function as a callback  
nameInput.addEventListener('blur', nameInputValidator);
nameInput.addEventListener('keyup', nameInputValidator);
emailInput.addEventListener('blur', emailInputValidator);
emailInput.addEventListener('keyup', emailInputValidator);
activitiesFieldset.addEventListener('mouseleave', activitiesValidator);
activitiesFieldset.addEventListener('click', activitiesValidator);
paymentSelector.addEventListener('blur', paymentSelectorValidator);
paymentSelector.addEventListener('change', paymentSelectorValidator);
creditCardNumberInput.addEventListener('focus', paymentSelectorValidator);
creditCardNumberInput.addEventListener('blur', creditCardNumberInputValidator);
creditCardNumberInput.addEventListener('keyup', creditCardNumberInputValidator);
zipCodeInput.addEventListener('blur', zipCodeInputValidator);
zipCodeInput.addEventListener('keyup', zipCodeInputValidator);
cvvInput.addEventListener('blur', cvvInputValidator);
cvvInput.addEventListener('keyup', cvvInputValidator);

/* ---------------------- SUBMIT VALIDATORS ---------------------- */

/* Submit listener on the form element */
form.addEventListener('submit', (e) => {
    nameInputValidator();
    emailInputValidator();
    activitiesValidator();
    paymentSelectorValidator();
    creditCardNumberInputValidator();
    zipCodeInputValidator();
    cvvInputValidator();

    if (paymentSelector.value == "credit card") {
        // If validator functions are false submit button is on preventDefault mode
        if (!nameInputValidator() || !emailInputValidator() || !activitiesValidator() || !paymentSelectorValidator() || !creditCardNumberInputValidator() || !zipCodeInputValidator() || !cvvInputValidator()) {
            e.preventDefault();
        }
    }
    else if (!nameInputValidator() || !emailInputValidator() || !activitiesValidator() || !paymentSelectorValidator()) {
        e.preventDefault();
    }

    // Submit handler test log - Feel free to delete this or comment it out
    console.log('Submit handler is functional!');
});


// Form validation messages
// Disable the checkbox and visually indicates that the workshop in the competing time slot isn't disabled


