import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelector(".cart-count").textContent = `Total Items: ${cartItems.length}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  
  <button class="cart-remove" data-id="${item.Id}">Remove</button>
</li>`;

  return newItem;
}

function removeFromCart(id) {
  const cart = getLocalStorage("so-cart");
  const updated = cart.filter((item) => item.Id !== id);
  setLocalStorage("so-cart", updated);
  renderCartContents(); // re-render after removal
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-remove")) {
    removeFromCart(e.target.dataset.id);
  }
});

renderCartContents();
