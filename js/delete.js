import { works } from "./travaux.js";

works.forEach((work) => {
  //Création de la gallerie a l'interieur de la modale
  const container = document.createElement("div");
  container.classList.add("modal-img");
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  img.id = work.id;
  //Input pour delete les élements
  const deleteInput = document.createElement("button");
  deleteInput.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteInput.classList.add("corbeille");
  // On rattache les élements a leur parents
  container.appendChild(img);
  container.appendChild(deleteInput);
  document.querySelector(".modale-works").appendChild(container);

  //On handle le delete au click sur l'input
  deleteInput.addEventListener("click", (e) => {
    fetch(`http://localhost:5678/api/works/${img.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(`Work ${img.id} deleted successfully!`);
        container.remove(); // Remove the element from the DOM
        document.getElementById(img.id).remove();
      })
      .catch((error) => {
        console.error(`There was a problem deleting Work ${img.id}:`, error);
      });
  });
});
