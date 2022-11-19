//Variables
//url de la API
const baseURL = "https://api.rawg.io/api/";

//mi api key
const apiKey = "&key=de1dd16a530a4929b4b429dfe19acc7b";

//background del body que va a cambiar
const bodyBackground = document.getElementsByTagName("body");

//titulo dinamico sobre el juego que este en el bg
const nameBackgroundGame = document.querySelector(".nameBackgroundGame");

//boton de redireccionamiento
const backtostore = document.querySelector(".backtostore");

//boton de redireccionamiento
const gotocreatebtn = document.querySelector(".gotocreatebtn");

// LOGICA BACKGROUND DINAMICO

//Funcion para obtener un numero random de un array de objetos, incluidos el
//minimo y maximo, ademas de redondear por las dudas el numero que llega
function getRandomGame(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Funcion de estilado de background
function styleBackground(game, image) {
  //Colocar background image al body
  document.body.style.backgroundImage = `url(${image})`;
  nameBackgroundGame.innerHTML = `<h3>Find "${game.name}" in our store</h3>`;
}

//Funcion para verificar existencia del bg
function isValidBG(game, image) {
  //que vuelva
  if (image === null) {
    //en caso de que no exista imagen
    document.body.style.backgroundColor = "#121212";
  } else {
    styleBackground(game, image);
  }
}

//Traer background de la API
const traerBackgrounds = async () => {
  try {
    const response = await fetch(
      baseURL +
        "games/lists/greatest?discover=true&ordering=-added&page_size=40&page=1" +
        apiKey
    );
    const data = await response.json();

    //Randomizo el juego, consigo su background, lo estilo
    const randomPopularGame2022 = data.results[getRandomGame(0, 40)];
    const getBackgroundImage = randomPopularGame2022.background_image;
    styleBackground(randomPopularGame2022, getBackgroundImage);
  } catch (err) {
    console.log(err);
  }
};

//cada 1 minuto cambia el fondo
setInterval(traerBackgrounds, 60000);

const initBG = () => {
  traerBackgrounds();
  //redirrecion al store back
  backtostore.addEventListener("click", () => {
    setTimeout(() => {
      document.location.href = "../index.html";
    }, 2000);
  });
  //redirrecion al sign up
  gotocreatebtn.addEventListener("click", () => {
    setTimeout(() => {
      document.location.href = "../signup/signup.html";
    }, 2000);
  });
};

initBG();
