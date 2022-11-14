let user = JSON.parse(localStorage.getItem("user")) || []; // obtenemos los datos del localstorage o creamos un arreglo vacio

const saveLocalStorage = () => {
  // funcion para guardar en el localstorage
  console.log("lo guarde");
  localStorage.setItem("user", JSON.stringify(user)); // guardamos el arreglo agenda en el localstorage
};


const saveData = () => {

  user = [
    // creamos un nuevo arreglo
    ...user, // con los datos anteriores
    {
      // y agregamos el nuevo turno
      id: user.length + 1,
      name: nameInput.value,
      email: emailInput.value,
      date: birthdayInput.value,
      password: passwordInput.value,
      country: countryInput.value,
    },
  ];
  console.log(user.length)
};
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
  console.log(isValidForm());
  if (isValidForm()) {
    saveData(); // guardamos los datos
    form.reset(); // reseteamos el formulario
    saveLocalStorage(); // guardamos en el localstorage
    form.submit();
    window.location.href = "../index.html";

  }
};

const init = () => {
  traerBackgrounds();
  backtostore.addEventListener("click", () => {
    setTimeout(() => {
      document.location.href = "../index.html";
    }, 2000);
  });
  goLoginbtn.addEventListener("click", () => {
    setTimeout(() => {
      document.location.href = "../login/login.html";
    }, 2000);
  });
  form.addEventListener("submit", submitForm); // al enviar el formulario se ejecuta la funcion submitForm
};

init();
