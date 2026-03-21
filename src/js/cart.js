import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.dataset.id;
    removeFromCart(id);
  }
});

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    
    <button class="remove-btn" data-id="${item.Id}">
      Remove
    </button>
  </li>`;

  return newItem;
}

import { setLocalStorage } from "./utils.mjs";

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];

  const index = cartItems.findIndex(item => item.Id === id);

  if (index !== -1) {
    cartItems.splice(index, 1);
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();
