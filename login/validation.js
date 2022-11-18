let user = JSON.parse(localStorage.getItem("user")) || []; // obtenemos los datos del localstorage o creamos un arreglo vacio

// const saveLocalStorage = () => {
//   // funcion para guardar en el localstorage
//   console.log("lo guarde");
//   localStorage.setItem("saveLoginUser", JSON.stringify(saveLoginUser));
// };

// const saveLoginUser = () => {
//   saveLoginUser = {
//     // y agregamos el nuevo turno
//     id: this.id,
//     name: this.name,
//     email: this.email,
//     date: this.date,
//     password: this.password,
//     country: this.country,
//   };
// };

const userLoginInput = document.querySelector("#user");
const currentPassword = document.querySelector("#current-password");
const form = document.querySelector("form");
const showPassword = document.querySelector("#show-password");
const passContainer = document.querySelector(".passwordContainer");

const checkUserExist = (inputvalue) => {
  // const [{ name, email }] = user;
  let valid = true;
  // console.log(user);
  // console.log(name);
  const input = inputvalue.value.trim();
  // console.log(input);
  if (!input.length) {
    showError(inputvalue, "Please enter your email adress.");
  } else if (!isUserExisting(input)) {
    showError(inputvalue, "Incorrect email adress or password");
  } else {
    showError(inputvalue, "coincide");
    valid = true;
  }
  
  return valid;
};

// const checkPasswordGood = (inputvalue, inputError) => {
//   // const [{ name, password }] = user;
//   let valid = true;
//   // console.log(user);
//   // console.log(name);
//   const input = inputvalue.value.trim();
//   // console.log(input);
//   if (!input.length) {
//     showError(inputError, "Please enter your email adress.");
//   } else if (findUserPassword() == input) {
//     showError(inputError, "Incorrect email adress or password");
//   } else {
//     showError(inputError, "coincide");
//     valid = true;
//   }

//   return valid;
// };

const showError = (input, message) => {
  const smallText = input.parentElement;
  // console.log(smallText);
  const error = smallText.querySelector(".showmessage");
  error.textContent = message;
};
// const replaceNameToLogin = () => {
//   const [{ name }] = name;

//   loginButton.style.display = "none";
//   userButton.style.display = "flex";
//   userNW.innerHTML = `${name}`;
// };
// const replaceNameToLogout = () => {
//   const lastIndexOfArrayUser = user.length - 1;
//   const name = user[lastIndexOfArrayUser].name;

//   loginButton.style.display = "flex";
//   userButton.style.display = "none";
//   userNW.innerHTML = `${name}`;
// };

const submitForm = (e) => {
  e.preventDefault();

  const isValidForm = () => {
    // funcion para validar el formulario
    const isValidEmail = checkUserExist(userLoginInput); // validamos el email
    // const isValidPassword = checkPasswordGood(currentPassword, passContainer); // validamos el telefono
    return isValidEmail;
    // && isValidPassword;
  };
  // console.log(isValidForm());
  if (isValidForm()) {
    //Si el formulario es valido, verifico si existe en el sistema
    // if (isUserExisting(userLoginInput.value.trim())) {
    //   console.log(existingUserList)
    //   window.location.href = "../index.html";
    // }
    if (isUserExisting(userLoginInput.value.trim())) {
      
    }
    // let loginData = user
    // loginData[0].isloged = true;
    // localStorage.setItem("user", JSON.stringify(user));
    // if(user.isloged = true) {window.location.href = "../index.html"};
  }
};
// toggle contraseña y repeat contraseña
showPassword.addEventListener("click", () => {
  // console.log("funciono");
  // console.log(showPassword1.classList);
  showPassword.classList.toggle("fa-eye");
  const type =
    currentPassword.getAttribute("type") === "password" ? "text" : "password";
  currentPassword.setAttribute("type", type);
});

//Veo si en mi array de objetos coincide el usuario con alguno ya cargado
const isUserExisting = (emailuser) => {
  //Me trago el usuario que ingresó
  const existingUserList = user.find((email) => email.email === emailuser);
  if (existingUserList == undefined) {
    console.log("no anda");
    ;
  } else if (existingUserList.email == userLoginInput.value.trim() && existingUserList.password == currentPassword.value.trim()) {
    console.log("Contraseñas coinciden");
    isLogedTrue(existingUserList)

  }
  return existingUserList
};

const isLogedTrue = (userFinded) => {
  //El usuario logueado con contraseña y email q coinciden le activo su logueo a true
  user = user.map((userItem) => {
    return userItem.id === userFinded.id
      ? { ...userItem, isLoged: true }
      : userItem;
  });
  localStorage.setItem("user", JSON.stringify(user));
  //Si se logró loguear, que redireccione al store
  if(userFinded.isloged = true) {window.location.href = "../index.html"};
};

const initValidateLogin = () => {
  form.addEventListener("submit", submitForm);
};

initValidateLogin();
