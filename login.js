const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submitInput = document.querySelector("#submit");

submitInput.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    emailInput.value === "sophie.bluel@test.tld" &&
    passwordInput.value === "S0phie"
  ) {
    //CODE SI IDENTIFIANTS CORRECTS
    location.href = "index.html";
  } else {
    const emailError = document.createElement("p");
    emailError.innerText = "Veuillez rentrer des identifiants valides";
    document.querySelector("form").appendChild(emailError);
    emailInput.style.border = "1px solid red";
    passwordInput.style.border = "1px solid red";
  } // CODE SI IDENTIFIANTS INCORRECTS
  emailInput.value = "";
  passwordInput.value = "";
});
