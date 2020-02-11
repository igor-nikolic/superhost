document.querySelector("#email").addEventListener("blur", checkEmail, false);
async function checkEmail() {
  let email = this.value;
  if (!email) return;
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) return notifyEmail(false, "Please enter a valid email format!");
  let res = await fetch("/auth/checkemail", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
  });
  let data = await res.json();
  data.available ? notifyEmail(true, "Email is available") : notifyEmail(false, "Email is already taken! Try another");
}
function notifyEmail(passed, message) {
  let mailField = document.querySelector("#email");
  let mailNotify = document.querySelector("#mailNotify");
  mailNotify.classList.remove("d-none");
  mailNotify.classList.add("d-block");
  mailNotify.innerHTML = message;
  if (passed) {
    mailNotify.classList.remove('invalid-feedback');
    mailField.classList.remove("is-invalid");
    mailNotify.classList.add('valid-feedback');
    mailField.classList.add('is-valid');
  } else {
    mailField.classList.remove("is-valid");
    mailNotify.classList.remove('valid-feedback');
    mailField.classList.add('is-invalid');
    mailNotify.classList.add('invalid-feedback');
  }
}
document.querySelector("#password2").addEventListener("blur", checkPasswords, false);
function checkPasswords() {
  let p2 = this.value;
  if (!p2) return;
  let p1 = document.querySelector("#password").value;
  let pNotify = document.querySelector("#passwordsNotify");
  if (p1 === p2) {
    this.classList.remove("is-invalid");
    this.classList.add("is-valid");
    pNotify.classList.remove("d-none", "invalid-feedback");
    pNotify.classList.add("d-block", "valid-feedback");
    pNotify.innerHTML = "Passwords match";
  } else {
    this.classList.remove("is-valid");
    this.classList.add("is-invalid");
    pNotify.classList.remove("d-none", "valid-feedback");
    pNotify.classList.add("invalid-feedback", "d-block");
    pNotify.innerHTML = "Passwords don't match!";
  }
}
document.querySelector("#password").addEventListener("blur", checkPasswordStrength, false);
function checkPasswordStrength() {
  const p = this.value;
  if (!p) return;
  const prgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const pNotify = document.querySelector("#passwordNotify");
  if (prgx.test(p)) {
    pNotify.classList.remove("d-none", "invalid-feedback");
    pNotify.classList.add("d-block", "valid-feedback");
    pNotify.innerHTML = "Password is strong enough!";
    p.classList.remove("is-invalid");
    p.classList.add("is-valid");
  } else {
    pNotify.classList.remove("d-none", "valid-feedback");
    pNotify.classList.add("d-block", "invalid-feedback");
    pNotify.innerHTML = "Password must be between 6 and 20 characters long and contain at least one numeric digit, one uppercase and one lowercase letter";
    p.classList.remove("is-valid");
    p.classList.add("is-invalid");
  }
}
