//Variables

const form = document.querySelector("form");
//url de la API
const baseURL = "https://api.rawg.io/api/";

//mi api key
const apiKey = "&key=de1dd16a530a4929b4b429dfe19acc7b";

//background del body que va a cambiar
const bodyBackground = document.getElementsByTagName("body");

//titulo dinamico sobre el juego que este en el bg
const nameBackgroundGame = document.querySelector(".nameBackgroundGame");

//boton de redireccionamiento a tienda
const backtostore = document.querySelector(".backtostore");

//boton de redireccionamiento a login
const goLoginbtn = document.querySelector(".goLoginbtn");
//Funcion para obtener un numero random de un array de objetos, incluidos el
//minimo y maximo, ademas de redondear por las dudas el numero que llega
function getRandomGame(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function styleBackground(game, image) {
  //Colocar background image al body
  document.body.style.backgroundImage = `url(${image})`;
  nameBackgroundGame.innerHTML = `<h3>Find "${game.name}" in our store</h3>`;
}

function isValidBG(game, image) {
  //que vuelva
  if (image === null) {
    document.body.style.backgroundColor = "#121212";
  } else {
    styleBackground(game, image);
  }
}

//traer background de la API
const traerBackgrounds = async () => {
  try {
    const response = await fetch(
      baseURL +
        "games/lists/greatest?discover=true&ordering=-added&page_size=40&page=1" +
        apiKey
    );
    //Filtro de mejores 40 juegos del 2022 games?dates=2022-01-01,2022-12-31&ordering=-added&ordering=-metacritic&page_size=40
    //Filtro de mejores juegos en general games/lists/greatest?discover=true&ordering=-added&page_size=40&page=1
    const data = await response.json();
    // console.log(data)
    console.log(data.results[getRandomGame(0, 40)]);

    const randomPopularGame2022 = data.results[getRandomGame(0, 40)];
    const getBackgroundImage = randomPopularGame2022.background_image;

    styleBackground(randomPopularGame2022, getBackgroundImage);
  } catch (err) {
    console.log(err);
  }
};

// //cada 30s cambia el fondo ACTIVVAR
// setInterval(traerBackgrounds, 30000);

//redirrecion al store back

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

// console.log(user.name)

// const fillUserLogin = () => {
//     if(user[-1].name)
// }


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
