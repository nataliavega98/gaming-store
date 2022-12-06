//VARIABLES
// input de nombre
const nameInput = document.querySelector("#name");

// email input
const emailInput = document.querySelector("#newuser");

//mensaje de error
const showMessage = document.querySelector(".showMessage");

//opciones de pais
const countryOption = document.querySelectorAll("option");

//input de pais
const countryInput = document.querySelector("#country");

//input de cumpleaños
const birthdayInput = document.querySelector("#birthday");

//input de contraseña
const passwordInput = document.querySelector("#newcurrent-password");

//input de contraseña
const passwordField = document.querySelector("#repeatcurrent-password");

//botones de hide contraseña
const showPassword1 = document.querySelector("#show-password1");
const showPassword2 = document.querySelector("#show-password2");

//input de contraseña contenedor
const newpassInput = document.querySelector("#newpassInput");

//Funcion de error
const showError = (input, message) => {
  const smallText = input.parentElement;

  const error = smallText.querySelector("small");
  error.textContent = message;
};

//Funcion de limpiar error
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
    valid = true;
  }
  return valid;
};

//validacion mail
const checkEmail = (emailInput) => {
  let valid = false;
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

//validacion country
const checkCountry = (countryInput, countryOption) => {
  let valid = false;

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

// Funcion para saber si tiene o es menor a 14 años
const getOlderThan = () => {
  let currentDate = new Date(); // creamos una fecha con la fecha de hoy

  let year = currentDate.getFullYear() - 14;
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  const result = `${year}-${month}-${day}`;
  return result;
};

//validar mayoria de edad 14 años
const checkDate = (birthdayInput) => {
  let valid = false;

  // input ingresado con edad
  const birthday = new Date(birthdayInput.value);

  // resutlado dinamico de fecha para saber a partir de que dia, mes, año tienen +14años
  const currentdate = new Date(getOlderThan());

  //me devuelve el valor en milisegundos,
  //si el valor es igual a 0 o negativo significa q es mayor o igual a años
  const difference = birthday.getTime() - currentdate.getTime();

  // si es mayor de 14 o cumplio justo
  if (difference <= 0) {
    valid = true;
    clearError(birthdayInput);
  } else if (birthdayInput.value.length == 0) { //si no introduce nada
    showError(birthdayInput, "Please enter your date of birth");
  } else { //si es menor de 14
    showError(birthdayInput, "You must be over 14 years old");
  }

  return valid;
};

//toggle contraseña y repeat contraseña
showPassword1.addEventListener("click", () => {
  showPassword1.classList.toggle("fa-eye");
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
});

showPassword2.addEventListener("click", () => {

  showPassword2.classList.toggle("fa-eye");
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
});

//contraseña valida
const checkPassword = (passInput) => {
  let valid = false;
  const password = passInput.value.trim();

  if (!password.length) {
    showError(passInput, "Password is required");
  } else if (!isPassValid(password)) {
    showError(
      passInput,
      "The password must have at least 8 characters, one uppercase, one lowercase and one special character"
    );
  } else {
    valid = true;
  }
  return valid;
};

// regex password, contraseña con mayuscula, minusucla, 8 caracteres y uno especial
const isPassValid = (pass) => {
  const re =
    /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return re.test(pass);
};

//check passwords iguales
const checkRepeatPassword = (passInput, passRepPass) => {
  let valid = false;
  const password = passInput.value.trim();
  const passrepeat = passRepPass.value.trim();
  if (password == passrepeat) {
    valid = true;
  } else {
    showError(passRepPass, "Passwords must match.");
  }
  return valid;
};

// Validacion formulario
const submitForm = (e) => {
  e.preventDefault();
  getOlderThan();
  const isValidForm = () => {
    // funcion para validar el formulario
    const isValidName = checkTextInput(nameInput); // validamos el nombre
    const isValidEmail = checkEmail(emailInput); // validamos el email
    const isValidCountry = checkCountry(countryInput, countryOption); // validamos el apellido
    const isValidDate = checkDate(birthdayInput); // validamos la fecha
    const isValidPassword = checkPassword(passwordInput); // validamos el telefono
    const isValidRepPass = checkPassword(passwordField);
    return (
      isValidName &&
      isValidDate &&
      isValidEmail &&
      isValidCountry &&
      isValidRepPass &&
      isValidPassword
    );
  };

  if (isValidForm()) {
    saveData(); // guardamos los datos
    form.reset(); // reseteamos el formulario
    saveLocalStorage(); // guardamos en el localstorage
    form.submit();

    //redirigir a login para que se loguee
    if (window.confirm("Your account has been created succesfully. If you want to enter your account click on 'accept' and log in with your user data")) {
      window.location.href = "../login/login.html";
      
    }

  }
};
