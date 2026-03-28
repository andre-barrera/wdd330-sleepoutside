import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // load product information
    const result = await this.dataSource.findProductById(this.productId);
    this.product = result;

    // display product on the page
    this.displayProduct();

    // attach event listener after the HTML exists
    const button = document.getElementById("addToCart");
    button.addEventListener("click", () => this.addProductToCart());
  }

  addProductToCart() {
    let cart = getLocalStorage("so-cart");

    if (!cart) {
      cart = [];
    }

    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  displayProduct() {
    const container = document.querySelector(".product-detail");
    container.innerHTML = createProductMarkup(this.product);
  }
}


// Template function that builds the product HTML
function createProductMarkup(product) {
  return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img 
        class="divider"
        src="${import.meta.env.VITE_SERVER_URL}${product.Image}"
        alt="${product.NameWithoutBrand}">

      <p class="product-card__price">$${product.FinalPrice}</p>

      <p class="product__color">${product.Colors[0].ColorName}</p>

      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">
          Add to Cart
        </button>
      </div>
    </section>
  `;
}