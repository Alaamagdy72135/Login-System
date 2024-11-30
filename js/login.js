let emailInputLogin = document.getElementById("emailInputLogin");
let passInputLogin = document.getElementById("passInputLogin");
let signInBtn = document.getElementById("signInBtn");
let sessionUserList = [];
let usersList = JSON.parse(localStorage.getItem("users"));
let currentIndex;
if (localStorage.getItem("sessionUser") !== null) {
    sessionUserList = JSON.parse(localStorage.getItem("sessionUser"));
}

signInBtn.addEventListener("click", function () {
    matchUser();
});

emailInputLogin.addEventListener("blur", function () {
    validateEmailInput();
});

passInputLogin.addEventListener("blur", function () {
    validatePassInput();
});


function matchUser() {
    let email = emailInputLogin.value;
    let password = passInputLogin.value;
    for (let i = 0; i < usersList.length; i++) {
        currentIndex = i;
        if (usersList[i].email === email && usersList[i].password === password) {
            addUserSession(i);
            successMsg2();
            setTimeout(function () {
                openHome();
            }, 3000);
            return;
        } else if (usersList[i].email === email && usersList[i].password !== password) {
            errorMsg("Incorrect password");
            passInputLogin.classList.add("is-invalid");
            passInputLogin.classList.remove("is-valid");
        } else if (usersList[i].email !== email && usersList[i].password === password) {
            errorMsg("Incorrect email");
            emailInputLogin.classList.add("is-invalid");
            emailInputLogin.classList.remove("is-valid");
        } else if (usersList[i].email !== email && usersList[i].password !== password) {
            errorMsg("Incorrect email and password");
        }
    }
}

function addUserSession(i) {
    let sessionUser = {
        name: usersList[i].name,
        email: usersList[i].email,
        password: usersList[i].password
    }
    sessionUserList.push(sessionUser);
    localStorage.setItem("sessionUser", JSON.stringify(sessionUserList));
    clearInput();
}

function clearInput() {
    emailInputLogin.value = null;
    passInputLogin.value = null;

    emailInputLogin.classList.remove("is-invalid");
    passInputLogin.classList.remove("is-invalid");
    emailInputLogin.classList.remove("is-valid");
    passInputLogin.classList.remove("is-valid");
}

function validateEmailInput() {
    let regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    let text = emailInputLogin.value;
    if (regex.test(text)) {
        emailInputLogin.classList.remove("is-invalid");
        emailInputLogin.classList.add("is-valid");
        return true;
    } else {
        emailInputLogin.classList.add("is-invalid");
        emailInputLogin.classList.remove("is-valid");
        errorMsg("Please enter a valid email");
        return false;
    }
}

function validatePassInput() {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let text = passInputLogin.value;
    if (regex.test(text)) {
        passInputLogin.classList.remove("is-invalid");
        passInputLogin.classList.add("is-valid");
        return true;
    } else {
        passInputLogin.classList.add("is-invalid");
        passInputLogin.classList.remove("is-valid");
        errorMsg("Minimum eight characters, at least one letter and one number");
        return false;
    }
}

function successMsg2() {
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
        title: "Signed in successfully"
    });
}

function errorMsg(msg) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg,
    });
}

function openHome() {
    window.location.href = "home.html";
}