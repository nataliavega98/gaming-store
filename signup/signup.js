//Variables
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

    const getBackgroundImage = await randomPopularGame2022.background_image;
    console.log(getBackgroundImage);

    //Colocar background image al body
    document.body.style.backgroundImage = `url(${getBackgroundImage})`;
    nameBackgroundGame.innerHTML = `<h3>Find "${randomPopularGame2022.name}" in our store</h3>`;
  } catch (err) {
    console.log(err);
  }
};

//redirrecion al store back

const init = () => {
  traerBackgrounds();
  backtostore.addEventListener("click", () => {
    setTimeout(() => {
      document.location.href = "../index/index.html";
    }, 2000);
  });
  goLoginbtn.addEventListener("click", () => {
    setTimeout(() => {
      document.location.href = "../login/login.html";
    }, 2000);
  });
};

init();
