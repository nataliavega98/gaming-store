//Array de objetos para el Banner

const bannerGames = [
  {
    id: 1,
    name: "Hogwarts Legacy",
    description:
      "Hogwarts Legacy is an immersive, open-world action RPG. Now you can take control of the action and be at the center of your own adventure in the wizarding world.",
    genres: ['<p>Action</p>', '<p>RPG</p>', '<p>Adventure</p>'],
    gameLogo: "assets/bannerHeroAssets/hogwartsLogo.svg",
    source: "assets/bannerHeroAssets/hogwarts-legacy.mp4",
  },
  {
    id: 2,
    name: "FIFA 23",
    description:"FIFA 23 brings The World's Game to the pitch, with HyperMotion2 Technology that delivers even more gameplay realism, men's and women's FIFA World Cup™ coming during the season, women's club teams, cross-play features*, and more.",
    genres: ["<p>Sports</p>", "<p>Simulation</p>"],
    gameLogo: "assets/bannerHeroAssets/fifaLogo.png",
    source: "assets/bannerHeroAssets/fifa-2023.mp4",
  },
  {
    id: 3,
    name: "STRAY",
    description:"Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.",
    genres: ["<p>Indie</p>", "<p>Adventure</p>"],
    gameLogo: "assets/bannerHeroAssets/strayLogo.png",
    source: "assets/bannerHeroAssets/stray.mp4",
  },
  {
    id: 4,
    name: "Life Is Strange 4",
    description:"Alex Chen hides her 'curse': the psychic power of Empathy, the ability to absorb the emotions of others. When her brother dies in a so-called accident, Alex must embrace her power to find the truth.",
    genres: ["<p>Action</p>", "<p>Adventure</p>"],
    gameLogo: "assets/bannerHeroAssets/lisLogo.png",
    source: "assets/bannerHeroAssets/lis-truecolors.mp4",
  },
  {
    id: 5,
    name: "Cuphead",
    description:"Another helping of classic Cuphead action awaits you in Cuphead - The Delicious Last Course! Brothers Cuphead and Mugman are joined by the clever, adventurous Ms. Chalice for a rollicking adventure on a previously undiscovered Inkwell Isle! ",
    genres: ["<p>Indie</p>", "<p>Adventure</p>"],
    gameLogo: "assets/bannerHeroAssets/cupheadLogo.png",
    source: "assets/bannerHeroAssets/cuphead.mp4",
  },
  {
    id: 6,
    name: "Resident Evil 4",
    description:"Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, tracks the president's kidnapped daughter to a secluded European village, where there is something terribly wrong with the locals.",
    genres: ["<p>Action</p>", "<p>Adventure</p>"],
    gameLogo: "assets/bannerHeroAssets/residenevilLogo.png",
    source: "assets/bannerHeroAssets/resident-evil.mp4",
  },
];

//Logica de Carrusel

const previousVideoButton = document.getElementById("previousVideo");
const nextVideoButton = document.getElementById("nextVideo");
const video = document.getElementById("video");
const videoPlayer = document.getElementById("videoPlayer");
const gameLogo = document.getElementById("gameLogo");
const gameBannerDescription = document.getElementById("game-banner-description");
const gameBannerGenre = document.getElementById("genres");
let reproducingVideo = 0;

//Randomizar el video que aparece
document.addEventListener('DOMContentLoaded', () => {
    const randomVideo = Math.floor(Math.random() * (bannerGames.length-1 - 0 + 1) + 0)
    video.src = bannerGames[randomVideo].source;
    gameLogo.src = bannerGames[randomVideo].gameLogo;
    gameBannerDescription.textContent = bannerGames[randomVideo].description;
    gameBannerGenre.innerHTML = bannerGames[randomVideo].genres.join('');
    videoPlayer.load();
    videoPlayer.play();   
});

//Función de cambio de video
function changeVideo(orientation) {
  switch (reproducingVideo) {
    case 0:
      if (orientation == "previous") {
        reproducingVideo = bannerGames.length - 1;
      } else {
        reproducingVideo++;
      }
      break;

    case bannerGames.length - 1:
      if (orientation == "next") {
        reproducingVideo = 0;
      } else {
        reproducingVideo--;
      }
      break;

    default:
      if (orientation == "next") {
        reproducingVideo++;
      } else {
        reproducingVideo--;
      }
      break;
  }
}

//Cambiar datos si el video termina
videoPlayer.onended = () => {
    changeVideo("next");
    video.src = bannerGames[reproducingVideo].source;
    gameLogo.src = bannerGames[reproducingVideo].gameLogo;
    gameBannerDescription.textContent = bannerGames[reproducingVideo].description;
    gameBannerGenre.innerHTML = bannerGames[reproducingVideo].genres.join('');
    videoPlayer.load();
    videoPlayer.play();

};

//Cambiar datos al apretar el boton next
nextVideoButton.addEventListener("click", () => {
  changeVideo("next");
  video.src = bannerGames[reproducingVideo].source;
  gameLogo.src = bannerGames[reproducingVideo].gameLogo;
  gameBannerDescription.textContent = bannerGames[reproducingVideo].description;
  gameBannerGenre.innerHTML = bannerGames[reproducingVideo].genres.join('');
  videoPlayer.load();
  videoPlayer.play();
});

//Cambiar datos al apretar el boton previous
previousVideoButton.addEventListener("click", () => {
  changeVideo("previous");
  video.src = bannerGames[reproducingVideo].source;
  gameLogo.src = bannerGames[reproducingVideo].gameLogo;
  gameBannerDescription.textContent = bannerGames[reproducingVideo].description;
  gameBannerGenre.innerHTML = bannerGames[reproducingVideo].genres.join('');
  videoPlayer.load();
  videoPlayer.play();
});

//DATA API
// GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
// GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7

const baseURL = "https://api.rawg.io/api/";

const apiKey = "?key=de1dd16a530a4929b4b429dfe19acc7b";
