import { closeModal } from "./modal.js";

const submit = document.getElementById("modale2-form");
const title = document.getElementById("add-photo-title");
const category = document.getElementById("add-photo-categorie");
const imgInput = document.getElementById("add-photo-file");
const token = window.localStorage.getItem("token");
const errorMsg = document.getElementById("error-msg");

imgInput.addEventListener("change", () => {
  document.querySelector(
    ".ajout-photo"
  ).style.background = `url(../assets/images/${imgInput.files[0].name}) center/cover`;
  document.getElementById("img-label").style.display = "none";
  document.getElementById("add-photo-label").style.display = "none";
  document.getElementById("max-photo").style.display = "none";
  document.getElementById("add-photo-btn").style.background = "rgb(29, 93, 54)";
});

submit.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!title.value || !category.value || !imgInput.value) {
    title.style.border = "1px solid red";
    category.style.border = "1px solid red";
    errorMsg.innerText = "Veuillez compléter tout les champs correctement";
    errorMsg.style.color = "red";
    document.querySelector(".ajout-photo").style.border = "1px solid red";
  } else {
    const formData = new FormData();
    formData.append("image", imgInput.files[0], "image");
    formData.append("title", title.value);
    formData.append("category", category.value);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        addNewWork(data.id);
        closeModal(e);
      });
  }
});
const addNewWork = (id) => {
  // Gallerie principale
  const work = document.createElement("figure");
  work.id = id;
  const img = document.createElement("img");
  img.src = `../assets/images/${imgInput.files[0].name}`;
  const caption = document.createElement("caption");
  caption.innerText = title.value;
  work.appendChild(img);
  work.appendChild(caption);
  document.querySelector(".gallery").appendChild(work);

  // Galerie dans la modale
  const container = document.createElement("div");
  container.classList.add("modal-img");

  const img2 = document.createElement("img");
  img2.src = `../assets/images/${imgInput.files[0].name}`;
  //Input pour delete les élements
  const deleteInput = document.createElement("button");
  deleteInput.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteInput.classList.add("corbeille");
  //
  container.appendChild(img2);
  container.appendChild(deleteInput);
  document.querySelector(".modale-works").appendChild(container);
  deleteInput.addEventListener("click", () => {
    container.remove();
    work.remove();
  });
};
