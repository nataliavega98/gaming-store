// contenedor game info del banner
const gameBannerSection = document.getElementById("game-info");

//boton del cart
const cartBtn = document.querySelector(".cartButton");

//boton para cerrar cart
const cartBtnClose = document.querySelector(".close-cart");
//cart contenedor
const cartContainer = document.querySelector(".cart");
//Overla menu dinamico
const overlayMenu = document.querySelector(".overlayMenu");

const volumeBtn = document.querySelector(".volume");

const videoBanner = document.querySelector("video");

// NAV BAR FIXED CHANGE COLOR ON SCROLL
// Medidas de hero y de todo el documento
// console.log(heroSection.scrollHeight);
// console.log(document.body.scrollHeight - heroSection.scrollHeight);

const heightGameBanner = gameBannerSection.scrollHeight;

const navbar = document.querySelector(".nav-fixed");
window.onscroll = () => {
  if (window.scrollY > heightGameBanner) {
    navbar.classList.add("nav-active");
    navbar.classList.remove("nav-fixed");
  } else {
    navbar.classList.remove("nav-active");
  }
};

//mute video
videoBanner.volume = 0;
const unmuteVideo = () => {
if(volumeBtn.classList.contains("fa-volume-xmark")){
    volumeBtn.classList.remove("fa-volume-xmark")  
    volumeBtn.classList.add("fa-volume-high")  
    
    videoBanner.volume = 0.5;
}
else{
    volumeBtn.classList.remove("fa-volume-high")  
    volumeBtn.classList.add("fa-volume-xmark")  
    videoBanner.volume = 0;
}
  
};


// TOGGLE CART
//Abrir y cerrar cart con botones y con click fuera del menu (overlay)

const toggleCart = () => {
  cartContainer.classList.toggle("open");

  overlayMenu.classList.toggle("show-overlay");
};

const closeOnScroll = () => {
  overlayMenu.classList.remove("show-overlay");
  cartContainer.classList.remove("open");
};

init = () => {
  cartBtn.addEventListener("click", toggleCart);
  cartBtnClose.addEventListener("click", toggleCart);
  overlayMenu.addEventListener("click", toggleCart);
  window.addEventListener("scroll", closeOnScroll);
  volumeBtn.addEventListener("click", unmuteVideo);
};

init();
