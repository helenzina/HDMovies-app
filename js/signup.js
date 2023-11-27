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
}  


