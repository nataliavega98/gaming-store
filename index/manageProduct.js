//VARIABLES

//contenedor render
const cardsGameContainer = document.querySelector(".cardsGame-container");

//boton filtro
const filterBtn = document.querySelector(".filter");
//nodelist de filtros
const filterData = document.querySelectorAll(".filter");
//contenedor de filtros
const filtercontainer = document.querySelector(".filter-container");
//next
const pagenextBtn = document.querySelector(".pagenextBtn");
//previous
const pageprevBtn = document.querySelector(".pageprevBtn");
//contenedor de botones de paginacion
const pageControlContainer = document.querySelector(".pageControl");
//numero indicador de la pagina actual
const pageNumberP = document.querySelector(".pageNumber");
//Numero showing page of 6
const locationPageStoreNumber = document.querySelector(
  ".locationPageStoreNumber"
);

//DATA API
// GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
// GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7

//VARIABLES DE API - modificables para sus filtros y paginado
//url de la API
const baseURL = "https://api.rawg.io/api/";
//page locaton
let pageLocation = "games?";
//mi api key
const apiKey = "&key=de1dd16a530a4929b4b429dfe19acc7b";
//mi filtro dinamico
let filter = "";
//cantidad q trae cada pedido
let pageSize = "&page_size=6";

let pageNumber = "&page=1";

//Llamado a la api
const fetchAPI = async () => {
  //cada vez que se llama a la api se ejecuta el loader
  renderLoader();
  try {
    const response = await fetch(
      baseURL + pageLocation + apiKey + pageSize + pageNumber + filter
    );
    //Filtro todos los juegos primero, el filtro será redefinido segun la categoria
    const data = await response.json();
    const results = data.results;
    //saco el loader
    cleanRenderLoader();
    //renderizo el resultado
    renderProductRequested(results);
  } catch (err) {
    console.log(err);
  }
};

//loader de productos
const renderLoader = () => {
  const cardLoad = `<div class="cardGameLoading";">
  <div class="cardGameInfoLoading">
      <i class="fa-solid fa-chevron-up"></i>
      <div class="background-blurLoading">
          <h4 class="shinny"></h4>
          <div class="genresLoading">
              <p class="shinny"></p><p class="shinny"></p><p class="shinny"></p>
          </div>
          <div class="rating-priceLoading">
              <p class="shinny"></p>
              <p class="shinny"> </p>
          </div>                        
      </div>
      <button class="add-btnLoading shinny"></button>
  </div>
</div>`;
  let times = 6; //quiero q se rendericen 6

  for (let i = 0; i < times; i++) {
    cardsGameContainer.innerHTML += cardLoad;
  }
};

const cleanRenderLoader = () => {
  cardsGameContainer.innerHTML = ``;
};

//como no tiene precio la API genero un numero random
function getRandomPrice() {
  return Math.floor(Math.random() * (100 - 1 + 1) + 1);
}

// Render produtcs en el contenedor del store
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
    metacritic, //uso metacritic para precio porque no hay valor en la api
  } = game;
  // Defino la cantidad en 1 ya que la api no tiene este valor
  let quantity = 1;

  return `
                <div class="cardGame" id="${id}" style="background-image: url('${background_image}');">
                <div class="cardGameInfo onHover">
                    <i class="fa-solid fa-chevron-up"></i>
                    <div class="background-blur">
                        <h4>${name}</h4>
                        <div class="genres">
                            ${genresRender(genres)}
                        </div>
                        <div class="rating-price">
                            <p><img src="./assets/starIcon.png" alt=""><b>Rating:</b>${rating}</p>
                            <p><img src="./assets/priceIcon.png" alt=""><b>Price</b>${
                              metacritic || 50
                            }€</p>
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
                    </div>
                    <button class="add-btn" data-id="${id}" data-name="${name}" data-price="${
    metacritic || 50
  }" data-bg="${background_image}" data-quantity="${quantity}">Add to cart</button>
                </div>
              </div>
  `;
};

// Funcion que buscca dentro del parametro (results), ejecuta el render y luego lo agrega al html del contenedor store
const renderProductRequested = (productsList) => {
  const cards = productsList
    .map((game) => {
      return renderProductStore(game);
    })
    .join("");
  cardsGameContainer.innerHTML += cards;
};

//desglozar generos de la api, como maximo mostrar solo 3
const genresRender = (genre) => {
  const chipGenre = genre.map((elemento) => `<p>${elemento.name}</p>`);
  chipGenre.length = 3;
  return chipGenre.join("");
};

//LOGICA DE FILTROS

//Limpio el contenedor de productos
const cleanRender = () => {
  cardsGameContainer.innerHTML = "";
};

//Funcion para mostrar activo el filtro
const filterActiveState = (e) => {
  const filterTag = e.target.classList;
  filterData.forEach((filterData) => {
    if (filterData.classList.contains("active")) {
      filterData.classList.remove("active");
    }
  });

  filterTag.add("active");
};

//Funcion que limpia y renderiza lo nuevo
const resetStore = () => {
  cleanRender();
  fetchAPI();
};

//Logica de filtro, segun el data-filter del filtro seleccionado se cambia la variable filter del fetch de la api
const renderFilteredProducts = (e) => {
  //vuelvo a ponerlo en pagina 1
  const filterTag = e.target.dataset.filter;
  if (filterTag == undefined) {
    //Si es undefined no devolver, ni alterar nada
    return;
  } else if (filterTag == "allgames") {
    //filter vacio para all games
    filter = ``;
  } else {
    //aplicar filtro según el data-filter
    filter = `&genres=${filterTag}`;
  }
  //setear en 1 la página, en base a este se hace la paginacion
  pageNumberP.innerText = 1;
  locationPageStoreNumber.innerText = 1;
  pageprevBtn.style.display = "none";
  pagenextBtn.style.display = "block";
  filterActiveState(e);
  resetStore();
};

//Función paginado next
const nextPage = () => {
  //sumo 1
  pageNumberP.innerText = parseInt(pageNumberP.innerText) + 1;
  locationPageStoreNumber.innerText =
    parseInt(locationPageStoreNumber.innerText) + 1;
  // la variable pagenumber del llamado a la api cambia según el numero mostrado
  if (pageNumberP.innerText == 1) {
    pageprevBtn.style.display = "none";
    pageNumber = `&page=${(pageNumberP.innerText = 1)}`;
    pagenextBtn.style.display = "block";
  } else if (pageNumberP.innerText == 6) {
    //solo quiero q tenga 6 páginas
    pagenextBtn.style.display = "none";
    pageNumber = `&page=${(pageNumberP.innerText = 6)}`;
  } else {
    pageprevBtn.style.display = "block";
    pageNumber = `&page=${pageNumberP.innerText}`;
  }
};

//Funcion paginado prev
const prevPage = () => {
  //resto 1
  pageNumberP.innerText = parseInt(pageNumberP.innerText) - 1;
  locationPageStoreNumber.innerText =
    parseInt(locationPageStoreNumber.innerText) - 1;
  // la variable pagenumber del llamado a la api cambia según el numero mostrado
  if (pageNumberP.innerText == 1) {
    pagenextBtn.style.display = "block";
    pageprevBtn.style.display = "none";
    pageNumber = `&page=${(pageNumberP.innerText = 1)}`;
  } else {
    pageprevBtn.style.display = "block";
    pageNumber = `&page=${pageNumberP.innerText}`;
  }
};

//Funcion de paginación que realiza el cambio
const changePage = (e) => {
  if (
    //next page
    e.target.classList.contains("fa-angle-right") ||
    e.target.classList.contains("pagenextBtn")
  ) {
    nextPage();
    resetStore();
  } else if (
    //previous page
    e.target.classList.contains("fa-chevron-left") ||
    e.target.classList.contains("pageprevBtn")
  ) {
    prevPage();
    resetStore();
  }
};

const initManageProduct = () => {
  fetchAPI();
  filtercontainer.addEventListener("click", renderFilteredProducts);
  pageprevBtn.addEventListener("click", changePage);
  pagenextBtn.addEventListener("click", changePage);
};

initManageProduct();
