// const loginBtn = document.querySelector(".loginButton");

// loginBtn.addEventListener("click", () => {
//   document.location.href = "login.html";
// });

// const pokemon = searchbarInput.value;
// if(!pokemon.length){renderError("El campo esta vacío, ingresé un numero"); return}
// console.log(pokemon);
// try {
//     const getData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//     const jsonData = await getData.json();
//     console.log(getData);
//     console.log(jsonData);
//     renderHtml(jsonData);
//     renderError("")
// } catch (error) {
//     console.log(error)
//     renderError("No se encontró un pokemon")
// }
// document.addEventListener('DOMContentLoaded', () => {
//     const randomVideo = Math.floor(Math.random() * (bannerGames.length-1 - 0 + 1) + 0)
//     video.src = bannerGames[randomVideo].source;
//     gameLogo.src = bannerGames[randomVideo].gameLogo;
//     gameBannerDescription.textContent = bannerGames[randomVideo].description;
//     gameBannerGenre.innerHTML = bannerGames[randomVideo].genres.join('');
//     videoPlayer.load();
//     videoPlayer.play();
// });

const baseURL = "https://api.rawg.io/api/";

const apiKey = "&key=de1dd16a530a4929b4b429dfe19acc7b";

const bodyBackground = document.getElementsByTagName("body");

// document.addEventListener("DOMContentLoaded", ()=> {
//     console.log("Hola")
//     const background = baseURL + "/5455?" + apiKey;
//     console.log(background)
//     // document.body.style.background='url()';


//traer background de la API
const traerBackgrounds = async () => {
  try {
    const response = await fetch(baseURL + "games?" + apiKey);

    const data = await response.json();
    console.log(data)
    // console.log(data);

    const getBackgroundImage = await data.background_image;
    // console.log(getBackgroundImage);
    
    //Colocar background image al body
    document.body.style.backgroundImage= `url(${getBackgroundImage})`;
  
  } catch (err) {
    console.log(err);
  }
};




const init = () => {
  traerBackgrounds();
};

init();
