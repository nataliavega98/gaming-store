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

const checkUserExist = (inputvalue) => {
  const [{name, email}] = user;
  let valid = true;
  console.log(user);
  console.log(name);
  const input = inputvalue.value.trim();
  console.log(input);
  if (!input.length) {
    showError(inputvalue, "Please enter your email adress.");
  } else if (input !== email) {
    showError(inputvalue, "Incorrect email adress or password");
  } else {
    showError(inputvalue, "coincide");
    valid = true;
  }

  return valid;
};
const checkPasswordGood = (inputvalue) => {
  const [{ id, name, email, date, password, country }] = user;
  let valid = true;
  console.log(user);
  console.log(name);
  const input = inputvalue.value.trim();
  console.log(input);
  if (!input.length) {
    showError(inputvalue, "Please enter your email adress.");
  } else if (input !== password) {
    showError(inputvalue, "Incorrect email adress or password");
  } else {
    showError(inputvalue, "coincide");
    valid = true;
  }

  return valid;
};

const showError = (input, message) => {
  const smallText = input.parentElement;

  const error = smallText.querySelector("small");
  error.textContent = message;
};
const replaceNameToLogin = () => {
  const [{ name }] = name;

  loginButton.style.display = "none";
  userButton.style.display = "flex";
  userNW.innerHTML = `${name}`;
};
const replaceNameToLogout = () => {
  const lastIndexOfArrayUser = user.length - 1;
  const name = user[lastIndexOfArrayUser].name;

  loginButton.style.display = "flex";
  userButton.style.display = "none";
  userNW.innerHTML = `${name}`;
};

const submitForm = (e) => {
  e.preventDefault();

  const isValidForm = () => {
    // funcion para validar el formulario
    const isValidEmail = checkUserExist(userLoginInput); // validamos el email
    const isValidPassword = checkPasswordGood(currentPassword); // validamos el telefono
    return isValidEmail && isValidPassword;
  };
  console.log(isValidForm());
  if (isValidForm()) {
    
    // form.reset(); // reseteamos el formulario
    // // saveLocalStorage();
    // form.submit();
    let loginData = user
    loginData[0].isloged = true;
    localStorage.setItem("user", JSON.stringify(user));
    
    window.location.href = "../index.html";
  }
};

const initValidateLogin = () => {
  form.addEventListener("submit", submitForm);
};

initValidateLogin();
