import {
  getLocalStorage
} from "./utils.mjs";

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  const itemList = items.map((item) => ({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: 1,
  }));
  return itemList;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal()
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    this.itemTotal =  this.list.reduce((subtotal, product) =>
    subtotal + product.FinalPrice, 0);
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06)

    const itemCount = this.list.length;
    if (itemCount <= 0) {
      this.shipping = 0;
    } else {
      this.shipping = 10 + (itemCount - 1) * 2;
    }

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const subTotalElement = document.querySelector(`${this.outputSelector} #num-items`);
    const taxElement = document.querySelector(`${this.outputSelector} #tax`);
    const shippingCostElement = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotalElement = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (subTotalElement) {
      subTotalElement.textContent = `$${this.itemTotal.toFixed(2)}`;
    }

    if (taxElement) {
      taxElement.textContent = `$${this.tax.toFixed(2)}`;
    }

    if (shippingCostElement) {
      shippingCostElement.textContent = `$${this.shipping.toFixed(2)}`;
    }

    if (orderTotalElement) {
      orderTotalElement.textContent = `$${this.orderTotal.toFixed(2)}`;
    }
  }

  async checkout() {
    const formClass = document.forms["checkout"]

    const formJSON = formDataToJSON(formClass)

    formJSON.orderDate = new Date();
    formJSON.orderTotal = this.orderTotal;
    formJSON.orderTax = this.tax;
    formJSON.orderShipping = this.shipping;
    formJSON.items = packageItems(this.list);

    return formJSON;
  }
};