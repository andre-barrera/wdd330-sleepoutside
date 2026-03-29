import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
  }

  async init() {
    // load product information
    const result = await this.dataSource.findProductById(this.productId);
    this.product = result;

    // display product on the page
    this.displayProduct();

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

function createProductMarkup(product) {
  return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img 
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}">

      <p class="product-card__price">$${product.FinalPrice}</p>

      <p class="product__color"> ${product.Colors?.[0]?.ColorName || "N/A"}</p>

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