// contenedor game info del banner
const gameBannerSection = document.getElementById("game-info");

//boton del cart
const cartBtn = document.querySelector(".cartButton");

//boton para cerrar cart
const cartBtnClose = document.querySelector(".close-cart");

//cart contenedor
const cartContainer = document.querySelector(".cart");

//boton para abrir el menu hamburguesa
const menuBtnOpen = document.querySelector(".menu");

//boton para cerrar el menu hamburguesa
const menuBtnClose = document.querySelector(".close-menu");

//menu contenedor
const menuContainer = document.querySelector(".menu-container");

//Overlay menu dinamico
const overlayMenu = document.querySelector(".overlayMenu");

//bboton volumen
const volumeBtn = document.querySelector(".volume");

//video
const videoBanner = document.querySelector("video");

//boton login
const loginButton = document.querySelector(".loginButton");

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
  if (volumeBtn.classList.contains("fa-volume-xmark")) {
    volumeBtn.classList.remove("fa-volume-xmark");
    volumeBtn.classList.add("fa-volume-high");

    videoBanner.volume = 0.5;
  } else {
    volumeBtn.classList.remove("fa-volume-high");
    volumeBtn.classList.add("fa-volume-xmark");
    videoBanner.volume = 0;
  }
};

// TOGGLE CART
//Abrir y cerrar cart con botones y con click fuera del menu (overlay)
const toggleCart = () => {
  cartContainer.classList.toggle("open");

  
  if(menuContainer.classList.contains("open-menu")){
    menuContainer.classList.remove("open-menu");
    return
  }
  overlayMenu.classList.toggle("show-overlay");
};

//cerrar haciendo scroll del carrito
const closeOnScroll = () => {
  overlayMenu.classList.remove("show-overlay");
  cartContainer.classList.remove("open");
};

//abrir cerrar menu hamburguesa
const toggleMenu = () => {
  menuContainer.classList.toggle("open-menu");

  if(cartContainer.classList.contains("open")){
    cartContainer.classList.toggle("open");
    return
  }

  overlayMenu.classList.toggle("show-overlay");
};

//
const closeOnOverlayClick = () => {
  menuContainer.classList.remove("open-menu");
  cartContainer.classList.remove("open");
  overlayMenu.classList.remove("show-overlay");
};

init = () => {
  cartBtn.addEventListener("click", toggleCart);
  cartBtnClose.addEventListener("click", toggleCart);
  overlayMenu.addEventListener("click", closeOnOverlayClick);
  window.addEventListener("scroll", closeOnScroll);
  volumeBtn.addEventListener("click", unmuteVideo);
  menuBtnOpen.addEventListener("click", toggleMenu);
  menuBtnClose.addEventListener("click", toggleMenu);

  //ir al login
  loginButton.addEventListener("click", () => {
    setTimeout(() => {
      document.location.href = "./login/login.html";
    }, 2000);
  });
};

init();
