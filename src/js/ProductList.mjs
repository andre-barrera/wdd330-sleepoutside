import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

  const discountPercent = isDiscounted
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      )
    : 0;

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">

        ${
          isDiscounted
            ? `<span class="discount-badge">-${discountPercent}%</span>`
            : ""
        }

        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>

        <p class="product-card__price">$${product.FinalPrice}</p>

        ${
          isDiscounted
            ? `<p class="original-price">$${product.SuggestedRetailPrice}</p>`
            : ""
        }

      </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.searchMode = false; // ✅ NEW: supports search
  }

  async init() {
    let list = [];

    // ✅ Decide whether to search or load by category
    if (this.searchMode) {
      list = await this.dataSource.searchProducts(this.category);
    } else {
      list = await this.dataSource.getData(this.category);
    }

    // ✅ Handle empty results
    if (!list || list.length === 0) {
      this.listElement.innerHTML = "<p>No products found.</p>";
      return;
    }

    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}