let userName = document.querySelector("span");
let signOutBtn = document.getElementById("signOutBtn");
let sessionUserInfo = JSON.parse(localStorage.getItem("sessionUser"));

document.addEventListener("DOMContentLoaded", function () {
    if (sessionUserInfo === null) {
        window.location.href = "login.html";
    } else {
        userName.textContent = sessionUserInfo[0].name;
    }
})

signOutBtn.addEventListener("click", function () {
    signOut();
    setTimeout(function () {
        signOutMessage();
        window.location.href = "login.html";
    }, 3000);
});

function signOut() {
    localStorage.removeItem("sessionUser");
}

function signOutMessage() {
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
        title: "Signed out successfully"
    });
}

