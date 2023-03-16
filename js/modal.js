// Check on load if user is admin or not
window.addEventListener("load", () => {
  if (window.localStorage.getItem("token") === null) {
    showStandardPage();
  } else {
    showAdminPage();
  }
});
const showStandardPage = () => {
  document.querySelector(".admin-header").style.display = "none";
  document.querySelector(".filters").style.display = "block";
  document.querySelector(".modale").style.display = "none";
  document.getElementById("edit-btn").style.display = "none";
};
const showAdminPage = () => {
  // Ouvrir la modale lorsqu'on clique sur le bouton "modifier"
  document.querySelector(".admin-header").style.display = "flex";
  document.querySelector(".filters").style.display = "none";
  document.querySelector("#edit-btn").style.display = "block";
};
document.querySelector("#publish-btn").addEventListener("click", () => {
  showStandardPage();
  window.localStorage.removeItem("token");
});
// Modal Settings
let modal = null;
const focusableSelector = "button,a,input,textarea";
let focusables = [];
let previouslyFocusedElement = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  modal.style.display = "flex";
  focusables[0].focus();
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

export const closeModal = function (e) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) {
    previouslyFocusedElement.focus();
  }
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
  document.querySelector(".ajout-photo").style.background = ``;
  document.getElementById("img-label").style.display = "";
  document.getElementById("add-photo-label").style.display = "";
  document.getElementById("max-photo").style.display = "";
  document.getElementById("add-photo-btn").style.background = "";
  document.getElementById("add-photo-title").style.border = "";
  document.getElementById("add-photo-categorie").style.border = "";
  document.getElementById("error-msg").innerText = "";
  document.querySelector(".ajout-photo").style.border = "";
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
};

// Open modal handler
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", (e) => {
    closeModal(e);
    openModal(e);
  });
});

// Exit modal on escape press
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});
