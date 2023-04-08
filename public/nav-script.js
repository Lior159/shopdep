const menuBtn = document.querySelector(".account--btn");
const accountMenu = document.querySelector(".account--menu");
const accountArrows = document.querySelectorAll(".account-arrow");

menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  accountMenu.classList.toggle("hidden");
  accountArrows.forEach((a) => {
    a.classList.toggle("hidden");
  });
});
