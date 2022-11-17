// Seteamos el carrito , vacío o lo que este en el localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Función para guardar el carrito en el localStorage
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

//VARIABLES
const cartProductContainer = document.querySelector(".cart-products-container");
const productsBtn = document.querySelector(".cardsGame-container");
//El div en el q se renderizara el success
const successModal = document.querySelector(".add-modal");
//precio total del carrito
const total = document.querySelector(".total");
const emptyBtn = document.querySelector(".empty-btn");
console.log(productsBtn);
// Renderizado de un producto del carrito.

const renderCartProduct = (game) => {
  console.log(game);
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
                    <i class="fa-solid fa-plus addplus-product"></i>
                    <p class="quantity">${quantity}</p>
                    <i class="fa-solid fa-minus substract-product"></i>
                </div>
            </div>
        </div>
    `;
};

//Función para renderizar el carrito
console.log(cartProductContainer);
const renderCart = () => {
  if (!cart.length) {
    cartProductContainer.innerHTML = `<p class="empty-msg">You have not added any game to the cart.</p><p>Go and choose one!</p>`;
    return;
  }
  cartProductContainer.innerHTML = cart.map(renderCartProduct).join("");
  showTotal();
};
const createCartProduct = (product) => {
  //spread, quiero una copia del carrito q ya tengo, le agrego el producto
  cart = [...cart, { ...product, quantity: 1 }];
  console.log(cart);
};
//Mensaje de que se agrego un producto al carrito
const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;

  setTimeout(() => successModal.classList.remove("active-modal"), 3500);
};
//Funcion para agregar al carrito un producto
const addProduct = (e) => {
  if (!e.target.classList.contains("add-btn")) return;
  const { id, name, bg, price, quantity } = e.target.dataset;

  const productData = { id, name, bg, price, quantity };
  console.log(productData);
  if (isExistingCartProduct(productData)) {
    addUnitToProduct(productData);
    showSuccessModal(`A ${productData.name} unit has been added to your cart`);
  } else {
  createCartProduct(productData);

  showSuccessModal(`${productData.name} has been added to the cart.`);
  }

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
//borrar
const resetCartItem = () => {
  cart = [];
  checkCartState();
};
//alertas de carrito
const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItem();
    ;
  }
};
//borrar carrito
const deleteCart = () => {
  completeCartAction(
    "Do you want to empty the cart?"
  );
};
const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  // disableBtn(buyBtn);
  // disableBtn(deleteBtn);
};
const initCart = () => {
  productsBtn.addEventListener("click", addProduct);
  document.addEventListener("DOMContentLoaded", renderCart);
  emptyBtn.addEventListener("click", deleteCart);

};

initCart();
