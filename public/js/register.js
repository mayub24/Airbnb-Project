
let txtz = document.querySelectorAll("input");
txtz.forEach((val) => {
  val.addEventListener("focus", () => {
    val.style.color = "black";
    val.style.fontWeight = "bold";
    val.style.backgroundColor = "lightgray";
    val.style.border = "2px solid orange";
  });
});


let blurz = document.querySelectorAll("input");
blurz.forEach((val) => {
  val.addEventListener("blur", () => {
    val.style.border = "none";
    val.style.backgroundColor = "white";
  });
});


function isFirstValid() {
  const v = document.querySelector("#fname").value.trim();
  return v.length >= 2 && v.length <= 20 && /^[A-Za-z]+$/.test(v);
}

function isLastValid() {
  const v = document.querySelector("#lname").value.trim();
  return v.length >= 2 && v.length <= 20 && /^[A-Za-z]+$/.test(v);
}

function isNameValid() {
  const v = document.querySelector("#userName").value.trim();
  return v.length >= 2 && v.length <= 20 && /^[A-Za-z0-9]+$/.test(v);
}

function isPassValid() {
  const v = document.querySelector("#pass").value;
  return (
    v.length >= 8 &&
    v.length <= 16 &&
    /[A-Z]/.test(v) &&
    /[a-z]/.test(v) &&
    /[0-9]/.test(v) &&
    /[!@#$%^&*<>?]/.test(v)
  );
}

function isConfirmPassValid() {
  return document.querySelector("#cpass").value === document.querySelector("#pass").value;
}

function isAddressValid() {
  const v = document.querySelector("#adrs").value.trim();
  return /^([0-9]+)\s([A-Za-z0-9\.\# ]{4,30})$/.test(v);
}

function isEmailValid() {
  const v = document.querySelector("#mail").value.trim();
  return /^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([a-z]{2,5})$/.test(v);
}


function showErrors(inputEl, errorEl, errors) {
  if (errors.length) {
    inputEl.style.border = "2px solid red";
    errorEl.innerHTML = errors.map(e => `• ${e}`).join("<br>");
    errorEl.style.display = "block";
  } else {
    inputEl.style.border = "2px solid lightgreen";
    errorEl.innerHTML = "";
    errorEl.style.display = "none";
  }
}


function checkFirst() {
  const el = document.querySelector("#fname");
  const err = document.querySelector(".f-err");
  const v = el.value.trim();
  const errors = [];
  if (v.length < 2 || v.length > 20) errors.push("First name should be between 2 and 20 characters.");
  if (!/^[A-Za-z]+$/.test(v)) errors.push("First name should only contain letters.");
  showErrors(el, err, errors);
}

function checkLast() {
  const el = document.querySelector("#lname");
  const err = document.querySelector(".l-err");
  const v = el.value.trim();
  const errors = [];
  if (v.length < 2 || v.length > 20) errors.push("Last name should be between 2 and 20 characters.");
  if (!/^[A-Za-z]+$/.test(v)) errors.push("Last name should only contain letters.");
  showErrors(el, err, errors);
}

function checkName() {
  const el = document.querySelector("#userName");
  const err = document.querySelector(".usr-err");
  const v = el.value.trim();
  const errors = [];
  if (v.length < 2 || v.length > 20) errors.push("Username should be between 2 and 20 characters.");
  if (!/^[A-Za-z0-9]+$/.test(v)) errors.push("Username should only contain letters and numbers.");
  showErrors(el, err, errors);
}

function checkPass() {
  const el = document.querySelector("#pass");
  const err = document.querySelector(".pass-err");
  const v = el.value;
  const errors = [];
  if (v.length < 8 || v.length > 16) errors.push("Password must be between 8 and 16 characters.");
  if (!/[A-Z]/.test(v)) errors.push("Password must contain at least one uppercase letter.");
  if (!/[a-z]/.test(v)) errors.push("Password must contain at least one lowercase letter.");
  if (!/[0-9]/.test(v)) errors.push("Password must contain at least one number.");
  if (!/[!@#$%^&*<>?]/.test(v)) errors.push("Password must contain at least one special character.");
  showErrors(el, err, errors);
}

function confirmPass() {
  const el = document.querySelector("#cpass");
  const err = document.querySelector(".cpass-err");
  const passVal = document.querySelector("#pass").value;
  const v = el.value;
  const errors = [];
  if (v !== passVal) errors.push("Passwords do not match.");
  showErrors(el, err, errors);
}

function checkAddress() {
  const el = document.querySelector("#adrs");
  const err = document.querySelector(".adrs-err");
  const v = el.value.trim();
  const errors = [];
  if (!/^([0-9]+)\s([A-Za-z0-9\.\# ]{4,30})$/.test(v)) {
    errors.push("Please enter a valid home address (e.g., 123 Main St).");
  }
  showErrors(el, err, errors);
}

function checkEmail() {
  const el = document.querySelector("#mail");
  const err = document.querySelector(".email-err");
  const v = el.value.trim();
  const errors = [];
  if (!/^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([a-z]{2,5})$/.test(v)) {
    errors.push("Please enter a valid email address.");
  }
  showErrors(el, err, errors);
}


const submitBtn = document.querySelector("#sign");
submitBtn.disabled = true;

function toggleSubmit() {
  const valid =
    isFirstValid() &&
    isLastValid() &&
    isNameValid() &&
    isPassValid() &&
    isConfirmPassValid() &&
    isAddressValid() &&
    isEmailValid();

  submitBtn.disabled = !valid;
}

document.querySelector("#fname").addEventListener("blur", checkFirst);
document.querySelector("#lname").addEventListener("blur", checkLast);
document.querySelector("#userName").addEventListener("blur", checkName);
document.querySelector("#pass").addEventListener("blur", checkPass);
document.querySelector("#cpass").addEventListener("blur", confirmPass);
document.querySelector("#adrs").addEventListener("blur", checkAddress);
document.querySelector("#mail").addEventListener("blur", checkEmail);

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", toggleSubmit);
});

// prevent submit until valid form
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  toggleSubmit();
  if (submitBtn.disabled) {
    e.preventDefault();
  }
});
