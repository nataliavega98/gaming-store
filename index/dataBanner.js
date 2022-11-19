//Array de objetos para el Banner
const bannerGames = [
  {
    id: 1,
    name: "Hogwarts Legacy",
    description:
      "Hogwarts Legacy is an immersive, open-world action RPG. Now you can take control of the action and be at the center of your own adventure in the wizarding world.",
    genres: ["<p>Action</p>", "<p>RPG</p>", "<p>Adventure</p>"],
    gameLogo: "./assets/bannerHeroAssets/hogwartsLogo.svg",
    source: "./assets/bannerHeroAssets/hogwarts-legacy.mp4",
    cover: "./assets/bannerHeroAssets/hogwartsLegacy.png",
    price: 50,
  },
  {
    id: 2,
    name: "FIFA 23",
    description:
      "FIFA 23 brings The World's Game to the pitch, with HyperMotion2 Technology that delivers even more gameplay realism, men's and women's FIFA World Cup™ coming during the season, women's club teams, cross-play features*, and more.",
    genres: ["<p>Sports</p>", "<p>Simulation</p>"],
    gameLogo: "./assets/bannerHeroAssets/fifaLogo.png",
    source: "./assets/bannerHeroAssets/fifa-2023.mp4",
    cover: "./assets/bannerHeroAssets/fifa2023.jpg",
    price: 105,
  },
  {
    id: 3,
    name: "STRAY",
    description:
      "Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.",
    genres: ["<p>Indie</p>", "<p>Adventure</p>"],
    gameLogo: "./assets/bannerHeroAssets/strayLogo.png",
    source: "./assets/bannerHeroAssets/stray.mp4",
    cover: "./assets/bannerHeroAssets/stray.jpg",
    price: 30,
  },
  {
    id: 4,
    name: "Life Is Strange 4",
    description:
      "Alex Chen hides her 'curse': the psychic power of Empathy, the ability to absorb the emotions of others. When her brother dies in a so-called accident, Alex must embrace her power to find the truth.",
    genres: ["<p>Action</p>", "<p>Adventure</p>"],
    gameLogo: "./assets/bannerHeroAssets/lisLogo.png",
    source: "./assets/bannerHeroAssets/lis-truecolors.mp4",
    cover: "./assets/bannerHeroAssets/LIS.png",
    price: 60,
  },
  {
    id: 5,
    name: "Cuphead",
    description:
      "Another helping of classic Cuphead action awaits you in Cuphead - The Delicious Last Course! Brothers Cuphead and Mugman are joined by the clever, adventurous Ms. Chalice for a rollicking adventure on a previously undiscovered Inkwell Isle! ",
    genres: ["<p>Indie</p>", "<p>Adventure</p>"],
    gameLogo: "./assets/bannerHeroAssets/cupheadLogo.png",
    source: "./assets/bannerHeroAssets/cuphead.mp4",
    cover: "./assets/bannerHeroAssets/cuphead.jpg",
    price: 15,
  },
  {
    id: 6,
    name: "Resident Evil 4",
    description:
      "Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, tracks the president's kidnapped daughter to a secluded European village, where there is something terribly wrong with the locals.",
    genres: ["<p>Action</p>", "<p>Adventure</p>"],
    gameLogo: "./assets/bannerHeroAssets/residenevilLogo.png",
    source: "./assets/bannerHeroAssets/resident-evil.mp4",
    cover: "./assets/bannerHeroAssets/residentEvil.png",
    price: 25,
  },
];

// VARIABLES
//Button slider previous
const previousVideoButton = document.getElementById("previousVideo");
//Button slider next
const nextVideoButton = document.getElementById("nextVideo");
//Video
const video = document.getElementById("video");
//Contenedor video
const videoPlayer = document.getElementById("videoPlayer");
//Contenedor del game logo
const gameLogo = document.getElementById("gameLogo");
//Contenedor de la descripcion del juego
const gameBannerDescription = document.getElementById(
  "game-banner-description"
);
//Contenedor de los generos
const gameBannerGenre = document.getElementById("genres");
//Boton
const buttonAddBanner = document.querySelector(".btn-banner");

//LOGICA DEL CARRUSEL
let reproducingVideo = 0;

//Randomizar el video que aparece al cargar la página y rellenar los datos
document.addEventListener("DOMContentLoaded", () => {
  //randomizar video y traerlo
  const randomVideo = Math.floor(
    Math.random() * (bannerGames.length - 1 - 0 + 1) + 0
  );
  //llenar datos de video random
  video.src = bannerGames[randomVideo].source;
  gameLogo.src = bannerGames[randomVideo].gameLogo;
  gameBannerDescription.textContent = bannerGames[randomVideo].description;
  gameBannerGenre.innerHTML = bannerGames[randomVideo].genres.join("");
  buttonAddBanner.setAttribute("data-id", `${bannerGames[randomVideo].id}`);
  buttonAddBanner.setAttribute("data-name", `${bannerGames[randomVideo].name}`);
  buttonAddBanner.setAttribute("data-bg", `${bannerGames[randomVideo].cover}`);
  buttonAddBanner.setAttribute(
    "data-price",
    `${bannerGames[randomVideo].price}`
  );

  videoPlayer.load();
  videoPlayer.play();
});

//Función de cambio de video
function changeVideo(orientation) { //llega el parametro de "next" o "previous"
  switch (reproducingVideo) {
    //un video atrás, resto el index actual en el q este
    case 0:
      if (orientation == "previous") {
        reproducingVideo = bannerGames.length - 1;
      } else {
        reproducingVideo++; //si no es previous, que vaya un video más xq es next
      }
      break;
    
      //si esta en el ultimo vuelve al primero, es decir index 0
    case bannerGames.length - 1:
      if (orientation == "next") {
        reproducingVideo = 0;
      } else { //si no es asi, solo resta uno
        reproducingVideo--;
      }
      break;
      
    //si llega next suma uno
    default:
      if (orientation == "next") {
        reproducingVideo++;
      } else {
        reproducingVideo--;
      }
      break;
  }
}

// Funcion que determina el video y la data dentro del los contenedores
const setAndStyleVideo = () => {
  video.src = bannerGames[reproducingVideo].source;
  gameLogo.src = bannerGames[reproducingVideo].gameLogo;
  gameBannerDescription.textContent = bannerGames[reproducingVideo].description;
  gameBannerGenre.innerHTML = bannerGames[reproducingVideo].genres.join("");
  buttonAddBanner.setAttribute(
    "data-id",
    `${bannerGames[reproducingVideo].id}`
  );
  buttonAddBanner.setAttribute(
    "data-name",
    `${bannerGames[reproducingVideo].name}`
  );
  buttonAddBanner.setAttribute(
    "data-bg",
    `${bannerGames[reproducingVideo].cover}`
  );
  buttonAddBanner.setAttribute(
    "data-price",
    `${bannerGames[reproducingVideo].price}`
  );
};
const loadAndPlay = () => {
  videoPlayer.load();
  videoPlayer.play();
};
//Cambiar datos si el video termina
videoPlayer.onended = () => {
  changeVideo("next");
  setAndStyleVideo();
  loadAndPlay();
};

//Cambiar datos al apretar el boton next
nextVideoButton.addEventListener("click", () => {
  changeVideo("next");
  setAndStyleVideo();

  loadAndPlay();
});

//Cambiar datos al apretar el boton previous
previousVideoButton.addEventListener("click", () => {
  changeVideo("previous");
  setAndStyleVideo();
  loadAndPlay();
});
