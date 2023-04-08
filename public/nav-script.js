const navbar_account_btn = document.querySelector(".navbar .account-btn");
const navbar_account_menu = document.querySelector(".navbar .account-menu");
const navbar_account_arrows = document.querySelectorAll(
  ".navbar .account-arrow"
);

navbar_account_btn.addEventListener("click", (e) => {
  e.preventDefault();
  navbar_account_menu.classList.toggle("hidden");
  navbar_account_arrows.forEach((a) => {
    a.classList.toggle("hidden");
  });
});
