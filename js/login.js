let tokenId;

function login() {
  // On récupère les données des inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorText = document.getElementById("error-text");

  // On stock les valeurs dans un objet
  const user = { email, password };

  if (!email || !password) {
    document.getElementById("email").classList.add("error");
    document.getElementById("password").classList.add("error");
    errorText.textContent = "Veuillez remplir tout les champs";
  } else {
    // On fait une requête a l'api http
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or password.");
        }
        return response.json();
      })
      .then((data) => {
        tokenId = data.token;
        window.localStorage.setItem("token", tokenId);
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("email").classList.add("error");
        document.getElementById("password").classList.add("error");
        errorText.textContent = "Veuillez rentrer des identifiants valides";
      });
  }
}

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

// S0phie
