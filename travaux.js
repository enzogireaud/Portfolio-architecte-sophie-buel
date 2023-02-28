const response = await fetch("http://localhost:5678/api/works").catch(function (
  error
) {
  console.log(
    "Il y a eu un problème avec l'opération fetch : " + error.message
  );
});
const works = await response.json();
console.log(works);

function genererWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    // Récupération de l'élement du dom qui accueillera mes figures
    const gallerie = document.querySelector(".gallery");
    // Création d'une balise dédiée à chaque travail
    const workElement = document.createElement("figure");
    // Création des balises qui vont contenirs les élements de chaque travail
    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;
    imgElement.alt = work.title;
    //*** */
    const captionElement = document.createElement("figcaption");
    captionElement.innerText = work.title;
    // On rattache la balise work a son parent gallerie
    gallerie.appendChild(workElement);
    // On rattache les élements a leur balise parent WORK
    workElement.appendChild(imgElement);
    workElement.appendChild(captionElement);
  }
}
genererWorks(works);
// Triage par catégorie

// Catégorie hotel
const filterByCategory = (categorie) => {
  const work = works.filter(function (work) {
    return work.category.name === categorie;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(work);
  console.log("Le code se lance au reload");
};

//Toutes catégories
const boutonTous = document.querySelector(".tous-btn");
boutonTous.addEventListener("click", () => {
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(works);
});

//HOTEL
const boutonHotel = document.querySelector(".hotel-btn");
boutonHotel.addEventListener("click", () =>
  filterByCategory("Hotels & restaurants")
);

// Catégorie appartements
const boutonAppartement = document.querySelector(".appartement-btn");
boutonAppartement.addEventListener("click", () =>
  filterByCategory("Appartements")
);

// Catégorie objets
const boutonObjet = document.querySelector(".objet-btn");
boutonObjet.addEventListener("click", () => filterByCategory("Objets"));
