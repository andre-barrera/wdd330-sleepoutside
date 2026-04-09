import {
  setLocalStorage,
  getLocalStorage
} from "./utils.mjs";

function getSubtotal(list) {
  return list.reduce((subtotal, product) =>
    subtotal + product.FinalPrice, 0)
};

function calculateShipping(itemCount) {
  if (itemCount <= 0) return 0;
  return 10 + (itemCount - 1) * 2;
}

function createOrderSummary() {
  let cartItems = getLocalStorage("so-cart") || [];

  const subTotalElement = document.getElementById("num-items");
  const taxElement = document.getElementById("tax");
  const shippingCostElement = document.getElementById("shipping");
  const orderTotalElement = document.getElementById("orderTotal");

  const subTotal = getSubtotal(cartItems)
  const shippingCost = calculateShipping(cartItems.length)

  // calculate subTotal
  if (subTotalElement) {
    subTotalElement.textContent = subTotal.toFixed(2);
  }

  // calculate tax
  const tax = (subTotal * 0.06)
  if (taxElement) {
    taxElement.textContent = tax.toFixed(2);
  }

  // calculate shipping
  if (shippingCostElement) {
    shippingCostElement.textContent = shippingCost.toFixed(2)
  }

  // calculate final total
  if (orderTotalElement) {
    const orderTotal = subTotal + tax + shippingCost
    orderTotalElement.textContent = orderTotal.toFixed(2);
  }
}

createOrderSummary();

