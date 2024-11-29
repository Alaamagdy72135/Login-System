let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let passInput = document.getElementById("passInput");
let signUpBtn = document.getElementById("signUpBtn");
let signIn = document.querySelector("signIn");
let signUp = document.querySelector("signUp");
let login = document.querySelector("login");
let usersList = [];
let currentIndex = 0;
let welcomeMsg = document.getElementById("welcomeMsg");
let form = document.getElementById("form");


signUpBtn.addEventListener("click", function () {
  addUser();
  clearInput();
});


function addUser() {
  let user = {
    name: nameInput.value,
    email: emailInput.value,
    password: passInput.value,
  }
  usersList.push(user);
  localStorage.setItem("users", JSON.stringify(usersList));
}

function clearInput() {
  nameInput.value = null;
  emailInput.value = null;
  passInput.value = null;
}


function matchUser() {
  let email = emailInputLogin.value;
  let password = passInputLogin.value;
  console.log(email, password);
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].email === email && usersList[i].password === password) {
      console.log(usersList[i].name);
    }
  }
}