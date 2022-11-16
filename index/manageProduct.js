//VARIABLES

//contenedor render
const cardsGameContainer = document.querySelector(".cardsGame-container");

//boton filtro
const filterBtn = document.querySelector(".filter");
//nodelist de filtros
const filterData = document.querySelectorAll(".filter");
//contenedor de filtros
const filtercontainer = document.querySelector(".filter-container");
//DATA API
// GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
// GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7

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

//next
const pagenextBtn = document.querySelector(".pagenextBtn");
const pageprevBtn = document.querySelector(".pageprevBtn");
const pageControlContainer = document.querySelector(".pageControl");
const pageNumberP = document.querySelector(".pageNumber");
console.log(pageNumberP.innerText);
//Llamado a la api
const fetchAPI = async () => {
  try {
    const response = await fetch(
      baseURL + pageLocation + apiKey + pageSize + pageNumber + filter
    );
    //Filtro todos los juegos primero, el filtro será redefinido segun la categoria
    const data = await response.json();
    const results = data.results;
    console.log(results);
    console.log(data);

    renderProductRequested(results);
  } catch (err) {
    console.log(err);
  }
};

// render produtcs en el contenedor del store

const renderProductStore = (game) => {
  // console.log(game);
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
  // console.log(
  //   `${id}-${name}-${background_image}-${genresRender(
  //     genres
  //   )}-${rating}-${released}-${playtime}-${genresRender(tags)}-${
  //     ratings[0].title
  //   }: ${ratings[0].percent}`
  // );
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
  // console.log(productsList)
  const cards = productsList
    .map((game) => {
      return renderProductStore(game);
    })
    .join("");
  // console.log((cardsGameContainer.innerHTML += cards));
  cardsGameContainer.innerHTML += cards;
};

// const genres = ["hola", "chau"];
//desglozar generos, como maximo mostrar solo 4
const genresRender = (genre) => {
  const chipGenre = genre.map((elemento) => `<p>${elemento.name}</p>`);
  chipGenre.length = 3;
  return chipGenre.join("");
};

//LOGICA DE FILTROS

const cleanRender = () => {
  cardsGameContainer.innerHTML = "";
};

const filterActiveState = (e) => {
  console.log(e);
  console.log(e.target.classList);
  console.log(filterData);
  const filterTag = e.target.classList;
  filterData.forEach((filterData) => {
    if (filterData.classList.contains("active")) {
      filterData.classList.remove("active");
    }
  });

  filterTag.add("active");
};

const resetStore = () => {
  cleanRender();
  fetchAPI();
};

const renderFilteredProducts = (e) => {
  // console.log(e.target.dataset.filter);
  //vuelvo a ponerlo en pagina 1
  const filterTag = e.target.dataset.filter;
  if (filterTag == "allgames") {
    filter = ``;
  } else if (filterTag == "top2022") {
    // console.log("entre");
    gameLocation = "games/lists/greatest?";
    filter = `&ordering=-rating`;
  } else {
    filter = `&genres=${filterTag}`;
    // console.log(filterTag);
  }
  pageNumberP.innerText = 1
  pageprevBtn.style.display = "none";
  pagenextBtn.style.display = "block";
  filterActiveState(e);
  resetStore();
  // products.innerHTML = productsList.map(renderProduct).join("");
  console.log(baseURL + "games?" + apiKey + filter);
};

//cada vez q haga click sume 1
// pageNumberP.innerText = 1;
const nextPage = () => {
  pageNumberP.innerText = parseInt(pageNumberP.innerText) + 1;
  console.log(pageNumberP.innerText);
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
    console.log(pageNumberP.innerText);
    pageNumber = `&page=${pageNumberP.innerText}`;
  }
};
const prevPage = () => {
  pageNumberP.innerText = parseInt(pageNumberP.innerText) - 1;
  console.log(pageNumberP.innerText);
  if (pageNumberP.innerText == 1) {
    pagenextBtn.style.display = "block";
    pageprevBtn.style.display = "none";
    pageNumber = `&page=${(pageNumberP.innerText = 1)}`;
  } else {
    pageprevBtn.style.display = "block";
    console.log(pageNumberP.innerText);
    pageNumber = `&page=${pageNumberP.innerText}`;
  }
};

//paginacion
const changePage = (e) => {
  console.log(e.target.classList);
  if ( //next page
    e.target.classList.contains("fa-angle-right") ||
    e.target.classList.contains("pagenextBtn")
  ) {
    // console.log(pageNumberP.innerText);
    nextPage();
    resetStore();
    // console.log(pageNumberP.innerText);
  } else if ( //previous page
    e.target.classList.contains("fa-chevron-left") ||
    e.target.classList.contains("pageprevBtn")
  ) {
    prevPage();
    resetStore();
  }
};
// console.log(filterBtn[0].dataset);
const initManageProduct = () => {
  fetchAPI();
  filtercontainer.addEventListener("click", renderFilteredProducts);
  pageprevBtn.addEventListener("click", changePage);
  pagenextBtn.addEventListener("click", changePage);
};

initManageProduct();
