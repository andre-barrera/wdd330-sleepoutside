import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

function createListingFilter(itemsCount) {
  return `
  <div class="listing-filter-box">
    <dialog id="listing-filter-modal">
      <button id="high-to-low">High to Low</button>
      <button id="low-to-high">Low to High</button>
      <button id="listing-filter-closeBtn">Close</button>
    </dialog>
    <button id="listing-filter-openBtn">Filter</button>
    <p>Total Items: ${itemsCount}</p>
  </div>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.list = [];
  }

  async init() {
    document.querySelector(".category-title").innerHTML = this.category;
    this.list = await this.dataSource.getData(this.category);

    // insert filter UI above the list
    this.listElement.insertAdjacentHTML(
      "beforebegin",
      createListingFilter(this.list.length)
    );

    // init filter controls after HTML exists
    initListingFilter(this);

    this.renderList(this.list);
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }
};

// listing filter
function initListingFilter(productListInstance) {
  const modal = document.querySelector("#listing-filter-modal");
  const openBtn = document.querySelector("#listing-filter-openBtn");
  const closeBtn = document.querySelector("#listing-filter-closeBtn");
  const highToLow = document.querySelector("#high-to-low");
  const lowToHigh = document.querySelector("#low-to-high");

  openBtn.addEventListener("click", () => modal.showModal());
  closeBtn.addEventListener("click", () => modal.close());

    highToLow.addEventListener("click", () => {
      const sorted = [...productListInstance.list].sort(
        (a, b) => b.FinalPrice - a.FinalPrice
      );
      productListInstance.renderList(sorted);
      modal.close();
    });

  lowToHigh.addEventListener("click", () => {
    const sorted = [...productListInstance.list].sort(
      (a, b) => a.FinalPrice - b.FinalPrice
    );
    productListInstance.renderList(sorted);
    modal.close();
  });
}