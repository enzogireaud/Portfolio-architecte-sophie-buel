const response = await fetch("http://localhost:5678/api/works");
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
//Toutes catégories
const boutonTous = document.querySelector(".tous-btn");
boutonTous.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(works);
});
// Catégorie objets
const boutonObjet = document.querySelector(".objet-btn");
boutonObjet.addEventListener("click", function () {
  const workObjet = works.filter(function (work) {
    return work.category.name === "Objets";
  });
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(workObjet);
});

// Catégorie appartements
const boutonAppartement = document.querySelector(".appartement-btn");
boutonAppartement.addEventListener("click", function () {
  const workAppartement = works.filter(function (work) {
    return work.category.name === "Appartements";
  });
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(workAppartement);
});
// Catégorie hotel
const boutonHotel = document.querySelector(".hotel-btn");
boutonHotel.addEventListener("click", function () {
  const workHotel = works.filter(function (work) {
    return work.category.name === "Hotels & restaurants";
  });
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(workHotel);
});
