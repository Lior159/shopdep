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

const infoLbl = document.querySelectorAll(".info-lbl");
const infoInput = document.querySelectorAll(".info-input");
const infoEdit = document.querySelectorAll(".info-edit");
const infoSave = document.querySelectorAll(".info-save");
const infoCancel = document.querySelectorAll(".info-cancel");

infoEdit.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const fieldName = btn.id.split("-")[2];

    infoSaveBtn = Array.from(infoSave).find(
      (btn) => btn.id === `info-save-${fieldName}`
    );

    infoCancelBtn = Array.from(infoCancel).find(
      (btn) => btn.id === `info-cancel-${fieldName}`
    );

    infoInputEl = Array.from(infoInput).find(
      (btn) => btn.id === `info-save-${fieldName}`
    );

    infoLblEl = Array.from(infoLbl).find(
      (btn) => btn.id === `info-cancel-${fieldName}`
    );

    btn.classList.toggle("hidden");
    infoSaveBtn.classList.toggle("hidden");
    infoCancelBtn.classList.toggle("hidden");
    infoInputEl.classList.toggle("hidden");
    infoLblEl.classList.toggle("hidden");
  });
});

infoCancel.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const fieldName = btn.id.split("-")[2];

    infoEditBtn = Array.from(infoEdit).find(
      (btn) => btn.id === `info-edit-${fieldName}`
    );

    infoSaveBtn = Array.from(infoSave).find(
      (btn) => btn.id === `info-save-${fieldName}`
    );

    infoInputEl = Array.from(infoInput).find(
      (btn) => btn.id === `info-save-${fieldName}`
    );

    infoLblEl = Array.from(infoLbl).find(
      (btn) => btn.id === `info-cancel-${fieldName}`
    );

    btn.classList.toggle("hidden");
    infoSaveBtn.classList.toggle("hidden");
    infoEditBtn.classList.toggle("hidden");
    infoInputEl.classList.toggle("hidden");
    infoLblEl.classList.toggle("hidden");
  });
});
