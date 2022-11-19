//Obtener array user, si no hay devovler []
let user = JSON.parse(localStorage.getItem("user")) || [];

//Funcion para guardar en el local storage
const saveLocalStorage = () => {
  localStorage.setItem("user", JSON.stringify(user)); // guardamos el arreglo agenda en el localstorage
};

// Funcion para creear nuevos usuarios
const saveData = () => {

  user = [
    
    ...user, 
    {
      
      id: user.length + 1,
      name: nameInput.value,
      email: emailInput.value,
      date: birthdayInput.value,
      password: passwordInput.value,
      country: countryInput.value,
      isLoged: false
    },
  ];
  
};
