import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function hideShowLink(itemList) {
  // hide "Checkout" link if order count < 0
  const itemNum = itemList.length;

  const checkoutLink = document.getElementById("checkout");
  
  if (itemNum > 0) {
    checkoutLink.style.display = "inline";
  } else {
    checkoutLink.style.display = "none"
  }
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // hide link if cart is empty
  hideShowLink(cartItems);
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const id = e.target.dataset.id;
    removeFromCart(id);
  }
});

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}">❌</span>

    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
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
