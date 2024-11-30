let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let passInput = document.getElementById("passInput");
let signUpBtn = document.getElementById("signUpBtn");
let usersList = [];

if (localStorage.getItem("users") !== null) {
  usersList = JSON.parse(localStorage.getItem("users"));
}

signUpBtn.addEventListener("click", function () {
  addUser();
});

nameInput.addEventListener("blur", function () {
  validateNameInput();
});

emailInput.addEventListener("blur", function () {
  validateEmailInput();
});

passInput.addEventListener("blur", function () {
  validatePassInput();
});


function addUser() {
  if (validateEmailInput() && validateNameInput() && validatePassInput()) {
    let user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passInput.value,
    }
    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].email === user.email) {
        errorMsg("Email already exists");
        return;
      }
    }
    usersList.push(user);
    localStorage.setItem("users", JSON.stringify(usersList));
    successMsg();
    setTimeout(function () {
      openLogin();
    }, 3000);
    clearInput();
  } else if (!validateEmailInput() && validateNameInput() && validatePassInput()) {
    errorMsg("Please enter a valid email");
  } else if (validateEmailInput() && !validateNameInput() && validatePassInput()) {
    errorMsg("Please enter a valid name");
  } else if (validateEmailInput() && validateNameInput() && !validatePassInput()) {
    errorMsg("Please enter a valid password");
  } else if (!validateEmailInput() && !validateNameInput() && validatePassInput()) {
    errorMsg("Please enter a valid email and name");
  } else if (!validateEmailInput() && validateNameInput() && !validatePassInput()) {
    errorMsg("Please enter a valid email and password");
  } else if (validateEmailInput() && !validateNameInput() && !validatePassInput()) {
    errorMsg("Please enter a valid name and password");
  } else if (!validateEmailInput() && !validateNameInput() && !validatePassInput()) {
    errorMsg("Please enter a valid email, name and password");
  }

}

function clearInput() {
  nameInput.value = null;
  emailInput.value = null;
  passInput.value = null;

  nameInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-invalid");
  passInput.classList.remove("is-invalid");

  nameInput.classList.remove("is-valid");
  emailInput.classList.remove("is-valid");
  passInput.classList.remove("is-valid");

}

function validateNameInput() {
  let regex = /^[a-z0-9_-\s]{3,15}$/gi;
  let text = nameInput.value;
  if (regex.test(text)) {
    nameInput.classList.remove("is-invalid");
    nameInput.classList.add("is-valid");
    return true;
  } else {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    errorMsg("Please enter a valid name");
    return false;
  }
}

function validateEmailInput() {
  let regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  let text = emailInput.value;
  if (regex.test(text)) {
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
    return true;
  } else {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    errorMsg("Please enter a valid email");
    return false;
  }
}

function validatePassInput() {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let text = passInput.value;
  if (regex.test(text)) {
    passInput.classList.remove("is-invalid");
    passInput.classList.add("is-valid");
    return true;
  } else {
    passInput.classList.add("is-invalid");
    passInput.classList.remove("is-valid");
    errorMsg("Minimum eight characters, at least one letter and one number");
    return false;
  }
}

function successMsg() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
Toast.fire({
    icon: "success",
    title: "User Added successfully"
});
}

function errorMsg(msg) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
  });
}

function openLogin() {
  window.location.href = "login.html";
}