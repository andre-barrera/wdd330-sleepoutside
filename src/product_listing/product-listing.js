import ExternalServices from "../js/ExternalServices.mjs";
import ProductList from "../js/ProductList.mjs";
import { loadHeaderFooter, getParam } from "../js/utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const search = getParam("search");

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");

const query = search ? search : category;

if (search) {
  document.querySelector(".title").textContent = `Search Results for "${search}"`;
} else {
  document.querySelector(".title").textContent = `Top Products: ${category}`;
}

const myList = new ProductList(query, dataSource, listElement);

myList.searchMode = !!search;

myList.init();