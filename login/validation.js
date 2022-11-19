//Traigo mi array de usuarios si es q existe
let user = JSON.parse(localStorage.getItem("user")) || []; // obtenemos los datos del localstorage o creamos un arreglo vacio

//input login
const userLoginInput = document.querySelector("#user");
//input password
const currentPassword = document.querySelector("#current-password");
//input form
const form = document.querySelector("form");
//small text error
const showPassword = document.querySelector("#show-password");
//contenedor de password
const passContainer = document.querySelector(".passwordContainer");

// LOGICA USUARIO EXISTE EN LA BASE DE DATOS

//¿El usuario existe? ¿Coincide contraseña con su usuario(email)?
const checkUserExist = (inputvalue) => {
  let valid = false;
  //input q ingresa (email), su value sin espacios
  const input = inputvalue.value.trim();
  //si esta vacio devolver error
  if (!input.length) {
    showError("Please enter your email adress.");
  } else if (isUserExisting(input) == undefined) {
    //si no existe o no coincide ese mail
    showError("Please, enter with your email adress or create an account.");
  } else if (!isUserExisting(input)) {
    //Si devuelve false porque no hay algo q coincida, lo paso a true para mostrar el error
    showError("Incorrect email adress or password");
  } else {
    valid = true;
  }
  return valid;
};

// Funcion para mostrar error
const showError = (message) => {
  const error = document.querySelector(".showmessage");
  error.textContent = message;
};

// toggle contraseña y repeat contraseña
showPassword.addEventListener("click", () => {
  showPassword.classList.toggle("fa-eye");
  const type =
    currentPassword.getAttribute("type") === "password" ? "text" : "password";
  currentPassword.setAttribute("type", type);
});

//Funcion para verificar en el array de objetos si hay algun usuario que coincida con alguno ya cargado
const isUserExisting = (emailuser) => {
  //Me trago el usuario que ingresó
  let valid = false;
  const existingUserList = user.find((email) => email.email === emailuser);
  if (existingUserList == undefined) {
    return;
  } else if (
    //comparacion de input.value con los datos de usuario
    existingUserList.email == userLoginInput.value.trim() &&
    existingUserList.password == currentPassword.value.trim()
  ) {
    //Si ambos son correctos y coinciden que cambie la condicion de logued a true
    isLogedTrue(existingUserList);
    valid = true;
  }
  return valid;
};

//Funcion que loguea (true) al usuario una vez verificado sus datos e ingreso
const isLogedTrue = (userFinded) => {
  let valid = false;
  //El usuario logueado con contraseña y email q coinciden le activo su logueo a true
  user = user.map((userItem) => {
    return userItem.id === userFinded.id
      ? { ...userItem, isLoged: true }
      : userItem;
  });
  //lo guardo
  localStorage.setItem("user", JSON.stringify(user));
  // Si se logró loguear, que redireccione al store
  if ((userFinded.isloged = true)) {
    valid = true;
  }
  return valid;
};

const submitForm = (e) => {
  e.preventDefault();
  //Si la validacion del usuario da true redireccionar
  if (checkUserExist(userLoginInput)) {
    window.location.href = "../index.html";
  }
};
const initValidateLogin = () => {
  form.addEventListener("submit", submitForm);
};

initValidateLogin();
