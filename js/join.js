// /sign up/
// Gets the form and error message elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordInput2 = document.getElementById('password2');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const passwordError2 = document.getElementById('passwordError2');

// Form submission event
form.addEventListener('submit', function (event) {
    // Clear the previous error message
    clearErrors();

    // Check logic
    let isValid = true;

    // Check name
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name';
        isValid = false;
    }

    // Check email
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email';
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Check cipher
    if (!passwordInput.value.trim()) {
        passwordError.textContent = 'Please enter your password';
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long';
        isValid = false;
    }

    // Double check password
    if (!passwordInput2.value.trim()) {
        passwordError2.textContent = 'Please enter your password';
        isValid = false;
    } else if (passwordInput2.value.length < 8) {
        passwordError2.textContent = 'Password must be at least 8 characters long';
        isValid = false;
    }
    // Make sure both passwords are the same
    if(passwordInput2.value.trim() !== passwordInput.value.trim()){
        let str = "Please make sure you enter the same password twice"
        passwordError.textContent = str;
        passwordError2.textContent = str;
        isValid = false;
    }

    // Block form submission if validation fails
    if (!isValid) {
        event.preventDefault();
    }
});

// Clear error prompts
function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    passwordError2.textContent = '';
}

// Check mailbox format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}