let emailInputLogin = document.getElementById("emailInputLogin");
let passInputLogin = document.getElementById("passInputLogin");
let signInBtn = document.getElementById("signInBtn");
let welcomeMsg = document.getElementById("welcomeMsg");
let form = document.getElementById("form");


signInBtn.addEventListener("click", function () {
    matchUser();
});

function matchUser() {
    let email = emailInputLogin.value;
    let password = passInputLogin.value;
    let usersList = JSON.parse(localStorage.getItem("users"));

    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].email.includes(email) && usersList[i].password.includes(password)) {
            console.log(usersList[i].name);
        }
    }
}
