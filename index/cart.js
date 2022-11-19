// Seteamos el carrito , vacío o lo que este en el localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Función para guardar el carrito en el localStorage
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

//VARIABLES
// contenedor de productos del carrito
const cartProductContainer = document.querySelector(".cart-products-container");
//Contanedor de productos del banner
const gameInfoContainer = document.querySelector(".game-info")
//contenedor de productos del store
const productsBtn = document.querySelector(".cardsGame-container");
//El div en el q se renderizara el success
const successModal = document.querySelector(".add-modal");
//precio total del carrito
const total = document.querySelector(".total");
//boton vaciar carrito
const emptyBtn = document.querySelector(".empty-btn");
//boton de comprar
const buyBtn = document.querySelector(".buy-btn");

// html de un producto del carrito.
const renderCartProduct = (game) => {
  const { id, name, bg, price, quantity } = game;
  return `    
        <div class="products-container" id=${id}>
            <div class="product-info-container">
                <img src="${bg}" alt="">
                <div class="product-info">
                    <h6>${name}</h6>
                    <p><b>Price:</b> ${price}€</p>
                </div>
            </div>
            <div class="product-quantity-container">
                <p>Quantity</p>
                <div class="product-quantity">
                    <i class="fa-solid fa-plus addplus-product" data-id="${id}"></i>
                    <p class="quantity">${quantity}</p>
                    <i class="fa-solid fa-minus substract-product" data-id="${id}"></i>
                </div>
            </div>
        </div>
    `;
};

//Función para renderizar el carrito
const renderCart = () => {
  // si esta vacio
  if (!cart.length) {
    cartProductContainer.innerHTML = `<p class="empty-msg">You have not added any game to the cart.</p><p>Go and choose one!</p>`;
    return;
  }
  //renderizar y añadir al html del contenedor de productos
  cartProductContainer.innerHTML = cart.map(renderCartProduct).join("");
  //mostrar precio total
  showTotal();
};


const createCartProduct = (product) => {
  //spread, quiero una copia del carrito q ya tengo, le agrego el producto
  cart = [...cart, { ...product, quantity: 1 }];
};

//Mensaje de que se agrego un producto al carrito
const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => successModal.classList.remove("active-modal"), 3500);
};

//Funcion para agregar al carrito un producto al hacer click
const addProduct = (e) => {
  //devolver aquellos q no tengan add-btn
  if (!e.target.classList.contains("add-btn")) return;
  // desestructurar data que viene por el boton
  const { id, name, bg, price, quantity } = e.target.dataset;
  const productData = { id, name, bg, price, quantity };

  //si ya existe agrego uno más
  if (isExistingCartProduct(productData)) {
    addUnitToProduct(productData);
    showSuccessModal(`A ${productData.name} unit has been added to your cart`);
  } else { //agrego el nuevo producto
    createCartProduct(productData);
    showSuccessModal(`${productData.name} has been added to the cart.`);
  }
  //chequeo el estado del carrito
  checkCartState();
};

//Función para obtener el precio total de compra
const getCartTotal = () =>
  cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);

//Función para renderizar el precio total de compra
const showTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)}€`;
};

//el producto si ya existe
const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

//le sumo una unidad mas si existe
const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

//resetear todo el carrito
const resetCartItem = () => {
  cart = [];
  checkCartState();
};

//Funcion para alertas de carrito
const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItem();
    alert(successMsg);
  }
};

//Funcion para accionar borrar carrito
const deleteCart = () => {
  if (window.confirm("Do you want to empty your cart?😥")) {
    resetCartItem();
  }

  return;
};

//Deshabilitar boton
const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

//Función para manipular el evento de apretar en el más.
const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};

// remover item segun id
const removeProductFromCart = (existingCartProduct) => {
  cart = cart.filter((product) => product.id !== existingCartProduct.id);
  checkCartState();
};
//Función para restarle una unidad a un producto del carrito (quantity-1).
// Hacemos un map que recorre el carrito y si el id del producto coincide con el id del producto que queremos restarle una unidad, le restamos una unidad.
const substractProductUnit = (existingProduct) => {
  cart = cart.map((product) => {
    return product.id === existingProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

//Función para manipular el evento de apretar en el menos.
const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  // Si se toco en un item con uno solo de cantidad preguntar y eliminar
  if (existingCartProduct.quantity === 1) {
    if (window.confirm(`Do you want to delete ${existingCartProduct.name}from your cart?😥`)) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  //eliminar de a 1 item
  substractProductUnit(existingCartProduct);
};


//Función para manipular los eventos de los botones de más y menos.
const handleQuantity = (e) => {
  //accion restar
  if (e.target.classList.contains("substract-product")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } //accion sumar  
  else if (e.target.classList.contains("addplus-product")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  // Actualizamos el estado del carrito
  checkCartState();
};

//Función para completar compra.
const completeBuy = () => {
  completeCartAction(
    "Do you want to finish your purchase?😊",
    "Thanks for your purchase!🎊"
  );
};

//Funcion que actualiza el carrito, guarda en local storage, renderiza lo que haya en el array cart
//muestra el total, desabilita los botones al estar vacio el cart
const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBtn(emptyBtn);
  disableBtn(buyBtn);

};


const initCart = () => {
  productsBtn.addEventListener("click", addProduct);
  gameInfoContainer.addEventListener("click", addProduct);
  document.addEventListener("DOMContentLoaded", renderCart);
  emptyBtn.addEventListener("click", deleteCart);
  disableBtn(emptyBtn);
  disableBtn(buyBtn);
  cartProductContainer.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
};

initCart();
