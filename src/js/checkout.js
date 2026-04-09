import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
checkout.init();

const services = new ExternalServices();

// Listening for submit on the form (recommended)
document.forms["checkout"].addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = await checkout.checkout();
  console.log("Payload being sent:", payload);
  const response = await services.checkout(payload);
  console.log(response);
});