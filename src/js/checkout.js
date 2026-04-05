import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart");

checkout.init();
checkout.calculateOrderTotal();

const form = document.querySelector("#checkout-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = form.checkValidity();
  form.reportValidity();

  if (isValid) {
    checkout.checkout(form);
  }
});