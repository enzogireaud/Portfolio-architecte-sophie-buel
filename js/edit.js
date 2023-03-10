window.addEventListener("load", () => {
  if (window.localStorage.getItem("token") === null) {
    // Ouvrir la modale lorsqu'on clique sur le bouton "Ajouter une photo"
    var addPhotoBtn = document.getElementById("add-photo-btn");
    var addPhotoModal = document.getElementById("add-photo-modal");
    var closeBtn = document.getElementsByClassName("close")[0];

    addPhotoBtn.onclick = function () {
      addPhotoModal.style.display = "block";
    };

    // Fermer la modale lorsqu'on clique sur la croix ou en dehors de la modale
    closeBtn.onclick = function () {
      addPhotoModal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == addPhotoModal) {
        addPhotoModal.style.display = "none";
      }
    };
  }
});
