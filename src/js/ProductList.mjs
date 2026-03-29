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
  }

async init() {
  const list = await this.dataSource.getData(this.category);
  this.renderList(list);
}

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

}

