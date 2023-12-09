function onChangePass() {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=repeatpassword]');
    if (confirm.value === password.value) {
      confirm.setCustomValidity('');
    } else {
      confirm.setCustomValidity('Passwords do not match.');
    }
}  

function onChangeEmail() {
    const email = document.querySelector('input[name=email]');
    const emailPattern = /[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}/;

    if (email.value.match(emailPattern)) {
        email.setCustomValidity('');
    } else {
        email.setCustomValidity('Email is not valid.');
    }
    checkEmailAvailability();
}  

function checkUsernameAvailability() {
  const username = document.getElementById('username').value;
  if (username.trim() !== '') {
      $.ajax({
          type: 'POST',
          url: 'check-availability.php',
          data: { username: username },
          success: function (response) {
              const feedbackDiv = document.getElementById('username-feedback');
              if (response === 'exists') {
                  feedbackDiv.innerHTML = '<div class="alert alert-danger" role="alert">Username already exists. Please choose a different username.</div>';
              } else {
                  feedbackDiv.innerHTML = ''; // Clear previous error message
              }
          },
      });
  }
}

// ... (other JavaScript code) ...


function checkEmailAvailability() {
  const email = document.getElementById('email').value;
  if (email.trim() !== '') {
      $.ajax({
          type: 'POST',
          url: 'check_duplicate.php', // Create a new PHP file for checking availability
          data: { email: email },
          success: function (response) {
              if (response === 'exists') {
                  alert('Email already exists. Please use a different email address.');
              }
          },
      });
  }
}

$(document).ready(function () {
  // Add event listeners for input fields
  $('#username').on('blur', checkUsernameAvailability);
  $('#email').on('blur', checkEmailAvailability);
});
