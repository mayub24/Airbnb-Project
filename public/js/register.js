// FOCUS
let txtz = document.querySelectorAll("input");
txtz.forEach((val) =>
{
    val.addEventListener('focus', () =>
    {
        val.style.color = 'black';
        val.style.fontWeight = 'bold';
        val.style.backgroundColor = 'lightgray';
        val.style.border = '2px solid orange';
    })
});

// Blur
let blurz = document.querySelectorAll("input");
blurz.forEach((val) =>
{
    val.addEventListener('blur', () =>
    {
        val.style.border = "none";
        val.style.backgroundColor = 'white';
    })
});


// Functions to guess incorrect values right away
document.querySelector(`#fname`).addEventListener(`blur`, checkFirst);
document.querySelector(`#lname`).addEventListener(`blur`, checkLast);
document.querySelector(`#userName`).addEventListener(`blur`, checkName);
document.querySelector(`#pass`).addEventListener(`blur`, checkPass);
document.querySelector(`#adrs`).addEventListener(`blur`, checkAddress);
document.querySelector(`#mail`).addEventListener(`blur`, checkEmail);
document.querySelector(`#cpass`).addEventListener(`blur`, confirmPass);


function checkFirst() {
  const fname = document.querySelector('#fname');
  const errorSpan = document.querySelector('.f-err');
  const val = fname.value.trim();

  if (val.length < 2 || val.length > 20) {
    fname.style.border = '2px solid red';
    errorSpan.textContent = 'First name should be between 2 and 20 characters.';
    errorSpan.style.display = 'block';
    return false;
  } else if (!/^[A-Za-z]+$/.test(val)) {
    fname.style.border = '2px solid red';
    errorSpan.textContent = 'First name should only contain letters.';
    errorSpan.style.display = 'block';
        return false;
  } else {
    fname.style.border = '2px solid lightgreen';
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
    return true;
  }
}



function checkLast() {
  const lname = document.querySelector('#lname');
  const errorSpan = document.querySelector('.l-err');
  const val = lname.value.trim();

  if (val.length < 2 || val.length > 20) {
    lname.style.border = '2px solid red';
    errorSpan.textContent = 'Last name should be between 2 and 20 characters.';
    errorSpan.style.display = 'block';
        return false;
  } else if (!/^[A-Za-z]+$/.test(val)) {
    lname.style.border = '2px solid red';
    errorSpan.textContent = 'Last name should only contain letters.';
    errorSpan.style.display = 'block';
        return false;
  } else {
    lname.style.border = '2px solid lightgreen';
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
        return true;
  }
}


function checkName() {
  const name = document.querySelector('#userName');
  const errorSpan = document.querySelector('.usr-err');
  const val = name.value.trim();

  if (val.length < 2 || val.length > 20) {
    name.style.border = '2px solid red';
    errorSpan.textContent = 'Username should be between 2 and 20 characters.';
    errorSpan.style.display = 'block';
        return false;
  } else if (!/^[A-Za-z0-9]+$/.test(val)) {
    name.style.border = '2px solid red';
    errorSpan.textContent = 'Username should only contain letters and numbers.';
    errorSpan.style.display = 'block';
        return false;
  } else {
    name.style.border = '2px solid lightgreen';
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
    return true;
  }
}


// DO THIS ALONG WITH ENABLED AND DISABLED BUTTON ON YOUR FORM

function checkPass() {
  const pass = document.querySelector('#pass');
  const errorSpan = document.querySelector('.pass-err');
  const val = pass.value;

  if (val.length < 8 || val.length > 16) {
    pass.style.border = '2px solid red';
    errorSpan.textContent = 'Password must be between 8 and 16 characters.';
    errorSpan.style.display = 'block';
        return false;
  } else if (!/(?=.*[A-Z])/.test(val)) {
    pass.style.border = '2px solid red';
    errorSpan.textContent = 'Password must contain at least one uppercase letter.';
    errorSpan.style.display = 'block';
        return false;
  } else if (!/(?=.*[a-z])/.test(val)) {
    pass.style.border = '2px solid red';
    errorSpan.textContent = 'Password must contain at least one lowercase letter.';
    errorSpan.style.display = 'block';
        return false;
  } else if (!/(?=.*[0-9])/.test(val)) {
    pass.style.border = '2px solid red';
    errorSpan.textContent = 'Password must contain at least one number.';
    errorSpan.style.display = 'block';
        return false;
  } else if (!/(?=.*[!@#$%^&*<>?])/.test(val)) {
    pass.style.border = '2px solid red';
    errorSpan.textContent = 'Password must contain at least one special character.';
    errorSpan.style.display = 'block';
        return false;
  } else {
    pass.style.border = '2px solid lightgreen';
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
    return true;
  }
}


function confirmPass() {
  const pass = document.querySelector('#pass');
  const cpass = document.querySelector('#cpass');
  const errorSpan = document.querySelector('.cpass-err');

  if (cpass.value !== pass.value) {
    cpass.style.border = '2px solid red';
    errorSpan.textContent = 'Passwords do not match.';
    errorSpan.style.display = 'block';
        return false;
  } else {
    cpass.style.border = '2px solid lightgreen';
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
    return true;
  }
}



function checkAddress() {
  const addres = document.querySelector('#adrs');
  const errorSpan = document.querySelector('.adrs-err');
  const val = addres.value.trim();

  if (!/^([0-9]+)\s([A-Za-z0-9\.\# ]{4,30})$/.test(val)) {
    addres.style.border = '2px solid red';
    errorSpan.textContent = 'Please enter a valid home address (e.g., 123 Main St).';
    errorSpan.style.display = 'block';
        return false;
  } else {
    addres.style.border = '2px solid lightgreen';
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
    return true;
  }
}


function checkEmail() {
  const email = document.querySelector('#mail');
  const errorSpan = document.querySelector('.email-err');
  const val = email.value.trim();

  if (!/^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([a-z]{2,5})$/.test(val)) {
    email.style.border = '2px solid red';
    errorSpan.textContent = 'Please enter a valid email address.';
    errorSpan.style.display = 'block';
        return false;
  } else {
    email.style.border = '2px solid lightgreen';
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
    return true;
  }
}

// Toggle submit button
const submitBtn = document.querySelector("#sign");
submitBtn.disabled = true; // start disabled

function toggleSubmit() {
  const valid =
    checkFirst() &&
    checkLast() &&
    checkName() &&
    checkPass() &&
    confirmPass() &&
    checkAddress() &&
    checkEmail();

  submitBtn.disabled = !valid;
}

// Attach events to inputs
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", toggleSubmit);
  input.addEventListener("blur", toggleSubmit);
});

// Final safeguard on submit
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  toggleSubmit();
  if (submitBtn.disabled) {
    e.preventDefault();
  }
});





