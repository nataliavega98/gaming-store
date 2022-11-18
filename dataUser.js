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
      isLoged: false
    },
  ];
  console.log(user.length)
};
