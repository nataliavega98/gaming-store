//Traigo el array user
let user = JSON.parse(localStorage.getItem("user")) || []; // obtenemos los datos del localstorage o creamos un arreglo vacio

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

//Menu list - menu desplegable derecha
const secondMl = document.querySelector(".second-ml");

//contenedor de usuario logueado
const userButton = document.querySelector(".userButton");

// contenedor de nombre usuario
const userProfile = document.querySelector(".userprofile");

// nombre usuario
const userNW = document.querySelector(".user-name-welcome");

// nombre usuario para mobile
const userNWMobile = document.querySelector(".user-name-welcome-mobile");

// boton logout
const logoutBtn = document.querySelector(".logoutBtn");

//boton login desktop
const loginButton = document.querySelector(".loginButton");

//boton logint mobile
const loginButtonMobile = document.querySelector(".loginButtonMobile");

//boton logoun mobile
const logoutButtonMobile = document.querySelector(".logoutButtonMobile");

// Medidas de hero y de todo el documento
const heightGameBanner = gameBannerSection.scrollHeight;

// NAV BAR FIXED CHANGE COLOR ON SCROLL
const navbar = document.querySelector(".nav-fixed");
window.onscroll = () => {
  if (window.scrollY > heightGameBanner) {
    navbar.classList.add("nav-active");
    navbar.classList.remove("nav-fixed");
  } else {
    navbar.classList.remove("nav-active");
  }
};

// Volumen de video arranca en 0
videoBanner.volume = 0;
//Funcion para mutear video
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

  if (menuContainer.classList.contains("open-menu")) {
    menuContainer.classList.remove("open-menu");
    return;
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

  if (cartContainer.classList.contains("open")) {
    cartContainer.classList.toggle("open");
    return;
  }

  overlayMenu.classList.toggle("show-overlay");
};

//Abrir menu de usuario on hover
const toggleOnHoverUser = () => {
  userProfile.classList.add("open-user");
};

// Cerrar menu usaurio al sacar el mouse
const mouseLeftHoverUser = () => {
  userProfile.classList.remove("open-user");
};

//Cerrar menu al ahcer click afuera (overlay)
const closeOnOverlayClick = () => {
  menuContainer.classList.remove("open-menu");
  cartContainer.classList.remove("open");
  overlayMenu.classList.remove("show-overlay");
};

//Función para saber si alguien esta logueado y realizar los debidos cambios
const isSomeoneLoged = () => {
  //Me trago el usuario que tiene loged true
  const userloged = user.find((loged) => loged.isLoged == true);
  //Si no encuentra true que que devuelva !userloged para que n tire undefined (devuelve true),
  //Cuando si encuentre true userloged devolverá false y pasará al else if
  if (!userloged) {
    return;
  } else if (userloged.isLoged == true) {
    userNW.innerHTML = `👋Welcome ${userloged.name}!`;
    userNWMobile.innerHTML = `👋Welcome ${userloged.name}!`;
    //Le asigno el id al boton logout para luego poder sacarlo y poner en false el isLoged
    logoutBtn.setAttribute("data-userid", `${userloged.id}`);
    logoutButtonMobile.setAttribute("data-userid", `${userloged.id}`);

    styleUserIfMediaQuery();
  }
};

//Estilado si el usuario esta logueado según el tamaño del dispositivo (mayor o menor a 730px width)
const styleUserLoged = () => {
  if (window.innerWidth < 730) {
    userButton.style.display = "none";
    loginButtonMobile.style.display = "none";
    userNWMobile.style.display = "flex";
    logoutButtonMobile.style.display = "block";
  } else {
    loginButton.style.display = "none";
    userButton.style.display = "flex";
    loginButtonMobile.style.display = "none";
    logoutButtonMobile.style.display = "none";
  }
};

//Estilado si el usuario cierra sesion según el tamaño del dispositivo (mayor o menor a 730px width)
const styleUserLogout = () => {
  if (window.innerWidth < 730) {
    loginButtonMobile.style.display = "block";
    loginButton.style.display = "none";
    logoutButtonMobile.style.display = "none";
    userNWMobile.style.display = "none";
  } else {
    loginButton.style.display = "flex";
    userButton.style.display = "none";

    loginButtonMobile.style.display = "none";
    userNWMobile.style.display = "none";
  }
};

//Funcion que ejecuta el estilado según el tamaño del dispositivo
const styleUserIfMediaQuery = () => {
  const userloged = user.find((loged) => loged.isLoged == true);

  if (userloged.isLoged == true) {
    styleUserLoged();
  } else {
    styleUserLogout();
  }
};

//Funcion que desloguea al usuario (isloged: false) y que
const replaceNameToLogout = (e) => {
  //Paso mi string del boton dataset-userid a numero entero
  const userId = parseInt(e.target.dataset.userid);
  //Obtengo el userid al tocar el boton logout y así con el find cambio el estado de isloged
  user = user.map((userItem) => {
    return userItem.id == userId ? { ...userItem, isLoged: false } : userItem;
  });
  localStorage.setItem("user", JSON.stringify(user));
  styleUserLogout();
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
  loginButtonMobile.addEventListener("click", () => {
    setTimeout(() => {
      document.location.href = "./login/login.html";
    }, 2000);
  });

  //desplegar menu cuando se inicio sesion
  userButton.addEventListener("mouseover", toggleOnHoverUser);
  userProfile.addEventListener("mouseover", toggleOnHoverUser);
  userButton.addEventListener("mouseleave", mouseLeftHoverUser);

  //logout
  logoutBtn.addEventListener("click", replaceNameToLogout);
  logoutButtonMobile.addEventListener("click", replaceNameToLogout);

  //Fijarse si alguien esta logueado desde un principio
  document.addEventListener("DOMContentLoaded", isSomeoneLoged);

  //Verificador constante de tamaño de pantalla para el estilado de login
  window.addEventListener("resize", isSomeoneLoged);
};

init();
