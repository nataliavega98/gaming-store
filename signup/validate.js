const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#newuser");
const showMessage = document.querySelector(".showMessage");
const countryOption = document.querySelectorAll("option");
const countryInput = document.querySelector("#country");
const birthdayInput = document.querySelector("#birthday");
const passwordInput = document.querySelector("#newcurrent-password");
const passwordField = document.querySelector("#repeatcurrent-password");
const showPassword1 = document.querySelector("#show-password1");
const showPassword2 = document.querySelector("#show-password2");
const newpassInput = document.querySelector("#newpassInput");



//error

const showError = (input, message) => {
  const smallText = input.parentElement;

  const error = smallText.querySelector("small");
  error.textContent = message;
};

//sacar error
const clearError = (input) => {
  const formField = input.parentElement;

  const error = formField.querySelector("small");
  error.textContent = "";
};

// input vacio?
const isEmpty = (value) => 0 === value.length;

//regex email
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//validacion texto
const checkTextInput = (input) => {
  let valid = false; // por defecto va a ser false
  const content = input.value.trim(); // trim() va a eliminar los espacios en blanco
  // verificamos si el campo esta ok o no
  if (isEmpty(content)) {
    // si esta vacio
    showError(input, "Please fill the name field."); // va a mostrar mi mensaje de error
  } else {
    clearError(input); // va a mostrar mi mensaje de exito
    console.log("si name");
    valid = true;
  }
  return valid;
};

//validacion mail
const checkEmail = (emailInput) => {
  let valid = false;
  console.log(emailInput);
  const emailValue = emailInput.value.trim();
  if (isEmpty(emailValue)) {
    showError(emailInput, "Please fill the email field.");
  } else if (!isEmailValid(emailValue)) {
    showError(emailInput, "Please enter a valid email address.");
  } else {
    clearError(emailInput); // va a mostrar mi mensaje de exito
    valid = true;
  }
  return valid;
};

const getOlderThan = () => {
  let currentDate = new Date(); // creamos una fecha con la fecha de hoy

  let year = currentDate.getFullYear() - 14;
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  const result = `${year}-${month}-${day}`;
  return result;
};

//validacion country
const checkCountry = (countryInput, countryOption) => {
  let valid = false;
  console.log("hola");

  // transformamos la nodelist en un array para usar el find
  const checkedInput = [...countryOption].find(
    (countryOption) => countryOption.selected
  );

  const countryValue = checkedInput.value;

  if (countryValue === "select") {
    showError(countryInput, "Please select a country");
  } else {
    valid = true;
    clearError(countryInput);
  }
  return valid;
};

//validar mayoria de edad 14 años
const checkDate = (birthdayInput) => {
  let valid = false;
  console.log("birtday", birthdayInput.value.length);
  // console.log(getOlderThan());
  const birthday = new Date(birthdayInput.value);
  const currentdate = new Date(getOlderThan());
  // console.log("birthday", birthday.getTime());
  // console.log("currentDate", currentdate.getTime());

  //me devuelve el valor en milisegundos,
  //si el valor es igual a 0 o negativo significa q es mayor o igual a años
  const difference = birthday.getTime() - currentdate.getTime();
  // console.log("difference", difference);

  if (difference <= 0) {
    valid = true;
    clearError(birthdayInput);
  } else if (birthdayInput.value.length == 0) {
    showError(birthdayInput, "Please enter your date of birth");
  } else {
    showError(birthdayInput, "You must be over 14 years old");
  }

  return valid;
};

//toggle contraseña y repeat contraseña
showPassword1.addEventListener("click", () => {
  console.log("funciono");
  console.log(showPassword1.classList);
  showPassword1.classList.toggle("fa-eye");
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
});

showPassword2.addEventListener("click", () => {
  console.log("funciono");
  console.log(showPassword2.classList);
  showPassword2.classList.toggle("fa-eye");
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
});

//contraseña valida
const checkPassword = (passInput) => {
  let valid = false;
  const password = passInput.value.trim();
  console.log(password.length);
  console.log(password.parentElement);
  if (!password.length) {
    // console.log("vacio");
    showError(passInput, "La contraseña es obligatoria");
  } else if (!isPassValid(password)) {
    showError(
      passInput,
      "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un caracter especial"
    );
  } else {
    valid = true;
  }
  return valid;
};

const isPassValid = (pass) => {
  const re =
    /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return re.test(pass);
};


