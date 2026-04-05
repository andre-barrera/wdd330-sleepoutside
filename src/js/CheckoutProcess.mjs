import { getLocalStorage } from "./utils.mjs";
import { alertMessage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key) {
    this.key = key;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice,
      0
    );

    document.querySelector("#subtotal").innerText =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    const itemCount = this.list.length;

    this.tax = this.itemTotal * 0.06;
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector("#tax").innerText =
      `$${this.tax.toFixed(2)}`;
    document.querySelector("#shipping").innerText =
      `$${this.shipping.toFixed(2)}`;
    document.querySelector("#total").innerText =
      `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems() {
    return this.list.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
    }));
  }

async checkout(form) {
  try {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const order = {
      ...data,
      orderDate: new Date().toISOString(),
      items: this.packageItems(),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    const response = await fetch(
      "https://wdd330-backend.onrender.com/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      }
    );

    const result = await response.json();

    console.log(result);

    // Success
    localStorage.removeItem(this.key);
    window.location.href = "/checkout/success.html";

  } catch (err) {
    console.error(err);

    // Show meaningful error
    alertMessage("Checkout failed. Please fix your information.");
  }
}
}