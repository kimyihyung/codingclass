// 로그인 버튼
const loginBtn = document.querySelector(".loginbtn");
const loginPopup = document.querySelector(".login__popup");
const loginClose = document.querySelector(".btn-close");

loginBtn.addEventListener("click", () => {
    loginPopup.classList.add("open");
});

loginClose.addEventListener("click", () => {
    loginPopup.classList.remove("open");
});