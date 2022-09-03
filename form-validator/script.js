const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() !== '') {
      showSuccess(input);
      input.setAttribute('data-required', 'false');
    } else {
      showError(input, `${getFieldName(input)} is required`);
      input.setAttribute('data-required', 'true');
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.getAttribute('data-required') === 'false') {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
    } else {
      showSuccess(input);
    }
  }
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (input.getAttribute('data-required') === 'false') {
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (
    input1.getAttribute('data-required') === 'false' &&
    input2.getAttribute('data-required') === 'false'
  ) {
    if (input1.value !== input2.value) {
      showError(input2, 'Passwords do not match');
    }
  }
}

//  Get field name data attribute
function getFieldName(input) {
  return input.parentElement.querySelector('label').textContent;
}

// Event Listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
