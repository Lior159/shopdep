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
