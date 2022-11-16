//VARIABLES
const cardsGameContainer = document.querySelector(".cardsGame-container");
const filterBtn = document.querySelectorAll(".filter");
//DATA API
// GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
// GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7

//url de la API
const baseURL = "https://api.rawg.io/api/";

//mi api key
const apiKey = "&key=de1dd16a530a4929b4b429dfe19acc7b";

let filtro = "";

//Llamado a la api
const fetchAPI = async () => {
  try {
    const response = await fetch(baseURL + "games?" + apiKey + filtro);
    //Filtro todos los juegos primero, el filtro será redefinido segun la categoria
    const data = await response.json();
    const results = data.results;
    console.log(results[0]);

    renderProductRequested(results);
  } catch (err) {
    console.log(err);
  }
};

// render produtcs en el contenedor del store

const renderProductStore = (game) => {
  const {
    id,
    name,
    background_image,
    rating,
    genres,
    playtime,
    released,
    tags,
    ratings,
  } = game;
  //   console.log(genres);
  //   console.log(genresRender(genres));
  return `<div class="cardGame" id="${id}" style="background-image: url('${background_image}');">
                <div class="cardGameInfo onHover">
                    <h4>${name}</h4>
                    <div class="genres">
                        ${genresRender(genres)}
                    </div>
                    <div class="rating-price">
                        <p><img src="./assets/starIcon.png" alt=""><b>Rating:</b>${rating}</p>
                        <p><img src="./assets/priceIcon.png" alt=""><b>Price</b>10</p>
                    </div>
                    <div class="recommendedSystem">
                        <div class="dataGame">
                            <p><i class="fa-regular fa-clock"></i>Playtime: ${playtime}</p>
                            <p><i class="fa-regular fa-calendar"></i>Released: ${released}</p>
                        </div>
                        <div class="tags">
                            <i class="fa-solid fa-hashtag"></i><p>Tags:</p>
                                ${genresRender(tags)}

                        </div>
                        <div class="userratings">
                            <p>User Ratings</p>
                            <div class="allrates">
                                <p><i class="fa-solid fa-face-grin-stars"></i> ${
                                  ratings[0].title
                                }: ${ratings[0].percent}%</p>
                                <p><i class="fa-solid fa-face-smile"></i> ${
                                  ratings[1].title
                                }: ${ratings[1].percent}%</p>
                                <p><i class="fa-solid fa-face-meh"></i> ${
                                  ratings[2].title
                                }: ${ratings[2].percent}%</p>
                                <p><i class="fa-solid fa-face-frown"></i> ${
                                  ratings[3].title
                                }: ${ratings[3].percent}%</p>
                            </div>
                        </div>
                    </div>
                    <button class="add-btn">Add to cart</button>
                </div>
                </div>`;
};
const renderProductRequested = (productsList) => {
  const cards = productsList
    .map((game) => {
      return renderProductStore(game);
    })
    .join("");
  cardsGameContainer.innerHTML += cards;
};

// const genres = ["hola", "chau"];
//desglozar generos, como maximo mostrar solo 4
const genresRender = (genre) => {
  const chipGenre = genre.map((elemento) => `<p>#${elemento.name}</p>`);
  chipGenre.length = 3;
  return chipGenre.join("");
};

//LOGICA DE FILTROS
console.log(filterBtn[0].dataset)
const initManageProduct = () => {
  fetchAPI();
  // filterBtn.addEventListener("click", console.log(filterBtn.classList));
};

initManageProduct();
